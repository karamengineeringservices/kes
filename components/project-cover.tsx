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
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 45%, rgba(6,13,27,0.55) 100%)"
        }}
      />
    </div>
  );
}
