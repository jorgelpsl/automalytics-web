import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Contacto | SensiPlayTime",
  description: "Escríbenos por WhatsApp o correo, estamos en Maipú, Santiago de Chile.",
};

export default function ContactoPage() {
  return (
    <>
      <PageHero title="Contacto" description="¿Tienes dudas o quieres personalizar un producto? Escríbenos." />
      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-12 lg:grid-cols-2 lg:px-8">
        <ContactForm />
        <div className="flex flex-col gap-4 rounded-brand bg-brand-cream p-6">
          <div className="flex items-center gap-3">
            <MessageCircle size={18} className="text-brand-turquoise" aria-hidden="true" />
            <span className="text-sm text-brand-dark">Respondemos por WhatsApp en horario comercial.</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={18} className="text-brand-turquoise" aria-hidden="true" />
            <a href={`mailto:${SITE.email}`} className="text-sm text-brand-dark hover:underline">
              {SITE.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-brand-turquoise" aria-hidden="true" />
            <span className="text-sm text-brand-dark">{SITE.city}</span>
          </div>
        </div>
      </section>
    </>
  );
}
