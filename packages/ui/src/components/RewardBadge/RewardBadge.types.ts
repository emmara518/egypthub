export interface RewardItem { id: string; label: string; icon: string; isLocked?: boolean; description?: string; }

export interface RewardBadgeProps {
  rewards: RewardItem[]; onClaim?: (id: string) => void; className?: string;
}
