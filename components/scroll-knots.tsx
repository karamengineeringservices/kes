"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ScrollKnots — Seasats-style whimsical footer metric:
 * Shows cumulative scroll distance converted into meters and average scroll
 * speed converted into knots, plus a contextual poetic caption that changes
 * based on current speed.
 *
 * Conversion: 1 CSS pixel ≈ 0.264 mm on a typical 96dpi display.
 * That's a rough approximation, meant to be evocative not measurement-grade.
 * 1 knot = 1.852 km/h = 0.514 m/s.
 */
export function ScrollKnots() {
  const [meters, setMeters] = useState(0);
  const [knots, setKnots] = useState(0);
  const [caption, setCaption] = useState("Still in port. Waiting for the tide.");
  const lastY = useRef(0);
  const lastT = useRef(0);
  const cum = useRef(0);
  const speedEMA = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    lastT.current = performance.now();
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const now = performance.now();
        const dy = Math.abs(window.scrollY - lastY.current);
        const dt = Math.max(1, now - lastT.current);
        // Convert pixels → meters (0.264 mm per CSS px)
        cum.current += dy * 0.000264;
        // Instantaneous scroll speed in m/s → knots
        const mps = (dy * 0.000264) / (dt / 1000);
        // Exponential smoothing
        speedEMA.current = speedEMA.current * 0.82 + mps * 0.18;
        const kn = speedEMA.current / 0.5144;

        setMeters(cum.current);
        setKnots(kn);

        // Caption tiers — poetic and grounded
        let cap: string;
        if (kn < 0.001) cap = "Still in port. Waiting for the tide.";
        else if (kn < 0.02) cap = "A feather on a glass-still tide.";
        else if (kn < 0.08) cap = "Making way. Steady as she goes.";
        else if (kn < 0.25) cap = "Underway at cruise. Sea state calm.";
        else if (kn < 0.6) cap = "Full ahead. Wake building astern.";
        else cap = "Flank speed. Hold the rail.";
        setCaption(cap);

        lastY.current = window.scrollY;
        lastT.current = now;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Also decay speed toward zero when idle
    const idleInterval = window.setInterval(() => {
      speedEMA.current *= 0.85;
      setKnots(speedEMA.current / 0.5144);
      if (speedEMA.current < 0.0002) {
        setCaption("Still in port. Waiting for the tide.");
      }
    }, 400);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.clearInterval(idleInterval);
    };
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-bone/10 pt-8">
      <div>
        <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-steel-600 mb-2">
          Distance scrolled
        </div>
        <div className="font-mono text-2xl md:text-3xl text-bone tabular-nums flex items-baseline gap-2">
          {meters.toFixed(2)}
          <span className="text-steel-600 text-sm">m</span>
        </div>
      </div>
      <div>
        <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-steel-600 mb-2">
          Avg. scroll speed
        </div>
        <div className="font-mono text-2xl md:text-3xl text-bone tabular-nums flex items-baseline gap-2">
          {knots.toFixed(3)}
          <span className="text-steel-600 text-sm">kn</span>
        </div>
      </div>
      <div className="col-span-2 md:col-span-1 md:text-right">
        <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-steel-600 mb-2">
          Log
        </div>
        <div className="italic text-bone/80 text-sm leading-relaxed max-w-xs md:ml-auto">
          &ldquo;{caption}&rdquo;
        </div>
      </div>
    </div>
  );
}
