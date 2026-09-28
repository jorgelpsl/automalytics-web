// Server-only: what the owner changes about an order after it's paid —
// status, corrections, deletion — layered over the Stripe checkout, which
// stays the untouched record of the payment. One private JSON file is plenty
// at this volume; writes are conditional on its ETag so two open admin tabs
// can't silently overwrite each other.
import { BlobPreconditionFailedError, get, put } from "@vercel/blob";
import { getPaidOrder, type PaidOrder } from "@/lib/stripe";

const STORE_PATH = "admin/pedidos.json";

export type OrderStatus = "en_proceso" | "completado";

export type OrderEdits = Partial<Pick<PaidOrder, "name" | "email" | "phone" | "documentType" | "pages" | "deadline" | "notes">>;

export interface OrderRecord {
  status?: OrderStatus;
  deleted?: boolean;
  edits?: OrderEdits;
  updatedAt?: string;
}

export interface Order extends PaidOrder {
  status: OrderStatus;
  deleted: boolean;
  edited: boolean;
  /** Pages as the client paid them, before any correction. */
  pagesPaid: number;
}

type Store = Record<string, OrderRecord>;

async function readStore(): Promise<{ data: Store; etag: string | null }> {
  try {
    const res = await get(STORE_PATH, { access: "private", useCache: false });
    if (!res || res.statusCode !== 200) return { data: {}, etag: null };
    return { data: JSON.parse(await new Response(res.stream).text()) as Store, etag: res.blob.etag };
  } catch (err) {
    if (err instanceof Error && err.name === "BlobNotFoundError") return { data: {}, etag: null };
    throw err;
  }
}

export async function readOrderRecords(): Promise<Store> {
  return (await readStore()).data;
}

export async function updateOrderRecord(code: string, change: (current: OrderRecord) => OrderRecord): Promise<void> {
  for (let attempt = 0; attempt < 4; attempt++) {
    const { data, etag } = await readStore();
    const next: Store = { ...data, [code]: { ...change(data[code] ?? {}), updatedAt: new Date().toISOString() } };
    try {
      await put(STORE_PATH, JSON.stringify(next, null, 1), {
        access: "private",
        contentType: "application/json",
        addRandomSuffix: false,
        ...(etag ? { ifMatch: etag } : {}),
      });
      return;
    } catch (err) {
      // Someone else wrote first (or created the file): re-read and reapply.
      const conflict = err instanceof BlobPreconditionFailedError || (err instanceof Error && /exist/i.test(err.message));
      if (!conflict || attempt === 3) throw err;
    }
  }
}

export function applyRecord(order: PaidOrder, record: OrderRecord | undefined): Order {
  const edits = record?.edits ?? {};
  return {
    ...order,
    ...edits,
    pagesPaid: order.pages,
    status: record?.status ?? "en_proceso",
    deleted: Boolean(record?.deleted),
    edited: Object.keys(edits).length > 0,
  };
}

/** A paid order with the owner's changes applied, or null if unpaid/unknown. */
export async function loadOrder(sessionId: string): Promise<Order | null> {
  const paid = await getPaidOrder(sessionId);
  if (!paid?.paid) return null;
  const records = await readOrderRecords().catch(() => ({}) as Store);
  return applyRecord(paid, records[paid.code]);
}
