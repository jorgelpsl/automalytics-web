import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { PaymentReceivedView } from "@/views/PaymentReceivedView";

export const metadata: Metadata = {
  title: `Payment received | ${SITE.name}`,
  alternates: { canonical: "/en/payment-received" },
  robots: { index: false, follow: false },
};

export default function EnglishPaymentReceivedPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  return <PaymentReceivedView lang="en" searchParams={searchParams} />;
}
