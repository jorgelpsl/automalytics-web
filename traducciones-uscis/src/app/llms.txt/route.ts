import { DOCUMENT_PAGES, pageCopy } from "@/data/document-pages";
import { SITE } from "@/data/site";
import { COMMON } from "@/i18n/copy/common";
import { ROUTES, documentPath } from "@/i18n/routes";
import { PRICE_TIERS, formatUsd, tierRange } from "@/lib/pricing";
import { USCIS_TRANSLATION_RULE_URL } from "@/lib/seo";

export const dynamic = "force-static";

// A plain index of the site for AI assistants (llmstxt.org), built from the
// same data as the pages so it never drifts from them.
export function GET() {
  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `Servicio privado, 100% en línea, para clientes en Estados Unidos. No está afiliado a USCIS ni da asesoría legal. La certificación del traductor sigue 8 CFR § 103.2(b)(3): ${USCIS_TRANSLATION_RULE_URL}`,
    "",
    "## Traducciones",
    "",
    ...DOCUMENT_PAGES.map((page) => `- [${page.title}](${SITE.url}${documentPath("es", page.slug)}): ${page.metaDescription}`),
    "",
    "## Precios",
    "",
    ...PRICE_TIERS.map((tier) => `- ${tierRange(tier)}: ${formatUsd(tier.perPage)} por página`),
    ...(SITE.turnaround ? [`- Entrega en ${SITE.turnaround}`] : []),
    `- Comprar en línea: ${SITE.url}/#cotizar`,
    "",
    "## Información",
    "",
    ...COMMON.es.footer.legal.map((page) => `- [${page.label}](${SITE.url}${page.href})`),
    "",
    "## English",
    "",
    `> ${SITE.descriptionEn}`,
    "",
    `Private, 100% online service for customers in the United States. Not affiliated with USCIS and does not give legal advice. The translator's certification follows 8 CFR § 103.2(b)(3): ${USCIS_TRANSLATION_RULE_URL}`,
    "",
    `- [Home](${SITE.url}${ROUTES.home.en})`,
    ...DOCUMENT_PAGES.map((page) => {
      const copy = pageCopy(page, "en");
      return `- [${copy.title}](${SITE.url}${documentPath("en", page.slug)}): ${copy.metaDescription}`;
    }),
    ...PRICE_TIERS.map((tier) => `- ${tierRange(tier, "en")}: ${formatUsd(tier.perPage)} per page`),
    ...(SITE.turnaroundEn ? [`- Delivered in ${SITE.turnaroundEn}`] : []),
    `- Order online: ${SITE.url}/en#cotizar`,
    ...COMMON.en.footer.legal.map((page) => `- [${page.label}](${SITE.url}${page.href})`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
