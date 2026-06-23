export interface OfferBannerProps {
  title: string;
  description: string;
  discount: number;
  ctaLabel: string;
  onCtaClick?: () => void;
  expiresAt: Date;
  className?: string;
}
