import Image from "next/image";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export function About() {
  return (
    <section id="sobre-mi" className="bg-cream-alt">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        <RevealOnScroll className="relative mx-auto flex w-full max-w-xs justify-center lg:max-w-none">
          <div className="flex aspect-[4/5] w-full max-w-xs items-center justify-center rounded-card border border-wine/15 bg-cream p-10 shadow-soft">
            <Image
              src="/flora-mark.webp"
              alt="Flora Mancilla"
              width={151}
              height={130}
              className="h-32 w-auto sm:h-40"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={120}>
          <span className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-wine">
            Sobre mí
          </span>
          <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">
            Psicoterapia con un enfoque cercano
          </h2>
          <div className="mt-6 flex flex-col gap-4 text-base text-ink/75 sm:text-lg">
            <p>
              Soy Flora Mancilla, psicóloga clínica. Acompaño procesos de terapia individual para
              adultos que buscan entenderse mejor, sanar heridas antiguas o simplemente tener un
              espacio propio para pensar en voz alta.
            </p>
            <p>
              Trabajo desde la calidez y el respeto por tu ritmo: no hay una forma correcta de
              empezar terapia, ni un problema demasiado pequeño para traerlo a sesión.
            </p>
            <p>
              Las sesiones son online o presenciales, según lo que te acomode. Coordinamos todo
              directamente por WhatsApp.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
