import { Hero } from "@/components/hero";
import { TrustBar } from "@/components/trust-bar";
import { StickyServices } from "@/components/sticky-services";
import { WhyUs } from "@/components/why-us";
import { CapabilitiesMarquee } from "@/components/capabilities-marquee";
import { ProjectsShowcase } from "@/components/projects-showcase";
import { ProcessSection } from "@/components/process-section";
import { Testimonials } from "@/components/testimonials";
import { CeoMessage } from "@/components/ceo-message";
import { CtaBand } from "@/components/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <StickyServices />
      <WhyUs />
      <CapabilitiesMarquee />
      <ProjectsShowcase />
      <ProcessSection />
      <Testimonials />
      <CeoMessage />
      <CtaBand />
    </>
  );
}
