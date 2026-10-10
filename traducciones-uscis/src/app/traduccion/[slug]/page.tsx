import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Plus } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { DOCUMENT_PAGES, findDocumentPage } from "@/data/document-pages";
import { Quote } from "@/components/Quote";
import { Reviews } from "@/components/Reviews";
import { SITE } from "@/data/site";
import { onlineOrdersEnabled, paymentsEnabled } from "@/lib/features";
import { PRICE_TIERS, estimateFor, formatUsd, tierFor, tierRange } from "@/lib/pricing";
import { USCIS_TRANSLATION_RULE_URL, offerNodes, organizationNode, pageMetadata } from "@/lib/seo";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

export function generateStaticParams() {
  return DOCUMENT_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = findDocumentPage((await params).slug);
  if (!page) return {};
  return pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: `/traduccion/${page.slug}` });
}

const pagesLabel = (n: number) => `${n} ${n === 1 ? "página" : "páginas"}`;

// "El precio es de $15 por página de 1 a 4 páginas, $14 de 5 a 9 páginas y $13
// de 10 o más páginas." — the same tiers the order form charges.
function pricesInWords(): string {
  const parts = PRICE_TIERS.map((tier) => `${formatUsd(tier.perPage)} por página de ${tierRange(tier)}`);
  const list = parts.length > 1 ? `${parts.slice(0, -1).join(", ")} y ${parts.at(-1)}` : parts[0];
  return `El precio es de ${list}.`;
}

