import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductGrid } from "@/components/ProductGrid";
import { Benefits } from "@/components/Benefits";
import { PersonalizationSection } from "@/components/PersonalizationSection";
import { MadeInChile } from "@/components/MadeInChile";
import { BrandMoment } from "@/components/BrandMoment";
import { InstagramFeed } from "@/components/InstagramFeed";
import { CATEGORIES } from "@/data/categories";
import { getFeaturedProducts } from "@/data/products";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <Hero />

      <section aria-label="Categorías" className="mx-auto max-w-7xl px-4 py-10 sm:py-12 lg:px-8">
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-12 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="font-heading text-2xl font-bold text-brand-dark sm:text-3xl">Productos destacados</h2>
          <Link
            href="/tienda"
            className="hidden items-center gap-1.5 text-sm font-semibold text-brand-turquoise hover:underline sm:flex"
          >
            Ver todos los productos
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
        <Link
          href="/tienda"
          className="mt-6 flex items-center justify-center gap-1.5 text-sm font-semibold text-brand-turquoise hover:underline sm:hidden"
        >
          Ver todos los productos
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>

      <Benefits />

      <section aria-label="Personalización, producción local y marca" className="mx-auto max-w-7xl px-4 py-10 sm:py-12 lg:px-8">
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
          <PersonalizationSection />
          <MadeInChile />
          <BrandMoment />
        </div>
      </section>

      <InstagramFeed />
    </>
  );
}
