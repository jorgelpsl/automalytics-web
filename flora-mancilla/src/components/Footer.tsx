import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { NAV_LINKS, SITE } from "@/data/site";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="border-t border-wine/10 bg-cream-alt">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
          <Image
            src="/logo-flora-mancilla.webp"
            alt="Flora Mancilla, Psicóloga Clínica"
            width={331}
            height={235}
            className="h-14 w-auto"
          />
          <p className="max-w-[32ch] text-sm text-ink/70">
            Psicoterapia individual para adultos, en un espacio cercano y sin juicios.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-lg text-wine">Navegación</h3>
          <ul className="flex flex-col gap-2 text-sm text-ink/75">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-wine">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-lg text-wine">Contacto</h3>
          <ul className="flex flex-col gap-2 text-sm text-ink/75">
            <li className="flex items-center gap-2">
              <Phone size={15} className="shrink-0 text-wine" aria-hidden="true" />
              <a href={generalWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-wine">
                {SITE.whatsappDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={15} className="shrink-0 text-wine" aria-hidden="true" />
              <a href={`mailto:${SITE.email}`} className="hover:text-wine">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={15} className="shrink-0 text-wine" aria-hidden="true" />
              {SITE.city}
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-lg text-wine">Atención</h3>
          <p className="text-sm text-ink/75">Online y presencial, con horas coordinadas por WhatsApp.</p>
        </div>
      </div>

      <div className="border-t border-wine/10 px-4 py-6 text-center text-xs text-ink/50 lg:px-8">
        © {new Date().getFullYear()} {SITE.name}, {SITE.role}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
