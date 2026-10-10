import type { Metadata } from "next";
import { HomeView } from "@/views/HomeView";
import { languageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/en", languages: languageAlternates({ es: "/", en: "/en" }) },
};

export default function EnglishHomePage() {
  return <HomeView lang="en" />;
}
