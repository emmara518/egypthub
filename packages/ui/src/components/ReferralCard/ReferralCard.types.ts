export interface ReferralCardProps {
  referralCode: string; rewardDescription?: string; shareUrl?: string; onShare?: (platform: string) => void; onDismiss?: () => void; className?: string;
}
