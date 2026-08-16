import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";
import { services, capabilities, sectors } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services · Fabrication, Ship Repair, Boilers & Blasting",
  description:
    "Full-spectrum engineering services: steel and aluminum fabrication, outfitting, boilers and pressure vessels, grit blasting, electrical, hydraulics and skilled technical manpower."
};

const anchors: Record<string, string> = {
  "01": "fabrication",
  "02": "outfitting",
  "03": "boilers",
  "04": "blasting",
  "05": "electrical",
  "06": "manpower"
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title={
          <>
            Everything the maritime yard and industrial plant asks for<span className="text-signal">.</span>
          </>
        }
        intro="Fabrication, outfitting, preservation, boilers, electrical and hydraulics, delivered by certified technical people who execute safely and on time."
      />

      {/* Services deep list */}
      <section className="relative bg-ink text-bone">
        <div className="max-w-container mx-auto px-gutter py-section">
          <ul className="divide-y divide-bone/10">
            {services.map((s, i) => (
              <Reveal as="li" key={s.index} delay={i * 60}>
                <article id={anchors[s.index]} className="group grid grid-cols-12 gap-6 md:gap-10 py-10 md:py-14">
                  <div className="col-span-12 md:col-span-2">
                    <div className="font-mono text-signal text-sm tracking-widest">
                      {s.index}
                    </div>
                    <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel-600 mt-2">
                      {s.short}
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <h2 className="font-display text-3xl md:text-4xl tracking-tight text-bone group-hover:text-signal transition-colors mb-4">
                      {s.title}
                    </h2>
                    <p className="text-steel-400 leading-relaxed max-w-prose">
                      {s.body}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel-600 mb-3">
                      Key elements
                    </div>
                    <ul className="space-y-2">
                      {s.tags.map((t) => (
                        <li key={t} className="flex items-center gap-3 text-sm text-bone">
                          <span className="w-1 h-1 bg-signal" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Capabilities detail */}
      <section className="relative bg-bone text-ink">
        <div className="max-w-container mx-auto px-gutter py-section">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-8 bg-signal" />
                  <span className="font-mono uppercase tracking-[0.2em] text-[0.7rem] text-signal">
                    Skilled human resource
                  </span>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight tracking-tighter text-ink max-w-[16ch]">
                  A certified pool, deployed by discipline<span className="text-signal">.</span>
                </h2>
              </Reveal>
              <Reveal delay={180}>
                <p className="mt-6 text-ink-700 leading-relaxed max-w-prose">
                  Every capability below is available as a project scope, a
                  supplementary technical team on your yard, or as a
                  standalone consultancy engagement in the maritime domain.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-px bg-ink/15 border border-ink/15">
                {capabilities.map((c, i) => (
                  <Reveal key={c} delay={i * 40} className="bg-bone">
                    <div className="p-5 md:p-6 flex items-center gap-4 h-full">
                      <span className="font-mono text-[0.7rem] text-signal">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-ink text-sm md:text-base">{c}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors served */}
      <section className="relative bg-ink text-bone">
        <div className="max-w-container mx-auto px-gutter py-section">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-signal" />
              <span className="font-mono uppercase tracking-[0.2em] text-[0.7rem] text-signal">
                Sectors served
              </span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex flex-wrap gap-3">
              {sectors.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center border border-bone/15 px-5 py-3 text-bone hover:border-signal hover:text-signal transition-colors"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
