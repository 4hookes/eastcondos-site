import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: "#7C9885",
        "sage-dark": "#5A7262",
        "sage-light": "#F2F5F0",
        cream: "#FAF8F5",
        gold: "#d4a853",
        "gold-light": "#e8c97a",
        navy: "#2D3436",
        body: "#4a4a4a",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
