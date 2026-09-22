"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingCart } from "lucide-react";
import { NAV_LINKS, SITE } from "@/data/site";
import { SensiMascot } from "@/components/SensiMascot";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useCart } from "@/context/CartContext";
import { generalWhatsAppUrl } from "@/lib/whatsapp";
import { MobileMenu } from "@/components/MobileMenu";
import { SearchModal } from "@/components/SearchModal";

export function Header() {
  const { itemCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <SensiMascot className="h-10 w-10 shrink-0" />
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
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar productos"
              className="rounded-full p-2 text-brand-dark transition-colors hover:bg-slate-100"
            >
              <Search size={20} />
            </button>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Carrito de compras, ${itemCount} productos`}
              className="relative rounded-full p-2 text-brand-dark transition-colors hover:bg-slate-100"
            >
              <ShoppingCart size={20} />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-coral px-1 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            </button>
            <WhatsAppButton
              href={generalWhatsAppUrl()}
              className="hidden lg:inline-flex"
            />
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
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
