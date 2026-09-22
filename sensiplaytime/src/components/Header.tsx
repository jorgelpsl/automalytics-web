"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { NAV_LINKS, SITE } from "@/data/site";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { generalWhatsAppUrl } from "@/lib/whatsapp";
import { MobileMenu } from "@/components/MobileMenu";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/mascot-icon.webp"
              alt=""
              width={1452}
              height={615}
              priority
              className="h-9 w-auto shrink-0 sm:h-10"
            />
            <span className="flex flex-col leading-tight">
              <span className="font-heading text-lg font-bold text-brand-dark sm:text-xl">{SITE.name}</span>
              <span className="hidden text-[11px] font-semibold uppercase tracking-wide text-brand-turquoise min-[360px]:inline">
                {SITE.tagline}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-slate-600 transition-colors hover:text-brand-dark"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <WhatsAppButton href={generalWhatsAppUrl()} className="hidden lg:inline-flex" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menú"
              className="rounded-full p-2 text-brand-dark transition-colors hover:bg-slate-100 lg:hidden"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
