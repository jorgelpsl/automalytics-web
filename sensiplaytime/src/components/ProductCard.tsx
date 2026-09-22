"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { ToyIllustration } from "@/components/ToyIllustration";
import { StarRating } from "@/components/StarRating";
import { useCart } from "@/context/CartContext";
import { formatCLP } from "@/lib/format";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <article className="group flex flex-col overflow-hidden rounded-brand border border-slate-100 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg">
      <Link
        href={`/product/${product.slug}`}
        className={`${product.image.bg} flex aspect-square items-center justify-center p-8`}
      >
        <ToyIllustration
          variant={product.image.variant}
          className="h-full w-full max-w-[160px] transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/product/${product.slug}`} className="font-heading text-base font-semibold text-brand-dark">
          {product.name}
        </Link>
        <StarRating rating={product.rating} reviewsCount={product.reviewsCount} />
        <p className="font-heading text-lg font-bold text-brand-dark">{formatCLP(product.price)}</p>
        <button
          type="button"
          onClick={() => addToCart(product.id)}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-brand-dark/15 bg-white px-4 py-2.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-dark hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-turquoise"
        >
          <ShoppingCart size={16} aria-hidden="true" />
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}
