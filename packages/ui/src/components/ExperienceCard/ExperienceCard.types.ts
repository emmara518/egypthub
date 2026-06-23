import type { ExperienceBadgeType } from '../ExperienceBadge/ExperienceBadge.types';

export interface ExperienceCardProps {
  id: string;
  image: string;
  title: string;
  description?: string;
  rating: number;
  reviewCount: number;
  price: string;
  duration: string;
  location: string;
  badge?: ExperienceBadgeType;
  onClick?: () => void;
  className?: string;
}
