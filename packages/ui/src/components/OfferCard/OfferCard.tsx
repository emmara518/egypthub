'use client';

import { cn } from '../../utils/cn';
import { Card } from '../Card';
import { OfferCountdown } from '../OfferCountdown';
import type { OfferCardProps } from './OfferCard.types';

export function OfferCard({
  title,
  description,
  discount,
  code,
  expiresAt,
  image,
  onClick,
  className,
}: OfferCardProps) {
  return (
    <Card variant="featured" isHoverable onClick={onClick} padding="none" className={cn('overflow-hidden', className)}>
      <div className="flex flex-col sm:flex-row">
        {image && (
          <div className="relative w-full sm:w-1/3 h-32 sm:h-auto overflow-hidden">
            <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/60 to-transparent" />
          </div>
        )}
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-heading-lg font-bold text-gold">{discount}%</span>
                <span className="text-body-sm text-text-secondary">خصم</span>
              </div>
              <h3 className="text-heading-sm font-semibold text-text-primary mt-1">{title}</h3>
              <p className="text-body-sm text-text-secondary mt-1">{description}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
            {code && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gold/10 border border-gold/30 rounded-lg">
                <span className="text-caption text-text-muted">الكود:</span>
                <span className="text-body-sm font-mono font-bold text-gold tracking-wider">{code}</span>
              </div>
            )}
            <div className="flex-shrink-0">
              <span className="text-caption text-text-muted">ينتهي بعد</span>
              <OfferCountdown targetDate={expiresAt} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
