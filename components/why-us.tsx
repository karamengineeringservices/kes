import { Reveal } from "./reveal";

const pillars = [
  {
    index: "I",
    title: "Certified expertise",
    body:
      "Registered with the Pakistan Engineering Council (Licence No. 15351, Category C4/E) across 19 specialisation codes, from steel construction to general mechanical and electrical works."
  },
  {
    index: "II",
    title: "Skilled technical pool",
    body:
      "Certified welders, cutters, fabricators, pipe fitters, machinists, electricians and quality inspectors, supervised by engineers who own delivery end to end."
  },
  {
    index: "III",
    title: "Client-first ethic",
    body:
      "Motto: fair, accurate, safe and timely. Long-term relationships built through honest quoting, transparent progress and predictable handover."
  }
];

export function WhyUs() {
  return (
    <section className="relative bg-bone text-ink">
      <div className="max-w-container mx-auto px-gutter py-section">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-signal" />
                <span className="font-mono uppercase tracking-[0.2em] text-[0.7rem] text-signal">
                  Why KARAM
                </span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] tracking-tighter text-ink max-w-[18ch]">
                Chosen for critical engineering work<span className="text-signal">.</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 text-ink-700 text-lg leading-relaxed max-w-prose">
                We serve clients in Oil & Gas, Petrochemicals and Marine,
                providing indigenous engineering solutions and reliable
                execution. Clients depend on us for nearly all of their
                engineering and service needs, in one accountable relationship.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ul className="divide-y divide-ink/15">
              {pillars.map((p, i) => (
                <Reveal key={p.index} delay={i * 100 + 100} as="li">
                  <div className="grid grid-cols-12 gap-6 py-8 first:pt-0 last:pb-0 group">
                    <div className="col-span-2 md:col-span-1">
                      <span className="font-mono text-signal text-lg tracking-widest">
                        {p.index}
                      </span>
                    </div>
                    <div className="col-span-10 md:col-span-11">
                      <h3 className="font-display text-2xl md:text-3xl tracking-tight text-ink mb-3 group-hover:text-signal transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-ink-700 text-base leading-relaxed max-w-prose">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
