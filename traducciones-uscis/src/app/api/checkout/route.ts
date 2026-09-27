import { NextResponse, type NextRequest } from "next/server";
import { parseOrder } from "@/lib/order";
import { createCheckoutSession, paymentsEnabled } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  if (!paymentsEnabled()) {
    return NextResponse.json({ error: "payments_disabled" }, { status: 503 });
  }
  const order = parseOrder(await req.json().catch(() => null));
  if (!order) {
    return NextResponse.json({ error: "invalid_order" }, { status: 400 });
  }
  try {
    const url = await createCheckoutSession(order, req.nextUrl.origin);
    return NextResponse.json({ url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "stripe_error" }, { status: 502 });
  }
}
