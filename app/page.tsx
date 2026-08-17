import { Hero } from "@/components/hero";
import { CapabilitiesPinned } from "@/components/capabilities-pinned";
import { TrustBar } from "@/components/trust-bar";
import { StickyServices } from "@/components/sticky-services";
import { WhyUs } from "@/components/why-us";
import { CapabilitiesMarquee } from "@/components/capabilities-marquee";
import { ProjectsCarousel } from "@/components/projects-carousel";
import { ProcessSection } from "@/components/process-section";
import { Testimonials } from "@/components/testimonials";
import { CeoMessage } from "@/components/ceo-message";
import { CtaBand } from "@/components/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilitiesPinned />
      <TrustBar />
      <StickyServices />
      <WhyUs />
      <CapabilitiesMarquee />
      <ProjectsCarousel />
      <ProcessSection />
      <Testimonials />
      <CeoMessage />
      <CtaBand />
    </>
  );
}
