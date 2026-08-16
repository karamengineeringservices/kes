"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cinematic layered SVG "shipyard at dusk" — pure CSS/SVG, no external assets.
 * Multi-parallax layers respond to mouse move on desktop.
 */
export function HeroVisual() {
  const wrap = useRef<HTMLDivElement | null>(null);
  const [mp, setMp] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) / r.width;
      ty = (e.clientY - (r.top + r.height / 2)) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setMp({ x: tx, y: ty }));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const t = (mult: number) =>
    ({
      transform: `translate3d(${(mp.x * mult).toFixed(2)}px, ${(mp.y * mult).toFixed(2)}px, 0)`
    }) as React.CSSProperties;

  return (
    <div ref={wrap} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sky wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 800px at 60% 30%, rgba(24,40,73,0.9), transparent 60%), linear-gradient(180deg, #060D1B 0%, #0A1428 60%, #111E38 100%)"
        }}
      />
      {/* Horizon glow */}
      <div
        className="absolute inset-x-0 bottom-0 h-[55vh] animate-horizon"
        style={{
          background:
            "radial-gradient(ellipse 65% 60% at 50% 100%, rgba(196,33,39,0.25), transparent 70%)"
        }}
      />
      {/* Distant crane silhouettes */}
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 w-full h-full opacity-45"
        style={t(-8)}
        aria-hidden
      >
        <defs>
          <linearGradient id="fog" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#060D1B" stopOpacity="1" />
            <stop offset="100%" stopColor="#060D1B" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g stroke="#8B95A3" strokeWidth="1" fill="none" opacity="0.55">
          {/* far towers */}
          <path d="M120 720 L120 500 L180 500 L180 720 M140 620 L200 620" />
          <path d="M240 720 L240 460 L300 460 L300 720 M260 560 L340 560" />
          <path d="M380 720 L380 520 L440 520 L440 720 M400 600 L460 600" />
          <path d="M900 720 L900 480 L960 480 L960 720 M920 580 L1000 580" />
          <path d="M1080 720 L1080 500 L1140 500 L1140 720 M1100 600 L1180 600" />
          <path d="M1260 720 L1260 460 L1320 460 L1320 720 M1280 560 L1360 560" />
          <path d="M1440 720 L1440 500 L1500 500 L1500 720 M1460 600 L1540 600" />
        </g>
        <rect x="0" y="600" width="1600" height="300" fill="url(#fog)" />
      </svg>

      {/* Mid cranes + platform */}
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 w-full h-full opacity-70"
        style={t(-16)}
        aria-hidden
      >
        <g stroke="#F5F1EA" strokeWidth="1.3" fill="none" opacity="0.55">
          {/* left gantry */}
          <path d="M180 780 L180 340" />
          <path d="M180 340 L560 340 L580 320 L580 300 L200 300 L180 320 Z" />
          <path d="M300 340 L300 460 L320 460 L320 340" />
          <path d="M180 780 L120 900 M200 780 L260 900" />
          {/* diagonal bracing */}
          <path d="M180 400 L240 340 M180 460 L280 340 M180 520 L320 340 M180 580 L360 340" opacity="0.35" />

          {/* right gantry */}
          <path d="M1200 780 L1200 380" />
          <path d="M1200 380 L1520 380 L1540 360 L1540 340 L1220 340 L1200 360 Z" />
          <path d="M1340 380 L1340 500 L1360 500 L1360 380" />
          <path d="M1200 780 L1140 900 M1220 780 L1280 900" />
          <path d="M1200 440 L1260 380 M1200 500 L1300 380 M1200 560 L1340 380" opacity="0.35" />

          {/* horizontal deck line */}
          <path d="M0 780 L1600 780" strokeWidth="1" />
          <path d="M0 800 L1600 800" strokeWidth="0.6" opacity="0.5" />
        </g>
      </svg>

      {/* Foreground vessel silhouette */}
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 w-full h-full"
        style={t(-28)}
        aria-hidden
      >
        <defs>
          <linearGradient id="hull" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#111E38" />
            <stop offset="100%" stopColor="#060D1B" />
          </linearGradient>
        </defs>
        {/* water line */}
        <path d="M0 820 L1600 820" stroke="#F5F1EA" strokeWidth="0.6" opacity="0.25" />
        {/* hull */}
        <path
          d="M280 820 L1320 820 L1400 780 L1420 700 L1240 660 L360 660 L200 700 L220 780 Z"
          fill="url(#hull)"
          stroke="#F5F1EA"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
        {/* superstructure */}
        <path
          d="M960 660 L1120 660 L1130 590 L1080 590 L1080 540 L1000 540 L1000 590 L950 590 Z"
          fill="#111E38"
          stroke="#F5F1EA"
          strokeOpacity="0.4"
          strokeWidth="1"
        />
        {/* mast */}
        <path d="M1060 540 L1060 470" stroke="#F5F1EA" strokeOpacity="0.5" />
        <circle cx="1060" cy="468" r="3" fill="#C42127" />
        {/* portholes */}
        <g fill="#F5F1EA" opacity="0.5">
          <circle cx="480" cy="740" r="3" />
          <circle cx="540" cy="740" r="3" />
          <circle cx="600" cy="740" r="3" />
          <circle cx="660" cy="740" r="3" />
          <circle cx="720" cy="740" r="3" />
          <circle cx="780" cy="740" r="3" />
          <circle cx="840" cy="740" r="3" />
        </g>
        {/* subtle reflection */}
        <path d="M280 820 L1320 820 L1400 780 L220 780 Z" fill="#060D1B" opacity="0.4" />
      </svg>

      {/* Grid + noise */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
    </div>
  );
}
