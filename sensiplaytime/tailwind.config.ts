import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "brand-dark": "#173F5F",
        "brand-turquoise": "#45C7C0",
        "brand-mint": "#A8E6CF",
        "brand-yellow": "#FFD84D",
        "brand-coral": "#FF6B7A",
        "brand-lavender": "#B9A7F5",
        "brand-cream": "#FFF9EF",
      },
      fontFamily: {
        heading: ["var(--font-fredoka)", "sans-serif"],
        body: ["var(--font-nunito-sans)", "sans-serif"],
      },
      borderRadius: {
        brand: "16px",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(23, 63, 95, 0.08)",
        "soft-lg": "0 20px 45px rgba(23, 63, 95, 0.12)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
