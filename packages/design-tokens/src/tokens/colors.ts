export const colors = {
  bg: {
    primary: '#0A0E17',
    secondary: '#0D1220',
  },
  surface: '#0F1420',
  'surface-elevated': '#141B2D',
  'surface-hover': '#1A2235',
  border: '#1E2A3D',
  'border-light': '#2A3A52',
  gold: '#D4A24C',
  'gold-light': '#E8C97A',
  'gold-dark': '#B8862D',
  'gold-subtle': 'rgba(212, 162, 76, 0.12)',
  'gold-border': 'rgba(212, 162, 76, 0.25)',
  text: {
    primary: '#F5F7FA',
    secondary: '#8B95A5',
    muted: '#5A6478',
    gold: '#D4A24C',
    inverse: '#0A0E17',
  },
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
} as const;

export type ColorToken = keyof typeof colors;
