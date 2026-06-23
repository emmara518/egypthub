export interface AIRecommendationCardProps {
  title: string;
  description: string;
  image?: string;
  reason?: string;
  matchScore?: number;
  onClick?: () => void;
  className?: string;
}
