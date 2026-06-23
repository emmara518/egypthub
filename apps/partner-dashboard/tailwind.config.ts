import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: { 500: '#0D3B66', 600: '#0A2F52', 50: '#E8F0F8', 100: '#C5D9E8', 700: '#07233E', 400: '#4A80B0' },
        secondary: { 400: '#E9C46A', 500: '#D4A843', 50: '#FDF5E6' },
        accent: { 500: '#F4A261' },
        beige: { 50: '#FEFBF5', 200: '#FAEDCD' },
      },
      fontFamily: { arabic: ["'Cairo'", 'sans-serif'] },
      boxShadow: { golden: '0 4px 14px 0 rgba(233, 196, 74, 0.3)' },
    },
  },
  plugins: [],
};
export default config;
