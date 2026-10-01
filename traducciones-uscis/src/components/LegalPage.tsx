import Link from "next/link";
import { LEGAL_PAGES, LEGAL_UPDATED, LEGAL_UPDATED_ISO } from "@/data/legal";
import { SITE } from "@/data/site";
import { ORG_ID, WEBSITE_ID, organizationNode } from "@/lib/seo";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

export function LegalPage({
  title,
  description,
  current,
  summary,
  children,
}: {
  title: string;
  description: string;
  current: string;
  /** Two to four plain sentences restating what the page already says. */
  summary: string[];
  children: React.ReactNode;
}) {
  const url = `${SITE.url}${current}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: "es-US",
        dateModified: LEGAL_UPDATED_ISO,
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORG_ID },
      },
      organizationNode(),
    ],
  };

  return (
    <section className="section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <aside className="flex flex-col gap-4 lg:col-span-3">
          <p className="eyebrow">Legal</p>
          <nav aria-label="Documentos legales" className="flex flex-wrap gap-x-5 gap-y-2 lg:flex-col">
            {LEGAL_PAGES.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                aria-current={page.href === current ? "page" : undefined}
                className={`min-h-[44px] content-center text-[15px] lg:min-h-0 ${
                  page.href === current ? "font-medium text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {page.label}
              </Link>
            ))}
          </nav>
        </aside>

        <article className="lg:col-span-8 lg:col-start-5">
          <h1 className="font-display text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-ink-muted">Última actualización: {LEGAL_UPDATED}</p>
          <div className="mt-8 max-w-[68ch] rounded-card border border-line bg-paper-alt px-5 py-4">
            <h2 className="text-sm font-medium text-ink-muted">En resumen</h2>
            <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5 leading-relaxed text-ink-soft marker:text-ink-muted">
              {summary.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
          <div className="legal mt-10">
            {children}
            <h2>Contacto</h2>
            <p>
              Si tienes preguntas sobre este documento o sobre tu pedido, escríbenos por{" "}
              <a href={generalWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              {SITE.email ? (
                <>
                  {" "}o a <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </>
              ) : null}
              . Si es sobre un pedido, incluye su número (empieza con CT-).
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
