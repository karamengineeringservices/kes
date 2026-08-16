import { capabilities } from "@/lib/site";

export function CapabilitiesMarquee() {
  const doubled = [...capabilities, ...capabilities];
  return (
    <section className="relative bg-ink border-y border-bone/10 py-8 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {doubled.map((c, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-tight text-bone/85 mx-8">
              {c}
            </span>
            <span className="mx-4 text-signal font-display text-3xl">·</span>
          </div>
        ))}
      </div>
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </section>
  );
}
