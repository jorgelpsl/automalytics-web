import { issueSignedToken } from "@vercel/blob";
import { handleUploadPresigned, type HandleUploadPresignedBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { adminEnabled } from "@/lib/features";
import { ALLOWED_UPLOAD_TYPES, MAX_UPLOAD_BYTES, pagesFromPathname } from "@/lib/upload-rules";

// Lets the signed-in owner add documents to any order (for example, ones a
// client sent over WhatsApp). No page cap: the owner decides.
export async function POST(request: Request) {
  if (!adminEnabled() || !(await isAdmin())) {
    return NextResponse.json({ error: "not_allowed" }, { status: 403 });
  }
  const body = (await request.json()) as HandleUploadPresignedBody;
  try {
    const result = await handleUploadPresigned({
      body,
      request,
      getSignedToken: async (pathname) => {
        if (!/^pedidos\/CT-[A-Z0-9]{6}\//.test(pathname) || pathname.includes("..") || !pagesFromPathname(pathname)) {
          throw new Error("Invalid pathname");
        }
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
