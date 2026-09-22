import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { FAQ_ITEMS } from "@/data/faq";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Preguntas frecuentes | SensiPlayTime",
  description: "Envíos, cambios, devoluciones y todo lo que necesitas saber para comprar en SensiPlayTime.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero title="Preguntas frecuentes" description="Todo lo que necesitas saber antes de comprar." />
      <section className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <dl className="flex flex-col divide-y divide-slate-100">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={item.question}
              id={i === 1 ? "despachos" : i === 3 ? "cambios" : undefined}
              className="py-5"
            >
              <dt className="font-heading text-base font-bold text-brand-dark">{item.question}</dt>
              <dd className="mt-2 text-sm text-slate-600">{item.answer}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 rounded-brand bg-brand-cream p-6 text-center">
          <p className="font-heading text-lg font-bold text-brand-dark">¿No encontraste lo que buscabas?</p>
          <p className="mt-1 text-sm text-slate-600">Escríbenos por WhatsApp y te ayudamos directamente.</p>
          <WhatsAppButton href={generalWhatsAppUrl()} className="mt-4" />
        </div>
      </section>
    </>
  );
}
