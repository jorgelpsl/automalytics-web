import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { categoryWhatsAppUrl } from "@/lib/whatsapp";
import type { Category } from "@/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-brand shadow-soft sm:h-80">
      <Image
        src={category.image.src}
        alt={category.image.alt}
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/10 to-transparent"
      />
      <div className="relative flex flex-col gap-2 p-6 sm:p-7">
        <h3 className="font-heading text-2xl font-bold text-white">{category.name}</h3>
        <p className="max-w-[20ch] text-sm text-white/90">{category.tagline}</p>
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
    </div>
  );
}
