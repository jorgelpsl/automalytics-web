import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { documentPageFor } from "@/data/document-pages";
import { DOCUMENT_GROUPS } from "@/data/documents";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

export function Documents() {
  return (
    <section id="documentos" className="section">
      <div className="flex max-w-2xl flex-col gap-4">
        <p className="eyebrow">Documentos</p>
        <h2 className="font-display text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
          Lo que más nos piden para residencia, ciudadanía y visas.
        </h2>
      </div>

      <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {DOCUMENT_GROUPS.map((group) => (
          <div key={group.title} className="border-t-2 border-ink pt-5">
            <h3 className="text-[15px] font-semibold">{group.title}</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {group.items.map((item) => {
                const page = documentPageFor(item);
                return (
                  <li key={item} className="text-ink-soft">
                    {page ? (
                      <Link
                        href={`/traduccion/${page.slug}`}
                        className="text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
                      >
                        {item}
                      </Link>
                    ) : (
                      item
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-14 text-lg text-ink-soft">
        ¿Tu documento no aparece?{" "}
        <a
          href={generalWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-ink underline decoration-marker decoration-[3px] underline-offset-4 hover:decoration-ink"
        >
          Pregúntanos por WhatsApp
          <ArrowRight size={17} aria-hidden="true" />
        </a>
      </p>
    </section>
  );
}
