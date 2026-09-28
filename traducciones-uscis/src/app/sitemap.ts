import type { MetadataRoute } from "next";
import { LEGAL_PAGES } from "@/data/legal";
import { SITE } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    ...LEGAL_PAGES.map((page) => ({ url: `${SITE.url}${page.href}`, changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
