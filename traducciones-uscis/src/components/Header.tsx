"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { NAV_LINKS, SITE } from "@/data/site";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between gap-6 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <a href="#" aria-label={`${SITE.name}, inicio`} className="rounded-soft">
          <Logo />
        </a>

        <nav aria-label="Navegación principal" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-[15px] text-ink-soft transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#cotizar" className="btn-primary hidden min-h-[44px] px-5 text-[15px] sm:inline-flex">
            Cotizar traducción
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center rounded-soft border border-line text-ink lg:hidden"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
