export interface PriceLine { label: string; amount: string; isDiscount?: boolean; isBold?: boolean; }

export interface PriceBreakdownProps {
  lines: PriceLine[]; totalLabel?: string; totalAmount?: string; currency?: string; className?: string;
}
