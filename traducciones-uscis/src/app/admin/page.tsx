import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FileText, MessageCircle } from "lucide-react";
import { isAdmin } from "@/lib/admin-auth";
import { listOrderFiles, type StoredFile } from "@/lib/documents";
import { adminEnabled } from "@/lib/features";
import { formatUsd } from "@/lib/pricing";
import { listPaidOrders, type PaidOrder } from "@/lib/stripe";
import { login, logout } from "./actions";

export const metadata: Metadata = {
  title: "Pedidos",
  robots: { index: false, follow: false },
};

const dateTime = new Intl.DateTimeFormat("es", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/New_York",
});

function formatSize(bytes: number): string {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function whatsappLink(phone: string): string {
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (!adminEnabled()) notFound();
  const { error } = await searchParams;

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

  let orders: { order: PaidOrder; files: StoredFile[] }[] = [];
  let loadError = false;
  try {
    const paid = await listPaidOrders(50);
    orders = await Promise.all(paid.map(async (order) => ({ order, files: await listOrderFiles(order.code) })));
  } catch (err) {
    console.error(err);
    loadError = true;
  }
  const waiting = orders.filter((o) => o.files.length === 0).length;

  return (
    <section className="section flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-medium tracking-tight">Pedidos</h1>
          {!loadError && (
            <p className="mt-2 text-ink-soft">
              {orders.length} pagados en total
              {waiting > 0 ? ` · ${waiting} ${waiting === 1 ? "espera" : "esperan"} documentos` : ""}. Horario de Nueva York.
            </p>
          )}
        </div>
        <form action={logout}>
          <button type="submit" className="btn-secondary">
            Cerrar sesión
          </button>
        </form>
      </div>

      {loadError && (
        <p role="alert" className="rounded-card border border-red-700/30 bg-paper-sheet p-6 text-red-700">
          No pudimos cargar los pedidos desde Stripe o el almacenamiento. Recarga la página en un momento; si sigue igual,
          revisa que STRIPE_SECRET_KEY y el Blob store estén conectados en Vercel.
        </p>
      )}

      {!loadError && orders.length === 0 && (
        <p className="rounded-card border border-line bg-paper-sheet p-6 text-ink-soft">
          Todavía no hay pedidos pagados. Cuando alguien pague desde la web aparecerá aquí, con sus documentos.
        </p>
      )}

      <ol className="flex flex-col gap-4">
        {orders.map(({ order, files }) => (
          <li key={order.sessionId} className="grid gap-5 rounded-card border border-line bg-paper-sheet p-5 sm:p-6 lg:grid-cols-[1fr_1fr]">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-display text-2xl font-medium">{order.code}</span>
                <span className="text-sm text-ink-muted">{dateTime.format(order.createdAt)}</span>
                <span
                  className={`rounded-soft px-2 py-0.5 text-sm font-medium ${
                    files.length ? "bg-paper-alt text-ink-soft" : "bg-marker/60 text-ink"
                  }`}
                >
                  {files.length ? `${files.length} ${files.length === 1 ? "archivo" : "archivos"}` : "Sin documentos"}
                </span>
              </div>
              <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 text-[15px] tabular-nums">
                <dt className="text-ink-muted">Cliente</dt>
                <dd className="font-medium">{order.name}</dd>
                <dt className="text-ink-muted">Documento</dt>
                <dd>{order.documentType}</dd>
                <dt className="text-ink-muted">Páginas</dt>
                <dd>
                  {order.pages} · {formatUsd(order.amountTotal)}
                </dd>
                {order.deadline && (
                  <>
                    <dt className="text-ink-muted">Para el</dt>
                    <dd>{order.deadline}</dd>
                  </>
                )}
                {order.notes && (
                  <>
                    <dt className="text-ink-muted">Comentarios</dt>
                    <dd>{order.notes}</dd>
                  </>
                )}
                {order.email && (
                  <>
                    <dt className="text-ink-muted">Correo</dt>
                    <dd className="break-all">
                      <a href={`mailto:${order.email}`} className="underline underline-offset-4">
                        {order.email}
                      </a>
                    </dd>
                  </>
                )}
                {order.phone && (
                  <>
                    <dt className="text-ink-muted">Teléfono</dt>
                    <dd>
                      <a href={whatsappLink(order.phone)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 underline underline-offset-4">
                        <MessageCircle size={15} aria-hidden="true" />
                        {order.phone}
                      </a>
                    </dd>
                  </>
                )}
              </dl>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-ink-muted">Documentos</p>
              {files.length ? (
                <ul className="flex flex-col divide-y divide-line rounded-soft border border-line">
                  {files.map((file) => (
                    <li key={file.pathname}>
                      <a
                        href={`/api/admin/file?p=${encodeURIComponent(file.pathname)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-[44px] items-center gap-3 px-3 py-2 hover:bg-paper-alt"
                      >
                        <FileText size={18} aria-hidden="true" className="shrink-0 text-ink-muted" />
                        <span className="min-w-0 flex-1 truncate">{file.name}</span>
                        <span className="shrink-0 text-sm text-ink-muted">{formatSize(file.size)}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[15px] leading-relaxed text-ink-soft">
                  El cliente todavía no sube nada. Puede hacerlo desde el enlace de su confirmación de pago, o escríbele
                  para recordárselo.
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
