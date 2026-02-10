import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        luxurygold: {
          "primary": "#D4AF37",
          "secondary": "#1f2937",
          "accent": "#F5C542",
          "neutral": "#0f172a",
          "base-100": "#0b0f1a",
          "base-200": "#0f172a",
          "base-300": "#111827",
          "base-content": "#E5E7EB",
          "info": "#38bdf8",
          "success": "#22c55e",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
      },
      "dark",
    ],
  },

}
