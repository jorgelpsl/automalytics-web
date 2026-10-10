import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { HREFLANG, OG_LOCALE, type Lang } from "@/i18n/config";
import { PRICE_TIERS, tierRange } from "@/lib/pricing";

// The regulation every page quotes, at the paragraph that sets the rule.
export const USCIS_TRANSLATION_RULE_URL =
  "https://www.ecfr.gov/current/title-8/chapter-I/subchapter-B/part-103/section-103.2#p-103.2(b)(3)";

const SHARE_IMAGE_ALT: Record<Lang, string> = {
  es: "Certa Traducciones: traducciones certificadas para USCIS, junto a un certificado de nacimiento en español y su traducción certificada al inglés.",
  en: "Certa Traducciones: certified translations for USCIS, showing a birth certificate in Spanish next to its certified English translation.",
};

function shareImage(lang: Lang) {
  return { url: "/opengraph-image.png", width: 1200, height: 630, alt: SHARE_IMAGE_ALT[lang] };
}

/** hreflang links for a page that exists in both languages; x-default is Spanish. */
export function languageAlternates(alternates: Record<Lang, string>) {
  return {
    [HREFLANG.es]: alternates.es,
    [HREFLANG.en]: alternates.en,
    "x-default": alternates.es,
  };
}

/**
 * A page's own title, description, canonical and share tags. A page that sets
 * openGraph replaces the layout's whole block, so the share image is named
 * here again instead of being lost. `alternates` lists the same page's path in
 * each language; pages without a counterpart omit it.
 */
export function pageMetadata({
  title,
  description,
  path,
  lang = "es",
  alternates,
}: {
  title: string;
  description: string;
  path: string;
  lang?: Lang;
  alternates?: Record<Lang, string>;
}): Metadata {
  const url = `${SITE.url}${path === "/" ? "" : path}`;
  const image = shareImage(lang);
  return {
    title,
    description,
    alternates: { canonical: path, ...(alternates ? { languages: languageAlternates(alternates) } : {}) },
    openGraph: { title, description, url, siteName: SITE.name, locale: OG_LOCALE[lang], type: "website", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

/** The layout-level defaults of a language's pages. */
export function rootMetadata(lang: Lang): Metadata {
  const title =
    lang === "en" ? `Certified Translations for USCIS | ${SITE.name}` : `Traducciones certificadas para USCIS | ${SITE.name}`;
  const description = lang === "en" ? SITE.descriptionEn : SITE.description;
  const home = lang === "en" ? "/en" : "/";
  return {
    metadataBase: new URL(SITE.url),
    title,
    description,
    alternates: { canonical: home },
    // The share image is named here because the file-based one at the app root
    // does not reach pages in a language layout.
    openGraph: {
      title,
      description,
      url: `${SITE.url}${lang === "en" ? "/en" : ""}`,
      siteName: SITE.name,
      locale: OG_LOCALE[lang],
      type: "website",
      images: [shareImage(lang)],
    },
    twitter: { card: "summary_large_image", title, description, images: [shareImage(lang)] },
  };
}

export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;

// The same properties wherever the organization appears, so search engines
// read one consistent entity.
export function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${SITE.whatsappNumber}`,
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: ["Spanish", "English"],
    },
  };
}

/** The published per-page prices, orderable online at `url`. */
export function offerNodes(url: string, lang: Lang = "es") {
  return PRICE_TIERS.map((tier) => ({
    "@type": "Offer",
    priceCurrency: "USD",
    price: tier.perPage,
    description: lang === "en" ? `${tierRange(tier, "en")}, price per page` : `${tierRange(tier)}, precio por página`,
    url,
    availability: "https://schema.org/InStock",
  }));
}
