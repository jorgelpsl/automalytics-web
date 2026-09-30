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
// A client can take back a file for this long after uploading it, to fix a
// wrong photo. After that the file may already be in translation, so swapping
// it goes through WhatsApp; the server enforces this, the widget mirrors it.
export const REMOVE_WINDOW_MINUTES = 60;

export function removalOpen(uploadedAt: Date, now = Date.now()): boolean {
  return now - uploadedAt.getTime() < REMOVE_WINDOW_MINUTES * 60 * 1000;
}

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

// Some browsers report HEIC photos from iPhones with an empty type.
const TYPE_BY_EXTENSION: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  heic: "image/heic",
  heif: "image/heif",
  pdf: "application/pdf",
};

export function contentTypeOf(file: File): string | null {
  if (ALLOWED_UPLOAD_TYPES.includes(file.type)) return file.type;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return TYPE_BY_EXTENSION[ext] ?? null;
}

export function formatFileSize(bytes: number): string {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}
