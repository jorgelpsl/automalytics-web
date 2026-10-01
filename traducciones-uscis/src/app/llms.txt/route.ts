import { DOCUMENT_PAGES } from "@/data/document-pages";
import { LEGAL_PAGES } from "@/data/legal";
import { SITE } from "@/data/site";
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
    ...DOCUMENT_PAGES.map((page) => `- [${page.title}](${SITE.url}/traduccion/${page.slug}): ${page.metaDescription}`),
    "",
    "## Precios",
    "",
    ...PRICE_TIERS.map((tier) => `- ${tierRange(tier)}: ${formatUsd(tier.perPage)} por página`),
    ...(SITE.turnaround ? [`- Entrega en ${SITE.turnaround}`] : []),
    `- Comprar en línea: ${SITE.url}/#cotizar`,
    "",
    "## Información",
    "",
    ...LEGAL_PAGES.map((page) => `- [${page.label}](${SITE.url}${page.href})`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
