import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { FunnelTracking } from "@/components/FunnelTracking";
import { Header } from "@/components/Header";
import { LanguageSuggestion } from "@/components/LanguageSuggestion";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import { DOCUMENT_PAGES, pageCopy } from "@/data/document-pages";
import { type Lang } from "@/i18n/config";
import { COMMON } from "@/i18n/copy/common";
import { newsreader, onest } from "@/lib/fonts";

/**
 * The <html> and chrome shared by both languages. Each language has its own root
 * layout (Next needs `lang` on <html> at build time), and both render this.
 */
export function SiteShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const documentNames = Object.fromEntries(
    DOCUMENT_PAGES.map((page) => {
      const copy = pageCopy(page, lang);
      return [copy.slug, copy.name];
    }),
  );

  return (
    <html lang={lang}>
      <body className={`${newsreader.variable} ${onest.variable} font-body antialiased`}>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-soft focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          {COMMON[lang].header.skip}
        </a>
        <Header lang={lang} />
        <main id="contenido">{children}</main>
        <Footer lang={lang} />
        <SiteAnalytics />
        <FunnelTracking />
        <FloatingWhatsApp lang={lang} documentNames={documentNames} />
        <LanguageSuggestion lang={lang} />
      </body>
    </html>
  );
}
