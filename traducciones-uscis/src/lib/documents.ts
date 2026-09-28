// Server-only: the private Blob store holding what clients upload. Files are
// grouped per order under pedidos/<code>/ and never get a public URL.
import { list } from "@vercel/blob";
import { orderFolder, pagesFromPathname } from "@/lib/upload-rules";

export interface StoredFile {
  pathname: string;
  name: string;
  size: number;
  pages: number;
  uploadedAt: Date;
}

// Stored as "2p-acta-<random suffix>.pdf"; show the name the client picked.
function displayName(pathname: string): string {
  const file = pathname.split("/").pop() ?? pathname;
  return file.replace(/^\d{1,3}p-/, "").replace(/-[A-Za-z0-9]{20,}(\.[^.]+)?$/, "$1");
}

export async function listOrderFiles(code: string): Promise<StoredFile[]> {
  const { blobs } = await list({ prefix: orderFolder(code), limit: 100 });
  return blobs
    .map((b) => ({
      pathname: b.pathname,
      name: displayName(b.pathname),
      size: b.size,
      pages: pagesFromPathname(b.pathname) ?? 1,
      uploadedAt: new Date(b.uploadedAt),
    }))
    .sort((a, b) => a.uploadedAt.getTime() - b.uploadedAt.getTime());
}

export function pagesUploaded(files: StoredFile[]): number {
  return files.reduce((sum, f) => sum + f.pages, 0);
}
