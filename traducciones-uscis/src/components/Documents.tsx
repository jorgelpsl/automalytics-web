import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { documentPageFor } from "@/data/document-pages";
import { DOCUMENT_GROUPS } from "@/data/documents";
import { type Lang } from "@/i18n/config";
import { documentPath } from "@/i18n/routes";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

const COPY = {
  es: {
    eyebrow: "Documentos",
    title: "Lo que más nos piden para residencia, ciudadanía y visas.",
    missing: "¿Tu documento no aparece?",
    ask: "Pregúntanos por WhatsApp",
  },
  en: {
    eyebrow: "Documents",
    title: "What people ask us for most for green cards, citizenship and visas.",
    missing: "Don't see your document?",
    ask: "Ask us on WhatsApp",
  },
} as const;

export function Documents({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  return (
    <section id="documentos" className="section">
      <div className="flex max-w-2xl flex-col gap-4">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 className="font-display text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">{copy.title}</h2>
      </div>

      <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {DOCUMENT_GROUPS.map((group) => (
          <div key={group.title} className="border-t-2 border-ink pt-5">
            <h3 className="text-[15px] font-semibold">{lang === "en" ? group.titleEn : group.title}</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {group.items.map((item, index) => {
                const page = documentPageFor(item);
                const label = lang === "en" ? group.itemsEn[index] : item;
                return (
                  <li key={item} className="text-ink-soft">
                    {page ? (
                      <Link
                        href={documentPath(lang, page.slug)}
                        className="text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
                      >
                        {label}
                      </Link>
                    ) : (
                      label
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-14 text-lg text-ink-soft">
        {copy.missing}{" "}
        <a
          href={generalWhatsAppUrl(lang)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-ink underline decoration-marker decoration-[3px] underline-offset-4 hover:decoration-ink"
        >
          {copy.ask}
          <ArrowRight size={17} aria-hidden="true" />
        </a>
      </p>
    </section>
  );
}
