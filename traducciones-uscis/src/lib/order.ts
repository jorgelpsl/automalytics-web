import { documentOptions } from "@/data/documents";
import { type Lang } from "@/i18n/config";

/** Spanish names: the values stored with an order, whatever language the form was in. */
export const DOCUMENT_OPTIONS = documentOptions("es");
export const MAX_PAGES = 200;
export const MAX_NOTES = 400;

export interface Order {
  name: string;
  documentType: string;
  pages: number;
  /** yyyy-mm-dd, or "" when the client has no deadline. */
  deadline: string;
  notes: string;
}

// Server-side gate for anything that reaches Stripe. The form validates the
// same fields with friendlier messages; this only decides accept or reject.
export function parseOrder(raw: unknown): Order | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const name = typeof r.name === "string" ? r.name.trim() : "";
  const documentType = typeof r.documentType === "string" ? r.documentType : "";
  const pages = typeof r.pages === "number" ? r.pages : NaN;
  const deadline = typeof r.deadline === "string" ? r.deadline : "";
  const notes = typeof r.notes === "string" ? r.notes.trim() : "";

  if (!name || name.length > 100) return null;
  if (!DOCUMENT_OPTIONS.includes(documentType)) return null;
  if (!Number.isInteger(pages) || pages < 1 || pages > MAX_PAGES) return null;
  if (deadline && !/^\d{4}-\d{2}-\d{2}$/.test(deadline)) return null;
  if (notes.length > MAX_NOTES) return null;
  return { name, documentType, pages, deadline, notes };
}

/** "2026-10-02" → "2 de octubre de 2026" / "October 2, 2026"; read as a calendar date, no time zone shift. */
export function formatDeadline(iso: string, lang: Lang = "es"): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(lang === "en" ? "en-US" : "es", { day: "numeric", month: "long", year: "numeric" });
}
