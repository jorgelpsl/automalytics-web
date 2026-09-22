"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, MessageCircle } from "lucide-react";
import { SITE, FOOTER_COLUMNS } from "@/data/site";
import { InstagramIcon, TikTokIcon } from "@/components/SocialIcons";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // No newsletter backend yet — this just confirms the intent locally so
    // the form isn't a dead end while that integration is pending.
    setSubmitted(true);
  }

  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/mascot-icon.webp" alt="" width={1452} height={615} className="h-10 w-auto" />
              <span className="flex flex-col leading-tight">
                <span className="font-heading text-lg font-bold text-brand-dark">{SITE.name}</span>
                <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-turquoise">
                  {SITE.tagline}
                </span>
              </span>
            </Link>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SensiPlayTime en Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-cream text-brand-dark transition-colors hover:bg-brand-turquoise hover:text-white"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={SITE.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SensiPlayTime en TikTok"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-cream text-brand-dark transition-colors hover:bg-brand-turquoise hover:text-white"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
              <a
                href={generalWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SensiPlayTime en WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-cream text-brand-dark transition-colors hover:bg-brand-turquoise hover:text-white"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-brand-dark">{col.title}</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-600 hover:text-brand-turquoise">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-heading text-sm font-bold text-brand-dark">Únete a nuestra comunidad</h3>
            <p className="mt-2 text-sm text-slate-600">Recibe novedades y lanzamientos</p>
            {submitted ? (
              <p className="mt-3 text-sm font-semibold text-brand-turquoise">¡Gracias por suscribirte!</p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2">
                <label htmlFor="newsletter-email" className="sr-only">
                  Tu correo electrónico
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  className="rounded-full border border-slate-200 px-4 py-2.5 text-sm text-brand-dark outline-none focus:border-brand-turquoise"
                />
                <button
                  type="submit"
                  className="rounded-full bg-brand-turquoise px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#38b0a9]"
                >
                  Suscribirme
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} aria-hidden="true" /> {SITE.city}
            </span>
            <span>{SITE.tagline}.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
