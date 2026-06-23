export const transition = {
  fast: '150ms ease-in-out',
  base: '250ms ease-in-out',
  slow: '400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  spring: '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

export const animation = {
  'fade-in': 'fadeIn 300ms ease-out',
  'slide-up': 'slideUp 300ms ease-out',
  'slide-down': 'slideDown 300ms ease-out',
  'slide-right': 'slideRight 300ms ease-out',
  'scale-in': 'scaleIn 200ms ease-out',
  'glow-pulse': 'glowPulse 2s ease-in-out infinite',
  float: 'float 3s ease-in-out infinite',
  spin: 'spin 600ms linear infinite',
  'pulse-skeleton': 'pulseSkeleton 1.5s ease-in-out infinite',
} as const;

export type TransitionToken = keyof typeof transition;
export type AnimationToken = keyof typeof animation;
