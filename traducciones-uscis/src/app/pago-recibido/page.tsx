import type { Metadata } from "next";
import { after } from "next/server";
import Link from "next/link";
import { Check, MessageCircle } from "lucide-react";
import { DocumentUpload } from "@/components/DocumentUpload";
import { SITE } from "@/data/site";
import { listOrderFiles } from "@/lib/documents";
import { uploadsEnabled } from "@/lib/features";
import { notifySale } from "@/lib/notify";
import { applyRecord, readOrderRecords, type OrderRecord } from "@/lib/order-store";
import { formatUsd } from "@/lib/pricing";
import { getPaidOrder } from "@/lib/stripe";
import { generalWhatsAppUrl, paidOrderWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: `Pago recibido | ${SITE.name}`,
  alternates: { canonical: "/pago-recibido" },
  robots: { index: false, follow: false },
};

export default async function PaymentReceivedPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const payment = session_id ? await getPaidOrder(session_id) : null;
  const records: Record<string, OrderRecord> =
    payment?.paid && uploadsEnabled() ? await readOrderRecords().catch(() => ({})) : {};
  const order = payment?.paid ? applyRecord(payment, records[payment.code]) : payment;
  const cancelled = Boolean(order && "deleted" in order && order.deleted);
  const canUpload = Boolean(order?.paid) && !cancelled && uploadsEnabled();
  const storedFiles = canUpload ? await listOrderFiles(order!.code).catch(() => []) : [];
  if (order?.paid && !cancelled) {
    after(() => notifySale(order).catch((err) => console.error(err)));
  }

  if (cancelled) {
    return (
      <section className="section">
        <div className="mx-auto flex max-w-2xl flex-col gap-6 rounded-card border border-line bg-paper-sheet p-6 sm:p-10">
          <h1 className="font-display text-4xl font-medium leading-[1.1] tracking-tight">Este pedido fue cancelado.</h1>
          <p className="leading-relaxed text-ink-soft">
            El pedido {order!.code} ya no acepta documentos. Si crees que es un error, escríbenos por WhatsApp con ese número.
          </p>
          <a href={generalWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary self-start">
            <MessageCircle size={19} aria-hidden="true" />
            Escribir por WhatsApp
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="mx-auto flex max-w-2xl flex-col gap-6 rounded-card border border-line bg-paper-sheet p-6 sm:p-10">
        {order?.paid ? (
          <>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-marker text-ink">
              <Check size={24} strokeWidth={2.6} aria-hidden="true" />
            </span>
            <h1 className="font-display text-4xl font-medium leading-[1.1] tracking-tight">Pago recibido.</h1>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-y border-line py-4 text-[15px] tabular-nums">
              <dt className="text-ink-muted">Pedido</dt>
              <dd className="font-medium">{order.code}</dd>
              <dt className="text-ink-muted">Documento</dt>
              <dd>{order.documentType}</dd>
              <dt className="text-ink-muted">Páginas</dt>
              <dd>{order.pages}</dd>
              <dt className="text-ink-muted">Total pagado</dt>
              <dd className="font-medium">{formatUsd(order.amountTotal)}</dd>
            </dl>
            {canUpload ? (
              <DocumentUpload
                sessionId={order.sessionId}
                orderCode={order.code}
                pagesPaid={order.pages}
                initialFiles={storedFiles.map((f) => ({ pathname: f.pathname, name: f.name, size: f.size, pages: f.pages }))}
                turnaround={SITE.turnaround}
                whatsappUrl={paidOrderWhatsAppUrl(order)}
              />
            ) : (
              <>
                <p className="leading-relaxed text-ink-soft">
                  Falta un paso: envíanos por WhatsApp una foto clara de cada página del documento. Empezamos a traducir
                  apenas la recibamos{SITE.turnaround ? ` y te entregamos el PDF en ${SITE.turnaround}` : ""}.
                </p>
                <a href={paidOrderWhatsAppUrl(order)} target="_blank" rel="noopener noreferrer" className="btn-primary self-start">
                  <MessageCircle size={19} aria-hidden="true" />
                  Enviar mi documento por WhatsApp
                </a>
              </>
            )}
            <p className="text-sm text-ink-muted">Stripe te envía el recibo del pago a tu correo.</p>
          </>
        ) : (
          <>
            <h1 className="font-display text-4xl font-medium leading-[1.1] tracking-tight">
              No pudimos confirmar tu pago.
            </h1>
            <p className="leading-relaxed text-ink-soft">
              {order
                ? "Tu pago todavía está en proceso. Si ya se descontó de tu tarjeta, escríbenos con el número de pedido y lo revisamos."
                : "No encontramos un pago asociado a esta página. Si pagaste, escríbenos por WhatsApp y lo revisamos. Si no, puedes volver a cotizar."}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={generalWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <MessageCircle size={19} aria-hidden="true" />
                Escribir por WhatsApp
              </a>
              <Link href="/#cotizar" className="btn-secondary">
                Volver a cotizar
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
