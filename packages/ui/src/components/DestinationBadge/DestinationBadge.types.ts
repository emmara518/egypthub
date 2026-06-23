export type DestinationBadgeType = 'featured' | 'popular' | 'trending' | 'new' | 'exclusive';

export interface DestinationBadgeProps {
  type: DestinationBadgeType;
  className?: string;
}
