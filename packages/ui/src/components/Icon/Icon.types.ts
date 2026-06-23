export type IconName = keyof typeof import('./icon-paths').iconPaths;

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type IconColor = 'default' | 'gold' | 'success' | 'error' | 'warning' | 'info' | 'muted';

export interface IconProps {
  name: IconName;
  size?: IconSize;
  color?: IconColor;
  className?: string;
  'aria-label'?: string;
}

export const iconSizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 48,
};

export const iconColorMap: Record<IconColor, string> = {
  default: 'currentColor',
  gold: 'var(--gold)',
  success: 'var(--success)',
  error: 'var(--error)',
  warning: 'var(--warning)',
  info: 'var(--info)',
  muted: 'var(--text-muted)',
};
