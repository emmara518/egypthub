export interface OfferCardProps {
  id: string;
  title: string;
  description: string;
  discount: number;
  code?: string;
  expiresAt: Date;
  image?: string;
  onClick?: () => void;
  className?: string;
}
