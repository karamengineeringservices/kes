import Link from "next/link";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { Photo } from "./photo";
import { TiltCard } from "./tilt-card";
import { Parallax } from "./parallax";

// Featured (first) project renders as an editorial split hero.
const featured = {
  index: "01",
  tag: "Ship Repair · Naval",
  title: "Vessel structural repair & preservation",
  scope:
    "Steel replacement, welded overlays, grit blasting and coating on a naval platform in dock, executed under the client's HSE regime, with in-yard fabrication support and inspection sign-off.",
  client: "[NAVAL CLIENT , TO CONFIRM]",
  meta: "Karachi Dockyard",
  metrics: [
    { k: "Scope", v: "Full-hull section" },
    { k: "Trades", v: "Welding · Blasting · Coating" },
    { k: "Duration", v: "[WEEKS]" }
  ]
};

const grid = [
  {
    tag: "Fabrication · Shipbuilding",
    title: "Hull block fabrication & erection",
    scope: "Full block assembly, outfitting, hatches and piping installation.",
    client: "Karachi Shipyard & Engineering Works",
    meta: "Multi-block programme"
  },
  {
    tag: "Boilers · Industrial",
    title: "Boiler retubing & pressure-vessel manufacture",
    scope: "Retube of process boilers and manufacture of new pressure vessels.",
    client: "[INDUSTRIAL CLIENT , TO CONFIRM]",
    meta: "Rated to spec"
  },
  {
    tag: "Outfitting · Marine",
    title: "Piping, cable-tray & lagging outfitting",
    scope: "CS/SS/alloy piping, cable-tray runs, insulation lagging & finishing.",
    client: "PRO Shipyard DGS",
    meta: "Full-scope outfitting"
  }
];

function FeaturedVisual() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-signal/30 via-ink-700 to-ink-900">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <svg
        viewBox="0 0 800 600"
        className="absolute inset-0 w-full h-full mix-blend-screen"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <g stroke="#F5F1EA" strokeWidth="0.8" fill="none" opacity="0.55">
          {/* dry dock frame */}
          <path d="M60 480 L740 480" strokeWidth="1.5" />
          <path d="M60 500 L740 500" strokeWidth="0.6" opacity="0.5" />
          <path d="M60 380 L60 480 L120 480 L120 380 Z" />
          <path d="M740 380 L740 480 L680 480 L680 380 Z" />
          {/* hull */}
          <path d="M180 480 L620 480 L680 440 L680 380 L560 340 L240 340 L120 380 L120 440 Z" fill="#0A1428" fillOpacity="0.6" />
          {/* superstructure */}
          <path d="M420 340 L520 340 L530 280 L500 280 L500 240 L440 240 L440 280 L410 280 Z" fill="#111E38" />
          <path d="M480 240 L480 200" strokeWidth="1" />
          <circle cx="480" cy="196" r="4" fill="#C42127" />
          {/* portholes */}
          <g fill="#F5F1EA" opacity="0.6">
            <circle cx="260" cy="420" r="4" />
            <circle cx="310" cy="420" r="4" />
            <circle cx="360" cy="420" r="4" />
            <circle cx="410" cy="420" r="4" />
            <circle cx="460" cy="420" r="4" />
            <circle cx="510" cy="420" r="4" />
            <circle cx="560" cy="420" r="4" />
          </g>
          {/* crane */}
          <path d="M700 480 L700 120 L500 120" />
          <path d="M500 120 L500 200" />
          <path d="M700 200 L560 200 M700 240 L580 200" opacity="0.5" />
          {/* measurement ticks */}
          <g opacity="0.5" strokeWidth="0.5">
            <path d="M60 380 L40 380 M60 400 L48 400 M60 420 L48 420 M60 440 L48 440 M60 460 L48 460" />
          </g>
        </g>
        {/* scan lines */}
        <g stroke="#F5F1EA" strokeWidth="0.3" opacity="0.08">
          {Array.from({ length: 40 }, (_, i) => (
            <path key={i} d={`M0 ${i * 15} L800 ${i * 15}`} />
          ))}
        </g>
      </svg>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(180deg, transparent 40%, rgba(6,13,27,0.7) 100%)"
      }} />
    </div>
  );
}

