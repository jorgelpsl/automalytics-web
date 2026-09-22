"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "@/data/site";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { generalWhatsAppUrl } from "@/lib/whatsapp";
import { MobileMenu } from "@/components/MobileMenu";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-wine/10 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-flora-mancilla.webp"
              alt="Flora Mancilla, Psicóloga Clínica"
              width={331}
              height={235}
              priority
              className="h-11 w-auto sm:h-12"
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-sm text-ink/80 transition-colors hover:text-wine"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <WhatsAppButton href={generalWhatsAppUrl()} label="Agendar hora" className="hidden lg:inline-flex" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menú"
              className="rounded-soft p-2 text-wine transition-colors hover:bg-wine/10 lg:hidden"
            >
              <Menu size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
