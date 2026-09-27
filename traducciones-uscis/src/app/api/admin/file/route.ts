import { get } from "@vercel/blob";
import { isAdmin } from "@/lib/admin-auth";
import { adminEnabled } from "@/lib/features";

// Streams one private document to a signed-in admin. There is no public URL
// for these files; this route is the only way to read them.
export async function GET(request: Request) {
  if (!adminEnabled() || !(await isAdmin())) {
    return new Response("Not found", { status: 404 });
  }
  const pathname = new URL(request.url).searchParams.get("p") ?? "";
  if (!pathname.startsWith("pedidos/") || pathname.includes("..")) {
    return new Response("Not found", { status: 404 });
  }
  const result = await get(pathname, { access: "private" });
  if (result?.statusCode !== 200) {
    return new Response("Not found", { status: 404 });
  }
  const fileName = pathname.split("/").pop() ?? "documento";
  return new Response(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType,
      "Content-Disposition": `inline; filename="${fileName.replace(/"/g, "")}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
