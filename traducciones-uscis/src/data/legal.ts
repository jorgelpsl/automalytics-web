export const LEGAL_UPDATED = "30 de septiembre de 2026";
/** The same date, machine-readable, for structured data and the sitemap. */
export const LEGAL_UPDATED_ISO = "2026-09-30";

export const LEGAL_PAGES = [
  { href: "/terminos", label: "Términos del servicio" },
  { href: "/reembolsos", label: "Política de reembolsos" },
  { href: "/privacidad", label: "Política de privacidad" },
] as const;

/** Days after delivery during which translation errors are corrected at no cost. */
export const CORRECTION_DAYS = 7;

/** Days after an order is marked completed before its documents are deleted automatically. */
export const DOCUMENT_RETENTION_DAYS = 30;
