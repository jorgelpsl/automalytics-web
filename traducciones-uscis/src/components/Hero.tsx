import { Check } from "lucide-react";
import { DocumentPair } from "@/components/DocumentPair";
import { SITE } from "@/data/site";
import { type Lang } from "@/i18n/config";
import { onlineOrdersEnabled } from "@/lib/features";
import { PRICE_TIERS, formatUsd } from "@/lib/pricing";

const [baseTier, firstDiscount] = PRICE_TIERS;

const COPY = {
  es: {
    eyebrow: "Español → Inglés · Residencia, ciudadanía y visas",
    titleBefore: "Traducciones ",
    titleMark: "certificadas",
    titleAfter: " para USCIS, listas para presentar.",
    lead: "Traducimos tus documentos al inglés con la certificación que USCIS exige.",
    leadOnline: "Pagas en línea, subes una foto del documento y te devolvemos el PDF firmado.",
    leadWhatsApp: "Nos mandas una foto por WhatsApp y te devolvemos el PDF firmado.",
    buy: "Comprar mi traducción",
    documents: "Ver qué documentos traducimos",
    price: (amount: string, from?: number) => `${amount} por página${from ? ` (menos desde ${from} páginas)` : ""}`,
    turnaround: (time: string) => `Entrega en ${time}`,
    complete: "Traducción completa, sellos y firmas incluidos",
    certified: "Certificación del traductor, firmada",
    noNotary: "Sin notario: USCIS no lo exige",
  },
  en: {
    eyebrow: "Spanish → English · Green cards, citizenship and visas",
    titleBefore: "",
    titleMark: "Certified",
    titleAfter: " translations for USCIS, ready to submit.",
    lead: "We translate your documents into English with the certification USCIS requires.",
    leadOnline: "You pay online, upload a photo of the document, and we send back the signed PDF.",
    leadWhatsApp: "Send us a photo on WhatsApp and we send back the signed PDF.",
    buy: "Order my translation",
    documents: "See which documents we translate",
    price: (amount: string, from?: number) => `${amount} per page${from ? ` (less from ${from} pages)` : ""}`,
    turnaround: (time: string) => `Delivered in ${time}`,
    complete: "Complete translation, seals and signatures included",
    certified: "Signed translator's certification",
    noNotary: "No notary needed: USCIS doesn't require one",
  },
} as const;

export function Hero({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  const turnaround = lang === "en" ? SITE.turnaroundEn : SITE.turnaround;
  const facts = [
    ...(baseTier ? [copy.price(formatUsd(baseTier.perPage), firstDiscount?.minPages)] : []),
    ...(turnaround ? [copy.turnaround(turnaround)] : []),
    copy.complete,
    copy.certified,
    copy.noNotary,
  ];

  return (
    <section className="mx-auto grid w-full max-w-content items-center gap-12 px-4 pb-20 pt-10 sm:px-6 md:pt-14 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-28 lg:pt-20">
      <div className="flex flex-col gap-6 lg:col-span-6">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 className="font-display text-[2.6rem] font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.1rem]">
          {copy.titleBefore}
          <span className="marker">{copy.titleMark}</span>
          {copy.titleAfter}
        </h1>
        <p className="max-w-[34rem] text-lg leading-relaxed text-ink-soft">
          {copy.lead} {onlineOrdersEnabled() ? copy.leadOnline : copy.leadWhatsApp}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="#cotizar" className="btn-primary">
            {copy.buy}
          </a>
          <a href="#documentos" className="btn-secondary">
            {copy.documents}
          </a>
        </div>
        <ul className="mt-2 flex flex-col gap-2.5 text-[15px] text-ink-soft">
          {facts.map((fact) => (
            <li key={fact} className="flex items-start gap-2.5">
              <Check size={18} strokeWidth={2.4} className="mt-0.5 shrink-0 text-ink" aria-hidden="true" />
              {fact}
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-6">
        <DocumentPair lang={lang} />
      </div>
    </section>
  );
}
