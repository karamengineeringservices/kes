import Link from "next/link";
import { Logo } from "./logo";
import { KarachiClock } from "./karachi-clock";
import { ScrollKnots } from "./scroll-knots";
import { site, sectors } from "@/lib/site";

const cols = [
  {
    label: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/services", label: "Services" },
      { href: "/projects", label: "Projects" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" }
    ]
  },
  {
    label: "Services",
    links: [
      { href: "/services#fabrication", label: "Fabrication & Erection" },
      { href: "/services#outfitting", label: "Outfitting Works" },
      { href: "/services#boilers", label: "Boilers & Pressure Vessels" },
      { href: "/services#blasting", label: "Grit Blasting & Painting" },
      { href: "/services#electrical", label: "Hydraulics System and Overhaul" },
      { href: "/services#manpower", label: "Skilled Manpower" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="relative bg-ink-900 text-bone border-t border-bone/10 overflow-hidden">
      {/* Big wordmark */}
      <div className="max-w-container mx-auto px-gutter pt-20 pb-6">
        <div className="font-display leading-none tracking-tighter text-bone/[0.04] text-[clamp(6rem,20vw,20rem)] select-none">
          KARAM
        </div>
      </div>

      <div className="max-w-container mx-auto px-gutter pb-10 -mt-8">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Brand block */}
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 text-steel-400 text-sm max-w-sm leading-relaxed">
              KARAM Engineering Services delivers integrated engineering,
              fabrication, marine repair, industrial maintenance, and technical
              manpower solutions for clients across Pakistan and beyond.
            </p>
            <div className="mt-8 font-mono text-xs text-steel space-y-1">
              <div className="text-bone">{site.address.line1}</div>
              <div className="text-bone">{site.address.line2}</div>
              <div>{site.address.city}</div>
              <div className="mt-2">
                <span className="text-steel-600">CELL</span>{" "}
                <a
                  href={`tel:${site.cell.replace(/\s/g, "")}`}
                  className="hover:text-bone"
                >
                  {site.cell}
                </a>
              </div>
              <div>
                <span className="text-steel-600">EMAIL</span>{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-bone break-all"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.label} className="lg:col-span-2">
              <div className="font-mono uppercase tracking-[0.2em] text-[0.65rem] text-signal mb-5">
                {c.label}
              </div>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-steel-400 hover:text-bone transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <div className="font-mono uppercase tracking-[0.2em] text-[0.65rem] text-signal mb-5">
              Sectors
            </div>
            <ul className="space-y-3">
              {sectors.map((s) => (
                <li key={s} className="text-sm text-steel-400">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="font-mono uppercase tracking-[0.2em] text-[0.65rem] text-signal mb-5">
              Registered
            </div>
            <ul className="space-y-4">
              {site.registrations.map((r) => (
                <li key={r.label}>
                  <div className="text-xs text-steel-600">{r.label}</div>
                  <div className="text-sm text-bone font-mono">{r.value}</div>
                  {"category" in r && r.category && (
                    <div className="text-xs text-steel">{r.category}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Scroll-in-knots metric */}
        <div className="mt-16">
          <ScrollKnots />
        </div>

        {/* Bottom rail */}
        <div className="mt-10 pt-6 border-t border-bone/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-steel">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-steel">
            <KarachiClock className="text-bone tabular-nums" />
            <span className="text-steel-600">·</span>
            <span>{site.coords}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
