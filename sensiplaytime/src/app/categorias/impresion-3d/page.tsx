import type { Metadata } from "next";
import { CategoryPageContent } from "@/components/CategoryPageContent";

export const metadata: Metadata = {
  title: "Impresión 3D | SensiPlayTime",
  description: "Diseños originales impresos en 3D por SensiPlayTime en Maipú, Chile.",
};

export default function Impresion3DPage() {
  return <CategoryPageContent slug="impresion-3d" />;
}
