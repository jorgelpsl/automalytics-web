import Image from "next/image";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { generalWhatsAppUrl } from "@/lib/whatsapp";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export function ClosingCta() {
  return (
    <section className="bg-wine">
      <RevealOnScroll className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center lg:px-8">
        <Image
          src="/flora-mark.webp"
          alt=""
          width={151}
          height={130}
          className="h-16 w-auto brightness-0 invert sm:h-20"
        />
        <h2 className="font-display text-3xl text-cream sm:text-4xl">
          Cuando quieras empezar, aquí estoy.
        </h2>
        <p className="max-w-lg text-cream/80">
          Escríbeme por WhatsApp o agenda tu primera hora más arriba. No hay apuro.
        </p>
        <WhatsAppButton
          href={generalWhatsAppUrl()}
          label="Escribir por WhatsApp"
          className="!bg-cream !text-wine hover:!bg-cream/90"
        />
      </RevealOnScroll>
    </section>
  );
}
