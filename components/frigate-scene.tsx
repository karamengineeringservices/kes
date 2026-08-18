"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Animated frigate ship scene for the hero.
 * - Detailed SVG side-profile of a modern patrol frigate.
 * - Multi-layer animated water (2 wave paths + surface highlights).
 * - Cinematic camera cycles through 4 framings on a 24s loop: wide → bow → bridge → stern → wide.
 * - Ship bobs subtly on the water.
 * - Sky gradient with slow-drifting distant clouds.
 * - Respects prefers-reduced-motion (freezes into wide establishing shot).
 */
export function FrigateScene() {
  const reduce = useReducedMotion();

  // Camera scale + offset (%) keyframes for the 24s cycle.
  // Baseline scale is 1.7 (instead of 1) so the "wide" shot is already zoomed
  // in on the ship area — no more empty sky at top when frame is very tall.
  // Transform-origin sits at the ship's centre so zooming keeps it in view.
  const cameraScale = reduce ? [1.7] : [1.7, 2.35, 2.35, 2.35, 1.7];
  const cameraX = reduce ? [0] : ["0%", "12%", "0%", "-14%", "0%"];
  const cameraY = reduce ? [0] : ["0%", "2%", "-2%", "2%", "0%"];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #04091A 0%, #0A1428 45%, #111E38 78%, #16233F 100%)"
        }}
      />

      {/* Distant horizon glow */}
      <div
        className="absolute inset-x-0 h-[45vh]"
        style={{
          bottom: "38%",
          background:
            "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(196,33,39,0.14), rgba(196,33,39,0.03) 40%, transparent 70%)"
        }}
      />

      {/* Slow-drifting distant clouds */}
      <motion.div
        aria-hidden
        className="absolute left-0 right-0 h-[30vh]"
        style={{ top: "6%", opacity: 0.35 }}
        animate={reduce ? undefined : { x: ["-2%", "2%", "-2%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 1600 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <g fill="#F5F1EA" opacity="0.35">
            <ellipse cx="200" cy="120" rx="120" ry="14" />
            <ellipse cx="180" cy="100" rx="80" ry="10" />
            <ellipse cx="720" cy="140" rx="140" ry="16" />
            <ellipse cx="740" cy="120" rx="90" ry="10" />
            <ellipse cx="1180" cy="130" rx="160" ry="14" />
            <ellipse cx="1200" cy="110" rx="100" ry="10" />
          </g>
        </svg>
      </motion.div>

      {/* Camera-panning container wraps ship + water so they move together.
          origin-[50%_75%] pivots the zoom on the ship (which sits in the lower
          quarter of the SVG viewBox) so the ship stays the focal point when
          the frame is taller than the natural 16:9 SVG aspect. */}
      <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: "50% 75%" }}
        animate={{ scale: cameraScale, x: cameraX, y: cameraY }}
        transition={{
          duration: 24,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          times: reduce ? [0] : [0, 0.28, 0.5, 0.72, 1]
        }}
      >
        <svg
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full"
          aria-hidden
        >
          <defs>
            {/* Water gradient */}
            <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0A1834" />
              <stop offset="60%" stopColor="#050B1C" />
              <stop offset="100%" stopColor="#020713" />
            </linearGradient>
            {/* Hull gradient */}
            <linearGradient id="hullGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B95A3" />
              <stop offset="70%" stopColor="#5A6371" />
              <stop offset="100%" stopColor="#3A4250" />
            </linearGradient>
            <linearGradient id="hullDark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5A6371" />
              <stop offset="100%" stopColor="#2A3140" />
            </linearGradient>
            <linearGradient id="deck" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A9B2BE" />
              <stop offset="100%" stopColor="#8B95A3" />
            </linearGradient>
            <linearGradient id="reflection" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B95A3" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#8B95A3" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Waterline */}
          <rect x="0" y="620" width="1600" height="280" fill="url(#water)" />

          {/* Distant land silhouette */}
          <path
            d="M0 610 L60 605 L140 600 L220 608 L320 602 L420 610 L520 604 L620 612 L700 606 L780 612 L860 604 L940 610 L1040 604 L1140 612 L1240 605 L1340 610 L1420 604 L1500 612 L1600 606 L1600 620 L0 620 Z"
            fill="#0A1428"
            opacity="0.65"
          />

          {/* --- WAVES (multi-layer animated) --- */}
          <g>
            {/* Distant wave layer */}
            <motion.path
              d="M0 650 Q100 640 200 650 T400 650 T600 650 T800 650 T1000 650 T1200 650 T1400 650 T1600 650 L1600 660 L0 660 Z"
              fill="#111E38"
              opacity="0.7"
              animate={reduce ? undefined : { x: [0, -100, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            {/* Mid wave */}
            <motion.path
              d="M0 690 Q80 680 160 690 T320 690 T480 690 T640 690 T800 690 T960 690 T1120 690 T1280 690 T1440 690 T1600 690 L1600 705 L0 705 Z"
              fill="#0A1834"
              opacity="0.85"
              animate={reduce ? undefined : { x: [0, 80, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Foreground wave */}
            <motion.path
              d="M0 740 Q60 725 120 740 T240 740 T360 740 T480 740 T600 740 T720 740 T840 740 T960 740 T1080 740 T1200 740 T1320 740 T1440 740 T1600 740 L1600 900 L0 900 Z"
              fill="#050B1C"
              animate={reduce ? undefined : { x: [0, -60, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>

          {/* --- FRIGATE SHIP (side profile), subtle bob --- */}
          <motion.g
            animate={reduce ? undefined : { y: [0, -6, 0, -4, 0], rotate: [-0.35, 0.35, -0.35] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "800px 640px" }}
          >
            {/* Reflection under ship — faint upside-down silhouette */}
            <g transform="translate(0 1310) scale(1 -1)" opacity="0.28">
              <path
                d="M420 620 L1200 620 L1230 606 L1210 590 L950 580 L680 580 L440 590 L420 606 Z"
                fill="url(#reflection)"
              />
            </g>

            {/* Water displacement / wake */}
            <path
              d="M420 638 Q380 650 340 640 M1200 638 Q1240 650 1280 640"
              stroke="#F5F1EA"
              strokeWidth="0.8"
              fill="none"
              opacity="0.35"
            />

            {/* Red waterline underline */}
            <path
              d="M420 630 L1200 630 L1220 618 L1200 610 L440 610 L420 618 Z"
              fill="#C42127"
              opacity="0.85"
            />

            {/* Main hull */}
            <path
              d="M420 620 L1200 620 L1240 590 L1240 555 L1180 540 L1000 530 L720 530 L520 540 L440 555 L420 590 Z"
              fill="url(#hullGrad)"
              stroke="#1A2233"
              strokeWidth="1"
            />

            {/* Hull shadow band */}
            <path
              d="M430 605 L1225 605 L1235 590 L440 590 Z"
              fill="url(#hullDark)"
              opacity="0.55"
            />

            {/* Deck line */}
            <path d="M440 555 L1240 555" stroke="#1A2233" strokeWidth="0.8" />

            {/* Portholes row */}
            <g fill="#F5F1EA" opacity="0.55">
              <circle cx="500" cy="580" r="3" />
              <circle cx="540" cy="580" r="3" />
              <circle cx="580" cy="580" r="3" />
              <circle cx="620" cy="580" r="3" />
              <circle cx="660" cy="580" r="3" />
              <circle cx="700" cy="580" r="3" />
              <circle cx="740" cy="580" r="3" />
              <circle cx="780" cy="580" r="3" />
              <circle cx="820" cy="580" r="3" />
              <circle cx="860" cy="580" r="3" />
              <circle cx="900" cy="580" r="3" />
              <circle cx="940" cy="580" r="3" />
              <circle cx="980" cy="580" r="3" />
              <circle cx="1020" cy="580" r="3" />
              <circle cx="1060" cy="580" r="3" />
              <circle cx="1100" cy="580" r="3" />
              <circle cx="1140" cy="580" r="3" />
            </g>

            {/* Forward deck gun */}
            <g stroke="#1A2233" strokeWidth="1">
              <rect x="530" y="510" width="60" height="20" rx="4" fill="url(#deck)" />
              <path d="M545 510 L545 480 L575 480 L575 510" fill="url(#deck)" />
              <path d="M560 480 L560 460 L620 458 L618 465 L560 466 Z" fill="#5A6371" />
            </g>

            {/* Bridge / superstructure block 1 */}
            <path
              d="M690 530 L900 530 L900 470 L870 470 L870 440 L820 430 L720 435 L700 445 L680 470 L690 480 Z"
              fill="url(#deck)"
              stroke="#1A2233"
              strokeWidth="1"
            />
            {/* Bridge windows */}
            <g fill="#243559" opacity="0.9">
              <rect x="720" y="450" width="120" height="14" rx="1" />
              <rect x="720" y="470" width="120" height="8" rx="1" />
            </g>
            {/* Bridge accent */}
            <path d="M690 500 L900 500" stroke="#1A2233" strokeWidth="0.5" opacity="0.5" />

            {/* Bridge block 2 (aft) */}
            <path
              d="M920 530 L1040 530 L1040 480 L1000 480 L1000 460 L950 460 L940 470 L920 495 Z"
              fill="url(#deck)"
              stroke="#1A2233"
              strokeWidth="1"
            />

            {/* Main mast — forward */}
            <g stroke="#1A2233" strokeWidth="1.2" fill="none">
              <path d="M820 430 L820 340" />
              <path d="M805 400 L835 400" strokeWidth="1" />
              <path d="M810 380 L830 380" strokeWidth="0.8" />
              <path d="M815 360 L825 360" strokeWidth="0.8" />
            </g>

            {/* Radar dome on top of mast */}
            <ellipse cx="820" cy="335" rx="8" ry="4" fill="url(#deck)" stroke="#1A2233" />

            {/* Second mast — aft */}
            <g stroke="#1A2233" strokeWidth="1" fill="none">
              <path d="M985 460 L985 400" />
              <path d="M975 430 L995 430" strokeWidth="0.8" />
            </g>
            <rect x="978" y="392" width="14" height="10" rx="1" fill="url(#deck)" stroke="#1A2233" />

            {/* Aft missile launcher block */}
            <g>
              <rect x="1060" y="510" width="80" height="20" rx="2" fill="url(#deck)" stroke="#1A2233" strokeWidth="1" />
              <path d="M1075 510 L1075 495 L1125 495 L1125 510" fill="#5A6371" stroke="#1A2233" strokeWidth="1" />
            </g>

            {/* Antennas */}
            <line x1="820" y1="335" x2="820" y2="315" stroke="#8B95A3" strokeWidth="0.6" />
            <line x1="820" y1="315" x2="810" y2="325" stroke="#8B95A3" strokeWidth="0.6" />
            <line x1="820" y1="315" x2="830" y2="325" stroke="#8B95A3" strokeWidth="0.6" />

            {/* Navigation light (subtle red on mast) */}
            <circle cx="820" cy="318" r="2.5" fill="#C42127" opacity="0.9">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Flagpole aft */}
            <line x1="1220" y1="555" x2="1220" y2="510" stroke="#8B95A3" strokeWidth="0.8" />
            <rect x="1220" y="510" width="16" height="10" fill="#C42127" opacity="0.7" />

            {/* Waterline foam */}
            <path
              d="M425 622 Q430 618 440 621 Q450 623 460 620 Q470 623 480 621 Q490 618 500 621 Q510 623 520 620 Q530 618 540 621 Q550 623 560 620 Q570 622 580 620 Q590 618 600 621 Q610 623 620 620 Q630 622 640 620 Q650 618 660 621 Q670 623 680 620 Q690 622 700 620 Q710 618 720 621 Q730 623 740 620 Q750 622 760 620 Q770 618 780 621 Q790 623 800 620 Q810 622 820 620 Q830 618 840 621 Q850 623 860 620 Q870 622 880 620 Q890 618 900 621 Q910 623 920 620 Q930 622 940 620 Q950 618 960 621 Q970 623 980 620 Q990 622 1000 620 Q1010 618 1020 621 Q1030 623 1040 620 Q1050 622 1060 620 Q1070 618 1080 621 Q1090 623 1100 620 Q1110 622 1120 620 Q1130 618 1140 621 Q1150 623 1160 620 Q1170 622 1180 620 Q1190 618 1200 622"
              stroke="#F5F1EA"
              strokeWidth="1.2"
              fill="none"
              opacity="0.6"
            />
          </motion.g>

          {/* Foreground water shimmer highlights */}
          <g opacity="0.15">
            <motion.path
              d="M0 780 Q200 776 400 780 T800 780 T1200 780 T1600 780"
              stroke="#F5F1EA"
              strokeWidth="0.6"
              fill="none"
              animate={reduce ? undefined : { x: [0, -40, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M0 810 Q200 806 400 810 T800 810 T1200 810 T1600 810"
              stroke="#F5F1EA"
              strokeWidth="0.4"
              fill="none"
              animate={reduce ? undefined : { x: [0, 40, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        </svg>
      </motion.div>

      {/* Bottom vignette to help text readability */}
      <div
        className="absolute inset-x-0 bottom-0 h-[40vh] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(6,13,27,0.35) 50%, rgba(6,13,27,0.7) 100%)"
        }}
      />
    </div>
  );
}
