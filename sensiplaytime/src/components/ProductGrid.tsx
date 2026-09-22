import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types";

export function ProductGrid({
  products,
  emptyMessage = "No encontramos productos con esa búsqueda.",
}: {
  products: Product[];
  emptyMessage?: string;
}) {
  if (products.length === 0) {
    return <p className="py-16 text-center text-slate-500">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
