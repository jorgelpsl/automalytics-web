import Image from "next/image";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
        <div className="animate-fade-up">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-wine">
            Psicoterapia individual para adultos
          </span>
          <h1 className="mt-4 font-display text-4xl leading-[1.12] text-ink sm:text-5xl lg:text-[3.4rem]">
            Un espacio para <em className="text-wine not-italic">conocerte</em>, sin apuro.
          </h1>
          <p className="mt-6 max-w-md text-base text-ink/75 sm:text-lg">
            Terapia en un ambiente cercano y sin juicios. No necesitas estar en crisis para
            empezar — solo tener ganas de conocerte mejor.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton href={generalWhatsAppUrl()} label="Agendar una hora" />
            <a
              href="#servicios"
              className="inline-flex items-center justify-center gap-2 rounded-soft border border-wine/30 px-5 py-3 text-sm font-semibold text-wine transition-colors hover:bg-wine/5"
            >
              Conocer los servicios
            </a>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-sm animate-fade-in justify-center lg:max-w-none lg:justify-end">
          <div
            aria-hidden="true"
            className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-wine/15 via-cream-alt to-wine/10 blur-2xl"
          />
          <div className="relative w-64 -rotate-3 overflow-hidden rounded-card border border-white bg-white shadow-soft-lg transition-transform duration-500 hover:rotate-0 sm:w-72">
            <Image
              src="/post-terapia.webp"
              alt='Publicación de Flora Mancilla: "¿Ir a terapia aunque no estés mal? Sí, porque no necesitas estar en crisis para conocerte mejor."'
              width={440}
              height={498}
              priority
              className="h-auto w-full"
            />
          </div>
          <Image
            src="/flora-mark.webp"
            alt=""
            width={151}
            height={130}
            className="absolute -bottom-7 -left-6 h-24 w-auto opacity-90 drop-shadow-md animate-drift sm:h-28"
          />
        </div>
      </div>
    </section>
  );
}
