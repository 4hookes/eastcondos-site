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
        amber: {
          DEFAULT: "#D4A843",
          light: "#E0BC6A",
          deep: "#B8902F",
        },
        offwhite: "#FAFAF8",
        cream: "#F2EBDB",
        paper: "#EFE7D2",
        body: "#374151",

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
        serif: ["var(--font-dm-serif)", "serif"],
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
