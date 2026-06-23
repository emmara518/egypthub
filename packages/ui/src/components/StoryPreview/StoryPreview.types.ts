export interface StoryPreviewProps {
  image: string;
  title: string;
  excerpt: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  readTime: string;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}
