import { NextResponse, type NextRequest } from "next/server";
import { isLang } from "@/i18n/config";
import { parseOrder } from "@/lib/order";
import { paymentsEnabled } from "@/lib/features";
import { createCheckoutSession } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  if (!paymentsEnabled()) {
    return NextResponse.json({ error: "payments_disabled" }, { status: 503 });
  }
  const body = await req.json().catch(() => null);
  const order = parseOrder(body);
  // The page the order was placed from decides the language of Stripe's page and
  // of the return link; anything unexpected falls back to Spanish.
  const lang = isLang(body?.lang) ? body.lang : "es";
  if (!order) {
    return NextResponse.json({ error: "invalid_order" }, { status: 400 });
  }
  try {
    const url = await createCheckoutSession(order, req.nextUrl.origin, lang);
    return NextResponse.json({ url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "stripe_error" }, { status: 502 });
  }
}
