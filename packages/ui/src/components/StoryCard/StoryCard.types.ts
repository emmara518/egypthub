export interface StoryCardProps {
  id: string;
  image: string;
  title: string;
  excerpt: string;
  authorName: string;
  authorAvatar?: string;
  readTime: string;
  onClick?: () => void;
  className?: string;
}
