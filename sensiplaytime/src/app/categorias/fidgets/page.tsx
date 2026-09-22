import type { Metadata } from "next";
import { CategoryPageContent } from "@/components/CategoryPageContent";

export const metadata: Metadata = {
  title: "Fidgets | SensiPlayTime",
  description: "Fidgets y productos sensoriales para mover, tocar y explorar.",
};

export default function FidgetsPage() {
  return <CategoryPageContent slug="fidgets" />;
}
