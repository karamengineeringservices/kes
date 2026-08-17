import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/cta-band";
import { Photo } from "@/components/photo";
import { TiltCard } from "@/components/tilt-card";
import { clients } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects & Clients",
  description:
    "Selected engineering projects delivered by KARAM: ship repair, hull block fabrication, boiler retubing, outfitting and steelwork for the maritime and industrial sectors."
};

const projects = [
  {
    tag: "Ship Repair · Naval",
    title: "Vessel structural repair & preservation",
    scope:
      "Steel replacement, welded overlays, grit blasting and coating on a naval platform in dock, executed under the client's HSE regime.",
    client: "[NAVAL CLIENT , TO CONFIRM]",
    year: "[YEAR]",
    location: "Karachi Dockyard"
  },
  {
    tag: "Fabrication · Shipbuilding",
    title: "Hull block fabrication & erection",
    scope:
      "Full block assembly, outfitting, hatches and piping installation as part of a multi-block shipbuilding programme.",
    client: "Karachi Shipyard & Engineering Works",
    year: "[YEAR]",
    location: "KSEW, Karachi"
  },
  {
    tag: "Boilers · Industrial",
    title: "Boiler retubing & pressure-vessel manufacture",
    scope:
      "Retube of process boilers and manufacture of new pressure vessels to rated specification for an industrial client.",
    client: "[INDUSTRIAL CLIENT , TO CONFIRM]",
    year: "[YEAR]",
    location: "[SITE]"
  },
  {
    tag: "Outfitting · Marine",
    title: "Piping, cable-tray & lagging outfitting",
    scope:
      "CS/SS/alloy piping, cable-tray runs, insulation lagging and final finishing on a vessel in the outfitting phase.",
    client: "PRO Shipyard DGS",
    year: "[YEAR]",
    location: "PRO Shipyard, Karachi"
  },
  {
    tag: "Heat Exchangers",
    title: "Heat exchanger fabrication",
    scope:
      "Fabrication of shell-and-tube heat exchangers to project specification, including hydro-test and inspection sign-off.",
    client: "[CLIENT , TO CONFIRM]",
    year: "[YEAR]",
    location: "[SITE]"
  },
  {
    tag: "Steel Structures",
    title: "Overhead crane fabrication & erection",
    scope:
      "Fabrication and erection of an overhead travelling crane structure, steelwork, alignment and load-test.",
    client: "[CLIENT , TO CONFIRM]",
    year: "[YEAR]",
    location: "[SITE]"
  }
];

function ProjectArt({ i }: { i: number }) {
  const grads = [
    "from-signal/40 via-ink-700 to-ink",
    "from-ink-500/70 via-ink-700 to-ink",
    "from-steel/30 via-ink-700 to-ink",
    "from-signal/30 via-ink-700 to-ink",
    "from-ink-500/40 via-ink-700 to-ink",
    "from-signal/40 via-ink-700 to-ink"
  ];
  return (
    <div className={`relative w-full h-full bg-gradient-to-br ${grads[i % grads.length]}`}>
      <div className="absolute inset-0 grid-bg opacity-40" />
      <svg
        viewBox="0 0 300 220"
        className="absolute inset-0 w-full h-full opacity-70 mix-blend-screen"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <g stroke="#F5F1EA" strokeWidth="0.6" fill="none" opacity="0.55">
          {i % 3 === 0 && (
            <>
              <path d="M20 180 L280 180" strokeWidth="1.2" />
              <path d="M50 160 L250 160" />
              <path d="M80 140 L220 140" />
              <path d="M110 120 L190 120" />
              <circle cx="150" cy="100" r="26" strokeWidth="1" />
            </>
          )}
          {i % 3 === 1 && (
            <>
              <rect x="40" y="50" width="220" height="130" />
              <path d="M40 90 L260 90 M40 130 L260 130" />
              <path d="M100 50 L100 180 M160 50 L160 180 M220 50 L220 180" />
            </>
          )}
          {i % 3 === 2 && (
            <>
              <ellipse cx="150" cy="110" rx="110" ry="60" />
              <ellipse cx="150" cy="110" rx="70" ry="38" />
              <ellipse cx="150" cy="110" rx="30" ry="16" />
              <path d="M20 110 L280 110" />
            </>
          )}
        </g>
      </svg>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title={
          <>
            Selected work<span className="text-signal">.</span> Shipyard, plant floor, platform.
          </>
        }
        intro="A cross-section of engineering delivered by KARAM. Where project confidentiality or client sign-off is pending, details are shown as clearly-marked placeholders."
      />

      <section className="relative bg-ink text-bone">
        <div className="max-w-container mx-auto px-gutter py-section">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <TiltCard intensity={6} className="h-full">
                <article className="group relative bg-ink-700 border border-bone/10 hover:border-bone/25 transition-colors overflow-hidden h-full">
                  <div className="relative aspect-[4/3]">
                    <ProjectArt i={i} />
                    <div className="absolute inset-0">
                      <Photo
                        src={`/project-${i + 1}.jpg`}
                        alt={p.title}
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 90vw"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-700 to-transparent opacity-60" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-signal" />
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone">
                        {p.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <h2 className="font-display text-xl md:text-2xl leading-tight text-bone mb-3 group-hover:text-signal transition-colors">
                      {p.title}
                    </h2>
                    <p className="text-steel-400 text-sm leading-relaxed">
                      {p.scope}
                    </p>
                    <dl className="mt-6 pt-5 border-t border-bone/10 grid grid-cols-3 gap-3 font-mono text-[0.65rem] uppercase tracking-[0.18em]">
                      <div>
                        <dt className="text-steel-600">Client</dt>
                        <dd className="text-bone mt-1 leading-tight">{p.client}</dd>
                      </div>
                      <div>
                        <dt className="text-steel-600">Year</dt>
                        <dd className="text-bone mt-1">{p.year}</dd>
                      </div>
                      <div>
                        <dt className="text-steel-600">Site</dt>
                        <dd className="text-bone mt-1 leading-tight">{p.location}</dd>
                      </div>
                    </dl>
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
                  Serving Pakistan&rsquo;s leading maritime and industrial operators<span className="text-signal">.</span>
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
