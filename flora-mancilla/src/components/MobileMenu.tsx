"use client";

import { useEffect } from "react";
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
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Cerrar menú"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40"
      />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-xs flex-col gap-8 bg-cream p-6 shadow-soft-lg">
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="rounded-soft p-2 text-wine transition-colors hover:bg-wine/10"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <nav className="flex flex-col gap-5" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="font-display text-xl text-ink transition-colors hover:text-wine"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <WhatsAppButton href={generalWhatsAppUrl()} className="w-full" />
      </div>
    </div>
  );
}
