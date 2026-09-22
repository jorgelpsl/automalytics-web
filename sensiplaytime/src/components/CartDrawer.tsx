"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCLP } from "@/lib/format";
import { cartWhatsAppUrl } from "@/lib/whatsapp";
import { PRODUCTS } from "@/data/products";
import { ToyIllustration } from "@/components/ToyIllustration";

export function CartDrawer() {
  const { items, lines, subtotal, isOpen, closeCart, setQuantity, removeFromCart } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Carrito de compras">
      <button type="button" aria-label="Cerrar carrito" onClick={closeCart} className="absolute inset-0 bg-brand-dark/40" />
      <div className="absolute right-0 top-0 flex h-full w-[90%] max-w-md flex-col bg-white shadow-soft-lg">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <span className="flex items-center gap-2 font-heading text-lg font-bold text-brand-dark">
            <ShoppingBag size={20} /> Tu carrito
          </span>
          <button type="button" onClick={closeCart} aria-label="Cerrar carrito" className="rounded-full p-2 text-brand-dark hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <p className="py-16 text-center text-sm text-slate-500">Tu carrito está vacío. ¡Explora la tienda y agrega tus favoritos!</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex items-start gap-3">
                  <div className={`${product.image.bg} flex h-16 w-16 shrink-0 items-center justify-center rounded-xl p-2.5`}>
                    <ToyIllustration variant={product.image.variant} className="h-full w-full" />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <span className="text-sm font-semibold text-brand-dark">{product.name}</span>
                    <span className="text-sm text-slate-500">{formatCLP(product.price)}</span>
                    <div className="mt-1 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setQuantity(product.id, quantity - 1)}
                        aria-label={`Restar una unidad de ${product.name}`}
                        className="rounded-full border border-slate-200 p-1 text-brand-dark hover:bg-slate-100"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-5 text-center text-sm font-semibold text-brand-dark">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(product.id, quantity + 1)}
                        aria-label={`Sumar una unidad de ${product.name}`}
                        className="rounded-full border border-slate-200 p-1 text-brand-dark hover:bg-slate-100"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Quitar ${product.name} del carrito`}
                        className="ml-auto rounded-full p-1.5 text-slate-400 hover:bg-brand-coral/10 hover:text-brand-coral"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-slate-100 p-5">
            <div className="mb-4 flex items-center justify-between font-heading text-base font-bold text-brand-dark">
              <span>Subtotal</span>
              <span>{formatCLP(subtotal)}</span>
            </div>
            <a
              href={cartWhatsAppUrl(lines, PRODUCTS)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-full bg-brand-turquoise px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#38b0a9]"
            >
              Finalizar por WhatsApp
            </a>
            <Link
              href="/tienda"
              onClick={closeCart}
              className="mt-3 block text-center text-sm font-semibold text-brand-dark underline-offset-4 hover:underline"
            >
              Seguir comprando
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
