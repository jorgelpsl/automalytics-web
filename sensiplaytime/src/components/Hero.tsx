import { ArrowRight, Brain, Hand, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

const BENEFITS = [
  { icon: Brain, label: "Concentración y calma", color: "text-brand-turquoise" },
  { icon: Hand, label: "Exploración sensorial", color: "text-brand-yellow" },
  { icon: Heart, label: "Diversión para todos", color: "text-brand-coral" },
];

function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 24" aria-hidden="true" className={className}>
      <path
        d="M3 18C8 6 14 6 19 13C24 20 30 20 37 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="overflow-hidden bg-brand-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">
        <div className="animate-fade-up">
          <h1 className="relative font-heading text-4xl font-bold leading-[1.05] text-brand-dark sm:text-5xl lg:text-6xl">
            <Squiggle className="absolute -left-3 -top-6 h-4 w-7 -rotate-12 text-brand-turquoise sm:-top-7 sm:h-5 sm:w-9" />
            Juega, Siente,
            <Squiggle className="ml-1.5 inline-block h-4 w-7 -translate-y-3 rotate-6 text-brand-turquoise sm:h-5 sm:w-9" />
            <br />
            <span className="relative inline-block text-brand-turquoise">
              Descubre.
              <Squiggle className="absolute -right-9 top-1 h-4 w-7 rotate-3 text-brand-turquoise sm:h-5 sm:w-9" />
            </span>
          </h1>
          <p className="mt-5 max-w-md text-base text-slate-600 sm:text-lg">
            Fidgets y productos <strong className="font-bold text-brand-turquoise">sensoriales</strong> creados
            para <strong className="font-bold text-brand-dark">transformar pequeños momentos</strong> en{" "}
            <strong className="font-bold text-brand-dark">grandes experiencias</strong>.
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {BENEFITS.map(({ icon: Icon, label, color }) => (
              <li key={label} className="flex items-center gap-2 text-sm font-semibold text-brand-dark">
                <Icon size={22} className={color} aria-hidden="true" />
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
          <div className="overflow-hidden rounded-[32px] shadow-soft-lg sm:rounded-[40px]">
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
