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
        // AMBER — the brand accent. Reverted 2026-08-02: the signal orange-red
        // tried on 1 Aug lasted a day and Elfi hated it. The token name never
        // changed, so all 63 consuming files flip back at once with this edit.
        // (The old accent is deliberately not written here as a hex — a global
        // swap rewrites hexes inside comments too, which makes the note lie.)
        amber: {
          DEFAULT: "#D4A843",
          light: "#E0BC6A",
          deep: "#7E6014",
        },
        offwhite: "#FAFAF8",
        cream: "#F3F2F0",
        paper: "#EAE9E6",
        body: "#222326",

        // Transition aliases (legacy support — do not use in new code)
        sage: "#6B7280",
        "sage-dark": "#1A1A2E",
        "sage-light": "#FAFAF8",
        gold: "#D4A843",
        "gold-light": "#E0BC6A",
        navy: "#1A1A2E",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-dm-serif)", "Georgia", "serif"],
        display: ["var(--font-dm-serif)", "Georgia", "serif"],
        mono: ["var(--font-inter)", "system-ui", "sans-serif"],
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
