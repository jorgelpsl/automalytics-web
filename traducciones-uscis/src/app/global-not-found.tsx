/* This page renders outside the app router's layouts, so its links are plain anchors. */
/* eslint-disable @next/next/no-html-link-for-pages */
import "./globals.css";
import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { newsreader, onest } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: `404 | ${SITE.name}`,
  robots: { index: false, follow: false },
};

// Served for URLs that match no route at all (such as /zzz/yyy). It sits outside
// both language layouts, so it is bilingual and has no header or footer.
export default function GlobalNotFound() {
  return (
    <html lang="es">
      <body className={`${newsreader.variable} ${onest.variable} font-body antialiased`}>
        <main className="section">
          <div className="flex max-w-2xl flex-col gap-6">
            <p className="eyebrow">Error 404</p>
            <h1 className="font-display text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl">
              No encontramos esta página.
            </h1>
            <p className="text-lg leading-relaxed text-ink-soft" lang="en">
              We couldn&apos;t find this page.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="/" className="btn-primary" lang="es">
                Ir al inicio
              </a>
              <a href="/en" className="btn-secondary" lang="en">
                Go to the English site
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
