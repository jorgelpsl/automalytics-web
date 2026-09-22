import type { Product } from "@/types";

// Demo catalog — prices and copy are placeholders, centralized here (per the
// brief) so they're the only place to edit before this goes to production.
// No product here claims to treat any medical condition; descriptions stay
// to sensory/play framing only.
export const PRODUCTS: Product[] = [
  {
    id: "tablero-sensorial",
    slug: "tablero-sensorial",
    name: "Tablero Sensorial",
    price: 4990,
    category: "fidgets",
    shortDescription: "Tablero con texturas y botones para presionar.",
    description:
      "Un tablero compacto con distintas texturas, botones tipo pop-it y superficies para tocar y presionar. Ideal para tener siempre a mano.",
    rating: 4.6,
    reviewsCount: 12,
    image: { kind: "illustration", variant: "tablero", bg: "bg-brand-coral/15" },
    available: true,
    featured: true,
  },
  {
    id: "set-engranajes",
    slug: "set-de-engranajes",
    name: "Set de Engranajes",
    price: 6990,
    category: "fidgets",
    shortDescription: "Engranajes giratorios que encajan entre sí.",
    description:
      "Piezas de engranajes coloridos que giran y encajan entre sí sobre una base fija. Perfectos para el movimiento repetitivo y la coordinación.",
    rating: 4.5,
    reviewsCount: 18,
    image: { kind: "illustration", variant: "engranajes", bg: "bg-brand-lavender/20" },
    available: true,
    featured: true,
  },
  {
    id: "cadena-articulada",
    slug: "cadena-articulada",
    name: "Cadena Articulada",
    price: 5990,
    category: "impresion-3d",
    shortDescription: "Cadena flexible impresa en 3D, pieza por pieza.",
    description:
      "Una cadena articulada impresa en 3D en una sola pieza, con eslabones que se doblan y giran libremente. Satisfactoria de manipular y muy resistente.",
    rating: 4.7,
    reviewsCount: 27,
    image: { kind: "illustration", variant: "cadena", bg: "bg-brand-mint/25" },
    available: true,
    featured: true,
  },
  {
    id: "infinity-cubo",
    slug: "infinity-cubo",
    name: "Infinity Cubo",
    price: 4990,
    category: "fidgets",
    shortDescription: "Cubo plegable que se transforma sin fin.",
    description:
      "Un cubo articulado que se pliega y despliega en múltiples formas. Silencioso, resistente y fácil de llevar en el bolsillo.",
    rating: 4.8,
    reviewsCount: 9,
    image: { kind: "illustration", variant: "cubo", bg: "bg-sky-100" },
    available: true,
    featured: true,
  },
  {
    id: "stress-blob",
    slug: "stress-blob",
    name: "Stress Blob",
    price: 5990,
    category: "fidgets",
    shortDescription: "Figura suave para apretar y estirar.",
    description:
      "Una figura suave y elástica pensada para apretar, estirar y amasar. Vuelve a su forma original después de cada uso.",
    rating: 4.4,
    reviewsCount: 14,
    image: { kind: "illustration", variant: "blob", bg: "bg-brand-yellow/20" },
    available: true,
    featured: true,
  },
  {
    id: "llavero-personalizado",
    slug: "llavero-personalizado",
    name: "Llavero Personalizado",
    price: 6990,
    category: "personalizados",
    shortDescription: "Llavero grabado con el nombre que elijas.",
    description:
      "Llavero impreso en 3D y personalizado con el nombre, color y diseño que elijas. Un detalle pequeño pensado para regalar.",
    rating: 4.9,
    reviewsCount: 22,
    image: { kind: "illustration", variant: "llavero", bg: "bg-brand-lavender/20" },
    available: true,
    featured: true,
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function searchProducts(query: string): Product[] {
  const term = normalize(query.trim());
  if (!term) return [];
  return PRODUCTS.filter((p) => {
    const haystack = normalize(`${p.name} ${p.category} ${p.shortDescription} ${p.description}`);
    return haystack.includes(term);
  });
}
