import type { Metadata, Viewport } from "next";
import { Newsreader, Onest } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { FunnelTracking } from "@/components/FunnelTracking";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import { DOCUMENT_PAGES } from "@/data/document-pages";
import { SITE } from "@/data/site";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-onest",
  display: "swap",
});

const title = `Traducciones certificadas para USCIS | ${SITE.name}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "es_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF7",
};

const DOCUMENT_NAMES = Object.fromEntries(DOCUMENT_PAGES.map((page) => [page.slug, page.name]));

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${newsreader.variable} ${onest.variable} font-body antialiased`}>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-soft focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <SiteAnalytics />
        <FunnelTracking />
        <FloatingWhatsApp documentNames={DOCUMENT_NAMES} />
      </body>
    </html>
  );
}
