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
      colors: {
        background: "var(--background-color)",
        surface: "var(--surface-color)",
        "surface-soft": "var(--surface-soft)",
        heading: "var(--heading-color)",
        body: "var(--default-color)",
        contrast: "var(--contrast-color)",
        accent: "var(--accent-color)", // gold #f4b63d
        "accent-2": "var(--accent-2)", // teal #30d5c8
        "accent-3": "var(--accent-3)", // coral #ff6a4a
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-bricolage)", "var(--font-inter)", "sans-serif"],
        nav: ["var(--font-manrope)", "var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
