"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { SITE } from "@/data/site";
import { type Lang } from "@/i18n/config";
import { COMMON, fmt } from "@/i18n/copy/common";
import { ROUTES, homeSection } from "@/i18n/routes";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";

export function Header({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const copy = COMMON[lang];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between gap-6 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <Link href={ROUTES.home[lang]} aria-label={fmt(copy.header.homeAria, { name: SITE.name })} className="rounded-soft">
          <Logo />
        </Link>

        <nav aria-label={copy.header.navAria} className="hidden items-center gap-8 lg:flex">
          {copy.nav.map((link) => (
            <a key={link.href} href={link.href} className="text-[15px] text-ink-soft transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher lang={lang} />
          <Link href={homeSection(lang, "cotizar")} className="btn-primary hidden min-h-[44px] px-5 text-[15px] sm:inline-flex">
            {copy.header.buy}
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={copy.header.openMenu}
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center rounded-soft border border-line text-ink lg:hidden"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
      <MobileMenu lang={lang} open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
