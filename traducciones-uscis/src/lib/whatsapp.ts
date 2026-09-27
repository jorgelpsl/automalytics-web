import { SITE } from "@/data/site";

function buildWhatsAppUrl(message: string): string {
  const digits = SITE.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function generalWhatsAppUrl(): string {
  return buildWhatsAppUrl("Hola, quiero cotizar una traducción certificada para USCIS.");
}

export interface QuoteRequest {
  name: string;
  documentType: string;
  pages: number;
  deadline: string;
  notes: string;
}

export function quoteWhatsAppUrl(q: QuoteRequest): string {
  const lines = [
    "Hola, quiero cotizar una traducción certificada para USCIS.",
    `Nombre: ${q.name}`,
    `Documento: ${q.documentType}`,
    `Páginas: ${q.pages}`,
  ];
  if (q.deadline) lines.push(`Lo necesito para: ${q.deadline}`);
  if (q.notes.trim()) lines.push(`Comentarios: ${q.notes.trim()}`);
  lines.push("Te envío las fotos del documento por aquí.");
  return buildWhatsAppUrl(lines.join("\n"));
}
