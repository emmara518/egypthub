export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerColor = 'gold' | 'white' | 'muted';

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  isCentered?: boolean;
  label?: string;
}
