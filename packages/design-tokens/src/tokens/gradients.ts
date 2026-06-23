export const gradients = {
  gold: 'linear-gradient(135deg, #D4A24C 0%, #E8C97A 100%)',
  'gold-reverse': 'linear-gradient(135deg, #E8C97A 0%, #D4A24C 100%)',
  navy: 'linear-gradient(180deg, #0A0E17 0%, #0D1220 100%)',
  surface: 'linear-gradient(135deg, #141B2D 0%, #0F1420 100%)',
  overlay: 'linear-gradient(180deg, rgba(10,14,23,0) 0%, rgba(10,14,23,0.95) 100%)',
} as const;

export type GradientToken = keyof typeof gradients;
