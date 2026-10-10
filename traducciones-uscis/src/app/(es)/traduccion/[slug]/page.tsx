import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DOCUMENT_PAGES, findDocumentPage } from "@/data/document-pages";
import { documentPath } from "@/i18n/routes";
import { pageMetadata } from "@/lib/seo";
import { DocumentView } from "@/views/DocumentView";

export function generateStaticParams() {
  return DOCUMENT_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = findDocumentPage((await params).slug);
  if (!page) return {};
  return pageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: documentPath("es", page.slug),
    alternates: { es: documentPath("es", page.slug), en: documentPath("en", page.slug) },
  });
}

export default async function DocumentLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const page = findDocumentPage((await params).slug);
  if (!page) notFound();
  return <DocumentView lang="es" page={page} />;
}
