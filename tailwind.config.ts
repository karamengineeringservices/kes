import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A1428",
          900: "#060D1B",
          800: "#0A1428",
          700: "#111E38",
          600: "#182849",
          500: "#243559"
        },
        bone: {
          DEFAULT: "#F5F1EA",
          200: "#EFE9DE",
          300: "#E4DCCB"
        },
        signal: {
          DEFAULT: "#C42127",
          600: "#A81B21",
          400: "#D9403F"
        },
        steel: {
          DEFAULT: "#8B95A3",
          600: "#6B7482",
          400: "#A9B2BE"
        }
      },
      fontFamily: {
        // display is now aliased to the same Inter as sans — clean, modern, restrained.
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.03em"
      },
      maxWidth: {
        container: "1440px",
        prose: "68ch"
      },
      spacing: {
        gutter: "clamp(1.25rem, 4vw, 3rem)",
        section: "clamp(4rem, 10vw, 8rem)"
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "fade-up": "fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
        horizon: "horizon 14s ease-in-out infinite"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        horizon: {
          "0%, 100%": { transform: "translateY(0) scale(1)", opacity: "0.45" },
          "50%": { transform: "translateY(-6px) scale(1.015)", opacity: "0.6" }
        }
      }
    }
  },
  plugins: []
};

export default config;
