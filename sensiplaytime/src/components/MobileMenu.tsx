"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { NAV_LINKS } from "@/data/site";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menú">
      <button
        type="button"
        aria-label="Cerrar menú"
        onClick={onClose}
        className="absolute inset-0 bg-brand-dark/40"
      />
      <div className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col gap-6 bg-white p-6 shadow-soft-lg">
        <div className="flex items-center justify-between">
          <span className="font-heading text-lg font-bold text-brand-dark">Menú</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="rounded-full p-2 text-brand-dark hover:bg-slate-100"
          >
            <X size={22} />
          </button>
        </div>
        <nav className="flex flex-col gap-1" aria-label="Navegación móvil">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="rounded-xl px-3 py-3 font-heading text-base font-semibold text-brand-dark hover:bg-brand-cream"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <WhatsAppButton href={generalWhatsAppUrl()} className="mt-auto w-full" />
      </div>
    </div>
  );
}
