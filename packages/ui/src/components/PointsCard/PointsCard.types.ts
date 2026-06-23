export type RewardTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface PointsCardProps {
  points: number; tier: RewardTier; nextTier?: string; pointsToNext?: number; currency?: string; className?: string;
}
