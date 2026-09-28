// Server-only: the private Blob store holding what clients upload. Files are
// grouped per order under pedidos/<code>/ and never get a public URL.
import { del, list } from "@vercel/blob";
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

/** Deletes every blob under a prefix, page by page. Returns how many were removed. */
export async function deletePrefix(prefix: string): Promise<number> {
  let removed = 0;
  let cursor: string | undefined;
  do {
    const page = await list({ prefix, cursor, limit: 1000 });
    if (page.blobs.length) {
      await del(page.blobs.map((b) => b.pathname));
      removed += page.blobs.length;
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return removed;
}

/** Order folders that exist in storage, with the date of their newest file. */
export async function listOrderFolders(): Promise<{ code: string; newest: Date }[]> {
  const byCode = new Map<string, Date>();
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: "pedidos/", cursor, limit: 1000 });
    for (const b of page.blobs) {
      const code = b.pathname.split("/")[1];
      const uploaded = new Date(b.uploadedAt);
      if (code && (!byCode.has(code) || byCode.get(code)! < uploaded)) byCode.set(code, uploaded);
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return [...byCode].map(([code, newest]) => ({ code, newest }));
}
