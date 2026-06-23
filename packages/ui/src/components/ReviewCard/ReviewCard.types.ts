export interface ReviewCardProps {
  id: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  content: string;
  date: string;
  tripInfo?: string;
  className?: string;
}
