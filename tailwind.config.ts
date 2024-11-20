import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gradientStart: "#7f5af0",
        gradientEnd: "#2cb67d",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        'gradient-to-r': "linear-gradient(to right, #7f5af0, #2cb67d)",
        'gradient-to-br': "linear-gradient(to bottom right, #0f172a, #1e293b)",
      },
      textColor: {
        gradient: "linear-gradient(to right, #7f5af0, #2cb67d)",
      },
    },
  },
  plugins: [],
} satisfies Config;
