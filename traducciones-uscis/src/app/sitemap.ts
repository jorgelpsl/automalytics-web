import type { MetadataRoute } from "next";
import { DOCUMENT_PAGES } from "@/data/document-pages";
import { LEGAL_PAGES, LEGAL_UPDATED_ISO } from "@/data/legal";
import { SITE } from "@/data/site";

// Bump these only when the pages' content actually changes; search engines
// stop trusting lastmod dates that move without a reason.
const PAGES_UPDATED = new Date("2026-10-01");
const LEGAL_UPDATED_ON = new Date(LEGAL_UPDATED_ISO);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, lastModified: PAGES_UPDATED, changeFrequency: "monthly", priority: 1 },
    ...DOCUMENT_PAGES.map((page) => ({
      url: `${SITE.url}/traduccion/${page.slug}`,
      lastModified: PAGES_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...LEGAL_PAGES.map((page) => ({
      url: `${SITE.url}${page.href}`,
      lastModified: LEGAL_UPDATED_ON,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
