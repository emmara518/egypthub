import type { DestinationBadgeType } from '../DestinationBadge/DestinationBadge.types';

export interface DestinationCardProps {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  rating: number;
  reviewCount: number;
  price?: string;
  duration?: string;
  badge?: DestinationBadgeType;
  onClick?: () => void;
  className?: string;
}
