import type { MetadataRoute } from "next";
import { DOCUMENT_PAGES } from "@/data/document-pages";
import { LEGAL_PAGES } from "@/data/legal";
import { SITE } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    ...DOCUMENT_PAGES.map((page) => ({
      url: `${SITE.url}/traduccion/${page.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...LEGAL_PAGES.map((page) => ({ url: `${SITE.url}${page.href}`, changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
