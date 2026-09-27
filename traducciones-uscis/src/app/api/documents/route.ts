import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { listOrderFiles } from "@/lib/documents";
import { uploadsEnabled } from "@/lib/features";
import { getPaidOrder } from "@/lib/stripe";
import { ALLOWED_UPLOAD_TYPES, MAX_FILES_PER_ORDER, MAX_UPLOAD_BYTES, orderFolder } from "@/lib/upload-rules";

// Hands the browser a short-lived token to upload straight to the private
// store, but only for a paid order and only inside that order's folder.
export async function POST(request: Request) {
  if (!uploadsEnabled()) {
    return NextResponse.json({ error: "uploads_disabled" }, { status: 503 });
  }
  const body = (await request.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const { sessionId } = JSON.parse(clientPayload ?? "{}") as { sessionId?: string };
        const order = sessionId ? await getPaidOrder(sessionId) : null;
        if (!order?.paid) throw new Error("Order not paid");
        if (!pathname.startsWith(orderFolder(order.code)) || pathname.includes("..")) {
          throw new Error("Pathname outside the order folder");
        }
        const existing = await listOrderFiles(order.code);
        if (existing.length >= MAX_FILES_PER_ORDER) throw new Error("Too many files");
        return {
          allowedContentTypes: ALLOWED_UPLOAD_TYPES,
          maximumSizeInBytes: MAX_UPLOAD_BYTES,
          addRandomSuffix: true,
          validUntil: Date.now() + 10 * 60 * 1000,
        };
      },
    });
    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "upload_rejected" }, { status: 400 });
  }
}
