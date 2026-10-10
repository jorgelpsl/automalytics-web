import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { NotFoundView } from "@/views/NotFoundView";

export const metadata: Metadata = {
  title: `Page not found | ${SITE.name}`,
  alternates: { canonical: null },
};

export default function EnglishNotFound() {
  return <NotFoundView lang="en" />;
}
