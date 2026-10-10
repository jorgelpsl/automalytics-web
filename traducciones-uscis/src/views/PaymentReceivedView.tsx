import { after } from "next/server";
import Link from "next/link";
import { Check } from "lucide-react";
import { DocumentUpload } from "@/components/DocumentUpload";
import { PurchaseTracking } from "@/components/PurchaseTracking";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { documentLabel } from "@/data/documents";
import { SITE } from "@/data/site";
import { type Lang } from "@/i18n/config";
import { homeSection } from "@/i18n/routes";
import { listOrderFiles } from "@/lib/documents";
import { uploadsEnabled } from "@/lib/features";
import { notifySale } from "@/lib/notify";
import { applyRecord, readOrderRecords, type OrderRecord } from "@/lib/order-store";
import { formatUsd } from "@/lib/pricing";
import { getPaidOrder } from "@/lib/stripe";
import { removalOpen } from "@/lib/upload-rules";
import { generalWhatsAppUrl, paidOrderWhatsAppUrl } from "@/lib/whatsapp";

const COPY = {
  es: {
    cancelledTitle: "Este pedido fue cancelado.",
    cancelledBody: (code: string) =>
      `El pedido ${code} ya no acepta documentos. Si crees que es un error, escríbenos por WhatsApp con ese número.`,
    write: "Escribir por WhatsApp",
    paid: "Pago recibido.",
    order: "Pedido",
    document: "Documento",
    pages: "Páginas",
    total: "Total pagado",
    completed1: "Este pedido ya está completado y entregado. Si necesitas una corrección o traducir otro documento, escríbenos por",
    whatsapp: "WhatsApp",
    completed2: "con el número de pedido.",
    oneStep: "Falta un paso: envíanos por WhatsApp una foto clara de cada página del documento. Empezamos a traducir apenas la recibamos",
    andDeliver: (time: string) => ` y te entregamos el PDF en ${time}`,
    sendDocument: "Enviar mi documento por WhatsApp",
    receipt: "Stripe te envía el recibo del pago a tu correo.",
    notConfirmed: "No pudimos confirmar tu pago.",
    processing:
      "Tu pago todavía está en proceso. Si ya se descontó de tu tarjeta, escríbenos con el número de pedido y lo revisamos.",
    notFound:
      "No encontramos un pago asociado a esta página. Si pagaste, escríbenos por WhatsApp y lo revisamos. Si no, puedes hacer un pedido nuevo.",
    newOrder: "Hacer un pedido",
  },
  en: {
    cancelledTitle: "This order was canceled.",
    cancelledBody: (code: string) =>
      `Order ${code} no longer accepts documents. If you think this is a mistake, message us on WhatsApp with that number.`,
    write: "Message us on WhatsApp",
    paid: "Payment received.",
    order: "Order",
    document: "Document",
    pages: "Pages",
    total: "Total paid",
    completed1: "This order is already completed and delivered. If you need a correction or want to translate another document, message us on",
    whatsapp: "WhatsApp",
    completed2: "with the order number.",
    oneStep: "One step left: send us a clear photo of each page of the document on WhatsApp. We start translating as soon as we receive it",
    andDeliver: (time: string) => ` and deliver the PDF in ${time}`,
    sendDocument: "Send my document on WhatsApp",
    receipt: "Stripe emails you the payment receipt.",
    notConfirmed: "We couldn't confirm your payment.",
    processing:
      "Your payment is still processing. If it has already been charged to your card, message us with the order number and we'll check.",
    notFound:
      "We couldn't find a payment linked to this page. If you paid, message us on WhatsApp and we'll check. If not, you can place a new order.",
    newOrder: "Place an order",
  },
} as const;

