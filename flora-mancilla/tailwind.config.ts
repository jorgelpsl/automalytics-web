import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        wine: {
          DEFAULT: "#6E3E3B",
          deep: "#4C2A28",
          light: "#8B5652",
        },
        cream: {
          DEFAULT: "#F6EFE6",
          alt: "#EEE1D1",
        },
        ink: "#2C2724",
        taupe: "#8C7C6E",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-lora)", "serif"],
      },
      borderRadius: {
        soft: "6px",
        card: "18px",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(44, 39, 36, 0.08)",
        "soft-lg": "0 24px 60px rgba(44, 39, 36, 0.14)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "50%": { transform: "translate(-2%, 2%) rotate(1.5deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.9s ease-out both",
        drift: "drift 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
