import { Hero } from "@/components/Hero";
import { Requirements } from "@/components/Requirements";
import { Documents } from "@/components/Documents";
import { Process } from "@/components/Process";
import { Quote } from "@/components/Quote";
import { Reviews } from "@/components/Reviews";
import { Faq } from "@/components/Faq";
import { ClosingCta } from "@/components/ClosingCta";
import { SITE } from "@/data/site";
import { onlineOrdersEnabled, paymentsEnabled } from "@/lib/features";
import { ORG_ID, WEBSITE_ID, offerNodes, organizationNode } from "@/lib/seo";

// Only facts the page itself states: who we are, how to reach us, what we
// sell, where, and the published per-page prices. No address, hours or
// ratings, because there are none to show.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationNode(),
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
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
      offers: offerNodes(`${SITE.url}/#cotizar`),
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
      <Reviews />
      <ClosingCta />
    </>
  );
}
