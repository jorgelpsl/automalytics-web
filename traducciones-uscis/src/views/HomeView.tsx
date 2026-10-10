import { ClosingCta } from "@/components/ClosingCta";
import { Documents } from "@/components/Documents";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { Quote } from "@/components/Quote";
import { Requirements } from "@/components/Requirements";
import { Reviews } from "@/components/Reviews";
import { SITE } from "@/data/site";
import { HREFLANG, type Lang } from "@/i18n/config";
import { homeSection } from "@/i18n/routes";
import { onlineOrdersEnabled, paymentsEnabled } from "@/lib/features";
import { ORG_ID, WEBSITE_ID, offerNodes, organizationNode } from "@/lib/seo";

// Only facts the page itself states: who we are, how to reach us, what we
// sell, where, and the published per-page prices. No address, hours or
// ratings, because there are none to show.
function structuredData(lang: Lang) {
  const url = lang === "en" ? `${SITE.url}/en` : SITE.url;
  const service = {
    "@type": "Service",
    name: lang === "en" ? "Certified document translation for USCIS" : "Traducción certificada de documentos para USCIS",
    serviceType: lang === "en" ? "Certified translation" : "Traducción certificada",
    description: lang === "en" ? SITE.descriptionEn : SITE.description,
    url,
    inLanguage: HREFLANG[lang],
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "United States" },
    offers: offerNodes(`${SITE.url}${homeSection(lang, "cotizar")}`, lang),
  };
  // The WebSite is one entity for both languages, so it is declared once, on the
  // Spanish home page; the English page points at it.
  const site =
    lang === "es"
      ? {
          "@type": "WebSite",
          "@id": WEBSITE_ID,
          name: SITE.name,
          url: SITE.url,
          inLanguage: HREFLANG.es,
          publisher: { "@id": ORG_ID },
        }
      : {
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: SITE.name,
          inLanguage: HREFLANG.en,
          isPartOf: { "@id": WEBSITE_ID },
          publisher: { "@id": ORG_ID },
        };
  return { "@context": "https://schema.org", "@graph": [organizationNode(), site, service] };
}

export function HomeView({ lang }: { lang: Lang }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(lang)) }} />
      <Hero lang={lang} />
      <Requirements lang={lang} />
      <Documents lang={lang} />
      <Process lang={lang} />
      <Quote lang={lang} paymentsEnabled={paymentsEnabled()} uploadAfterPayment={onlineOrdersEnabled()} />
      <Faq lang={lang} />
      <Reviews lang={lang} />
      <ClosingCta lang={lang} />
    </>
  );
}
