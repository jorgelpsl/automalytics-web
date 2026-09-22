"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types";

export function ProductDetailActions({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-full border border-slate-200">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          aria-label="Restar unidad"
          className="p-3 text-brand-dark hover:text-brand-turquoise"
        >
          <Minus size={16} />
        </button>
        <span className="w-8 text-center text-sm font-semibold text-brand-dark" aria-live="polite">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => setQuantity((q) => q + 1)}
          aria-label="Sumar unidad"
          className="p-3 text-brand-dark hover:text-brand-turquoise"
        >
          <Plus size={16} />
        </button>
      </div>
      <button
        type="button"
        onClick={() => addToCart(product.id, quantity)}
        className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
      >
        <ShoppingCart size={18} aria-hidden="true" />
        Agregar al carrito
      </button>
    </div>
  );
}
