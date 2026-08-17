"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Dynamically import the WebGL scene client-side only (SSR-safe, code-split)
const OceanScene = dynamic(
  () => import("./ocean-scene").then((m) => ({ default: m.OceanScene })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 grid place-items-center bg-ink">
        <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-steel">
          Loading maritime scene…
        </div>
      </div>
    )
  }
);

/**
 * Detects whether the current device can (or should) render a real 3D scene.
 * Rejects: touch-only devices, narrow viewports, reduced-motion preference,
 * WebGL unsupported.
 */
function useCanRender3D(): boolean | null {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    // reduced motion → skip 3D (accessibility)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOk(false);
      return;
    }
    // narrow viewport or touch-first → skip 3D
    if (window.innerWidth < 1024 || window.matchMedia("(hover: none)").matches) {
      setOk(false);
      return;
    }
    // WebGL support
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl");
      if (!gl) {
        setOk(false);
        return;
      }
    } catch {
      setOk(false);
      return;
    }
    setOk(true);
  }, []);
  return ok;
}

/**
 * Hero3D — thin wrapper that measures the hero container's scroll progress
 * and passes it to OceanScene for camera choreography.
 * The parent must be `position: relative` and this fills it absolutely.
 */
export function Hero3D({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const can = useCanRender3D();
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!can) return;
    const update = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const viewportH = window.innerHeight;
        // Progress: 0 when hero fully in view at top, 1 when fully scrolled past
        const total = rect.height + viewportH;
        const scrolled = viewportH - rect.top;
        const raw = scrolled / total;
        const p = Math.max(0, Math.min(1, raw));
        setProgress(p);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [can, containerRef]);

  if (can === null) return null; // avoid flash pre-hydration
  if (!can) return null; // fallback handled by parent
  return <OceanScene scrollProgress={progress} />;
}

export function useCanRender3DExternal() {
  return useCanRender3D();
}
