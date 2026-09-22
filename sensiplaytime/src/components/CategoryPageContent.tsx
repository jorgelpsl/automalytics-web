import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ProductGrid } from "@/components/ProductGrid";
import { getCategory } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import type { CategorySlug } from "@/types";

export function CategoryPageContent({ slug }: { slug: CategorySlug }) {
  const category = getCategory(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);

  return (
    <>
      <PageHero title={category.name} description={category.description} />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-12 lg:px-8">
        <ProductGrid products={products} emptyMessage="Todavía no hay productos en esta categoría." />
      </section>
    </>
  );
}
