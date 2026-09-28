import { del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { uploadsEnabled } from "@/lib/features";
import { getPaidOrder } from "@/lib/stripe";
import { orderFolder } from "@/lib/upload-rules";

// Lets a client take back a file they uploaded by mistake, which frees its
// pages for the right one. Only files inside their own order's folder.
export async function POST(request: Request) {
  if (!uploadsEnabled()) return NextResponse.json({ error: "uploads_disabled" }, { status: 503 });
  const { sessionId, pathname } = (await request.json().catch(() => ({}))) as { sessionId?: string; pathname?: string };
  const order = sessionId ? await getPaidOrder(sessionId) : null;
  if (!order?.paid || !pathname || !pathname.startsWith(orderFolder(order.code)) || pathname.includes("..")) {
    return NextResponse.json({ error: "not_allowed" }, { status: 403 });
  }
  try {
    await del(pathname);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "delete_failed" }, { status: 502 });
  }
}