export default async function DocumentLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const page = findDocumentPage((await params).slug);
  if (!page) notFound();

  // The order form sits on this page, so the buy buttons scroll to it instead of
  // sending visitors from the ad's landing page to the long home page.
  const buyHref = "#cotizar";
  const example = page.typicalPages.example;
  const exampleTier = tierFor(example);
  const related = DOCUMENT_PAGES.filter((p) => p.slug !== page.slug);
  const url = `${SITE.url}/traduccion/${page.slug}`;

  // Only facts shown on the page: the service, who provides it and the real per-page prices.
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE.url },
        { "@type": "ListItem", position: 2, name: page.title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.title,
      serviceType: "Traducción certificada",
      description: page.metaDescription,
      url,
      areaServed: { "@type": "Country", name: "United States" },
      provider: organizationNode(),
      offers: offerNodes(url),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="mx-auto grid w-full max-w-content gap-12 px-4 pb-16 pt-10 sm:px-6 md:pt-14 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="flex flex-col gap-6 lg:col-span-7">
          <nav aria-label="Ruta" className="text-sm text-ink-muted">
            <Link href="/" className="hover:text-ink">
              Inicio
            </Link>
            <span aria-hidden="true"> / </span>
            <Link href="/#documentos" className="hover:text-ink">
              Documentos
            </Link>
          </nav>
          <h1 className="font-display text-[2.4rem] font-medium leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.6rem]">
            {page.title}
          </h1>
          <p className="max-w-[36rem] text-lg leading-relaxed text-ink-soft">{page.intro}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={buyHref} className="btn-primary">
              Comprar la traducción
            </Link>
            <a href={generalWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <WhatsAppIcon size={19} />
              Preguntar por WhatsApp
            </a>
          </div>
        </div>

        <aside className="self-start rounded-card border border-line bg-paper-sheet p-6 lg:col-span-4 lg:col-start-9">
          <p className="text-sm font-medium text-ink-muted">Ejemplo de precio</p>
          <p className="mt-1 font-display text-3xl font-medium">{formatUsd(estimateFor(example) ?? 0)}</p>
          <p className="mt-1 text-sm text-ink-muted">
            {page.name.charAt(0).toUpperCase() + page.name.slice(1)} de {pagesLabel(example)}
            {exampleTier ? ` × ${formatUsd(exampleTier.perPage)}` : ""}.
          </p>
          <dl className="mt-5 flex flex-col gap-1.5 border-t border-line pt-4 text-[15px] tabular-nums text-ink-soft">
            {PRICE_TIERS.map((tier) => (
              <div key={tier.minPages} className="flex justify-between gap-4">
                <dt>{tierRange(tier)}</dt>
                <dd>{formatUsd(tier.perPage)} / página</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-4 text-[15px] text-ink-soft">
            {[`Entrega en ${SITE.turnaround}`, "Certificación del traductor incluida", "Sin notario: USCIS no lo exige"].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check size={17} strokeWidth={2.4} className="mt-0.5 shrink-0 text-ink" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <Quote
        paymentsEnabled={paymentsEnabled()}
        uploadAfterPayment={onlineOrdersEnabled()}
        defaultDocumentType={page.documentType}
      />

      <section className="border-t border-line bg-paper-alt">
        <div className="mx-auto grid w-full max-w-content gap-x-8 gap-y-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-20">
          <div className="border-t-2 border-ink pt-5">
            <h2 className="font-display text-2xl font-medium">Cuándo la pide USCIS</h2>
            <ul className="mt-4 flex flex-col gap-3 leading-relaxed text-ink-soft">
              {page.whenNeeded.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t-2 border-ink pt-5">
            <h2 className="font-display text-2xl font-medium">Qué incluye la traducción</h2>
            <ul className="mt-4 flex flex-col gap-3 leading-relaxed text-ink-soft">
              {page.whatWeTranslate.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check size={18} strokeWidth={2.4} className="mt-1 shrink-0 text-ink" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
              Es lo que exige la norma de USCIS para documentos en otro idioma:{" "}
              <a href={USCIS_TRANSLATION_RULE_URL} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4">
                8 CFR § 103.2(b)(3)
              </a>
              .
            </p>
          </div>
          <div className="border-t-2 border-ink pt-5">
            <h2 className="font-display text-2xl font-medium">Cuántas páginas suele tener</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">{page.typicalPages.text}</p>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Cada cara con texto, sellos o firmas cuenta como una página, y pagas según las páginas que indicas.{" "}
              {pricesInWords()} Por ejemplo, si tu {page.name} tiene {pagesLabel(example)}, la traducción cuesta{" "}
              {formatUsd(estimateFor(example) ?? 0)} y te la entregamos en {SITE.turnaround}.
            </p>
          </div>
          <div className="border-t-2 border-ink pt-5">
            <h2 className="font-display text-2xl font-medium">Antes de tomar las fotos</h2>
            <ul className="mt-4 flex flex-col gap-3 leading-relaxed text-ink-soft">
              {page.tips.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-marker" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <h2 className="font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl">Preguntas sobre este documento</h2>
        </div>
        <div className="border-t border-line lg:col-span-7 lg:col-start-6">
          {page.faq.map((item) => (
            <details key={item.question} className="group border-b border-line">
              <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {item.question}
                <Plus
                  size={20}
                  aria-hidden="true"
                  className="shrink-0 text-ink-muted transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                />
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-ink-soft">{item.answer}</p>
            </details>
          ))}
          <p className="mt-6 text-ink-soft">
            Más respuestas en las{" "}
            <Link href="/#preguntas" className="font-medium text-ink underline underline-offset-4">
              preguntas frecuentes
            </Link>
            .
          </p>
        </div>
      </section>

      <Reviews />

      <section className="border-t border-line bg-paper-alt">
        <div className="section flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl">
              Tu {page.name} traducida en {SITE.turnaround}.
            </h2>
            <p className="mt-4 text-lg text-ink-soft">Pagas en línea y subes las fotos desde el celular.</p>
          </div>
          <Link href={buyHref} className="btn-primary w-full shrink-0 md:w-auto">
            Comprar la traducción
          </Link>
        </div>
        <nav aria-label="Otros documentos" className="mx-auto w-full max-w-content px-4 pb-16 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-ink-muted">También traducimos</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/traduccion/${p.slug}`}
                  className="inline-flex min-h-[44px] items-center gap-1.5 font-medium text-ink underline decoration-marker decoration-[3px] underline-offset-4 hover:decoration-ink"
                >
                  {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </>
  );
}
