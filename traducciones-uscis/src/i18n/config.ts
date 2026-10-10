// The site is published in Spanish at the root and in English under /en. Spanish
// stays the default: most visitors come from Spanish-language ads, and many of
// them use phones set to English, so the browser language can't pick the page.

export const LANGS = ["es", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "es";

/** BCP 47 tags for hreflang and structured data. */
export const HREFLANG: Record<Lang, string> = { es: "es-US", en: "en-US" };
/** Open Graph locale codes. */
export const OG_LOCALE: Record<Lang, string> = { es: "es_US", en: "en_US" };

/** Values stored in orders and sent to the checkout API are always Spanish. */
export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}
