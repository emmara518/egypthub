export const breakpoints = {
  xs: '0px',
  sm: '480px',
  md: '640px',
  lg: '768px',
  xl: '1024px',
  '2xl': '1280px',
  '3xl': '1536px',
} as const;

export const containerMaxWidths = {
  sm: '100%',
  md: '100%',
  lg: '768px',
  xl: '1024px',
  '2xl': '1280px',
  '3xl': '1440px',
} as const;

export type BreakpointToken = keyof typeof breakpoints;
