import { Reveal } from "./reveal";
import { Counter } from "./counter";
import { clients } from "@/lib/site";

// Stats structured for the Counter component
const statBlocks = [
  { value: 3, suffix: "", label: "Industry sectors served", side: "Oil & Gas · Petrochemicals · Marine" },
  { value: 10, suffix: "+", label: "Core service capabilities", side: "Fabrication · Repair · Blasting" },
  { value: 24, suffix: "/7", label: "Operational readiness", side: "For active engagements" }
];

export function TrustBar() {
  return (
    <section className="relative bg-ink border-y border-bone/10">
      <div className="max-w-container mx-auto px-gutter py-16 md:py-24">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {statBlocks.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="group">
                <div className="flex items-baseline gap-1">
                  <Counter
                    to={s.value}
                    duration={1400 + i * 100}
                    className="font-display text-[clamp(2.75rem,6vw,4.75rem)] leading-none tracking-tighter text-bone tabular-nums"
                  />
                  <span className="text-signal font-display text-2xl md:text-3xl">
                    {s.suffix}
                  </span>
                </div>
                <div className="mt-4 h-px w-8 bg-signal group-hover:w-20 transition-all duration-700" />
                <div className="mt-4 text-bone text-sm md:text-base max-w-[22ch]">
                  {s.label}
                </div>
                <div className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-steel-600">
                  {s.side}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Clients row */}
        <div className="mt-16 pt-10 border-t border-bone/10">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-8 bg-signal" />
              <span className="font-mono uppercase tracking-[0.2em] text-[0.7rem] text-signal">
                Trusted by
              </span>
              <span className="text-steel-600 text-xs ml-auto font-mono uppercase tracking-widest">
                Selected clients · {clients.length}
              </span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-bone/10 border border-bone/10">
              {clients.map((c, i) => (
                <div
                  key={c.name}
                  className="group bg-ink px-4 py-8 flex flex-col items-center justify-center text-center min-h-[120px] hover:bg-ink-700 transition-colors relative overflow-hidden"
                >
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-steel-600 mb-2">
                    Client · {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-steel-400 text-[0.85rem] leading-tight tracking-wide group-hover:text-bone transition-colors">
                    {c.name}
                  </span>
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-signal scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
