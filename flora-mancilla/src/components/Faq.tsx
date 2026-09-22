import { ChevronDown } from "lucide-react";
import { FAQ } from "@/data/faq";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export function Faq() {
  return (
    <section id="preguntas-frecuentes" className="bg-cream-alt">
      <div className="mx-auto max-w-3xl px-4 py-20 lg:px-8">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-wine">
            Preguntas frecuentes
          </span>
          <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">
            Dudas antes de empezar
          </h2>
        </RevealOnScroll>

        <div className="mt-12 flex flex-col gap-3">
          {FAQ.map((item, index) => (
            <RevealOnScroll key={item.question} delayMs={index * 60}>
              <details className="group rounded-card border border-wine/12 bg-cream px-5 py-4 open:shadow-soft">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-ink marker:content-none">
                  {item.question}
                  <ChevronDown
                    size={18}
                    className="shrink-0 text-wine transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 text-sm text-ink/70">{item.answer}</p>
              </details>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
