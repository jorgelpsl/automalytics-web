import type { Metadata } from "next";
import { Leaf, Recycle, Ruler } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SensiMascot } from "@/components/SensiMascot";
import { ChileFlag } from "@/components/ChileFlag";

export const metadata: Metadata = {
  title: "Sobre nosotros | SensiPlayTime",
  description: "Conoce la historia y el compromiso de SensiPlayTime, hecha a mano en Maipú, Chile.",
};

const COMMITMENTS = [
  { icon: Ruler, title: "Diseño propio", text: "Cada pieza nace de un diseño original, pensado para el juego sensorial." },
  { icon: Leaf, title: "Materiales cuidados", text: "Elegimos filamentos y materiales pensados para durar y resistir el uso diario." },
  { icon: Recycle, title: "Producción a pedido", text: "Imprimimos por encargo para evitar stock innecesario y reducir el desperdicio." },
];

export default function SobreNosotrosPage() {
  return (
    <>
      <PageHero
        title="Sobre nosotros"
        description="Somos SensiPlayTime: una marca chilena de juguetes sensoriales, fidgets y productos personalizados."
      />

      <section className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <SensiMascot className="h-24 w-24 shrink-0" />
          <div>
            <h2 className="font-heading text-2xl font-bold text-brand-dark">Nuestra historia</h2>
            <p className="mt-2 text-slate-600">
              SensiPlayTime nació de las ganas de crear productos que se sintieran pensados de verdad: fidgets,
              piezas sensoriales y regalos personalizados diseñados e impresos en 3D en nuestro taller de Maipú.
              Cada producto se arma con calma, pieza por pieza, con Sensi —nuestra mascota tortuga— como guía del
              espíritu de la marca: jugar, sentir y descubrir.
            </p>
          </div>
        </div>
      </section>

      <section id="compromiso" className="bg-brand-cream">
        <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
          <h2 className="font-heading text-2xl font-bold text-brand-dark">Compromiso</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {COMMITMENTS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex flex-col items-start gap-2">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-soft">
                  <Icon size={20} className="text-brand-turquoise" aria-hidden="true" />
                </span>
                <h3 className="font-heading text-sm font-bold text-brand-dark">{title}</h3>
                <p className="text-sm text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="hecho-en-chile" className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <div className="flex items-center gap-3">
          <ChileFlag className="h-6 w-9 rounded-sm shadow-soft" />
          <h2 className="font-heading text-2xl font-bold text-brand-dark">Hecho en Chile</h2>
        </div>
        <p className="mt-3 max-w-2xl text-slate-600">
          Diseñamos, imprimimos y preparamos cada pedido en Maipú, Santiago. Elegir SensiPlayTime es apoyar un
          taller local que arma cada producto a mano, uno a la vez.
        </p>
      </section>
    </>
  );
}
