import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { CORRECTION_DAYS } from "@/data/legal";
import { SITE } from "@/data/site";
import { ROUTES, homeSection } from "@/i18n/routes";
import { PRICE_TIERS, formatUsd, tierRange } from "@/lib/pricing";
import { USCIS_TRANSLATION_RULE_URL, pageMetadata } from "@/lib/seo";
import { REMOVE_WINDOW_MINUTES } from "@/lib/upload-rules";

const DESCRIPTION = `Terms for ordering certified translations for USCIS from ${SITE.name}: price, turnaround, corrections and responsibilities.`;

export const metadata: Metadata = pageMetadata({
  title: `Terms of service | ${SITE.name}`,
  description: DESCRIPTION,
  path: ROUTES.terms.en,
  lang: "en",
  alternates: { es: ROUTES.terms.es, en: ROUTES.terms.en },
});

export default function EnglishTermsPage() {
  const turnaround = SITE.turnaroundEn;
  const removeHours = REMOVE_WINDOW_MINUTES / 60;
  return (
    <LegalPage
      lang="en"
      title="Terms of service"
      description={DESCRIPTION}
      current={ROUTES.terms.en}
      summary={[
        `We translate from Spanish into English and deliver the complete translation as a PDF with the translator's signed certification${turnaround ? `, in ${turnaround}` : ""}.`,
        `We charge per page: ${PRICE_TIERS.map((tier) => `${formatUsd(tier.perPage)} for ${tierRange(tier, "en")}`).join(", ")}.`,
        `All purchases are final; we correct errors you report within ${CORRECTION_DAYS} days at no charge.`,
        "We are a private service: we are not affiliated with USCIS and we do not give legal or immigration advice.",
      ]}
    >
      <p>
        These terms govern the use of {SITE.url.replace("https://", "")} and the purchase of translations from{" "}
        {SITE.name} (“Certa”, “we”). By paying for an order you accept these terms, the{" "}
        <Link href={ROUTES.refunds.en}>Refund policy</Link> and the <Link href={ROUTES.privacy.en}>Privacy policy</Link>.
      </p>

      <h2>1. What we offer</h2>
      <p>
        We translate <Link href={homeSection("en", "documentos")}>documents</Link> from Spanish into English and deliver,
        as a PDF, the complete translation together with a certification signed by the translator. In it they state that
        they are competent to translate from Spanish into English and that the translation is complete and accurate, which
        is what USCIS asks for documents in another language (
        <a href={USCIS_TRANSLATION_RULE_URL} target="_blank" rel="noopener noreferrer">
          8 CFR § 103.2(b)(3)
        </a>
        ).
      </p>
      <ul>
        <li>
          <strong>We are a private service.</strong> We are not affiliated with USCIS or any agency of the U.S.
          government.
        </li>
        <li>
          <strong>We do not give legal or immigration advice.</strong> We do not tell you which documents to submit or how
          to fill out forms.
        </li>
        <li>
          <strong>The decision on your case is USCIS&apos;s.</strong> We commit to delivering a complete, accurate and
          certified translation; we cannot guarantee the outcome of your application.
        </li>
      </ul>

      <h2>2. Price and pages</h2>
      <ul>
        {PRICE_TIERS.map((tier) => (
          <li key={tier.minPages}>
            {tierRange(tier, "en")}: {formatUsd(tier.perPage)} per page.
          </li>
        ))}
      </ul>
      <p>
        The per-page price depends on the total pages in the order and applies to all of them. A page is each side of a
        document that has text, seals or signatures. Prices are in U.S. dollars (USD).
      </p>
      <p>
        We charge according to the number of pages you indicate when you pay, and you can upload up to that number. If
        your document has more pages, you need to pay for the additional ones in a new order before we translate them. We
        may change prices in the future, but the price of an order already paid does not change.
      </p>
      <p>
        We translate the documents you upload to your order. You can remove a file for {removeHours}{" "}
        {removeHours === 1 ? "hour" : "hours"} after uploading it, for example if the photo came out badly. After that, any
        change is handled over WhatsApp; if we have already started translating, replacing one document with a different
        one is charged as a new order.
      </p>

      <h2>3. Payment</h2>
      <p>
        Payments are processed by Stripe, by credit or debit card, Apple Pay or Google Pay. We do not see or store your
        card details. Stripe emails you the payment receipt.
      </p>

      <h2>4. Turnaround</h2>
      <ul>
        <li>
          We deliver {turnaround ? `in ${turnaround}` : "in the time we confirm when quoting"}, counted from when we receive
          all the pages, paid for, complete and legible.
        </li>
        <li>If a page isn&apos;t legible, we&apos;ll ask you for another photo; the time runs from when we receive it.</li>
        <li>
          If you give us a deadline, we&apos;ll tell you right away if we can&apos;t meet it, so you can decide whether to
          continue with the order.
        </li>
      </ul>

      <h2>5. What we need from you</h2>
      <ul>
        <li>Legible photos or PDFs of all the pages, including seals, signatures and marginal notes.</li>
        <li>
          That you have the right to give us those documents: that they are yours or belong to people who authorized you,
          such as your minor children.
        </li>
        <li>
          That you review the translation when you receive it, especially names, dates and numbers, and tell us if you
          see an error.
        </li>
      </ul>

      <h2>6. Corrections</h2>
      <p>
        If you find an error in the translation, we correct it at no cost if you tell us within {CORRECTION_DAYS} days after
        delivery. We translate faithfully what the original document says: if the original contains an error, for example
        a misspelled name, the translation reproduces it, and we can add a translator&apos;s note pointing it out.
      </p>

      <h2>7. Cancellations and refunds</h2>
      <p>
        <strong>All purchases are final.</strong> Once payment is made we do not issue refunds and the order cannot be
        canceled. Details are in the <Link href={ROUTES.refunds.en}>Refund policy</Link>.
      </p>

      <h2>8. Liability</h2>
      <p>
        To the extent the law allows, our liability for an order is limited to the amount you paid for that order. We are
        not responsible for delays, requests or decisions by USCIS or other authorities, or for indirect damages arising
        from the use of the translation.
      </p>

      <h2>9. Changes to these terms</h2>
      <p>
        If we change these terms we will publish the new version on this page with its date. Changes apply to orders paid
        after that date.
      </p>
    </LegalPage>
  );
}
