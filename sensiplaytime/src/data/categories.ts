import type { Category } from "@/types";

export const CATEGORIES: Category[] = [
  {
    slug: "fidgets",
    name: "Fidgets",
    tagline: "Para mover, tocar y explorar.",
    description:
      "Tableros, engranajes, cadenas y cubos pensados para mantener las manos ocupadas y la mente tranquila.",
    ctaLabel: "Ver productos",
    bgClass: "bg-brand-mint",
    illustrationVariant: "engranajes",
  },
  {
    slug: "personalizados",
    name: "Personalizados",
    tagline: "Hazlo único con el nombre que quieras.",
    description:
      "Llaveros y accesorios grabados con el nombre, color y diseño que elijas — perfectos para regalar.",
    ctaLabel: "Personalizar",
    bgClass: "bg-brand-lavender",
    illustrationVariant: "llavero",
  },
  {
    slug: "impresion-3d",
    name: "Impresión 3D",
    tagline: "Diseños originales creados por nosotros.",
    description:
      "Piezas diseñadas e impresas a mano en nuestro taller de Maipú, con acabados cuidados uno por uno.",
    ctaLabel: "Conoce más",
    bgClass: "bg-sky-100",
    illustrationVariant: "estrella",
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
