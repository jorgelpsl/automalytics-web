import { issueSignedToken } from "@vercel/blob";
import { handleUploadPresigned, type HandleUploadPresignedBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { listOrderFiles, pagesUploaded } from "@/lib/documents";
import { uploadsEnabled } from "@/lib/features";
import { getPaidOrder } from "@/lib/stripe";
import { ALLOWED_UPLOAD_TYPES, MAX_UPLOAD_BYTES, orderFolder, pagesFromPathname } from "@/lib/upload-rules";

// Signs a short-lived URL for the browser to upload straight to the private
// store, but only for a paid order, inside that order's folder, and within
// the number of pages the client paid for.
export async function POST(request: Request) {
  if (!uploadsEnabled()) {
    return NextResponse.json({ error: "uploads_disabled" }, { status: 503 });
  }
  const body = (await request.json()) as HandleUploadPresignedBody;
  try {
    const result = await handleUploadPresigned({
      body,
      request,
      getSignedToken: async (pathname, clientPayload) => {
        const { sessionId } = JSON.parse(clientPayload ?? "{}") as { sessionId?: string };
        const order = sessionId ? await getPaidOrder(sessionId) : null;
        if (!order?.paid) throw new Error("Order not paid");
        if (!pathname.startsWith(orderFolder(order.code)) || pathname.includes("..")) {
          throw new Error("Pathname outside the order folder");
        }
        const incoming = pagesFromPathname(pathname);
        if (!incoming) throw new Error("Missing page count");
        const used = pagesUploaded(await listOrderFiles(order.code));
        if (used + incoming > order.pages) throw new Error("More pages than paid");

        const validUntil = Date.now() + 10 * 60 * 1000;
        const token = await issueSignedToken({
          pathname,
          operations: ["put"],
          validUntil,
          allowedContentTypes: ALLOWED_UPLOAD_TYPES,
          maximumSizeInBytes: MAX_UPLOAD_BYTES,
        });
        return {
          token,
          urlOptions: {
            validUntil,
            allowedContentTypes: ALLOWED_UPLOAD_TYPES,
            maximumSizeInBytes: MAX_UPLOAD_BYTES,
            addRandomSuffix: true,
          },
        };
      },
    });
    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "upload_rejected" }, { status: 400 });
  }
}
