import type { Metadata } from "next";
import { CategoryPageContent } from "@/components/CategoryPageContent";

export const metadata: Metadata = {
  title: "Personalizados | SensiPlayTime",
  description: "Llaveros y accesorios personalizados con el nombre y color que quieras.",
};

export default function PersonalizadosPage() {
  return <CategoryPageContent slug="personalizados" />;
}
