// Everything about the business lives here, so swapping the provisional
// name, contact details or pricing is a single edit. Fields left as null
// are facts the business hasn't confirmed yet — the UI hides or softens
// whatever depends on them instead of showing an invented value.

export interface PriceTier {
  minPages: number;
  perPage: number;
}

export const SITE = {
  name: "Certa Traducciones",
  shortName: "Certa",
  description:
    "Traducciones certificadas del español al inglés para trámites de USCIS: actas, certificados, diplomas y antecedentes, con la declaración del traductor que exige la norma.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://certa.automalytics.com",
  // Automalytics' own WhatsApp number, same default the other demos use.
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "56932954075",
  email: null as string | null,
  // USD per page by order size. The tier the whole order falls in sets the
  // rate for every page. Empty → the site offers a free quote instead.
  priceTiers: [
    { minPages: 1, perPage: 30 },
    { minPages: 5, perPage: 27 },
    { minPages: 10, perPage: 25 },
  ] as readonly PriceTier[],
  // null → turnaround is confirmed when quoting.
  turnaround: "24 a 48 horas" as string | null,
} as const;

export const NAV_LINKS = [
  { label: "Qué exige USCIS", href: "#requisitos" },
  { label: "Documentos", href: "#documentos" },
  { label: "Cómo funciona", href: "#proceso" },
  { label: "Preguntas", href: "#preguntas" },
] as const;
