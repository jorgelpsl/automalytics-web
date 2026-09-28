import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OrderCard } from "@/components/admin/OrderCard";
import type { AdminFile, AdminOrder } from "@/components/admin/types";
import { isAdmin } from "@/lib/admin-auth";
import { listOrderFiles } from "@/lib/documents";
import { adminEnabled } from "@/lib/features";
import { applyRecord, readOrderRecords } from "@/lib/order-store";
import { listPaidOrders } from "@/lib/stripe";
import { login, logout } from "./actions";

export const metadata: Metadata = {
  title: "Pedidos",
  robots: { index: false, follow: false },
};

type Filter = "en_proceso" | "completado" | "todos";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "en_proceso", label: "En proceso" },
  { key: "completado", label: "Completados" },
  { key: "todos", label: "Todos" },
];

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string; ver?: string }> }) {
  if (!adminEnabled()) notFound();
  const { error, ver } = await searchParams;

  if (!(await isAdmin())) {
    return (
      <section className="section">
        <form action={login} className="mx-auto flex max-w-sm flex-col gap-4 rounded-card border border-line bg-paper-sheet p-6 sm:p-8">
          <h1 className="font-display text-3xl font-medium">Pedidos</h1>
          <label htmlFor="admin-password" className="text-[15px] font-medium">
            Contraseña
          </label>
          <input
            id="admin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "admin-error" : undefined}
            className="block min-h-[48px] w-full rounded-soft border border-ink/25 bg-paper-sheet px-4 text-base focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          />
          {error && (
            <p id="admin-error" className="text-sm text-red-700">
              Contraseña incorrecta. Es la que guardaste como ADMIN_PASSWORD en Vercel.
            </p>
          )}
          <button type="submit" className="btn-primary">
            Entrar
          </button>
        </form>
      </section>
    );
  }

  let orders: { order: AdminOrder; files: AdminFile[] }[] = [];
  let loadError = false;
  try {
    const [paid, records] = await Promise.all([listPaidOrders(100), readOrderRecords()]);
    const visible = paid.map((p) => applyRecord(p, records[p.code])).filter((o) => !o.deleted);
    orders = await Promise.all(
      visible.map(async (o) => ({
        order: {
          code: o.code,
          createdAt: o.createdAt.toISOString(),
          amountTotal: o.amountTotal,
          name: o.name,
          documentType: o.documentType,
          pages: o.pages,
          pagesPaid: o.pagesPaid,
          deadline: o.deadline,
          notes: o.notes,
          email: o.email,
          phone: o.phone,
          status: o.status,
          edited: o.edited,
          completedAt: o.completedAt,
          purgedAt: o.purgedAt,
        },
        files: (await listOrderFiles(o.code)).map(({ pathname, name, size, pages }) => ({ pathname, name, size, pages })),
      })),
    );
  } catch (err) {
    console.error(err);
    loadError = true;
  }

  const counts = {
    en_proceso: orders.filter((o) => o.order.status === "en_proceso").length,
    completado: orders.filter((o) => o.order.status === "completado").length,
    todos: orders.length,
  };
  const filter: Filter = ver === "completado" || ver === "todos" ? ver : "en_proceso";
  const shown = filter === "todos" ? orders : orders.filter((o) => o.order.status === filter);
  const waitingDocs = orders.filter((o) => o.order.status === "en_proceso" && o.files.reduce((n, f) => n + f.pages, 0) < o.order.pages).length;

  return (
    <section className="section flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-medium tracking-tight">Pedidos</h1>
          {!loadError && (
            <p className="mt-2 text-ink-soft">
              {counts.en_proceso} en proceso
              {waitingDocs > 0 ? `, ${waitingDocs} ${waitingDocs === 1 ? "espera" : "esperan"} documentos` : ""}. Horario de
              Nueva York.
            </p>
          )}
        </div>
        <form action={logout}>
          <button type="submit" className="btn-secondary">
            Cerrar sesión
          </button>
        </form>
      </div>

      {!loadError && (
        <nav aria-label="Filtrar pedidos" className="-mt-2 flex flex-wrap gap-2">
          {FILTERS.map(({ key, label }) => (
            <Link
              key={key}
              href={key === "en_proceso" ? "/admin" : `/admin?ver=${key}`}
              aria-current={filter === key ? "page" : undefined}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-soft border px-4 text-[15px] font-medium ${
                filter === key ? "border-ink bg-ink text-paper" : "border-ink/25 text-ink hover:border-ink"
              }`}
            >
              {label}
              <span className={`tabular-nums ${filter === key ? "text-paper/70" : "text-ink-muted"}`}>{counts[key]}</span>
            </Link>
          ))}
        </nav>
      )}

      {loadError && (
        <p role="alert" className="rounded-card border border-red-700/30 bg-paper-sheet p-6 text-red-700">
          No pudimos cargar los pedidos desde Stripe o el almacenamiento. Recarga la página en un momento; si sigue igual,
          revisa que STRIPE_SECRET_KEY y el Blob store estén conectados en Vercel.
        </p>
      )}

      {!loadError && shown.length === 0 && (
        <p className="rounded-card border border-line bg-paper-sheet p-6 text-ink-soft">
          {orders.length === 0
            ? "Todavía no hay pedidos pagados. Cuando alguien pague desde la web aparecerá aquí, con sus documentos."
            : filter === "completado"
              ? "Todavía no marcas ningún pedido como completado."
              : "No hay pedidos en proceso. Todo al día."}
        </p>
      )}

      <ol className="flex flex-col gap-4">
        {shown.map(({ order, files }) => (
          <OrderCard key={order.code} order={order} files={files} />
        ))}
      </ol>
    </section>
  );
}
