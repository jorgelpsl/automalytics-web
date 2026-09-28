// Shared by the upload widget (to reject early with a clear message) and the
// token route (which is what actually enforces them).

export const ALLOWED_UPLOAD_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
];
export const MAX_UPLOAD_MB = 20;
export const MAX_UPLOAD_BYTES = MAX_UPLOAD_MB * 1024 * 1024;
export function orderFolder(code: string): string {
  return `pedidos/${code}/`;
}

// Each file's page count travels in its name ("3p-acta.pdf") so the server
// can keep an order within the pages paid without opening the files.
export function uploadPathname(code: string, fileName: string, pages: number): string {
  return `${orderFolder(code)}${pages}p-${safeFileName(fileName)}`;
}

export function pagesFromPathname(pathname: string): number | null {
  const match = /^(\d{1,3})p-/.exec(pathname.split("/").pop() ?? "");
  return match ? Number(match[1]) : null;
}

export function safeFileName(name: string): string {
  const cleaned = name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^A-Za-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .slice(-80);
  return cleaned || "documento";
}
