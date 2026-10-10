import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#14213D",
          soft: "#3B4760",
          muted: "#5B6478",
        },
        paper: {
          DEFAULT: "#FAFAF7",
          alt: "#F1F0EA",
          sheet: "#FFFFFF",
        },
        marker: {
          DEFAULT: "#F5C24B",
          soft: "#FBE3A6",
        },
        line: "rgba(20, 33, 61, 0.12)",
        // WhatsApp's own green: the one colour outside the palette, so the floating
        // button is recognizable as WhatsApp at a glance.
        whatsapp: "#25D366",
      },
      fontFamily: {
        display: ["var(--font-newsreader)", "Georgia", "serif"],
        body: ["var(--font-onest)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        soft: "6px",
        card: "12px",
      },
      boxShadow: {
        sheet: "0 1px 2px rgba(20, 33, 61, 0.06), 0 18px 40px -18px rgba(20, 33, 61, 0.28)",
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
