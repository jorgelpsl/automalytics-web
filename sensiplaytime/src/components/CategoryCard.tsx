import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { categoryWhatsAppUrl } from "@/lib/whatsapp";
import type { Category } from "@/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <div
      className={`${category.bgClass} relative min-h-[260px] overflow-hidden rounded-brand p-6 sm:min-h-[300px] sm:p-7`}
    >
      <div className="relative z-10 flex max-w-[58%] flex-col gap-3 sm:max-w-[52%]">
        <h3 className="font-heading text-2xl font-bold text-brand-dark">{category.name}</h3>
        <p className="text-sm text-brand-dark/70">{category.tagline}</p>
        <a
          href={categoryWhatsAppUrl(category)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-dark shadow-soft transition-transform hover:-translate-y-0.5"
        >
          {category.ctaLabel}
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>

      <div className="pointer-events-none absolute -bottom-3 -right-3 h-52 w-52 sm:-bottom-4 sm:-right-4 sm:h-64 sm:w-64">
        <Image
          src={category.image.src}
          alt={category.image.alt}
          fill
          sizes="(min-width: 640px) 256px, 208px"
          className="object-contain object-bottom drop-shadow-md"
        />
      </div>
    </div>
  );
}
