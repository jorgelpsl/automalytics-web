import { SITE } from "@/data/site";

function buildWhatsAppUrl(message: string): string {
  const digits = SITE.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function generalWhatsAppUrl(): string {
  return buildWhatsAppUrl("Hola, quiero cotizar una traducción certificada para USCIS.");
}

// Opening line for the floating button. When the visitor is on a document page
// it names that document ("acta de nacimiento"); the wording stays neutral
// about whose document it is, since the gender and owner vary.
export function floatingWhatsAppUrl(documentName?: string): string {
  const detail = documentName ? ` (${documentName})` : "";
  return buildWhatsAppUrl(`Hola, quiero traducir un documento al inglés para USCIS${detail}. ¿Me pueden ayudar?`);
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

export function paidOrderWhatsAppUrl(o: { code: string; name: string; documentType: string; pages: number }): string {
  const lines = [
    `Hola, ya pagué mi traducción. Pedido ${o.code}.`,
    o.name && `Nombre: ${o.name}`,
    o.documentType && `Documento: ${o.documentType}`,
    o.pages > 0 && `Páginas: ${o.pages}`,
    "Te envío las fotos del documento por aquí.",
  ].filter(Boolean);
  return buildWhatsAppUrl(lines.join("\n"));
}
