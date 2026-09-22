export const SITE = {
  name: "Flora Mancilla",
  role: "Psicóloga Clínica",
  url: "https://demo-flora-mancilla.automalytics.com",
  description:
    "Psicoterapia individual para adultos en Santiago de Chile. Un espacio cercano, sin juicios, para conocerte mejor y poner en palabras lo que sientes.",
  city: "Santiago de Chile, Chile",
  email: "psic.floramancilla@gmail.com",
  // Real number from the provided business card — every WhatsApp link in the
  // app is built through lib/whatsapp.ts so this stays the single source.
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "56976136879",
  whatsappDisplay: "+56 9 7613 6879",
};

export const NAV_LINKS = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#servicios", label: "Servicios" },
  { href: "#recursos", label: "Recursos" },
  { href: "#agenda", label: "Agenda tu hora" },
  { href: "#preguntas-frecuentes", label: "Preguntas frecuentes" },
];
