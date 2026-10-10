import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { NotFoundView } from "@/views/NotFoundView";

export const metadata: Metadata = {
  title: `Página no encontrada | ${SITE.name}`,
  // Next marks 404s noindex on its own; the home canonical inherited from the
  // layout would tell crawlers this URL is the home page, so drop it.
  alternates: { canonical: null },
};

export default function NotFound() {
  return <NotFoundView lang="es" />;
}
