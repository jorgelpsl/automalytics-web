import { type Lang } from "@/i18n/config";
import { ROUTES } from "@/i18n/routes";

// Copy shared by every page: header, menu, footer, the language switch.

export interface CommonCopy {
  nav: { label: string; href: string }[];
  header: { skip: string; homeAria: string; navAria: string; buy: string; openMenu: string; closeMenu: string; menu: string };
  footer: {
    disclaimer: string;
    sections: string;
    contact: string;
    whatsapp: string;
    legalAria: string;
    legal: { href: string; label: string }[];
  };
  language: {
    groupAria: string;
    es: { label: string; aria: string };
    en: { label: string; aria: string };
  };
  /** Offered in this language, on a page in the other one: copy[target].suggestion. */
  suggestion: { text: string; action: string; dismiss: string };
}

export const COMMON: Record<Lang, CommonCopy> = {
  es: {
    nav: [
      { label: "Qué exige USCIS", href: "/#requisitos" },
      { label: "Documentos", href: "/#documentos" },
      { label: "Cómo funciona", href: "/#proceso" },
      { label: "Preguntas", href: "/#preguntas" },
    ],
    header: {
      skip: "Saltar al contenido",
      homeAria: "{name}, inicio",
      navAria: "Navegación principal",
      buy: "Comprar traducción",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      menu: "Menú",
    },
    footer: {
      disclaimer:
        "Servicio privado de traducción. No estamos afiliados a USCIS ni al gobierno de Estados Unidos, y no damos asesoría legal migratoria.",
      sections: "Secciones",
      contact: "Contacto",
      whatsapp: "WhatsApp",
      legalAria: "Legal",
      legal: [
        { href: ROUTES.terms.es, label: "Términos del servicio" },
        { href: ROUTES.refunds.es, label: "Política de reembolsos" },
        { href: ROUTES.privacy.es, label: "Política de privacidad" },
      ],
    },
    language: {
      groupAria: "Idioma / Language",
      es: { label: "ES", aria: "Español" },
      en: { label: "EN", aria: "English" },
    },
    suggestion: { text: "Esta página también está en español.", action: "Ver en español", dismiss: "Cerrar aviso" },
  },
  en: {
    nav: [
      { label: "What USCIS requires", href: "/en#requisitos" },
      { label: "Documents", href: "/en#documentos" },
      { label: "How it works", href: "/en#proceso" },
      { label: "FAQ", href: "/en#preguntas" },
    ],
    header: {
      skip: "Skip to content",
      homeAria: "{name}, home",
      navAria: "Main navigation",
      buy: "Order translation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      menu: "Menu",
    },
    footer: {
      disclaimer:
        "Private translation service. We are not affiliated with USCIS or the U.S. government, and we do not give immigration legal advice.",
      sections: "Sections",
      contact: "Contact",
      whatsapp: "WhatsApp",
      legalAria: "Legal",
      legal: [
        { href: ROUTES.terms.en, label: "Terms of service" },
        { href: ROUTES.refunds.en, label: "Refund policy" },
        { href: ROUTES.privacy.en, label: "Privacy policy" },
      ],
    },
    language: {
      groupAria: "Idioma / Language",
      es: { label: "ES", aria: "Español" },
      en: { label: "EN", aria: "English" },
    },
    suggestion: { text: "This page is also available in English.", action: "View in English", dismiss: "Dismiss" },
  },
};

/** Replaces {placeholders} in a copy string. */
export function fmt(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}
