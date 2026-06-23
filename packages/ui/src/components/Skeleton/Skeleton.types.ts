export type SkeletonVariant = 'text' | 'text-sm' | 'heading' | 'circle' | 'card' | 'image' | 'table' | 'button';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  className?: string;
}
