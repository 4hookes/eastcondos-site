import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      sage: "#7C9885",
      "sage-dark": "#5A7262",
      "sage-light": "#F2F5F0",
      cream: "#F8F9FA", // Updated to Off-white/Porcelain
      gold: "#C5A059", // Updated to Muted Metallic Gold
      "gold-light": "#E0C385",
      navy: "#0A1128", // Updated to Deep Royal Navy
      body: "#334155", // Updated to Slate 700
    },
    fontFamily: {
      sans: ["var(--font-lato)", "var(--font-inter)", "system-ui", "sans-serif"],
      serif: ["var(--font-playfair)", "serif"],
    },
  },
  plugins: [],
};

export default config;
