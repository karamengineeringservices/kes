import type { Project, ProjectCategory } from "@/lib/projects";

// Deterministic per-category gradient — no photos needed, keeps the grid
// visually distinct card-to-card using the site's existing ink/signal/steel palette.
const categoryGrad: Record<ProjectCategory, string> = {
  "MILGEM-3": "from-signal/35 via-ink-700 to-ink-900",
  "MILGEM-4": "from-ink-500/60 via-ink-700 to-ink-900",
  Gunboat: "from-steel/35 via-ink-700 to-ink-900",
  Shipbuilding: "from-signal/25 via-ink-700 to-ink-900",
  "Ship Repair": "from-ink-500/45 via-ink-700 to-ink-900",
  International: "from-signal/45 via-ink-700 to-ink-900"
};

export function ProjectCover({ p, index }: { p: Project; index: number }) {
  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${categoryGrad[p.category]}`}>
      <div className="absolute inset-0 grid-bg opacity-30" />
      {/* Large faint ordinal watermark */}
      <div className="absolute -right-2 -bottom-6 font-display text-[7rem] leading-none font-semibold text-bone/[0.05] select-none">
        {String(index + 1).padStart(2, "0")}
      </div>
      {/* Blueprint-style corner ticks */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
        aria-hidden
      >
        <g stroke="#F5F1EA" strokeWidth="0.6" fill="none" opacity="0.5">
          <path d="M20 20 L60 20 M20 20 L20 60" />
          <path d="M380 20 L340 20 M380 20 L380 60" />
          <path d="M20 280 L60 280 M20 280 L20 240" />
          <path d="M380 280 L340 280 M380 280 L380 240" />
          <circle cx="200" cy="150" r="70" opacity="0.35" />
          <circle cx="200" cy="150" r="40" opacity="0.35" />
        </g>
      </svg>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 45%, rgba(6,13,27,0.55) 100%)"
        }}
      />
    </div>
  );
}
