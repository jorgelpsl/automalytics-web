import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { PaymentReceivedView } from "@/views/PaymentReceivedView";

export const metadata: Metadata = {
  title: `Pago recibido | ${SITE.name}`,
  alternates: { canonical: "/pago-recibido" },
  robots: { index: false, follow: false },
};

export default function PaymentReceivedPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  return <PaymentReceivedView lang="es" searchParams={searchParams} />;
}
