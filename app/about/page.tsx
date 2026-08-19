import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";
import { CeoMessage } from "@/components/ceo-message";
import { values, sectors, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About · Who we are",
  description:
    "KARAM Engineering Services is a Karachi-based engineering firm serving the maritime and industrial sectors. Vision, mission, values, HSE and quality policies."
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            A young firm with an old-school engineering ethic
          </>
        }
        intro="Founded in Karachi in 2021, KARAM Engineering Services provides comprehensive engineering solutions across the maritime and industrial sectors, driven by technical excellence, safety and long-term relationships."
      />

      {/* Intro / narrative */}
      <section className="relative bg-ink text-bone">
        <div className="max-w-container mx-auto px-gutter py-section">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <div className="font-mono uppercase tracking-[0.2em] text-[0.7rem] text-signal mb-6">
                  Introduction
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight tracking-tighter text-bone">
                  Comprehensive, cutting-edge solutions for the maritime and industrial sectors
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-8 space-y-6 text-steel-400 leading-relaxed text-lg">
              <Reveal delay={140}>
                <p>
                  KARAM Engineering Services is a Karachi-based engineering firm
                  specialising in the maritime and industrial sectors. With a
                  focus on innovation, quality and client satisfaction, we
                  deliver engineering solutions that meet the evolving needs of
                  our clients, from single-scope repairs to multi-block
                  shipbuilding programmes.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <p>
                  Our team combines highly skilled engineers, certified
                  technicians and industry experts. We work closely with clients
                  to understand their unique requirements and develop tailored
                  solutions that drive efficiency, safety and sustainability
                  across their operations.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <p>
                  As a company, we are committed to excellence and integrity,
                  gelled with honesty and sincerity. We adhere to the highest
                  standards of professionalism, ethics and safety in every
                  aspect of our work, from tender to handover.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Vision / Mission split */}
      <section className="relative bg-bone text-ink">
        <div className="max-w-container mx-auto px-gutter py-section">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <Reveal>
              <div>
                <div className="font-mono uppercase tracking-[0.2em] text-[0.7rem] text-signal mb-4">
                  Our Vision
                </div>
                <p className="font-display text-2xl md:text-3xl leading-tight tracking-tight text-ink">
                  To be recognised as a leading engineering services company,
                  setting the industry standard for excellence in the maritime and
                  industrial sectors, and delivering sustainable solutions that
                  create long-term value for our clients.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div>
                <div className="font-mono uppercase tracking-[0.2em] text-[0.7rem] text-signal mb-4">
                  Our Mission
                </div>
                <p className="font-display text-2xl md:text-3xl leading-tight tracking-tight text-ink">
                  To leverage our expertise and technical excellence to provide
                  comprehensive engineering services, exceeding client
                  expectations through a commitment to quality, efficiency,
                  safety and sustainability.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values grid */}
      <section className="relative bg-ink text-bone">
        <div className="max-w-container mx-auto px-gutter py-section">
          <div className="mb-14">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-signal" />
                <span className="font-mono uppercase tracking-[0.2em] text-[0.7rem] text-signal">
                  Our Values
                </span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-tight tracking-tighter text-bone max-w-[20ch]">
                Six principles that guide every project
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-bone/10 border border-bone/10">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 60} className="bg-ink">
                <div className="p-8 md:p-10 h-full">
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="font-display text-4xl text-signal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel-600">
                      Value
                    </span>
                  </div>
                  <h3 className="font-display text-2xl tracking-tight text-bone mb-3">
                    {v.title}
                  </h3>
                  <p className="text-steel-400 text-sm leading-relaxed">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="relative bg-bone text-ink">
        <div className="max-w-container mx-auto px-gutter py-section">
          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            <Reveal>
              <div className="border border-ink/15 p-8 md:p-10 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-8 bg-signal" />
                  <span className="font-mono uppercase tracking-[0.2em] text-[0.7rem] text-signal">
                    Quality Policy
                  </span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl leading-tight tracking-tight text-ink mb-6">
                  Work that meets the spec, the workmanship and the deadline
                </h3>
                <p className="text-ink-700 leading-relaxed">
                  KARAM Engineering Services is committed to providing quality
                  work that meets project standards, the required
                  specifications, workmanship and on-time deliveries, with the
                  objective of achieving the utmost satisfaction of our
                  customers.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="border border-ink/15 p-8 md:p-10 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-8 bg-signal" />
                  <span className="font-mono uppercase tracking-[0.2em] text-[0.7rem] text-signal">
                    HSE Policy
                  </span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl leading-tight tracking-tight text-ink mb-6">
                  Safety of men and material, the first consideration
                </h3>
                <p className="text-ink-700 leading-relaxed">
                  KARAM Engineering Services is committed to providing a safe
                  and healthy workplace, with safety as a primary
                  consideration in everything we do, with the objective of
                  ensuring the safety of men and material at work.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CeoMessage />

      {/* Company snapshot */}
      <section className="relative bg-ink-900 text-bone border-t border-bone/10">
        <div className="max-w-container mx-auto px-gutter py-section">
          <div className="grid md:grid-cols-3 gap-8">
            <Reveal>
              <div>
                <div className="font-mono uppercase tracking-[0.2em] text-[0.7rem] text-signal mb-3">
                  Registered office
                </div>
                <div className="text-bone leading-relaxed">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.city}
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div>
                <div className="font-mono uppercase tracking-[0.2em] text-[0.7rem] text-signal mb-3">
                  Registrations
                </div>
                <ul className="space-y-2">
                  {site.registrations.map((r) => (
                    <li key={r.label} className="text-bone">
                      <span className="text-steel-600 text-xs uppercase tracking-widest mr-2">
                        {r.label}
                      </span>
                      <span className="font-mono">{r.value}</span>
                      {"category" in r && r.category && (
                        <span className="text-steel text-xs ml-2">{r.category}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div>
                <div className="font-mono uppercase tracking-[0.2em] text-[0.7rem] text-signal mb-3">
                  Sectors served
                </div>
                <div className="flex flex-wrap gap-2">
                  {sectors.map((s) => (
                    <span
                      key={s}
                      className="text-xs text-bone border border-bone/15 px-3 py-1.5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
