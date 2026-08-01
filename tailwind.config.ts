import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern Luxe — Editorial palette
        charcoal: {
          DEFAULT: "#1A1A2E",
          light: "#2D2D44",
          deep: "#0E0E1F",
        },
        // SIGNAL — brand accent since 2026-08-01 (was amber #D4A843).
        // Token name kept as `amber` so all 63 consuming files flip at once.
        amber: {
          DEFAULT: "#E8401F",
          light: "#FF6B35",
          deep: "#B82F12",
        },
        offwhite: "#FAFAF8",
        cream: "#F2EBDB",
        paper: "#EFE7D2",
        body: "#374151",

        // Transition aliases (legacy support — do not use in new code)
        sage: "#6B7280",
        "sage-dark": "#1A1A2E",
        "sage-light": "#FAFAF8",
        gold: "#E8401F",
        "gold-light": "#FF6B35",
        navy: "#1A1A2E",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-dm-serif)", "serif"],
        display: ["var(--font-inter-display)", "var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeInLeft: {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight: {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.6s ease-out forwards",
        fadeInLeft: "fadeInLeft 0.6s ease-out forwards",
        fadeInRight: "fadeInRight 0.6s ease-out forwards",
      },
      boxShadow: {
        premium: "0 4px 20px rgba(0, 0, 0, 0.06)",
        "premium-lg": "0 8px 40px rgba(0, 0, 0, 0.08)",
        "premium-glow":
          "0 8px 40px rgba(212, 168, 67, 0.08), 0 4px 20px rgba(0, 0, 0, 0.06)",
        "inner-subtle": "inset 0 1px 2px rgba(0, 0, 0, 0.04)",
      },
      letterSpacing: {
        premium: "-0.02em",
        "premium-tight": "-0.03em",
        kicker: "0.24em",
        broadsheet: "0.18em",
      },
      maxWidth: {
        broadsheet: "1320px",
        article: "65ch",
      },
    },
  },
  plugins: [],
};

export default config;
