import { NextResponse } from "next/server";
import { DOCUMENT_RETENTION_DAYS } from "@/data/legal";
import { deletePrefix, listOrderFolders } from "@/lib/documents";
import { uploadsEnabled } from "@/lib/features";
import { readOrderRecords, removeOrderRecord, updateOrderRecord } from "@/lib/order-store";
import { isLiveMode, listAllPaidOrderCodes } from "@/lib/stripe";

const DAY_MS = 24 * 60 * 60 * 1000;
// Folders with no matching paid order (leftovers from Stripe test mode) are
// only touched once they've been quiet this long.
const ORPHAN_GRACE_DAYS = 2;

// Runs daily from Vercel Cron (vercel.json). Keeps the privacy policy's
// promise: documents of completed orders are deleted after the retention
// period. Vercel sends CRON_SECRET as a bearer token; without it, nothing runs.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!uploadsEnabled()) return NextResponse.json({ skipped: "uploads_disabled" });

  const now = Date.now();
  const summary = { purgedOrders: [] as string[], orphanOrders: [] as string[], filesDeleted: 0 };

  const records = await readOrderRecords();
  for (const [code, record] of Object.entries(records)) {
    if (record.status !== "completado" || record.purgedAt) continue;
    const completedAt = Date.parse(record.completedAt ?? record.updatedAt ?? "");
    if (!Number.isFinite(completedAt) || now - completedAt < DOCUMENT_RETENTION_DAYS * DAY_MS) continue;
    summary.filesDeleted += await deletePrefix(`pedidos/${code}/`);
    await updateOrderRecord(code, (r) => ({ ...r, purgedAt: new Date().toISOString() }));
    summary.purgedOrders.push(code);
  }

  // Test-mode leftovers can only be told apart while charging real cards: in
  // test mode, live orders would look like orphans. A failed Stripe listing
  // throws, so an error never reads as "no paid orders".
  if (isLiveMode()) {
    const paidCodes = await listAllPaidOrderCodes();
    for (const folder of await listOrderFolders()) {
      if (paidCodes.has(folder.code) || now - folder.newest.getTime() < ORPHAN_GRACE_DAYS * DAY_MS) continue;
      summary.filesDeleted += await deletePrefix(`pedidos/${folder.code}/`);
      await deletePrefix(`avisos/${folder.code}/`);
      await removeOrderRecord(folder.code);
      summary.orphanOrders.push(folder.code);
    }
  }

  console.log("purge-documents", JSON.stringify(summary));
  return NextResponse.json(summary);
}
