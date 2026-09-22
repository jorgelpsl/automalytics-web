import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ToyIllustration } from "@/components/ToyIllustration";
import { StarRating } from "@/components/StarRating";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductDetailActions } from "@/components/ProductDetailActions";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getProduct, getProductsByCategory, PRODUCTS } from "@/data/products";
import { getCategory } from "@/data/categories";
import { formatCLP } from "@/lib/format";
import { productWhatsAppUrl } from "@/lib/whatsapp";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Producto no encontrado | SensiPlayTime" };
  return {
    title: `${product.name} | SensiPlayTime`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getProductsByCategory(product.category).filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
        <nav aria-label="Miga de pan" className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-brand-turquoise">Inicio</Link>
          <ChevronRight size={12} aria-hidden="true" />
          <Link href="/tienda" className="hover:text-brand-turquoise">Tienda</Link>
          {category && (
            <>
              <ChevronRight size={12} aria-hidden="true" />
              <Link href={`/categorias/${category.slug}`} className="hover:text-brand-turquoise">
                {category.name}
              </Link>
            </>
          )}
          <ChevronRight size={12} aria-hidden="true" />
          <span className="text-brand-dark">{product.name}</span>
        </nav>
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-12 pt-4 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <div className={`${product.image.bg} flex aspect-square items-center justify-center rounded-brand p-12`}>
          <ToyIllustration variant={product.image.variant} className="h-full w-full max-w-xs" />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="font-heading text-3xl font-bold text-brand-dark">{product.name}</h1>
          <StarRating rating={product.rating} reviewsCount={product.reviewsCount} />
          <p className="font-heading text-3xl font-bold text-brand-dark">{formatCLP(product.price)}</p>
          <p className="max-w-lg text-slate-600">{product.description}</p>

          {!product.available && (
            <p className="w-fit rounded-full bg-brand-coral/15 px-3 py-1 text-sm font-semibold text-brand-coral">
              Agotado temporalmente
            </p>
          )}

          <ProductDetailActions product={product} />
          <WhatsAppButton href={productWhatsAppUrl(product)} variant="outline" className="w-fit" />
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
          <h2 className="mb-6 font-heading text-2xl font-bold text-brand-dark">También te puede gustar</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </>
  );
}
