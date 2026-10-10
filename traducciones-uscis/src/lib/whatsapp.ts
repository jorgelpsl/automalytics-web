import { SITE } from "@/data/site";
import { type Lang } from "@/i18n/config";

function buildWhatsAppUrl(message: string): string {
  const digits = SITE.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function generalWhatsAppUrl(lang: Lang = "es"): string {
  return buildWhatsAppUrl(
    lang === "en"
      ? "Hi, I'd like a quote for a certified translation for USCIS."
      : "Hola, quiero cotizar una traducción certificada para USCIS.",
  );
}

// Opening line for the floating button. When the visitor is on a document page
// it names that document ("acta de nacimiento"); the wording stays neutral
// about whose document it is, since the gender and owner vary.
export function floatingWhatsAppUrl(documentName?: string, lang: Lang = "es"): string {
  if (lang === "en") {
    const detail = documentName ? ` (${documentName})` : "";
    return buildWhatsAppUrl(`Hi, I'd like to translate a document into English for USCIS${detail}. Can you help me?`);
  }
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

export function quoteWhatsAppUrl(q: QuoteRequest, lang: Lang = "es"): string {
  if (lang === "en") {
    const lines = [
      "Hi, I'd like a quote for a certified translation for USCIS.",
      `Name: ${q.name}`,
      `Document: ${q.documentType}`,
      `Pages: ${q.pages}`,
    ];
    if (q.deadline) lines.push(`I need it by: ${q.deadline}`);
    if (q.notes.trim()) lines.push(`Comments: ${q.notes.trim()}`);
    lines.push("I'll send you photos of the document here.");
    return buildWhatsAppUrl(lines.join("\n"));
  }
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

export function paidOrderWhatsAppUrl(
  o: { code: string; name: string; documentType: string; pages: number },
  lang: Lang = "es",
): string {
  if (lang === "en") {
    const lines = [
      `Hi, I already paid for my translation. Order ${o.code}.`,
      o.name && `Name: ${o.name}`,
      o.documentType && `Document: ${o.documentType}`,
      o.pages > 0 && `Pages: ${o.pages}`,
      "I'll send you photos of the document here.",
    ].filter(Boolean);
    return buildWhatsAppUrl(lines.join("\n"));
  }
  const lines = [
    `Hola, ya pagué mi traducción. Pedido ${o.code}.`,
    o.name && `Nombre: ${o.name}`,
    o.documentType && `Documento: ${o.documentType}`,
    o.pages > 0 && `Páginas: ${o.pages}`,
    "Te envío las fotos del documento por aquí.",
  ].filter(Boolean);
  return buildWhatsAppUrl(lines.join("\n"));
}
