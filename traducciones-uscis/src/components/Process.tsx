const STEPS = [
  {
    title: "Nos mandas el documento",
    body: "Una foto clara de cada página por WhatsApp, o el PDF si lo tienes escaneado.",
  },
  {
    title: "Te cotizamos",
    body: "Revisamos el documento y te confirmamos precio y plazo antes de empezar a traducir.",
  },
  {
    title: "Recibes el PDF certificado",
    body: "La traducción completa con la certificación firmada, lista para subir a tu trámite o imprimir.",
  },
];

export function Process() {
  return (
    <section id="proceso" className="bg-ink text-paper">
      <div className="section">
        <div className="flex max-w-2xl flex-col gap-4">
          <p className="text-sm font-medium text-paper/70">Cómo funciona</p>
          <h2 className="font-display text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
            Todo por WhatsApp, sin salir de tu casa.
          </h2>
        </div>

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-4 border-t border-paper/20 pt-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-marker font-display text-lg font-semibold text-ink" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="leading-relaxed text-paper/75">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
