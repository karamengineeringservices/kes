"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * HeroMedia — tries hero.mp4 first (auto-play, muted, loop) for real motion.
 * Falls back to hero.jpg with heavy "living scene" overlays:
 *   - Subtle ship-rocking rotation on the whole photo (±0.4deg sine loop)
 *   - Slow horizontal pan drift
 *   - Ken Burns scale breathe
 *   - Animated wave lines at the base of the photo (foam-trail feel)
 *   - Occasional light-ray sweep across the water
 * All motion is smooth, sub-1s per frame, and respects prefers-reduced-motion.
 */
export function HeroMedia() {
  const reduce = useReducedMotion();
  const [videoOk, setVideoOk] = useState<boolean | null>(null);
  const vRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Probe the video file. If it doesn't exist (404) or fails to load, fall back to image.
    let cancelled = false;
    fetch("/hero.mp4", { method: "HEAD" })
      .then((r) => {
        if (cancelled) return;
        setVideoOk(r.ok);
      })
      .catch(() => {
        if (!cancelled) setVideoOk(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink-900">
      {/* Ken Burns / rock / drift wrapper */}
      <motion.div
        className="absolute inset-0"
        animate={
          reduce
            ? undefined
            : {
                rotate: [-0.35, 0.35, -0.35],
                x: ["-1.5%", "1.5%", "-1.5%"],
                scale: [1.05, 1.11, 1.05]
              }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        {videoOk ? (
          <video
            ref={vRef}
            src="/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setVideoOk(false)}
          />
        ) : (
          <Image
            src="/hero.jpg"
            alt="Modern frigate underway on open ocean"
            fill
            priority
            unoptimized
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />
        )}
      </motion.div>

      {/* Foam trail — animated wave lines at bottom of the frame */}
      {!reduce && (
        <svg
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[35%] w-full pointer-events-none mix-blend-screen"
          viewBox="0 0 1600 300"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="foamFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F5F1EA" stopOpacity="0" />
              <stop offset="50%" stopColor="#F5F1EA" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#F5F1EA" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0 210 Q120 200 240 210 T480 210 T720 210 T960 210 T1200 210 T1440 210 T1600 210 L1600 220 L0 220 Z"
            fill="url(#foamFade)"
            animate={{ x: [0, -80, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M0 235 Q100 225 200 235 T400 235 T600 235 T800 235 T1000 235 T1200 235 T1400 235 T1600 235 L1600 245 L0 245 Z"
            fill="url(#foamFade)"
            animate={{ x: [0, 60, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M0 270 Q80 262 160 270 T320 270 T480 270 T640 270 T800 270 T960 270 T1120 270 T1280 270 T1440 270 T1600 270 L1600 300 L0 300 Z"
            fill="url(#foamFade)"
            animate={{ x: [0, -40, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      )}

      {/* Sunlight sweep — occasional light band moving across the photo */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="absolute inset-y-0 pointer-events-none mix-blend-overlay"
          style={{
            width: "40%",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,240,210,0.18) 50%, transparent 100%)"
          }}
          initial={{ left: "-40%" }}
          animate={{ left: ["-40%", "120%"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
        />
      )}

      {/* Scan-line texture for cinematic tech feel (always on) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 3px)",
          backgroundSize: "100% 3px"
        }}
      />

      {/* Subtle floating spray particles */}
      {!reduce && (
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-[2px] h-[2px] rounded-full bg-bone/40"
              style={{
                left: `${(i * 8.3 + 4) % 100}%`,
                top: `${(i * 13 + 20) % 80}%`
              }}
              animate={{
                y: [0, -20 - (i % 3) * 10, 0],
                opacity: [0.15, 0.55, 0.15]
              }}
              transition={{
                duration: 5 + (i % 4),
                repeat: Infinity,
                ease: "easeInOut",
                delay: (i * 0.4) % 3
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
