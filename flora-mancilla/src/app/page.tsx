import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Resources } from "@/components/Resources";
import { Booking } from "@/components/Booking";
import { Faq } from "@/components/Faq";
import { ClosingCta } from "@/components/ClosingCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Resources />
      <Booking />
      <Faq />
      <ClosingCta />
    </>
  );
}
