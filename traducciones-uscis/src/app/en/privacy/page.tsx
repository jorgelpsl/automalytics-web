import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { CORRECTION_DAYS, DOCUMENT_RETENTION_DAYS } from "@/data/legal";
import { SITE } from "@/data/site";
import { ROUTES, homeSection } from "@/i18n/routes";
import { pageMetadata } from "@/lib/seo";

const DESCRIPTION = `What data and documents ${SITE.name} receives, what it uses them for, who it shares them with, and how to ask us to delete them.`;

export const metadata: Metadata = pageMetadata({
  title: `Privacy policy | ${SITE.name}`,
  description: DESCRIPTION,
  path: ROUTES.privacy.en,
  lang: "en",
  alternates: { es: ROUTES.privacy.es, en: ROUTES.privacy.en },
});

export default function EnglishPrivacyPage() {
  return (
    <LegalPage
      lang="en"
      title="Privacy policy"
      description={DESCRIPTION}
      current={ROUTES.privacy.en}
      summary={[
        "We use your data and documents only to make your translation and to contact you about your order. We do not sell them.",
        `Documents are kept in private storage and deleted automatically ${DOCUMENT_RETENTION_DAYS} days after your order is completed.`,
        "Stripe processes the payment: we do not see or store your card details.",
        "We measure visits and ads with Vercel Web Analytics, Google Analytics and Google Ads.",
      ]}
    >
      <p>
        To translate your documents we need to see personal information, sometimes very sensitive. This policy explains
        what we receive, what we use it for and how we protect it. It applies to {SITE.url.replace("https://", "")} and
        to orders placed with {SITE.name}, together with the <Link href={ROUTES.terms.en}>Terms of service</Link>.
      </p>

      <h2>What data we receive</h2>
      <ul>
        <li>
          <strong>When you place your order and pay:</strong> your name, the document type, the number of pages, the date
          you need it by and your comments. Stripe, which processes the payment, receives your email, your phone and your
          card details; we do not see or store the card details.
        </li>
        <li>
          <strong>The documents you upload:</strong> they may include names, dates of birth, ID numbers, addresses and your
          family&apos;s details.
        </li>
        <li>
          <strong>If you message us on WhatsApp:</strong> your number and the messages and files you send us.
        </li>
        <li>
          <strong>Technical data:</strong> our hosting provider records data such as the IP address and the browser so the
          site works and is secure.
        </li>
      </ul>

      <h2>What we use it for</h2>
      <ul>
        <li>
          Translating your documents and delivering the certified translation that{" "}
          <Link href={homeSection("en", "requisitos")}>USCIS requires</Link>.
        </li>
        <li>Contacting you about your order.</li>
        <li>Processing payments and refunds, and preventing fraud.</li>
        <li>Complying with legal, accounting and tax obligations.</li>
      </ul>
      <p>
        <strong>We do not sell your data</strong> and we do not use your documents for advertising or for any purpose
        other than your order.
      </p>

      <h2>Who we share it with</h2>
      <p>Only with those we need to provide the service:</p>
      <ul>
        <li>
          <strong>Stripe</strong>, which processes payments.
        </li>
        <li>
          <strong>Vercel</strong>, which hosts the site, stores the documents in private storage and measures visits
          anonymously.
        </li>
        <li>
          <strong>Google</strong> (Google Analytics and Google Ads), which receives browsing data to measure how the site
          is used and whether our ads generate orders. When you pay, we tell it the order number, the document type, the
          pages and the amount; never your name, your documents or your card.
        </li>
        <li>
          <strong>WhatsApp (Meta)</strong>, if you contact us that way.
        </li>
        <li>The translator who works on your order.</li>
      </ul>
      <p>We may also disclose information if a law or an order from a competent authority requires it.</p>

      <h2>How we protect your documents</h2>
      <p>
        Documents are kept in private storage, with no public links. Only we can open them, from a password-protected
        panel, and all connections to the site are encrypted (HTTPS).
      </p>

      <h2>How long we keep them</h2>
      <p>
        We keep your documents while we work on your order and{" "}
        <strong>delete them automatically {DOCUMENT_RETENTION_DAYS} days after completing it</strong>, which covers the{" "}
        {CORRECTION_DAYS} days to request corrections explained in the{" "}
        <Link href={ROUTES.refunds.en}>Refund policy</Link>. You can ask us to delete them sooner. Payment records are
        kept by Stripe according to its legal obligations.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us for a copy of your data, to correct it or to delete it. We respond within 30 days. Depending on the
        state where you live, the law may give you additional rights; we handle those requests the same way.
      </p>

      <h2>Cookies</h2>
      <p>
        To know how many people visit the site and which pages they see, we use Vercel Web Analytics, which counts visits
        in aggregate, without cookies and without identifying you. We also use Google Analytics, to understand where
        visits come from and how many end in an order, and the Google Ads tag, to know whether a purchase came from one of
        our ads. Both use Google cookies. You can block them in your browser settings or manage the ads you see in{" "}
        <a href="https://myadcenter.google.com" target="_blank" rel="noopener noreferrer">
          Google My Ad Center
        </a>
        . Stripe&apos;s payment page uses its own cookies to process the payment and prevent fraud.
      </p>

      <h2>Minors</h2>
      <p>
        The service is intended for people over 18. Documents of minors, such as their birth certificates, must be sent by
        their parents or guardians.
      </p>

      <h2>Changes to this policy</h2>
      <p>If we change it, we will publish the new version on this page with its date.</p>
    </LegalPage>
  );
}
