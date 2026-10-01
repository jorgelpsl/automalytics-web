import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { PRICE_TIERS, tierRange } from "@/lib/pricing";

// The regulation every page quotes, at the paragraph that sets the rule.
export const USCIS_TRANSLATION_RULE_URL =
  "https://www.ecfr.gov/current/title-8/chapter-I/subchapter-B/part-103/section-103.2#p-103.2(b)(3)";

const SHARE_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Certa Traducciones: traducciones certificadas para USCIS, junto a un certificado de nacimiento en español y su traducción certificada al inglés.",
};

/**
 * A page's own title, description, canonical and share tags. A page that sets
 * openGraph replaces the layout's whole block, so the share image is named
 * here again instead of being lost.
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = `${SITE.url}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url, siteName: SITE.name, locale: "es_US", type: "website", images: [SHARE_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [SHARE_IMAGE] },
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
export function offerNodes(url: string) {
  return PRICE_TIERS.map((tier) => ({
    "@type": "Offer",
    priceCurrency: "USD",
    price: tier.perPage,
    description: `${tierRange(tier)}, precio por página`,
    url,
    availability: "https://schema.org/InStock",
  }));
}
