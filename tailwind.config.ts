import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: "#07090e",
          900: "#0b0f19",
          850: "#0f1626",
          800: "#141c30",
          700: "#1e2942",
        },
        neon: {
          blue: "#00f0ff",
          cyan: "#38bdf8",
          purple: "#a855f7",
          violet: "#8b5cf6",
          pink: "#ec4899",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glass-gradient":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
        "glow-conic":
          "conic-gradient(from 180deg at 50% 50%, #00f0ff 0deg, #a855f7 180deg, #00f0ff 360deg)",
      },
      boxShadow: {
        "neon-blue": "0 0 25px -5px rgba(0, 240, 255, 0.35)",
        "neon-violet": "0 0 25px -5px rgba(168, 85, 247, 0.35)",
        "neon-glow":
          "0 0 35px -5px rgba(0, 240, 255, 0.25), 0 0 20px -5px rgba(168, 85, 247, 0.3)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 5s ease-in-out infinite",
        "glow-pulse": "glowPulse 4s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        glowPulse: {
          "0%": { opacity: "0.4", filter: "blur(40px)" },
          "100%": { opacity: "0.7", filter: "blur(60px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