function GridArt({ i }: { i: number }) {
  const grads = [
    "from-ink-500/60 via-ink-700 to-ink-900",
    "from-steel/30 via-ink-700 to-ink-900",
    "from-signal/30 via-ink-700 to-ink-900"
  ];
  return (
    <div className={`w-full h-full bg-gradient-to-br ${grads[i % grads.length]} relative`}>
      <div className="absolute inset-0 grid-bg opacity-40" />
      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 w-full h-full mix-blend-screen"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <g stroke="#F5F1EA" strokeWidth="0.6" fill="none" opacity="0.55">
          {i === 0 && (
            <>
              <rect x="60" y="60" width="280" height="180" />
              <path d="M60 100 L340 100 M60 140 L340 140 M60 180 L340 180 M60 220 L340 220" />
              <path d="M120 60 L120 240 M200 60 L200 240 M280 60 L280 240" />
            </>
          )}
          {i === 1 && (
            <>
              <ellipse cx="200" cy="150" rx="140" ry="80" />
              <ellipse cx="200" cy="150" rx="100" ry="55" />
              <ellipse cx="200" cy="150" rx="60" ry="30" />
              <path d="M60 150 L340 150" opacity="0.4" />
            </>
          )}
          {i === 2 && (
            <>
              <path d="M40 240 L360 240" strokeWidth="1.2" />
              <circle cx="120" cy="140" r="8" />
              <circle cx="200" cy="140" r="8" />
              <circle cx="280" cy="140" r="8" />
              <path d="M120 148 L120 240 M200 148 L200 240 M280 148 L280 240" />
              <path d="M60 140 L120 140 M280 140 L340 140" />
            </>
          )}
        </g>
      </svg>
    </div>
  );
}

export function ProjectsShowcase() {
  return (
    <section id="projects" className="relative bg-ink text-bone">
      <div className="max-w-container mx-auto px-gutter py-section">
        {/* Section head */}
        <div className="grid md:grid-cols-12 gap-10 items-end mb-16">
          <div className="md:col-span-8">
            <SectionHeading
              eyebrow="Selected work"
              title={
                <>
                  From naval vessel maintenance to skilled manpower deployment and industrial plant operations<span className="text-signal">.</span>
                </>
              }
              intro="A cross section of the work we have delivered."
            />
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Reveal delay={220}>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-bone hover:text-signal transition-colors font-medium"
              >
                <span className="link-line">View all projects</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Featured split */}
        <Reveal>
          <article className="group grid lg:grid-cols-12 gap-6 lg:gap-10 border-t border-bone/10 pt-10">
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[540px] overflow-hidden">
              <FeaturedVisual />
              {/* Optional real photo overlay with subtle parallax drift */}
              <Parallax distance={-60} className="absolute inset-0">
                <div className="absolute inset-[-8%]">
                  <Photo
                    src="/project-featured.jpg"
                    alt={featured.title}
                    sizes="(min-width: 1024px) 55vw, 100vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink to-ink/20" />
              </Parallax>
              <div className="absolute top-5 left-5 flex items-center gap-2 z-10">
                <span className="w-2 h-2 bg-signal" />
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone">
                  Featured · {featured.tag}
                </span>
              </div>
              <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone">
                <span>{featured.meta}</span>
                <span className="text-steel">Case · 01</span>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="font-mono text-signal text-sm tracking-widest mb-6">
                  {featured.index}
                </div>
                <h3 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tighter text-bone mb-6 group-hover:text-signal transition-colors">
                  {featured.title}
                </h3>
                <p className="text-steel-400 text-base md:text-lg leading-relaxed max-w-prose">
                  {featured.scope}
                </p>
              </div>
              <dl className="mt-10 pt-8 border-t border-bone/10 grid grid-cols-3 gap-4">
                {featured.metrics.map((m) => (
                  <div key={m.k}>
                    <dt className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-steel-600 mb-2">
                      {m.k}
                    </dt>
                    <dd className="text-bone text-sm leading-snug">{m.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex items-center justify-between text-sm">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-steel">
                  Client · {featured.client}
                </span>
                <Link href="/projects" className="text-bone hover:text-signal transition-colors">
                  <span className="link-line">Read more</span>
                </Link>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Grid of secondary projects */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {grid.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <TiltCard intensity={6} className="h-full">
              <article className="group relative bg-ink-700 border border-bone/10 hover:border-bone/25 transition-colors overflow-hidden h-full">
                <div className="relative aspect-[4/3]">
                  <GridArt i={i} />
                  <div className="absolute inset-0">
                    <Photo
                      src={`/project-${i + 1}.jpg`}
                      alt={p.title}
                      sizes="(min-width: 768px) 30vw, 90vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-700 to-transparent opacity-70" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-signal" />
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone">
                      {p.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl leading-tight text-bone mb-3 group-hover:text-signal transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-steel-400 text-sm leading-relaxed">{p.scope}</p>
                  <div className="mt-5 pt-4 border-t border-bone/10 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.18em]">
                    <span className="text-steel truncate max-w-[70%]">{p.client}</span>
                    <span className="text-steel-600">{p.meta}</span>
                  </div>
                </div>
              </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
