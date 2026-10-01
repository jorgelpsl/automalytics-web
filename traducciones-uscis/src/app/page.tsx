import { Hero } from "@/components/Hero";
import { Requirements } from "@/components/Requirements";
import { Documents } from "@/components/Documents";
import { Process } from "@/components/Process";
import { Quote } from "@/components/Quote";
import { Faq } from "@/components/Faq";
import { ClosingCta } from "@/components/ClosingCta";
import { SITE } from "@/data/site";
import { onlineOrdersEnabled, paymentsEnabled } from "@/lib/features";
import { PRICE_TIERS, tierRange } from "@/lib/pricing";

const ORG_ID = `${SITE.url}/#organization`;

// Only facts the page itself states: who we are, how to reach us, what we
// sell, where, and the published per-page prices. No address, hours or
// ratings, because there are none to show.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/logo.png`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: `+${SITE.whatsappNumber}`,
        contactType: "customer service",
        areaServed: "US",
        availableLanguage: ["Spanish", "English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      name: SITE.name,
      url: SITE.url,
      inLanguage: "es-US",
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "Service",
      name: "Traducción certificada de documentos para USCIS",
      serviceType: "Traducción certificada",
      description: SITE.description,
      url: SITE.url,
      provider: { "@id": ORG_ID },
      areaServed: { "@type": "Country", name: "United States" },
      offers: PRICE_TIERS.map((tier) => ({
        "@type": "Offer",
        priceCurrency: "USD",
        price: tier.perPage,
        description: `${tierRange(tier)}, precio por página`,
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Requirements />
      <Documents />
      <Process />
      <Quote paymentsEnabled={paymentsEnabled()} uploadAfterPayment={onlineOrdersEnabled()} />
      <Faq />
      <ClosingCta />
    </>
  );
}
