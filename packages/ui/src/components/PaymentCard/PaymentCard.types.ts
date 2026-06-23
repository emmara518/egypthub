export interface PaymentCardProps {
  cardNumber: string; cardHolder: string; expiry: string; brand?: 'visa' | 'mastercard' | 'mada'; isFlipped?: boolean; className?: string;
}
