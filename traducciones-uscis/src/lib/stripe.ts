// Server-only: talks to Stripe's REST API with the secret key. A handful of
// calls doesn't justify the SDK. Never import this from a client component.
import { SITE } from "@/data/site";
import type { Order } from "@/lib/order";
import { paymentsEnabled } from "@/lib/features";
import { tierFor } from "@/lib/pricing";

const API = "https://api.stripe.com/v1";

export interface PaidOrder {
  sessionId: string;
  code: string;
  paid: boolean;
  createdAt: Date;
  amountTotal: number;
  name: string;
  documentType: string;
  pages: number;
  deadline: string;
  notes: string;
  email: string;
  phone: string;
}

interface StripeSession {
  id: string;
  created: number;
  status: string;
  payment_status: string;
  amount_total: number | null;
  client_reference_id: string | null;
  metadata: Record<string, string>;
  customer_details: { email: string | null; phone: string | null } | null;
}

// A promotion code that covers the whole total completes the checkout with
// nothing to charge; that order is as settled as a paid one.
function isSettled(s: StripeSession): boolean {
  return s.payment_status === "paid" || (s.status === "complete" && s.payment_status === "no_payment_required");
}

function toOrder(s: StripeSession): PaidOrder {
  return {
    sessionId: s.id,
    code: s.client_reference_id ?? "",
    paid: isSettled(s),
    createdAt: new Date(s.created * 1000),
    amountTotal: (s.amount_total ?? 0) / 100,
    name: s.metadata.name ?? "",
    documentType: s.metadata.documentType ?? "",
    pages: Number(s.metadata.pages ?? 0),
    deadline: s.metadata.deadline ?? "",
    notes: s.metadata.notes ?? "",
    email: s.customer_details?.email ?? "",
    phone: s.customer_details?.phone ?? "",
  };
}

async function stripeRequest<T>(path: string, body?: URLSearchParams): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: body ? "POST" : "GET",
    headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` },
    body,
    cache: "no-store",
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`Stripe ${res.status}: ${json?.error?.message ?? "unknown error"}`);
  return json as T;
}

// Short, unambiguous code the client quotes on WhatsApp so the payment can be
// matched in the Stripe dashboard (it's the client_reference_id there).
function orderCode(): string {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return "CT-" + Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

export async function createCheckoutSession(order: Order, origin: string): Promise<string> {
  const tier = tierFor(order.pages);
  if (!tier) throw new Error("No price tier for this order");
  const code = orderCode();
  const details = {
    order: code,
    name: order.name,
    documentType: order.documentType,
    pages: String(order.pages),
    deadline: order.deadline,
    notes: order.notes,
  };

  const p = new URLSearchParams({
    mode: "payment",
    locale: "es-419",
    client_reference_id: code,
    success_url: `${origin}/pago-recibido?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/#cotizar`,
    "phone_number_collection[enabled]": "true",
    // Codes are created and retired in the Stripe dashboard (Products →
    // Coupons); Checkout validates them and charges the discounted total.
    allow_promotion_codes: "true",
    // Shown above Stripe's Pay button: a clear final-sale notice at the
    // moment of payment is what card networks look at in a dispute.
    "custom_text[submit][message]": `Todas las compras son finales y no tienen reembolso. Al pagar aceptas los Términos del servicio: ${SITE.url}/terminos`,
    "line_items[0][quantity]": String(order.pages),
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][unit_amount]": String(tier.perPage * 100),
    "line_items[0][price_data][product_data][name]": `Traducción certificada: ${order.documentType}`,
    "line_items[0][price_data][product_data][description]": `${SITE.name} · precio por página${
      SITE.turnaround ? ` · entrega en ${SITE.turnaround}` : ""
    }`,
    "payment_intent_data[description]": `${code} · ${order.documentType} · ${order.pages} pág. · ${order.name}`,
  });
  for (const [key, value] of Object.entries(details)) {
    if (!value) continue;
    p.set(`metadata[${key}]`, value);
    p.set(`payment_intent_data[metadata][${key}]`, value);
  }

  const session = await stripeRequest<{ url: string }>("/checkout/sessions", p);
  return session.url;
}

export async function getPaidOrder(sessionId: string): Promise<PaidOrder | null> {
  if (!paymentsEnabled() || !/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) return null;
  try {
    return toOrder(await stripeRequest<StripeSession>(`/checkout/sessions/${sessionId}`));
  } catch (err) {
    console.error(err);
    return null;
  }
}

/** Most recent completed checkouts, newest first. */
export async function listPaidOrders(limit = 50): Promise<PaidOrder[]> {
  const res = await stripeRequest<{ data: StripeSession[] }>(`/checkout/sessions?status=complete&limit=${limit}`);
  return res.data.map(toOrder).filter((o) => o.paid && o.code);
}

/** Whether the configured key charges real cards (as opposed to test mode). */
export function isLiveMode(): boolean {
  return /^(sk|rk)_live_/.test(process.env.STRIPE_SECRET_KEY ?? "");
}

/** Every paid order code in the current Stripe mode, following pagination to the end. */
export async function listAllPaidOrderCodes(): Promise<Set<string>> {
  const codes = new Set<string>();
  let startingAfter: string | null = null;
  for (let page = 0; page < 100; page++) {
    const query: string = `/checkout/sessions?status=complete&limit=100${startingAfter ? `&starting_after=${startingAfter}` : ""}`;
    const res: { data: StripeSession[]; has_more: boolean } = await stripeRequest(query);
    for (const s of res.data) if (isSettled(s) && s.client_reference_id) codes.add(s.client_reference_id);
    if (!res.has_more || res.data.length === 0) return codes;
    startingAfter = res.data[res.data.length - 1].id;
  }
  throw new Error("Too many checkout sessions to verify orphans safely");
}
