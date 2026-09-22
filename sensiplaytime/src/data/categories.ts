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
    image: {
      src: "/category-fidgets.webp",
      alt: "Engranajes y fidgets de colores de SensiPlayTime",
    },
    banner: {
      src: "/category-fidgets-banner.webp",
      width: 1620,
      height: 971,
      label: "Fidgets — Para mover, tocar y explorar. Ver productos por WhatsApp.",
    },
  },
  {
    slug: "personalizados",
    name: "Personalizados",
    tagline: "Hazlo único con el nombre que quieras.",
    description:
      "Llaveros y accesorios grabados con el nombre, color y diseño que elijas — perfectos para regalar.",
    ctaLabel: "Personalizar",
    bgClass: "bg-brand-lavender",
    image: {
      src: "/category-personalizados.webp",
      alt: "Llaveros personalizados con nombres MATEO y EMILIA de SensiPlayTime",
    },
    banner: {
      src: "/category-personalizados-banner.webp",
      width: 1619,
      height: 971,
      label: "Personalizados — Hazlo único con el nombre que quieras. Personalizar por WhatsApp.",
    },
  },
  {
    slug: "impresion-3d",
    name: "Impresión 3D",
    tagline: "Diseños originales creados por nosotros.",
    description:
      "Piezas diseñadas e impresas a mano en nuestro taller de Maipú, con acabados cuidados uno por uno.",
    ctaLabel: "Conoce más",
    bgClass: "bg-sky-100",
    image: {
      src: "/category-impresion-3d.webp",
      alt: "Tortuga impresa en 3D junto a otras piezas de SensiPlayTime",
    },
    banner: {
      src: "/category-impresion-3d-banner.webp",
      width: 1619,
      height: 971,
      label: "Impresión 3D — Diseños originales creados por nosotros. Conoce más por WhatsApp.",
    },
  },
];
