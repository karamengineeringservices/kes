import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";
import { TiltCard } from "@/components/tilt-card";
import { projects } from "@/lib/projects";
import { clients } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects & Clients",
  description:
    "Twelve delivered engineering programmes: MILGEM-3 and MILGEM-4 frigate work packages, gunboat hull fabrication, ship repair and international plate forming for Karachi Shipyard & Engineering Works and Maritime Industrial Services Arabia."
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title={
          <>
            Selected work<span className="text-signal">,</span> shipyard, plant floor, platform
          </>
        }
        intro="Twelve delivered work packages across the MILGEM-3 and MILGEM-4 frigate programmes, a gunboat hull fabrication contract, general shipbuilding, ship repair and one international engagement in Saudi Arabia."
      />

      <section className="relative bg-ink text-bone">
        <div className="max-w-container mx-auto px-gutter py-section">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((p, i) => (
              <Reveal key={`${p.title}-${p.category}`} delay={i * 60}>
                <TiltCard intensity={6} className="h-full">
                  <article className="group relative bg-ink-700 border border-bone/10 hover:border-bone/25 transition-colors overflow-hidden h-full">
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-2 mb-5">
                        <span className="w-2 h-2 bg-signal" />
                        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone">
                          {p.tag}
                        </span>
                      </div>
                      <h2 className="font-display text-xl md:text-2xl leading-tight text-bone mb-3 group-hover:text-signal transition-colors line-clamp-2 min-h-[3.25rem] md:min-h-[3.75rem]">
                        {p.title}
                      </h2>
                      <p className="text-steel-400 text-sm leading-relaxed line-clamp-3 min-h-[4.5rem]">
                        {p.scope}
                      </p>
                      <dl className="mt-6 pt-5 border-t border-bone/10 grid grid-cols-3 gap-3 font-mono text-[0.65rem] uppercase tracking-[0.18em]">
                        <div>
                          <dt className="text-steel-600">Programme</dt>
                          <dd className="text-bone mt-1 leading-tight">{p.category}</dd>
                        </div>
                        <div>
                          <dt className="text-steel-600">Year</dt>
                          <dd className="text-bone mt-1">{p.year}</dd>
                        </div>
                        <div>
                          <dt className="text-steel-600">Scale</dt>
                          <dd className="text-bone mt-1 leading-tight">{p.scale}</dd>
                        </div>
                      </dl>
                      <div className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-steel-600">
                        {p.meta}
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Clients section */}
      <section className="relative bg-bone text-ink">
        <div className="max-w-container mx-auto px-gutter py-section">
          <div className="grid md:grid-cols-12 gap-10 items-end mb-12">
            <div className="md:col-span-8">
              <Reveal>
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-8 bg-signal" />
                  <span className="font-mono uppercase tracking-[0.2em] text-[0.7rem] text-signal">
                    Our clients
                  </span>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight tracking-tighter text-ink max-w-[20ch]">
                  Serving Pakistan&rsquo;s leading maritime and industrial operators
                </h2>
              </Reveal>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {clients.map((c, i) => (
              <Reveal key={c.name} delay={i * 60}>
                <div className="border border-ink/15 bg-bone px-4 py-8 flex items-center justify-center text-center min-h-[120px] hover:border-signal transition-colors">
                  <span className="text-ink-700 text-sm leading-tight">
                    {c.name}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
