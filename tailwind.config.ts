import type { Config } from "tailwindcss";

// Theme tokens ported verbatim from the original assets/css/main.css :root
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        // short portrait phones (e.g. iPhone SE): the hero tightens so it ends above the video's subject
        short: { raw: "(orientation: portrait) and (max-height: 700px)" },
      },
      colors: {
        heading: "var(--heading-color)",
        contrast: "var(--contrast-color)",
        // alpha-enabled so modifiers like border-accent/40 generate CSS
        accent: "rgb(var(--accent-rgb) / <alpha-value>)", // gold #f4b63d
        "accent-2": "rgb(var(--accent-2-rgb) / <alpha-value>)", // teal #30d5c8
        "accent-3": "rgb(var(--accent-3-rgb) / <alpha-value>)", // coral #ff6a4a
        // alpha-enabled tokens used by the nav (limelight)
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-bricolage)", "var(--font-inter)", "sans-serif"],
        nav: ["var(--font-manrope)", "var(--font-inter)", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"], // footer sign-off only
      },
    },
  },
  plugins: [],
};

export default config;
