import { ArrowRight, Brain, Heart, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
              href="#productos-destacados"
              className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Explorar productos
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <WhatsAppButton href={generalWhatsAppUrl()} variant="outline" />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl animate-fade-up lg:max-w-none">
          <div className="overflow-hidden rounded-[32px] shadow-soft-lg">
            <Image
              src="/hero-sensiplaytime.webp"
              alt="Tortuga mascota Sensi junto a fidgets, llaveros y piezas impresas en 3D de SensiPlayTime sobre una mesa"
              width={1320}
              height={750}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