export async function PaymentReceivedView({
  lang,
  searchParams,
}: {
  lang: Lang;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const t = COPY[lang];
  const turnaround = lang === "en" ? SITE.turnaroundEn : SITE.turnaround;
  const { session_id } = await searchParams;
  const payment = session_id ? await getPaidOrder(session_id) : null;
  const records: Record<string, OrderRecord> =
    payment?.paid && uploadsEnabled() ? await readOrderRecords().catch(() => ({})) : {};
  const order = payment?.paid ? applyRecord(payment, records[payment.code]) : payment;
  const cancelled = Boolean(order && "deleted" in order && order.deleted);
  const completed = Boolean(order && "status" in order && order.status === "completado");
  const canUpload = Boolean(order?.paid) && !cancelled && !completed && uploadsEnabled();
  const storedFiles = canUpload ? await listOrderFiles(order!.code).catch(() => []) : [];
  if (order?.paid && !cancelled) {
    after(() => notifySale(order).catch((err) => console.error(err)));
  }

  if (cancelled) {
    return (
      <section className="section">
        <div className="mx-auto flex max-w-2xl flex-col gap-6 rounded-card border border-line bg-paper-sheet p-6 sm:p-10">
          <h1 className="font-display text-4xl font-medium leading-[1.1] tracking-tight">{t.cancelledTitle}</h1>
          <p className="leading-relaxed text-ink-soft">{t.cancelledBody(order!.code)}</p>
          <a href={generalWhatsAppUrl(lang)} target="_blank" rel="noopener noreferrer" className="btn-primary self-start">
            <WhatsAppIcon size={19} />
            {t.write}
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
            <PurchaseTracking
              adsSendTo={SITE.googleAdsId && SITE.googleAdsPurchaseLabel ? `${SITE.googleAdsId}/${SITE.googleAdsPurchaseLabel}` : null}
              analyticsId={SITE.googleAnalyticsId}
              value={order.amountTotal}
              transactionId={order.code}
              item={{
                item_name: order.documentType,
                quantity: order.pages,
                price: order.pages > 0 ? order.amountTotal / order.pages : order.amountTotal,
              }}
            />
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-marker text-ink">
              <Check size={24} strokeWidth={2.6} aria-hidden="true" />
            </span>
            <h1 className="font-display text-4xl font-medium leading-[1.1] tracking-tight">{t.paid}</h1>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-y border-line py-4 text-[15px] tabular-nums">
              <dt className="text-ink-muted">{t.order}</dt>
              <dd className="font-medium">{order.code}</dd>
              <dt className="text-ink-muted">{t.document}</dt>
              <dd>{documentLabel(lang, order.documentType)}</dd>
              <dt className="text-ink-muted">{t.pages}</dt>
              <dd>{order.pages}</dd>
              <dt className="text-ink-muted">{t.total}</dt>
              <dd className="font-medium">{formatUsd(order.amountTotal)}</dd>
            </dl>
            {completed ? (
              <p className="leading-relaxed text-ink-soft">
                {t.completed1}{" "}
                <a
                  href={generalWhatsAppUrl(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink underline underline-offset-4"
                >
                  {t.whatsapp}
                </a>{" "}
                {t.completed2}
              </p>
            ) : canUpload ? (
              <DocumentUpload
                lang={lang}
                sessionId={order.sessionId}
                orderCode={order.code}
                pagesPaid={order.pages}
                initialFiles={storedFiles.map((f) => ({ pathname: f.pathname, name: f.name, size: f.size, pages: f.pages, locked: !removalOpen(f.uploadedAt) }))}
                turnaround={turnaround}
                whatsappUrl={paidOrderWhatsAppUrl(order, lang)}
              />
            ) : (
              <>
                <p className="leading-relaxed text-ink-soft">
                  {t.oneStep}
                  {turnaround ? t.andDeliver(turnaround) : ""}.
                </p>
                <a href={paidOrderWhatsAppUrl(order, lang)} target="_blank" rel="noopener noreferrer" className="btn-primary self-start">
                  <WhatsAppIcon size={19} />
                  {t.sendDocument}
                </a>
              </>
            )}
            <p className="text-sm text-ink-muted">{t.receipt}</p>
          </>
        ) : (
          <>
            <h1 className="font-display text-4xl font-medium leading-[1.1] tracking-tight">{t.notConfirmed}</h1>
            <p className="leading-relaxed text-ink-soft">{order ? t.processing : t.notFound}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={generalWhatsAppUrl(lang)} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <WhatsAppIcon size={19} />
                {t.write}
              </a>
              <Link href={homeSection(lang, "cotizar")} className="btn-secondary">
                {t.newOrder}
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
