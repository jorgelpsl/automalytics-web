import { SITE, type PriceTier } from "@/data/site";
import { type Lang } from "@/i18n/config";

// US-style amounts ("$15"): the audience pays in dollars from the US.
export function formatUsd(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

export const PRICE_TIERS = [...SITE.priceTiers].sort((a, b) => a.minPages - b.minPages);

export function tierFor(pages: number): PriceTier | null {
  return PRICE_TIERS.filter((tier) => pages >= tier.minPages).at(-1) ?? null;
}

export function estimateFor(pages: number): number | null {
  const tier = tierFor(pages);
  return tier ? tier.perPage * pages : null;
}

// "1 a 4 páginas", "10 o más páginas" / "1 to 4 pages", "10 or more pages"
export function tierRange(tier: PriceTier, lang: Lang = "es"): string {
  const next = PRICE_TIERS[PRICE_TIERS.indexOf(tier) + 1];
  if (lang === "en") {
    if (!next) return `${tier.minPages} or more pages`;
    const last = next.minPages - 1;
    return last === tier.minPages ? `${last} ${last === 1 ? "page" : "pages"}` : `${tier.minPages} to ${last} pages`;
  }
  if (!next) return `${tier.minPages} o más páginas`;
  const last = next.minPages - 1;
  return last === tier.minPages ? `${last} ${last === 1 ? "página" : "páginas"}` : `${tier.minPages} a ${last} páginas`;
}
