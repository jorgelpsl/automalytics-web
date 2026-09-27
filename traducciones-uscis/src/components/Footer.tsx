import { SITE, NAV_LINKS } from "@/data/site";
import { Logo } from "@/components/Logo";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid w-full max-w-content gap-10 px-4 py-14 sm:px-6 md:grid-cols-12 lg:px-8">
        <div className="flex flex-col gap-4 md:col-span-5">
          <span className="w-fit rounded-soft bg-paper px-3 py-2">
            <Logo />
          </span>
          <p className="max-w-sm text-sm leading-relaxed text-paper/70">
            Servicio privado de traducción. No estamos afiliados a USCIS ni al gobierno de Estados Unidos, y no damos
            asesoría legal migratoria.
          </p>
        </div>

        <nav aria-label="Secciones" className="flex flex-col gap-3 text-sm md:col-span-3">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="w-fit text-paper/80 hover:text-paper">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-sm md:col-span-4">
          <p className="font-medium">Contacto</p>
          <a href={generalWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="w-fit text-paper/80 hover:text-paper">
            WhatsApp
          </a>
          {SITE.email && (
            <a href={`mailto:${SITE.email}`} className="w-fit text-paper/80 hover:text-paper">
              {SITE.email}
            </a>
          )}
        </div>
      </div>
      <div className="border-t border-paper/15">
        <p className="mx-auto w-full max-w-content px-4 py-6 text-xs text-paper/60 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {SITE.name}
        </p>
      </div>
    </footer>
  );
}
