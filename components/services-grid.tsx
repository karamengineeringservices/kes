import Link from "next/link";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { services } from "@/lib/site";

export function ServicesGrid() {
  return (
    <section id="services" className="relative bg-ink text-bone">
      <div className="max-w-container mx-auto px-gutter py-section">
        <div className="grid md:grid-cols-12 gap-10 items-end mb-14">
          <div className="md:col-span-8">
            <SectionHeading
              eyebrow="What we do"
              title={
                <>
                  Full-spectrum engineering services<span className="text-signal">.</span> Fabrication,
                  outfitting, preservation and skilled manpower, under one roof.
                </>
              }
            />
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Reveal delay={200}>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-bone hover:text-signal transition-colors font-medium"
              >
                <span className="link-line">All services</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-bone/10 border border-bone/10">
          {services.map((s, i) => (
            <Reveal key={s.index} delay={i * 60} className="bg-ink">
              <article className="group relative h-full p-8 md:p-10 min-h-[320px] flex flex-col justify-between transition-colors hover:bg-ink-700">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-signal">
                      {s.index}
                    </span>
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel-600">
                      {s.short}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-[1.75rem] leading-tight tracking-tight text-bone mb-4">
                    {s.title}
                  </h3>
                  <p className="text-steel-400 text-[0.95rem] leading-relaxed">
                    {s.body}
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[0.7rem] font-mono uppercase tracking-wider text-steel border border-bone/10 px-2 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {/* accent hover bar */}
                <span className="absolute left-0 top-0 h-full w-[3px] bg-signal scale-y-0 origin-top transition-transform duration-500 group-hover:scale-y-100" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
