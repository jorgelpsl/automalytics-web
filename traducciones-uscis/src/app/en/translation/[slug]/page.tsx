import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DOCUMENT_PAGES, findDocumentPageIn, pageCopy } from "@/data/document-pages";
import { documentPath } from "@/i18n/routes";
import { pageMetadata } from "@/lib/seo";
import { DocumentView } from "@/views/DocumentView";

export function generateStaticParams() {
  return DOCUMENT_PAGES.map((page) => ({ slug: pageCopy(page, "en").slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = findDocumentPageIn("en", (await params).slug);
  if (!page) return {};
  const copy = pageCopy(page, "en");
  return pageMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: documentPath("en", page.slug),
    lang: "en",
    alternates: { es: documentPath("es", page.slug), en: documentPath("en", page.slug) },
  });
}

export default async function EnglishDocumentPage({ params }: { params: Promise<{ slug: string }> }) {
  const page = findDocumentPageIn("en", (await params).slug);
  if (!page) notFound();
  return <DocumentView lang="en" page={page} />;
}
