import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { DOCUMENT_PAGES, pageCopy } from "@/data/document-pages";
import { type Lang } from "@/i18n/config";
import { ROUTES, documentPath } from "@/i18n/routes";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

const COPY = {
  es: {
    eyebrow: "Error 404",
    title: "No encontramos esta página.",
    body: "Puede que el enlace esté incompleto o que la página ya no exista. Elige tu documento o vuelve al inicio para pedir tu traducción.",
    home: "Ir al inicio",
    ask: "Preguntar por WhatsApp",
    popular: "Traducciones más pedidas",
  },
  en: {
    eyebrow: "Error 404",
    title: "We couldn't find this page.",
    body: "The link may be incomplete or the page may no longer exist. Choose your document or go back home to order your translation.",
    home: "Go to home",
    ask: "Ask on WhatsApp",
    popular: "Most requested translations",
  },
} as const;

// Most people land here from an old or mistyped link while looking for a
// specific document, so the way back is the document list, not just "home".
export function NotFoundView({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <section className="section">
      <div className="flex max-w-2xl flex-col gap-6">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 className="font-display text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">{t.title}</h1>
        <p className="text-lg leading-relaxed text-ink-soft">{t.body}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href={ROUTES.home[lang]} className="btn-primary">
            {t.home}
          </Link>
          <a href={generalWhatsAppUrl(lang)} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <WhatsAppIcon size={19} />
            {t.ask}
          </a>
        </div>
      </div>

      <nav aria-labelledby="documentos-404" className="mt-14 max-w-2xl border-t border-line pt-8">
        <h2 id="documentos-404" className="text-sm font-medium text-ink-muted">
          {t.popular}
        </h2>
        <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
          {DOCUMENT_PAGES.map((page) => (
            <li key={page.slug} className="border-b border-line">
              <Link
                href={documentPath(lang, page.slug)}
                className="flex min-h-[48px] items-center justify-between gap-3 py-2 text-ink hover:underline hover:underline-offset-4"
              >
                <span className="first-letter:uppercase">{pageCopy(page, lang).name}</span>
                <ArrowRight size={17} aria-hidden="true" className="shrink-0 text-ink-muted" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
