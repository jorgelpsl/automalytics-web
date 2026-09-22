"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { searchProducts } from "@/data/products";
import { ToyIllustration } from "@/components/ToyIllustration";
import { formatCLP } from "@/lib/format";

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const results = searchProducts(query);

  // Clearing the query lives in the close handler itself, not a `!open`
  // effect — the modal stays mounted (it just renders null) between
  // toggles, so an effect would re-run setState on every close.
  function handleClose() {
    setQuery("");
    onClose();
  }

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- handleClose is redefined each render but has stable behavior; including it would re-bind the listener every render for no benefit.
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Buscar productos">
      <button
        type="button"
        aria-label="Cerrar búsqueda"
        onClick={handleClose}
        className="absolute inset-0 bg-brand-dark/40"
      />
      <div className="absolute left-1/2 top-16 w-[92%] max-w-xl -translate-x-1/2 rounded-brand bg-white p-4 shadow-soft-lg sm:p-6">
        <div className="flex items-center gap-3 rounded-full border border-slate-200 px-4 py-2.5">
          <Search size={18} className="shrink-0 text-slate-400" aria-hidden="true" />
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, categoría o descripción…"
            aria-label="Buscar productos"
            className="w-full text-sm text-brand-dark outline-none placeholder:text-slate-400"
          />
          <button type="button" onClick={handleClose} aria-label="Cerrar búsqueda" className="shrink-0 text-slate-400 hover:text-brand-dark">
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 max-h-[60vh] overflow-y-auto">
          {query.trim() === "" ? (
            <p className="py-10 text-center text-sm text-slate-500">Escribe algo para buscar en la tienda.</p>
          ) : results.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-500">No encontramos productos con esa búsqueda.</p>
          ) : (
            <ul className="flex flex-col gap-1">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={handleClose}
                    className="flex items-center gap-3 rounded-xl p-2 hover:bg-brand-cream"
                  >
                    <div className={`${product.image.bg} flex h-12 w-12 shrink-0 items-center justify-center rounded-lg p-2`}>
                      <ToyIllustration variant={product.image.variant} className="h-full w-full" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-brand-dark">{product.name}</span>
                      <span className="text-xs text-slate-500">{formatCLP(product.price)}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
