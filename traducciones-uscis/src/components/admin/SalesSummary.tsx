import { ArrowUpRight } from "lucide-react";
import { formatUsd } from "@/lib/pricing";
import type { SalesPeriod } from "@/lib/sales";

// What came in, in the windows the owner actually checks. Amounts are what
// Stripe charged, before its fees and any refunds made in the Stripe dashboard.
export function SalesSummary({ periods, truncated }: { periods: SalesPeriod[]; truncated: boolean }) {
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
