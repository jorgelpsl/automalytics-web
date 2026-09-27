import { Plus } from "lucide-react";
import { FAQ } from "@/data/faq";

export function Faq() {
  return (
    <section id="preguntas" className="section grid gap-12 lg:grid-cols-12 lg:gap-8">
      <div className="flex flex-col gap-4 lg:col-span-4">
        <p className="eyebrow">Preguntas frecuentes</p>
        <h2 className="font-display text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">Antes de cotizar.</h2>
      </div>

      <div className="border-t border-line lg:col-span-7 lg:col-start-6">
        {FAQ.map((item) => (
          <details key={item.question} className="group border-b border-line">
            <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-medium [&::-webkit-details-marker]:hidden">
              {item.question}
              <Plus
                size={20}
                aria-hidden="true"
                className="shrink-0 text-ink-muted transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
              />
            </summary>
            <p className="max-w-2xl pb-6 leading-relaxed text-ink-soft">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
