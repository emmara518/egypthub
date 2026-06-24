import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: 'rgb(var(--gold-rgb) / <alpha-value>)',
          300: 'rgb(var(--gold-rgb) / 0.12)',
        },
        dark: {
          900: 'rgb(var(--bg-rgb) / <alpha-value>)',
          800: 'rgb(var(--surface-rgb) / <alpha-value>)',
          700: 'rgb(var(--surface-elevated-rgb) / <alpha-value>)',
        },
        accent: {
          orange: 'rgb(var(--coral-rgb) / <alpha-value>)',
          amber: '#D4A24C',
          teal: '#0E8F94',
        },
        neutral: {
          100: 'rgb(var(--text-rgb) / <alpha-value>)',
          500: 'rgb(var(--text-secondary-rgb) / <alpha-value>)',
          800: 'rgb(var(--border-rgb) / <alpha-value>)',
        },
        theme: {
          bg: 'rgb(var(--bg-rgb) / <alpha-value>)',
          surface: 'rgb(var(--surface-rgb) / <alpha-value>)',
          card: 'rgb(var(--surface-elevated-rgb) / <alpha-value>)',
          elevated: 'rgb(var(--surface-hover-rgb) / <alpha-value>)',
          border: 'rgb(var(--border-rgb) / <alpha-value>)',
          hover: 'rgb(var(--surface-hover-rgb) / <alpha-value>)',
          text: 'rgb(var(--text-primary-rgb) / <alpha-value>)',
          secondary: 'rgb(var(--text-secondary-rgb) / <alpha-value>)',
          muted: '#5A6478',
          gold: 'rgb(var(--gold-rgb) / <alpha-value>)',
          teal: '#0E8F94',
        },
      },
      fontFamily: {
        playfair: ["'Playfair Display'", 'serif'],
        cairo: ["'Cairo'", 'sans-serif'],
        poppins: ["'Poppins'", 'sans-serif'],
        amiri: ["'Amiri'", 'serif'],
        arabic: ["'Cairo'", 'sans-serif'],
        english: ["'Poppins'", 'sans-serif'],
        display: ["'Playfair Display'", 'serif'],
        body: ["'Poppins'", 'sans-serif'],
      },
      borderRadius: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
      },
      boxShadow: {
        'gold-border': '0 0 0 1px rgba(212, 162, 76, 0.25)',
        'gold-glow': '0 0 20px rgba(212, 162, 76, 0.3)',
        'gold-glow-lg': '0 0 40px rgba(212, 162, 76, 0.2)',
        elevation: '0 4px 16px rgba(0, 0, 0, 0.4)',
        'elevation-lg': '0 8px 32px rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #D4A24C 0%, #E8C97A 100%)',
        'gradient-gold-reverse': 'linear-gradient(135deg, #E8C97A 0%, #D4A24C 100%)',
        'gradient-navy': 'linear-gradient(180deg, #0A0E17 0%, #111827 100%)',
        'gradient-surface': 'linear-gradient(135deg, #141B2D 0%, #0F1420 100%)',
        'gradient-overlay': 'linear-gradient(180deg, rgba(10,14,23,0) 0%, rgba(10,14,23,0.95) 100%)',
        'glow-gold': 'radial-gradient(circle, rgba(212, 162, 76, 0.3) 0%, transparent 70%)',
        'glow-gold-intense': 'radial-gradient(circle, rgba(212, 162, 76, 0.5) 0%, transparent 60%)',
      },
      transitionDuration: {
        '200': '200ms',
        '350': '350ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'ease-out-expo': 'cubic-bezier(0.32, 1, 0.36, 1)',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(212, 162, 76, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(212, 162, 76, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1.1)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'typewriter-cursor': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'ken-burns': 'ken-burns 1.4s ease-out forwards',
        'typewriter-cursor': 'typewriter-cursor 1s step-end infinite',
      },
    },
  },
  plugins: [],
};

export default config;
