const REQUIREMENTS = [
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
];

export function Requirements() {
  return (
    <section id="requisitos" className="border-y border-line bg-paper-alt">
      <div className="section grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <p className="eyebrow">Qué exige USCIS</p>
          <h2 className="font-display text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
            Tres cosas que tu traducción tiene que cumplir.
          </h2>
          <blockquote className="mt-2 border-l-2 border-marker pl-5">
            <p lang="en" className="font-display text-lg italic leading-relaxed text-ink-soft">
              “Any document containing foreign language submitted to USCIS shall be accompanied by a full English
              language translation which the translator has certified as complete and accurate, and by the
              translator&apos;s certification that he or she is competent to translate from the foreign language into
              English.”
            </p>
            <cite className="mt-3 block text-sm not-italic text-ink-muted">8 CFR § 103.2(b)(3)</cite>
          </blockquote>
        </div>

        <ol className="flex flex-col lg:col-span-6 lg:col-start-7">
          {REQUIREMENTS.map((req, i) => (
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
