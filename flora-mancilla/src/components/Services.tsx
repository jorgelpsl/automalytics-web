import { SERVICES } from "@/data/services";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export function Services() {
  return (
    <section id="servicios" className="bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-20 lg:px-8">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-wine">
            Servicios
          </span>
          <h2 className="mt-4 font-display text-3xl text-ink sm:text-4xl">
            En qué te puedo acompañar
          </h2>
        </RevealOnScroll>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {SERVICES.map((service, index) => (
            <RevealOnScroll key={service.title} delayMs={index * 80}>
              <div className="h-full rounded-card border border-wine/12 bg-cream-alt p-7 shadow-soft transition-transform hover:-translate-y-1">
                <span className="font-display text-3xl text-wine/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-xl text-ink">{service.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{service.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
