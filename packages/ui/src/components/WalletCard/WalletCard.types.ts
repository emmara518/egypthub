export interface WalletCardProps {
  balance: string; currency?: string; cardNumber?: string; isActive?: boolean; onTopUp?: () => void; className?: string;
}
