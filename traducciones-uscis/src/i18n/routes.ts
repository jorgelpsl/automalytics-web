import { type Lang } from "@/i18n/config";
import { englishSlug, spanishSlug } from "@/i18n/slugs";

// Public paths per language. The English routes live under /en with English
// names, so the URLs read naturally and search engines see the keywords.
export const ROUTES = {
  home: { es: "/", en: "/en" },
  terms: { es: "/terminos", en: "/en/terms" },
  privacy: { es: "/privacidad", en: "/en/privacy" },
  refunds: { es: "/reembolsos", en: "/en/refunds" },
  paymentReceived: { es: "/pago-recibido", en: "/en/payment-received" },
} as const;

/** "/#cotizar" or "/en#cotizar": a home-page section in the given language. */
export function homeSection(lang: Lang, id: string): string {
  return `${ROUTES.home[lang]}#${id}`;
}

/** Path of a document page, from its Spanish slug. */
export function documentPath(lang: Lang, slugEs: string): string {
  if (lang === "es") return `/traduccion/${slugEs}`;
  return `/en/translation/${englishSlug(slugEs) ?? slugEs}`;
}

export function langOfPath(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

/** The same page in the other language; home when it has no counterpart. */
export function counterpartPath(pathname: string, to: Lang): string {
  const path = pathname.replace(/\/+$/, "") || "/";
  const from = langOfPath(path);
  if (from === to) return path;

  for (const route of Object.values(ROUTES)) {
    if (route[from] === path) return route[to];
  }

  if (from === "es") {
    const slug = /^\/traduccion\/([^/]+)$/.exec(path)?.[1];
    const en = slug && englishSlug(slug);
    if (en) return `/en/translation/${en}`;
  } else {
    const slug = /^\/en\/translation\/([^/]+)$/.exec(path)?.[1];
    const es = slug && spanishSlug(slug);
    if (es) return `/traduccion/${es}`;
  }
  return ROUTES.home[to];
}
