import type { Category } from "@/types";

export const CATEGORIES: Category[] = [
  {
    slug: "fidgets",
    name: "Fidgets",
    tagline: "Para mover, tocar y explorar.",
    description:
      "Tableros, engranajes, cadenas y cubos pensados para mantener las manos ocupadas y la mente tranquila.",
    ctaLabel: "Ver productos",
    image: {
      src: "/category-fidgets.webp",
      alt: "Engranajes y fidgets de colores de SensiPlayTime sobre una mesa",
    },
  },
  {
    slug: "personalizados",
    name: "Personalizados",
    tagline: "Hazlo único con el nombre que quieras.",
    description:
      "Llaveros y accesorios grabados con el nombre, color y diseño que elijas — perfectos para regalar.",
    ctaLabel: "Personalizar",
    image: {
      src: "/category-personalizados.webp",
      alt: "Llaveros personalizados con nombres SOFIA, MATEO y EMILIA de SensiPlayTime",
    },
  },
  {
    slug: "impresion-3d",
    name: "Impresión 3D",
    tagline: "Diseños originales creados por nosotros.",
    description:
      "Piezas diseñadas e impresas a mano en nuestro taller de Maipú, con acabados cuidados uno por uno.",
    ctaLabel: "Conoce más",
    image: {
      src: "/category-impresion-3d.webp",
      alt: "Impresora 3D imprimiendo una tortuga junto a otras piezas de SensiPlayTime",
    },
  },
];
