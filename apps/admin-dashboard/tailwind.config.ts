import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: { 500: '#0D3B66', 600: '#0A2F52', 50: '#E8F0F8', 100: '#C5D9E8', 700: '#07233E' },
        secondary: { 400: '#E9C46A', 500: '#D4A843' },
        accent: { 500: '#F4A261' },
        beige: { 50: '#FEFBF5', 200: '#FAEDCD' },
      },
      fontFamily: { arabic: ["'Cairo'", 'sans-serif'] },
    },
  },
  plugins: [],
};
export default config;
