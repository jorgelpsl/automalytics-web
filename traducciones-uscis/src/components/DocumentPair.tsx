// The hero's product shot: what the client sends (a Spanish birth
// certificate) beside what they get back (the English translation with the
// translator's certification USCIS asks for). Sample data, labelled as such.

function Field({ label, value, marked = false }: { label: string; value: string; marked?: boolean }) {
  return (
    <div className="grid grid-cols-[42%_1fr] gap-2 border-b border-dotted border-ink/20 py-[0.35em]">
      <span className="text-ink-muted">{label}</span>
      <span className="font-medium text-ink">
        <span className={marked ? "marker" : ""}>{value}</span>
      </span>
    </div>
  );
}

export function DocumentPair() {
  return (
    <figure className="relative mx-auto aspect-[10/11] w-full max-w-[560px] text-[8.5px] leading-snug min-[420px]:text-[10px] sm:text-[11.5px]">
      <figcaption className="sr-only">
        Ejemplo: un certificado de nacimiento en español junto a su traducción certificada al inglés.
      </figcaption>

      <div aria-hidden="true" className="absolute left-0 top-0 w-[68%] -rotate-3 bg-paper-sheet p-[5%] shadow-sheet">
        <p className="text-center font-display text-[1.25em] font-semibold uppercase tracking-wide text-ink-soft">Registro Civil</p>
        <p className="mb-[1em] mt-[0.2em] text-center font-display text-[1.6em] italic text-ink">Certificado de nacimiento</p>
        <Field label="Nombre inscrito" value="Camila Andrea Rojas Soto" />
        <Field label="Fecha de nacimiento" value="14 de marzo de 1994" />
        <Field label="Lugar" value="Venezuela" />
        <Field label="Padre" value="Luis Rojas M." />
        <Field label="Madre" value="Paula Soto V." />
        <div className="mt-[1.4em] flex items-end justify-between">
          <span className="flex h-[5.2em] w-[5.2em] items-center justify-center rounded-full border-2 border-dashed border-ink/35 text-center text-[0.8em] text-ink-muted">
            Sello
          </span>
          <span className="w-[45%] border-t border-ink/40 pt-[0.3em] text-center text-ink-muted">Registrador civil</span>
        </div>
        <span className="absolute -top-[1.1em] left-[5%] rounded-soft bg-ink px-[0.8em] py-[0.25em] text-[0.95em] font-medium text-paper">
          Original · Español
        </span>
      </div>

      <div aria-hidden="true" className="absolute bottom-0 right-0 w-[72%] rotate-2 bg-paper-sheet p-[5%] shadow-sheet">
        <p className="text-center font-display text-[1.25em] font-semibold uppercase tracking-wide text-ink-soft">Civil Registry</p>
        <p className="mb-[1em] mt-[0.2em] text-center font-display text-[1.6em] italic text-ink">Birth Certificate</p>
        <Field label="Registered name" value="Camila Andrea Rojas Soto" marked />
        <Field label="Date of birth" value="March 14, 1994" marked />
        <Field label="Place of birth" value="Venezuela" marked />
        <Field label="Father" value="Luis Rojas M." marked />
        <Field label="Mother" value="Paula Soto V." marked />
        <p className="mt-[0.7em] text-ink-muted">[Seal: Civil Registry] [Signature: Civil Registrar]</p>

        <div className="mt-[1em] border border-ink/25 p-[0.9em]">
          <p className="font-display text-[1.15em] font-semibold text-ink">Certification of Translation</p>
          <p className="mt-[0.4em] text-ink-soft">
            I certify that I am competent to translate from Spanish into English, and that the above is a complete and
            accurate translation of the attached document.
          </p>
          <div className="mt-[0.9em] flex justify-between gap-[1em] text-ink-muted">
            <span className="flex-1 border-t border-ink/40 pt-[0.3em]">Translator&apos;s signature</span>
            <span className="w-[32%] border-t border-ink/40 pt-[0.3em]">Date</span>
          </div>
        </div>
        <span className="absolute -top-[1.1em] right-[5%] rounded-soft bg-marker px-[0.8em] py-[0.25em] text-[0.95em] font-medium text-ink">
          Traducción · Inglés
        </span>
      </div>

      <span className="absolute left-[2%] bottom-[3%] rounded-soft border border-line bg-paper px-[0.7em] py-[0.2em] text-[0.95em] text-ink-muted">
        Ejemplo
      </span>
    </figure>
  );
}
