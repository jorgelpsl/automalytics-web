import { Box, Gem, Heart, Leaf } from "lucide-react";
import { SensiMascot } from "@/components/SensiMascot";

const BENEFITS = [
  { icon: Gem, title: "Diseños únicos", description: "Creaciones originales e impresas en 3D." },
  { icon: Leaf, title: "Materiales de calidad", description: "Seguros, resistentes y duraderos." },
  { icon: Box, title: "Para todas las edades", description: "Desde niños hasta adultos." },
  { icon: Heart, title: "Hecho en Chile", description: "En Maipú, con mucho cariño." },
];

export function Benefits() {
  return (
    <section className="bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16 lg:px-8">
        <h2 className="text-center font-heading text-3xl font-bold text-brand-dark sm:text-left">
          ¿Por qué elegir SensiPlayTime?
        </h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-soft">
                  <Icon size={22} className="text-brand-turquoise" aria-hidden="true" />
                </span>
                <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-brand-dark">{title}</h3>
                <p className="text-sm text-slate-600">{description}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="relative rounded-2xl bg-white px-5 py-4 text-sm text-brand-dark shadow-soft">
              <p className="max-w-[22ch] font-semibold">
                ¡Hola! Soy Sensi y estoy aquí para hacer tus días más divertidos.{" "}
                <Heart size={14} className="inline fill-brand-coral text-brand-coral" aria-hidden="true" />
              </p>
              <span className="absolute -right-2 bottom-4 h-4 w-4 rotate-45 bg-white" aria-hidden="true" />
            </div>
            <SensiMascot className="h-28 w-28 shrink-0 sm:h-32 sm:w-32" />
          </div>
        </div>
      </div>
    </section>
  );
}
