export const fonts = {
  family: {
    arabic: "'Cairo', sans-serif",
    english: "'Poppins', sans-serif",
    display: "'Playfair Display', serif",
    accent: "'Amiri', serif",
  },
  weight: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
  },
} as const;

export const fontSize = {
  'display-lg': '4rem',
  'display-md': '3rem',
  'display-sm': '2.25rem',
  'heading-lg': '1.875rem',
  'heading-md': '1.5rem',
  'heading-sm': '1.25rem',
  'body-lg': '1.125rem',
  'body-md': '1rem',
  'body-sm': '0.875rem',
  caption: '0.75rem',
  overline: '0.6875rem',
  'stat-lg': '3rem',
  'stat-md': '2rem',
  'stat-sm': '1.5rem',
} as const;

export const lineHeight = {
  'display-lg': 1.1,
  'display-md': 1.15,
  'display-sm': 1.2,
  'heading-lg': 1.3,
  'heading-md': 1.35,
  'heading-sm': 1.4,
  'body-lg': 1.6,
  'body-md': 1.6,
  'body-sm': 1.5,
  caption: 1.4,
  overline: 1.3,
  'stat-lg': 1,
  'stat-md': 1,
  'stat-sm': 1,
} as const;

export const letterSpacing = {
  'display-lg': '-0.02em',
  'display-md': '-0.01em',
  caption: '0.01em',
  overline: '0.15em',
  normal: '0',
} as const;

export type FontSizeToken = keyof typeof fontSize;
export type FontFamilyToken = keyof typeof fonts.family;
