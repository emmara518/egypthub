export interface CouponInputProps {
  onApply: (code: string) => void; onRemove?: () => void; appliedCode?: string; error?: string; isLoading?: boolean; className?: string;
}
