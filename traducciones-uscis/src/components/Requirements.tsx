import { type Lang } from "@/i18n/config";
import { USCIS_TRANSLATION_RULE_URL } from "@/lib/seo";

const COPY = {
  es: {
    eyebrow: "Qué exige USCIS",
    title: "Tres cosas que tu traducción tiene que cumplir.",
    items: [
      {
        title: "Traducción completa al inglés",
        body: "Todo el documento: textos, sellos, timbres, firmas y notas al margen. Un resumen o una traducción parcial no sirve.",
      },
      {
        title: "Certificación del traductor",
        body: "Una declaración firmada en la que el traductor afirma que es competente para traducir del español al inglés y que la traducción es completa y exacta.",
      },
      {
        title: "Junto a una copia del original",
        body: "La traducción se presenta acompañando la copia del documento en español, no en su reemplazo.",
      },
    ],
  },
  en: {
    eyebrow: "What USCIS requires",
    title: "Three things your translation has to meet.",
    items: [
      {
        title: "Complete English translation",
        body: "The entire document: text, seals, stamps, signatures and marginal notes. A summary or a partial translation won't do.",
      },
      {
        title: "Translator's certification",
        body: "A signed statement in which the translator affirms they are competent to translate from Spanish into English and that the translation is complete and accurate.",
      },
      {
        title: "Submitted with a copy of the original",
        body: "The translation is submitted together with a copy of the document in Spanish, not in place of it.",
      },
    ],
  },
} as const;

export function Requirements({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  return (
    <section id="requisitos" className="border-y border-line bg-paper-alt">
      <div className="section grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="font-display text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">{copy.title}</h2>
          <blockquote className="mt-2 border-l-2 border-marker pl-5">
            <p lang="en" className="font-display text-lg italic leading-relaxed text-ink-soft">
              “Any document containing foreign language submitted to USCIS shall be accompanied by a full English
              language translation which the translator has certified as complete and accurate, and by the
              translator&apos;s certification that he or she is competent to translate from the foreign language into
              English.”
            </p>
            <cite className="mt-3 block text-sm not-italic text-ink-muted">
              <a href={USCIS_TRANSLATION_RULE_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink">
                8 CFR § 103.2(b)(3)
              </a>
            </cite>
          </blockquote>
        </div>

        <ol className="flex flex-col lg:col-span-6 lg:col-start-7">
          {copy.items.map((req, i) => (
            <li key={req.title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-7 first:border-t-0 first:pt-0 lg:first:pt-2">
              <span className="font-display text-2xl text-ink-muted" aria-hidden="true">
                {i + 1}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold">{req.title}</h3>
                <p className="leading-relaxed text-ink-soft">{req.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
