"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { type Lang } from "@/i18n/config";
import { COMMON } from "@/i18n/copy/common";
import { homeSection } from "@/i18n/routes";

export function MobileMenu({ lang, open, onClose }: { lang: Lang; open: boolean; onClose: () => void }) {
  const copy = COMMON[lang].header;
  const nav = COMMON[lang].nav;
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
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={copy.menu}>
      <button type="button" aria-label={copy.closeMenu} onClick={onClose} className="absolute inset-0 bg-ink/40" tabIndex={-1} />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-xs flex-col gap-8 bg-paper p-6 shadow-sheet">
        <div className="flex justify-end">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={copy.closeMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-soft border border-line text-ink"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <nav aria-label={copy.navAria} className="flex flex-col">
          {nav.map((link) => (
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
        <Link href={homeSection(lang, "cotizar")} onClick={onClose} className="btn-primary w-full">
          {copy.buy}
        </Link>
      </div>
    </div>
  );
}
