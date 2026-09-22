// Shared domain types for the SensiPlayTime storefront. Kept separate from
// the data files so both /data and any future API layer can import the same
// shapes without a circular dependency.

export type CategorySlug = "fidgets" | "personalizados" | "impresion-3d";

// No real product photography exists yet — every product/category points at
// one of these hand-drawn illustration variants instead of a stock photo or
// invented image URL (see ToyIllustration.tsx). Swapping in real photos
// later only means changing ProductImage's `kind` to "photo" and adding a
// `src`.
export type IllustrationVariant =
  | "tablero"
  | "engranajes"
  | "cadena"
  | "cubo"
  | "blob"
  | "llavero"
  | "estrella"
  | "corazon";

export interface ProductImage {
  kind: "illustration";
  variant: IllustrationVariant;
  bg: string; // tailwind background class for the image tile
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number; // CLP, integer, tax included
  category: CategorySlug;
  shortDescription: string;
  description: string;
  rating: number; // 0-5
  reviewsCount: number;
  image: ProductImage;
  available: boolean;
  featured?: boolean;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  ctaLabel: string;
  image: { src: string; alt: string };
}

export interface InstagramPost {
  id: string;
  illustrationVariant: IllustrationVariant;
  bgClass: string;
  caption: string;
  // Left undefined until a real Instagram permalink is configured — the
  // tile then renders as a non-clickable image instead of a dead link.
  url?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
