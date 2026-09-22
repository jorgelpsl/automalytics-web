import type { Metadata } from "next";
import { Fredoka, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { SITE } from "@/data/site";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "SensiPlayTime | Fidgets y productos sensoriales en Chile",
  description: SITE.description,
  openGraph: {
    title: "SensiPlayTime | Fidgets y productos sensoriales en Chile",
    description: SITE.description,
    siteName: SITE.name,
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SensiPlayTime | Fidgets y productos sensoriales en Chile",
    description: SITE.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${fredoka.variable} ${nunitoSans.variable} font-body antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-dark focus:px-4 focus:py-2 focus:text-white"
        >
          Saltar al contenido
        </a>
        <TopBar />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
