import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ToyIllustration } from "@/components/ToyIllustration";
import type { Category } from "@/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <div className={`${category.bgClass} flex items-center justify-between overflow-hidden rounded-brand p-6 sm:p-7`}>
      <div className="flex flex-col gap-3">
        <h3 className="font-heading text-2xl font-bold text-brand-dark">{category.name}</h3>
        <p className="max-w-[18ch] text-sm text-brand-dark/70">{category.tagline}</p>
        <Link
          href={`/categorias/${category.slug}`}
          className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-dark shadow-soft transition-transform hover:-translate-y-0.5"
        >
          {category.ctaLabel}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <ToyIllustration variant={category.illustrationVariant} className="hidden h-24 w-24 shrink-0 sm:block" />
    </div>
  );
}
