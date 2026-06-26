'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ExplorerNode } from '@/lib/explorer/types';

interface PremiumCardProps {
  node: ExplorerNode;
  index?: number;
  highlighted?: boolean;
  onSelect?: (id: string) => void;
  onFavorite?: (id: string) => void;
  onShare?: (id: string) => void;
  isFavorited?: boolean;
  variant?: 'default' | 'compact' | 'hero' | 'floating';
}

const TYPE_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  city: { bg: 'from-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
  experience: { bg: 'from-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
  story: { bg: 'from-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
  food: { bg: 'from-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
  ambassador: { bg: 'from-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
};

const TYPE_LABELS: Record<string, string> = {
  city: 'مدينة', experience: 'تجربة', story: 'قصة', food: 'مطعم', ambassador: 'مرشد',
};

function imageUrl(node: ExplorerNode): string {
  if (node.image) return node.image;
  return `/images/destinations/${node.citySlug || 'placeholder'}.jpg`;
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4A24C" stroke="#D4A24C" strokeWidth="1">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? '#D4A24C' : 'none'} stroke={filled ? '#D4A24C' : 'rgba(255,255,255,0.7)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-500/30" aria-label="موثق">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="#38BDF8" stroke="#38BDF8" strokeWidth="1">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
      <span className="text-[8px] text-sky-400 font-cairo font-semibold">موثق</span>
    </span>
  );
}

function SkeletonPulse() {
  return (
    <div className="animate-pulse rounded-2xl bg-theme-card border border-theme-border overflow-hidden" role="status" aria-label="جارٍ التحميل">
      <div className="aspect-[4/3] bg-theme-surface" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-20 bg-theme-surface rounded" />
        <div className="h-4 w-40 bg-theme-surface rounded" />
        <div className="h-3 w-32 bg-theme-surface rounded" />
        <div className="flex gap-2">
          <div className="h-8 w-16 bg-theme-surface rounded-lg" />
          <div className="h-8 w-16 bg-theme-surface rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default function PremiumCard({
  node, index = 0, highlighted, onSelect, onFavorite, onShare, isFavorited, variant = 'default',
}: PremiumCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const style = TYPE_STYLES[node.type] || TYPE_STYLES.experience;
  const label = TYPE_LABELS[node.type] || node.type;
  const imgSrc = imageUrl(node);

  const handleClick = () => onSelect?.(node.id);
  const handleFav = (e: React.MouseEvent) => { e.stopPropagation(); onFavorite?.(node.id); };
  const handleShare = (e: React.MouseEvent) => { e.stopPropagation(); onShare?.(node.id); };

  const cardContent = (
    <div className="relative flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-theme-surface animate-pulse" />
        )}
        <img
          src={imgSrc}
          alt={node.label}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

        <div className="absolute top-3 right-3 left-3 flex items-start justify-between z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-cairo font-semibold bg-black/50 backdrop-blur-sm border ${style.border} ${style.text}`}>
              {label}
            </span>
            {node.data?.verified && <VerifiedBadge />}
            {node.data?.trending && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-cairo font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30 backdrop-blur-sm">
                رائج
              </span>
            )}
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={handleFav}
              className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-all active:scale-90"
              aria-label={isFavorited ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
            >
              <HeartIcon filled={!!isFavorited} />
            </button>
            <button
              onClick={handleShare}
              className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-all active:scale-90"
              aria-label="مشاركة"
            >
              <ShareIcon />
            </button>
          </div>
        </div>

        <div className="absolute bottom-3 right-3 left-3 z-10">
          <h3 className="text-white font-bold font-cairo text-sm leading-tight drop-shadow-lg">
            {node.label}
          </h3>
          <p className="text-white/70 text-[11px] font-cairo mt-0.5 drop-shadow line-clamp-1">
            {node.subtitle || node.description}
          </p>
        </div>
      </div>

      <div className="flex-1 bg-theme-card p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-0.5">
              <StarIcon />
              <span className="text-xs font-bold text-theme font-english">
                {node.data?.rating || '—'}
              </span>
            </span>
            <span className="text-[10px] text-theme-muted font-cairo">
              ({node.data?.reviewCount || 0})
            </span>
          </div>
          {node.data?.distance && (
            <span className="text-[10px] text-theme-secondary font-cairo">{node.data.distance}</span>
          )}
        </div>

        <div className="flex items-center gap-2 text-[11px] text-theme-secondary font-cairo">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
          </svg>
          <span className="truncate">{node.city}</span>
          {node.data?.price && (
            <>
              <span className="text-theme-muted">•</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
              <span>{node.data.price}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 pt-1">
          {node.data?.available !== false && (
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-cairo">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              متاح الآن
            </span>
          )}
          {node.data?.whatsapp && (
            <a
              href={`https://wa.me/${node.data.whatsapp}`} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-cairo font-semibold hover:bg-emerald-500/20 transition-colors"
              aria-label="واتساب"
            >
              واتساب
            </a>
          )}
        </div>

        <div className="flex gap-1.5 pt-1">
          <button
            onClick={handleClick}
            className="flex-1 px-3 py-1.5 rounded-lg bg-gradient-to-l from-theme-gold to-amber-500 text-dark-900 text-[11px] font-cairo font-bold hover:opacity-90 transition-all active:scale-95"
          >
            احجز الآن
          </button>
          <button
            onClick={handleClick}
            className="px-3 py-1.5 rounded-lg border border-theme-gold/20 text-theme-gold text-[11px] font-cairo hover:bg-theme-gold/5 transition-all active:scale-95"
          >
            التفاصيل
          </button>
        </div>
      </div>
    </div>
  );

  if (variant === 'compact') {
    return (
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
        className={`group relative w-full text-right rounded-xl overflow-hidden border transition-all duration-300 ${
          highlighted ? 'border-theme-gold ring-1 ring-theme-gold/30' : 'border-theme-border hover:border-theme-gold/30'
        }`}
        style={{ aspectRatio: '4/3' }}
      >
        <img src={imgSrc} alt={node.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 right-0 left-0 p-3">
          <span className="text-[10px] text-theme-gold font-cairo font-semibold">{label}</span>
          <h4 className="text-white font-bold font-cairo text-sm">{node.label}</h4>
        </div>
      </motion.button>
    );
  }

  if (variant === 'floating') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="w-72 rounded-2xl overflow-hidden border border-theme-gold/20 bg-theme-card/95 backdrop-blur-xl shadow-2xl"
      >
        {cardContent}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      onClick={handleClick}
      className={`group relative rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 ${
        highlighted ? 'border-theme-gold ring-1 ring-theme-gold/30 shadow-lg shadow-theme-gold/5' : 'border-theme-border hover:border-theme-gold/30 hover:shadow-xl hover:shadow-black/10'
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter') handleClick(); }}
      aria-label={`${node.label} — ${label}`}
    >
      {cardContent}
    </motion.div>
  );
}

export { PremiumCard, SkeletonPulse as PremiumCardSkeleton };
