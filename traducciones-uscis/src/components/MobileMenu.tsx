"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { NAV_LINKS } from "@/data/site";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menú">
      <button type="button" aria-label="Cerrar menú" onClick={onClose} className="absolute inset-0 bg-ink/40" tabIndex={-1} />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-xs flex-col gap-8 bg-paper p-6 shadow-sheet">
        <div className="flex justify-end">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="inline-flex h-11 w-11 items-center justify-center rounded-soft border border-line text-ink"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Navegación principal" className="flex flex-col">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex min-h-[52px] items-center border-b border-line font-display text-xl text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#cotizar" onClick={onClose} className="btn-primary w-full">
          Cotizar traducción
        </a>
      </div>
    </div>
  );
}
