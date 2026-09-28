// Server-only data prep for the sales summary in /admin. Kept out of the
// component so rendering stays pure: the reference time is read here, once per
// request, not during render.

export interface Sale {
  createdAt: Date;
  amountTotal: number;
  pages: number;
}

export interface SalesPeriod {
  label: string;
  total: number;
  orders: number;
  pages: number;
}

const dayKey = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const DAY_MS = 24 * 60 * 60 * 1000;

function totals(label: string, sales: Sale[]): SalesPeriod {
  return {
    label,
    total: sales.reduce((sum, s) => sum + s.amountTotal, 0),
    orders: sales.length,
    pages: sales.reduce((sum, s) => sum + s.pages, 0),
  };
}

/** Today (New York calendar day), the last 7 days and the last 30. */
export function salesPeriods(sales: Sale[], now: number = Date.now()): SalesPeriod[] {
  const today = dayKey.format(now);
  return [
    totals("Hoy", sales.filter((s) => dayKey.format(s.createdAt) === today)),
    totals("Últimos 7 días", sales.filter((s) => now - s.createdAt.getTime() < 7 * DAY_MS)),
    totals("Últimos 30 días", sales.filter((s) => now - s.createdAt.getTime() < 30 * DAY_MS)),
  ];
}
