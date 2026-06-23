export const shadows = {
  sm: '0 1px 3px rgba(0,0,0,0.3)',
  md: '0 4px 12px rgba(0,0,0,0.4)',
  lg: '0 8px 24px rgba(0,0,0,0.5)',
  xl: '0 16px 48px rgba(0,0,0,0.6)',
  gold: '0 4px 14px rgba(212,162,76,0.25)',
  'gold-lg': '0 8px 32px rgba(212,162,76,0.3)',
  'gold-glow': '0 0 20px rgba(212,162,76,0.15)',
  inner: 'inset 0 2px 4px rgba(0,0,0,0.3)',
  'inner-gold': 'inset 0 0 0 2px rgba(212,162,76,0.3)',
} as const;

export type ShadowToken = keyof typeof shadows;
