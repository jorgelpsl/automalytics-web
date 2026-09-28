import { NextResponse } from "next/server";
import { listOrderFiles, pagesUploaded } from "@/lib/documents";
import { notifyDocuments } from "@/lib/notify";
import { getPaidOrder } from "@/lib/stripe";

// Called by the upload widget once a batch finishes. Emails at most once per
// page total, so reloading or retrying doesn't repeat it.
export async function POST(request: Request) {
  const { sessionId } = (await request.json().catch(() => ({}))) as { sessionId?: string };
  const order = sessionId ? await getPaidOrder(sessionId) : null;
  if (!order?.paid) return NextResponse.json({ error: "not_allowed" }, { status: 403 });
  try {
    const files = await listOrderFiles(order.code);
    await notifyDocuments(order, pagesUploaded(files), files.length);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "notify_failed" }, { status: 502 });
  }
}
