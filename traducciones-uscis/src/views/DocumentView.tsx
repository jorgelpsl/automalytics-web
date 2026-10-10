import Link from "next/link";
import { ArrowRight, Check, Plus } from "lucide-react";
import { Quote } from "@/components/Quote";
import { Reviews } from "@/components/Reviews";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { DOCUMENT_PAGES, pageCopy, type DocumentPage } from "@/data/document-pages";
import { SITE } from "@/data/site";
import { HREFLANG, type Lang } from "@/i18n/config";
import { ROUTES, documentPath, homeSection } from "@/i18n/routes";
import { onlineOrdersEnabled, paymentsEnabled } from "@/lib/features";
import { PRICE_TIERS, estimateFor, formatUsd, tierFor, tierRange } from "@/lib/pricing";
import { USCIS_TRANSLATION_RULE_URL, offerNodes, organizationNode } from "@/lib/seo";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

const COPY = {
  es: {
    breadcrumb: "Ruta",
    home: "Inicio",
    documents: "Documentos",
    buy: "Comprar la traducción",
    ask: "Preguntar por WhatsApp",
    priceExample: "Ejemplo de precio",
    pagesLabel: (n: number) => `${n} ${n === 1 ? "página" : "páginas"}`,
    exampleLine: (name: string, pages: string) => `${name} de ${pages}`,
    perPage: "página",
    delivered: (time: string) => `Entrega en ${time}`,
    certification: "Certificación del traductor incluida",
    noNotary: "Sin notario: USCIS no lo exige",
    whenTitle: "Cuándo la pide USCIS",
    includesTitle: "Qué incluye la traducción",
    ruleNote: "Es lo que exige la norma de USCIS para documentos en otro idioma:",
    pagesTitle: "Cuántas páginas suele tener",
    pagesPaid:
      "Cada cara con texto, sellos o firmas cuenta como una página, y pagas según las páginas que indicas.",
    priceIn: (list: string) => `El precio es de ${list}.`,
    priceTier: (price: string, range: string) => `${price} por página de ${range}`,
    and: "y",
    forExample: (name: string, pages: string, price: string, time: string) =>
      `Por ejemplo, si tu ${name} tiene ${pages}, la traducción cuesta ${price} y te la entregamos en ${time}.`,
    tipsTitle: "Antes de tomar las fotos",
    faqTitle: "Preguntas sobre este documento",
    moreAnswers: "Más respuestas en las",
    faqLink: "preguntas frecuentes",
    closing: (name: string, time: string) => `Tu ${name} traducida en ${time}.`,
    closingBody: "Pagas en línea y subes las fotos desde el celular.",
    otherDocs: "Otros documentos",
    alsoTranslate: "También traducimos",
    serviceType: "Traducción certificada",
  },
  en: {
    breadcrumb: "Breadcrumb",
    home: "Home",
    documents: "Documents",
    buy: "Order the translation",
    ask: "Ask on WhatsApp",
    priceExample: "Price example",
    pagesLabel: (n: number) => `${n} ${n === 1 ? "page" : "pages"}`,
    exampleLine: (name: string, pages: string) => `${name}, ${pages}`,
    perPage: "page",
    delivered: (time: string) => `Delivered in ${time}`,
    certification: "Translator's certification included",
    noNotary: "No notary needed: USCIS doesn't require one",
    whenTitle: "When USCIS asks for it",
    includesTitle: "What the translation includes",
    ruleNote: "It's what the USCIS rule requires for documents in another language:",
    pagesTitle: "How many pages it usually has",
    pagesPaid: "Each side with text, seals or signatures counts as one page, and you pay for the pages you indicate.",
    priceIn: (list: string) => `The price is ${list}.`,
    priceTier: (price: string, range: string) => `${price} per page for ${range}`,
    and: "and",
    forExample: (name: string, pages: string, price: string, time: string) =>
      `For example, if your ${name} has ${pages}, the translation costs ${price} and we deliver it in ${time}.`,
    tipsTitle: "Before you take the photos",
    faqTitle: "Questions about this document",
    moreAnswers: "More answers in the",
    faqLink: "frequently asked questions",
    closing: (name: string, time: string) => `Your ${name} translated in ${time}.`,
    closingBody: "You pay online and upload the photos from your phone.",
    otherDocs: "Other documents",
    alsoTranslate: "We also translate",
    serviceType: "Certified translation",
  },
} as const;

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export function DocumentView({ lang, page }: { lang: Lang; page: DocumentPage }) {
  const t = COPY[lang];
  const doc = pageCopy(page, lang);
  const turnaround = (lang === "en" ? SITE.turnaroundEn : SITE.turnaround) ?? "";

  // The order form sits on this page, so the buy buttons scroll to it instead of
  // sending visitors from the ad's landing page to the long home page.
  const buyHref = "#cotizar";
  const example = page.typicalPages.example;
  const exampleTier = tierFor(example);
  const related = DOCUMENT_PAGES.filter((p) => p.slug !== page.slug);
  const url = `${SITE.url}${documentPath(lang, page.slug)}`;
  const examplePrice = formatUsd(estimateFor(example) ?? 0);

  const tierSentences = PRICE_TIERS.map((tier) => t.priceTier(formatUsd(tier.perPage), tierRange(tier, lang)));
  const priceList =
    tierSentences.length > 1 ? `${tierSentences.slice(0, -1).join(", ")} ${t.and} ${tierSentences.at(-1)}` : tierSentences[0];

  // Only facts shown on the page: the service, who provides it and the real per-page prices.
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t.home, item: lang === "en" ? `${SITE.url}/en` : SITE.url },
        { "@type": "ListItem", position: 2, name: doc.title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: doc.title,
      serviceType: t.serviceType,
      description: doc.metaDescription,
      url,
      inLanguage: HREFLANG[lang],
      areaServed: { "@type": "Country", name: "United States" },
      provider: organizationNode(),
      offers: offerNodes(url, lang),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="mx-auto grid w-full max-w-content gap-12 px-4 pb-16 pt-10 sm:px-6 md:pt-14 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="flex flex-col gap-6 lg:col-span-7">
          <nav aria-label={t.breadcrumb} className="text-sm text-ink-muted">
            <Link href={ROUTES.home[lang]} className="hover:text-ink">
              {t.home}
            </Link>
            <span aria-hidden="true"> / </span>
            <Link href={homeSection(lang, "documentos")} className="hover:text-ink">
              {t.documents}
            </Link>
          </nav>
          <h1 className="font-display text-[2.4rem] font-medium leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.6rem]">
            {doc.title}
          </h1>
          <p className="max-w-[36rem] text-lg leading-relaxed text-ink-soft">{doc.intro}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={buyHref} className="btn-primary">
              {t.buy}
            </Link>
            <a href={generalWhatsAppUrl(lang)} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <WhatsAppIcon size={19} />
              {t.ask}
            </a>
          </div>
        </div>

        <aside className="self-start rounded-card border border-line bg-paper-sheet p-6 lg:col-span-4 lg:col-start-9">
          <p className="text-sm font-medium text-ink-muted">{t.priceExample}</p>
          <p className="mt-1 font-display text-3xl font-medium">{examplePrice}</p>
          <p className="mt-1 text-sm text-ink-muted">
            {t.exampleLine(capitalize(doc.name), t.pagesLabel(example))}
            {exampleTier ? ` × ${formatUsd(exampleTier.perPage)}` : ""}.
          </p>
          <dl className="mt-5 flex flex-col gap-1.5 border-t border-line pt-4 text-[15px] tabular-nums text-ink-soft">
            {PRICE_TIERS.map((tier) => (
              <div key={tier.minPages} className="flex justify-between gap-4">
                <dt>{tierRange(tier, lang)}</dt>
                <dd>
                  {formatUsd(tier.perPage)} / {t.perPage}
                </dd>
              </div>
            ))}
          </dl>
          <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-4 text-[15px] text-ink-soft">
            {[t.delivered(turnaround), t.certification, t.noNotary].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check size={17} strokeWidth={2.4} className="mt-0.5 shrink-0 text-ink" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <Quote
        lang={lang}
        paymentsEnabled={paymentsEnabled()}
        uploadAfterPayment={onlineOrdersEnabled()}
        defaultDocumentType={page.documentType}
      />

      <section className="border-t border-line bg-paper-alt">
        <div className="mx-auto grid w-full max-w-content gap-x-8 gap-y-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-20">
          <div className="border-t-2 border-ink pt-5">
            <h2 className="font-display text-2xl font-medium">{t.whenTitle}</h2>
            <ul className="mt-4 flex flex-col gap-3 leading-relaxed text-ink-soft">
              {doc.whenNeeded.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t-2 border-ink pt-5">
            <h2 className="font-display text-2xl font-medium">{t.includesTitle}</h2>
            <ul className="mt-4 flex flex-col gap-3 leading-relaxed text-ink-soft">
              {doc.whatWeTranslate.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check size={18} strokeWidth={2.4} className="mt-1 shrink-0 text-ink" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
              {t.ruleNote}{" "}
              <a href={USCIS_TRANSLATION_RULE_URL} target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-4">
                8 CFR § 103.2(b)(3)
              </a>
              .
            </p>
          </div>
          <div className="border-t-2 border-ink pt-5">
            <h2 className="font-display text-2xl font-medium">{t.pagesTitle}</h2>
            <p className="mt-4 leading-relaxed text-ink-soft">{doc.typicalPages}</p>
            <p className="mt-3 leading-relaxed text-ink-soft">
              {t.pagesPaid} {t.priceIn(priceList)} {t.forExample(doc.name, t.pagesLabel(example), examplePrice, turnaround)}
            </p>
          </div>
          <div className="border-t-2 border-ink pt-5">
            <h2 className="font-display text-2xl font-medium">{t.tipsTitle}</h2>
            <ul className="mt-4 flex flex-col gap-3 leading-relaxed text-ink-soft">
              {doc.tips.map((item) => (
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
          <h2 className="font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl">{t.faqTitle}</h2>
        </div>
        <div className="border-t border-line lg:col-span-7 lg:col-start-6">
          {doc.faq.map((item) => (
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
            {t.moreAnswers}{" "}
            <Link href={homeSection(lang, "preguntas")} className="font-medium text-ink underline underline-offset-4">
              {t.faqLink}
            </Link>
            .
          </p>
        </div>
      </section>

      <Reviews lang={lang} />

      <section className="border-t border-line bg-paper-alt">
        <div className="section flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl">
              {t.closing(doc.name, turnaround)}
            </h2>
            <p className="mt-4 text-lg text-ink-soft">{t.closingBody}</p>
          </div>
          <Link href={buyHref} className="btn-primary w-full shrink-0 md:w-auto">
            {t.buy}
          </Link>
        </div>
        <nav aria-label={t.otherDocs} className="mx-auto w-full max-w-content px-4 pb-16 sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-ink-muted">{t.alsoTranslate}</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={documentPath(lang, p.slug)}
                  className="inline-flex min-h-[44px] items-center gap-1.5 font-medium text-ink underline decoration-marker decoration-[3px] underline-offset-4 hover:decoration-ink"
                >
                  {capitalize(pageCopy(p, lang).name)}
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
