import type { MetadataRoute } from "next";
import { DOCUMENT_PAGES } from "@/data/document-pages";
import { LEGAL_UPDATED_ISO } from "@/data/legal";
import { SITE } from "@/data/site";
import { HREFLANG, LANGS } from "@/i18n/config";
import { ROUTES, documentPath } from "@/i18n/routes";

// Bump these only when the pages' content actually changes; search engines
// stop trusting lastmod dates that move without a reason.
const PAGES_UPDATED = new Date("2026-10-01");
const LEGAL_UPDATED_ON = new Date(LEGAL_UPDATED_ISO);

type Entry = MetadataRoute.Sitemap[number];

// Every page exists in both languages, so each URL lists its counterpart.
function bilingual(paths: { es: string; en: string }, fields: Pick<Entry, "lastModified" | "changeFrequency" | "priority">): Entry[] {
  const url = (path: string) => (path === "/" ? SITE.url : `${SITE.url}${path}`);
  const languages = {
    [HREFLANG.es]: url(paths.es),
    [HREFLANG.en]: url(paths.en),
    "x-default": url(paths.es),
  };
  return LANGS.map((lang) => ({ url: url(paths[lang]), ...fields, alternates: { languages } }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const monthly = { lastModified: PAGES_UPDATED, changeFrequency: "monthly" as const };
  const legal = { lastModified: LEGAL_UPDATED_ON, changeFrequency: "yearly" as const, priority: 0.3 };
  return [
    ...bilingual(ROUTES.home, { ...monthly, priority: 1 }),
    ...DOCUMENT_PAGES.flatMap((page) =>
      bilingual({ es: documentPath("es", page.slug), en: documentPath("en", page.slug) }, { ...monthly, priority: 0.8 }),
    ),
    ...bilingual(ROUTES.terms, legal),
    ...bilingual(ROUTES.refunds, legal),
    ...bilingual(ROUTES.privacy, legal),
  ];
}
