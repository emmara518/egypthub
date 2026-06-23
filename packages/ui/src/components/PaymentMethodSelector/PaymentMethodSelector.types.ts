export interface PaymentOption { id: string; label: string; icon: 'visa' | 'mastercard' | 'mada' | 'stcpay' | 'applepay'; }

export interface PaymentMethodSelectorProps {
  options: PaymentOption[]; selected: string; onChange: (id: string) => void; className?: string;
}
