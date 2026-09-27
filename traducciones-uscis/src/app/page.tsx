import { Hero } from "@/components/Hero";
import { Requirements } from "@/components/Requirements";
import { Documents } from "@/components/Documents";
import { Process } from "@/components/Process";
import { Quote } from "@/components/Quote";
import { Faq } from "@/components/Faq";
import { ClosingCta } from "@/components/ClosingCta";
import { paymentsEnabled } from "@/lib/stripe";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Requirements />
      <Documents />
      <Process />
      <Quote paymentsEnabled={paymentsEnabled()} />
      <Faq paymentsEnabled={paymentsEnabled()} />
      <ClosingCta />
    </>
  );
}
