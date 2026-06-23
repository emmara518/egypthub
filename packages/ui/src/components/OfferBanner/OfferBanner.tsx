'use client';

import { cn } from '../../utils/cn';
import { OfferCountdown } from '../OfferCountdown';
import type { OfferBannerProps } from './OfferBanner.types';

export function OfferBanner({
  title,
  description,
  discount,
  ctaLabel,
  onCtaClick,
  expiresAt,
  className,
}: OfferBannerProps) {
  return (
    <section className={cn('relative overflow-hidden rounded-2xl bg-gradient-to-r from-surface-elevated via-gold/5 to-surface-elevated border border-gold/20', className)}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,162,76,0.08),transparent_50%)]" />
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-8 sm:py-10">
        <div className="text-center sm:text-right rtl:text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 mb-3">
            <span className="text-heading-lg font-bold text-gold">{discount}%</span>
            <span className="text-body-sm text-text-secondary">خصم</span>
          </div>
          <h3 className="text-heading-md font-bold text-text-primary">{title}</h3>
          <p className="text-body-md text-text-secondary mt-1 max-w-md">{description}</p>
          <div className="mt-3">
            <span className="text-caption text-text-muted">العرض ينتهي بعد</span>
            <OfferCountdown targetDate={expiresAt} />
          </div>
        </div>
        <button
          type="button"
          onClick={onCtaClick}
          className="flex-shrink-0 h-12 px-8 bg-gold text-text-inverse font-semibold rounded-xl hover:bg-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold whitespace-nowrap"
        >
          {ctaLabel}
        </button>
      </div>
    </section>
  );
}
