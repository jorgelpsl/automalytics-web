import type { Metadata } from "next";
import { Fraunces, Lora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE } from "@/data/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: `${SITE.name} | ${SITE.role} en Santiago`,
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} | ${SITE.role}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${SITE.name} | ${SITE.role}`,
    description: SITE.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${fraunces.variable} ${lora.variable} font-body antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-soft focus:bg-wine focus:px-4 focus:py-2 focus:text-cream"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
