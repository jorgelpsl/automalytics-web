import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { CORRECTION_DAYS } from "@/data/legal";
import { SITE } from "@/data/site";
import { ROUTES, homeSection } from "@/i18n/routes";
import { pageMetadata } from "@/lib/seo";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

const DESCRIPTION = `At ${SITE.name} all purchases are final. What to check before paying and how we correct errors at no charge.`;

export const metadata: Metadata = pageMetadata({
  title: `Refund policy | ${SITE.name}`,
  description: DESCRIPTION,
  path: ROUTES.refunds.en,
  lang: "en",
  alternates: { es: ROUTES.refunds.es, en: ROUTES.refunds.en },
});

export default function EnglishRefundsPage() {
  return (
    <LegalPage
      lang="en"
      title="Refund policy"
      description={DESCRIPTION}
      current={ROUTES.refunds.en}
      summary={[
        "All purchases are final: after you pay there are no refunds or cancellations.",
        "Before paying, check the number of pages and the document type.",
        `If the translation has an error, we correct it for free if you tell us within ${CORRECTION_DAYS} days after delivery.`,
      ]}
    >
      <p>
        <strong>All purchases are final.</strong> Once payment is made we do not issue refunds, whether full or partial,
        and the order cannot be canceled. This policy is part of the{" "}
        <Link href={ROUTES.terms.en}>Terms of service</Link>.
      </p>

      <h2>Before you pay</h2>
      <p>Since there are no refunds, check your order before paying:</p>
      <ul>
        <li>
          <strong>The number of pages.</strong> Count each side of the document that has text, seals or signatures. We
          charge and translate according to the pages you indicate.
        </li>
        <li>
          <strong>The document type.</strong> If it isn&apos;t on the{" "}
          <Link href={homeSection("en", "documentos")}>list of documents</Link>, choose “Other” and describe it in the
          comments.
        </li>
        <li>
          <strong>If you have questions,</strong>{" "}
          <a href={generalWhatsAppUrl("en")} target="_blank" rel="noopener noreferrer">
            ask us on WhatsApp
          </a>{" "}
          before paying.
        </li>
      </ul>

      <h2>If your document has more pages</h2>
      <p>
        You can only upload the pages you paid for. If your document has more, pay for the additional pages in a{" "}
        <Link href={homeSection("en", "cotizar")}>new order</Link> and upload them there.
      </p>

      <h2>Corrections at no cost</h2>
      <p>
        Even though there are no refunds, if the translation has an error we correct it for free, as long as you tell us
        within {CORRECTION_DAYS} days after delivery.
      </p>

      <h2>Problems with a charge</h2>
      <p>
        If you see a charge you don&apos;t recognize or have a problem with your order, write to us before disputing it
        with your bank: we review it directly and faster.
      </p>
    </LegalPage>
  );
}
