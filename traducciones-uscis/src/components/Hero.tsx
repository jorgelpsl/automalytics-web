import { Check } from "lucide-react";
import { DocumentPair } from "@/components/DocumentPair";
import { SITE } from "@/data/site";

const offer = [
  SITE.pricePerPage ? `USD ${SITE.pricePerPage} por página` : null,
  SITE.turnaround ? `entrega en ${SITE.turnaround}` : null,
]
  .filter(Boolean)
  .join(" · ");

const FACTS = [
  ...(offer ? [offer.charAt(0).toUpperCase() + offer.slice(1)] : []),
  "Traducción completa, sellos y firmas incluidos",
  "Certificación del traductor, firmada",
  "Sin notario: USCIS no lo exige",
];

export function Hero() {
  return (
    <section className="mx-auto grid w-full max-w-content items-center gap-12 px-4 pb-20 pt-10 sm:px-6 md:pt-14 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-28 lg:pt-20">
      <div className="flex flex-col gap-6 lg:col-span-6">
        <p className="eyebrow">Español → Inglés · Residencia, ciudadanía y visas</p>
        <h1 className="font-display text-[2.6rem] font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.1rem]">
          Traducciones <span className="marker">certificadas</span> para USCIS, listas para presentar.
        </h1>
        <p className="max-w-[34rem] text-lg leading-relaxed text-ink-soft">
          Traducimos tus documentos al inglés con la certificación que USCIS exige. Nos mandas una foto por WhatsApp y te
          devolvemos el PDF firmado.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="#cotizar" className="btn-primary">
            Cotizar mi traducción
          </a>
          <a href="#documentos" className="btn-secondary">
            Ver qué documentos traducimos
          </a>
        </div>
        <ul className="mt-2 flex flex-col gap-2.5 text-[15px] text-ink-soft">
          {FACTS.map((fact) => (
            <li key={fact} className="flex items-start gap-2.5">
              <Check size={18} strokeWidth={2.4} className="mt-0.5 shrink-0 text-ink" aria-hidden="true" />
              {fact}
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-6">
        <DocumentPair />
      </div>
    </section>
  );
}
