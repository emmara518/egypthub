export type DiscountType = 'percentage' | 'fixed' | 'free';

export interface DiscountBadgeProps {
  value: string; type?: DiscountType; description?: string; isExpired?: boolean; className?: string;
}
