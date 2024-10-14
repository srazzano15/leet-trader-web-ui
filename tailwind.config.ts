import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        'big-bounce': {
          '0%, 100%':  { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2.5rem)' }

        }
      }
    },
  },
  plugins: [],
};
export default config;
