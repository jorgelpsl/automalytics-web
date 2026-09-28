// Counts pages in a PDF without a PDF library: page objects are tagged
// "/Type /Page". Files that pack objects into compressed streams hide those
// tags, so fall back to the page tree's "/Count". Good enough to cap uploads
// at the pages paid; it is not a validator.
export async function countPdfPages(file: File): Promise<number> {
  const text = new TextDecoder("latin1").decode(await file.arrayBuffer());
  const pageObjects = text.match(/\/Type\s*\/Page(?![A-Za-z])/g)?.length ?? 0;
  if (pageObjects > 0) return pageObjects;
  const counts = Array.from(text.matchAll(/\/Count\s+(\d+)/g), (m) => Number(m[1]));
  return Math.max(1, ...counts);
}
