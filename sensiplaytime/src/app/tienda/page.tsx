import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ProductGrid } from "@/components/ProductGrid";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import type { CategorySlug } from "@/types";

export const metadata: Metadata = {
  title: "Tienda | SensiPlayTime",
  description: "Explora todos los fidgets, personalizados y piezas impresas en 3D de SensiPlayTime.",
};

const FILTERS: { slug: CategorySlug | "todos"; label: string }[] = [
  { slug: "todos", label: "Todos" },
  ...CATEGORIES.map((c) => ({ slug: c.slug, label: c.name })),
];

export default async function TiendaPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const activeCategory = categoria && CATEGORIES.some((c) => c.slug === categoria) ? categoria : "todos";
  const products = activeCategory === "todos" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <>
      <PageHero title="Tienda" description="Todos nuestros fidgets, productos personalizados y piezas impresas en 3D, en un solo lugar." />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-12 lg:px-8">
        <nav aria-label="Filtrar por categoría" className="mb-8 flex flex-wrap gap-2">
          {FILTERS.map((filter) => {
            const isActive = filter.slug === activeCategory;
            const href = filter.slug === "todos" ? "/tienda" : `/tienda?categoria=${filter.slug}`;
            return (
              <Link
                key={filter.slug}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive ? "bg-brand-dark text-white" : "bg-white text-brand-dark ring-1 ring-slate-200 hover:ring-brand-turquoise"
                }`}
              >
                {filter.label}
              </Link>
            );
          })}
        </nav>
        <ProductGrid products={products} emptyMessage="Todavía no hay productos en esta categoría." />
      </section>
    </>
  );
}
