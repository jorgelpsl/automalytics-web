import { ArrowUpRight } from "lucide-react";
import { formatUsd } from "@/lib/pricing";

export interface Sale {
  createdAt: Date;
  amountTotal: number;
  pages: number;
}

const TZ = "America/New_York";
const dayKey = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" });
const DAY_MS = 24 * 60 * 60 * 1000;

function summarize(sales: Sale[]) {
  return {
    total: sales.reduce((sum, s) => sum + s.amountTotal, 0),
    orders: sales.length,
    pages: sales.reduce((sum, s) => sum + s.pages, 0),
  };
}

// What came in, in three windows the owner actually checks: today (New York
// calendar day), the last 7 days and the last 30. Amounts are what Stripe
// charged, before its fees and any refunds made in the Stripe dashboard.
export function SalesSummary({ sales, truncated }: { sales: Sale[]; truncated: boolean }) {
  const now = Date.now();
  const today = dayKey.format(now);
  const periods = [
    { label: "Hoy", ...summarize(sales.filter((s) => dayKey.format(s.createdAt) === today)) },
    { label: "Últimos 7 días", ...summarize(sales.filter((s) => now - s.createdAt.getTime() < 7 * DAY_MS)) },
    { label: "Últimos 30 días", ...summarize(sales.filter((s) => now - s.createdAt.getTime() < 30 * DAY_MS)) },
  ];

  return (
    <section aria-labelledby="ventas-title" className="flex flex-col gap-3">
      <h2 id="ventas-title" className="text-sm font-medium text-ink-muted">
        Ventas
      </h2>
      <dl className="grid divide-y divide-line rounded-card border border-line bg-paper-sheet sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {periods.map((p) => (
          <div key={p.label} className="flex flex-col gap-1 p-5">
            <dt className="text-sm text-ink-muted">{p.label}</dt>
            <dd className="font-display text-3xl font-medium tabular-nums">{formatUsd(p.total)}</dd>
            <dd className="text-sm tabular-nums text-ink-soft">
              {p.orders} {p.orders === 1 ? "pedido" : "pedidos"} · {p.pages} {p.pages === 1 ? "página" : "páginas"}
            </dd>
          </div>
        ))}
      </dl>
      <p className="text-sm text-ink-muted">
        Lo cobrado en Stripe, antes de comisiones y reembolsos.
        {truncated ? " Solo cuenta los últimos 100 pedidos." : ""}{" "}
        <a
          href="https://dashboard.stripe.com/payments"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 font-medium text-ink underline underline-offset-4"
        >
          Ver en Stripe
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </p>
    </section>
  );
}
