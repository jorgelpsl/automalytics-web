import { ToyIllustration } from "@/components/ToyIllustration";
import { StarRating } from "@/components/StarRating";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { productWhatsAppUrl } from "@/lib/whatsapp";
import { formatCLP } from "@/lib/format";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-brand border border-slate-100 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg">
      <div className={`${product.image.bg} flex aspect-square items-center justify-center p-8`}>
        <ToyIllustration
          variant={product.image.variant}
          className="h-full w-full max-w-[160px] transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-heading text-base font-semibold text-brand-dark">{product.name}</h3>
        <StarRating rating={product.rating} reviewsCount={product.reviewsCount} />
        <p className="font-heading text-lg font-bold text-brand-dark">{formatCLP(product.price)}</p>
        <WhatsAppButton
          href={productWhatsAppUrl(product)}
          label="Pedir por WhatsApp"
          variant="outline"
          className="mt-auto w-full"
        />
      </div>
    </article>
  );
}
