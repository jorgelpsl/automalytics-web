import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { DOCUMENT_PAGES } from "@/data/document-pages";
import { SITE } from "@/data/site";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: `Página no encontrada | ${SITE.name}`,
  // Next marks 404s noindex on its own; the home canonical inherited from the
  // layout would tell crawlers this URL is the home page, so drop it.
  alternates: { canonical: null },
};

// Most people land here from an old or mistyped link while looking for a
// specific document, so the way back is the document list, not just "home".
export default function NotFound() {
  return (
    <section className="section">
      <div className="flex max-w-2xl flex-col gap-6">
        <p className="eyebrow">Error 404</p>
        <h1 className="font-display text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
          No encontramos esta página.
        </h1>
        <p className="text-lg leading-relaxed text-ink-soft">
          Puede que el enlace esté incompleto o que la página ya no exista. Elige tu documento o vuelve al inicio para pedir tu
          traducción.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            Ir al inicio
          </Link>
          <a href={generalWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <MessageCircle size={19} aria-hidden="true" />
            Preguntar por WhatsApp
          </a>
        </div>
      </div>

      <nav aria-labelledby="documentos-404" className="mt-14 max-w-2xl border-t border-line pt-8">
        <h2 id="documentos-404" className="text-sm font-medium text-ink-muted">
          Traducciones más pedidas
        </h2>
        <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
          {DOCUMENT_PAGES.map((page) => (
            <li key={page.slug} className="border-b border-line">
              <Link
                href={`/traduccion/${page.slug}`}
                className="flex min-h-[48px] items-center justify-between gap-3 py-2 text-ink hover:underline hover:underline-offset-4"
              >
                <span className="first-letter:uppercase">{page.name}</span>
                <ArrowRight size={17} aria-hidden="true" className="shrink-0 text-ink-muted" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
