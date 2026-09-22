import { ArrowRight, Brain, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { SensiMascot } from "@/components/SensiMascot";
import { ToyIllustration } from "@/components/ToyIllustration";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

const BENEFITS = [
  { icon: Brain, label: "Concentración y calma" },
  { icon: Sparkles, label: "Exploración sensorial" },
  { icon: Heart, label: "Diversión para todos" },
];

export function Hero() {
  return (
    <section className="overflow-hidden bg-brand-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:py-16 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-20">
        <div className="animate-fade-up">
          <h1 className="font-heading text-4xl font-bold leading-[1.05] text-brand-dark sm:text-5xl lg:text-6xl">
            Juega. Siente.
            <br />
            <span className="text-brand-turquoise">Descubre.</span>
          </h1>
          <p className="mt-5 max-w-md text-base text-slate-600 sm:text-lg">
            Fidgets y productos sensoriales creados para transformar pequeños momentos en grandes
            experiencias.
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {BENEFITS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm font-semibold text-brand-dark">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-soft">
                  <Icon size={16} className="text-brand-turquoise" aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/tienda"
              className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Explorar productos
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <WhatsAppButton href={generalWhatsAppUrl()} variant="outline" />
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md animate-fade-up lg:max-w-none">
          <div className="absolute inset-0 rounded-[32px] bg-white/60" />
          <SensiMascot className="absolute bottom-6 left-2 h-40 w-40 drop-shadow-lg sm:h-52 sm:w-52" />
          <ToyIllustration
            variant="tablero"
            className="absolute right-4 top-6 h-24 w-24 drop-shadow-md sm:h-28 sm:w-28"
          />
          <ToyIllustration
            variant="estrella"
            className="absolute right-8 bottom-8 h-20 w-20 drop-shadow-md sm:h-24 sm:w-24"
          />
          <ToyIllustration
            variant="llavero"
            className="absolute left-10 top-4 h-16 w-16 drop-shadow-md sm:h-20 sm:w-20"
          />
          <ToyIllustration
            variant="cadena"
            className="absolute right-24 top-1/2 h-16 w-16 -translate-y-1/2 drop-shadow-md sm:h-20 sm:w-20"
          />
          <ToyIllustration
            variant="engranajes"
            className="absolute left-6 top-4 h-14 w-14 drop-shadow-md sm:h-16 sm:w-16"
          />
          <ToyIllustration
            variant="blob"
            className="absolute bottom-4 left-4 h-14 w-14 drop-shadow-md sm:h-16 sm:w-16"
          />

          <div className="absolute left-6 top-1/3 hidden rounded-2xl bg-white px-3 py-2 text-center text-xs font-semibold text-brand-dark shadow-soft sm:block">
            Pequeños detalles
            <br />
            Grandes sonrisas
          </div>
          <div className="absolute right-2 top-2 hidden rounded-2xl bg-white px-3 py-2 text-center text-xs font-semibold text-brand-dark shadow-soft sm:block">
            Hecho en
            <br />
            Maipú, Chile
          </div>
        </div>
      </div>
    </section>
  );
}
