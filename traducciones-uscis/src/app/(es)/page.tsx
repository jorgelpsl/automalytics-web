import type { Metadata } from "next";
import { HomeView } from "@/views/HomeView";
import { languageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/", languages: languageAlternates({ es: "/", en: "/en" }) },
};

export default function HomePage() {
  return <HomeView lang="es" />;
}
