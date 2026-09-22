import { ArrowRight, Brain, Heart, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ChileFlag } from "@/components/ChileFlag";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

const BENEFITS = [
  { icon: Brain, label: "Concentración y calma" },
  { icon: Sparkles, label: "Exploración sensorial" },
  { icon: Heart, label: "Diversión para todos" },
];

export function Hero() {
  return (
    <section className="bg-brand-cream">
      <div className="grid lg:grid-cols-2 lg:items-stretch">
        <div className="mx-auto flex w-full max-w-7xl items-center px-4 py-12 sm:py-16 lg:px-8 lg:py-20">
          <div className="max-w-xl animate-fade-up">
            <h1 className="font-heading text-4xl font-bold leading-[1.05] text-brand-dark sm:text-5xl lg:text-6xl">
              Juega. Siente.
              <br />
              <span className="relative inline-block text-brand-turquoise">
                Descubre.
                <svg
                  viewBox="0 0 210 20"
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 h-3 w-[92%] text-brand-coral sm:h-4"
                >
                  <path
                    d="M4 14C42 4 88 4 118 11C150 18 178 17 206 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
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
        </div>

        <div className="relative h-[320px] animate-fade-up sm:h-[420px] lg:h-auto">
          <Image
            src="/hero-sensiplaytime.webp"
            alt="Tortuga mascota Sensi junto a fidgets, llaveros y piezas impresas en 3D de SensiPlayTime sobre una mesa"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover lg:rounded-l-[56px]"
          />

          <span className="absolute bottom-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-semibold text-brand-dark shadow-soft-lg sm:left-8">
            <ChileFlag className="h-4 w-6 shrink-0 rounded-sm" />
            Hecho en Maipú, Chile
          </span>
        </div>
      </div>
    </section>
  );
}
