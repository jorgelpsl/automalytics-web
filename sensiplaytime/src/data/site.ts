// Everything about the brand/site that isn't a product lives here, so a
// single edit updates the header, footer, metadata and WhatsApp links at
// once instead of hunting through components.

export const SITE = {
  name: "SensiPlayTime",
  tagline: "Juega, Siente, Descubre",
  slogan: "Pequeños detalles, grandes sonrisas.",
  description:
    "Descubre fidgets, productos sensoriales, personalizados e impresión 3D de SensiPlayTime. Diseñados y creados en Maipú, Santiago de Chile.",
  city: "Maipú, Santiago de Chile",
  email: "hola@sensiplaytime.cl",
  // Placeholder until Jorge/the client gives the real business number —
  // every WhatsApp link is built from this single constant (see
  // lib/whatsapp.ts), never hardcoded per-component.
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "56900000000",
  social: {
    instagram: "https://instagram.com/sensiplaytime",
    tiktok: "https://tiktok.com/@sensiplaytime",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sensiplaytime.cl",
} as const;

export const TOP_BAR_MESSAGES = [
  "Envíos a todo Chile",
  "Productos originales e impresos en 3D",
  "Pequeños detalles, grandes sonrisas",
] as const;

export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Tienda", href: "/tienda" },
  { label: "Fidgets", href: "/categorias/fidgets" },
  { label: "Personalizados", href: "/categorias/personalizados" },
  { label: "Sobre nosotros", href: "/sobre-nosotros" },
  { label: "FAQ", href: "/faq" },
  { label: "Contacto", href: "/contacto" },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Tienda",
    links: [
      { label: "Fidgets", href: "/categorias/fidgets" },
      { label: "Personalizados", href: "/categorias/personalizados" },
      { label: "Impresión 3D", href: "/categorias/impresion-3d" },
      { label: "Todos los productos", href: "/tienda" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { label: "Preguntas frecuentes", href: "/faq" },
      { label: "Despachos", href: "/faq#despachos" },
      { label: "Cambios y devoluciones", href: "/faq#cambios" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
  {
    title: "Sobre nosotros",
    links: [
      { label: "Nuestra historia", href: "/sobre-nosotros" },
      { label: "Compromiso", href: "/sobre-nosotros#compromiso" },
      { label: "Hecho en Chile", href: "/sobre-nosotros#hecho-en-chile" },
    ],
  },
] as const;
