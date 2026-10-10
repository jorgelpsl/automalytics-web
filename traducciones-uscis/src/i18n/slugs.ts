// One entry per document page. The Spanish slug is the one orders and the
// admin panel know; the English slug is only the public URL under /en.

export const DOCUMENT_SLUGS = [
  { es: "acta-de-nacimiento", en: "birth-certificate" },
  { es: "acta-de-matrimonio", en: "marriage-certificate" },
  { es: "sentencia-de-divorcio", en: "divorce-decree" },
  { es: "acta-de-defuncion", en: "death-certificate" },
  { es: "antecedentes-penales", en: "criminal-record-certificate" },
  { es: "titulos-y-diplomas", en: "diplomas-and-degrees" },
] as const;

export type DocumentSlugEs = (typeof DOCUMENT_SLUGS)[number]["es"];

export function englishSlug(slugEs: string): string | undefined {
  return DOCUMENT_SLUGS.find((s) => s.es === slugEs)?.en;
}

export function spanishSlug(slugEn: string): string | undefined {
  return DOCUMENT_SLUGS.find((s) => s.en === slugEn)?.es;
}
