import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { process } from "@/lib/site";

export function ProcessSection() {
  return (
    <section className="relative bg-ink text-bone">
      <div className="max-w-container mx-auto px-gutter py-section">
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              Four steps<span className="text-signal">.</span> From enquiry to
              handover, without surprise.
            </>
          }
          intro="A predictable, documented process, because your uptime, your budget and your inspection window are the deliverables."
          className="max-w-4xl"
        />

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-bone/10 border border-bone/10">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 100} className="bg-ink">
              <div className="p-8 md:p-10 h-full flex flex-col">
                <div className="flex items-baseline justify-between mb-8">
                  <span className="font-display text-[3.5rem] leading-none text-signal">
                    {p.step}
                  </span>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel-600">
                    Step {i + 1}/4
                  </span>
                </div>
                <h3 className="font-display text-2xl tracking-tight text-bone mb-4">
                  {p.title}
                </h3>
                <p className="text-steel-400 text-sm leading-relaxed">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
