import { SITE, type PriceTier } from "@/data/site";

export const PRICE_TIERS = [...SITE.priceTiers].sort((a, b) => a.minPages - b.minPages);

export function tierFor(pages: number): PriceTier | null {
  return PRICE_TIERS.filter((tier) => pages >= tier.minPages).at(-1) ?? null;
}

export function estimateFor(pages: number): number | null {
  const tier = tierFor(pages);
  return tier ? tier.perPage * pages : null;
}

// "1 a 4 páginas", "10 o más páginas"
export function tierRange(tier: PriceTier): string {
  const next = PRICE_TIERS[PRICE_TIERS.indexOf(tier) + 1];
  if (!next) return `${tier.minPages} o más páginas`;
  const last = next.minPages - 1;
  return last === tier.minPages ? `${last} ${last === 1 ? "página" : "páginas"}` : `${tier.minPages} a ${last} páginas`;
}
