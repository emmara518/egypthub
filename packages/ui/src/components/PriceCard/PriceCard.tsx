'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { PriceCardProps } from './PriceCard.types';

export function PriceCard({ originalPrice, price, description, badge, isFeatured, onSelect, className }: PriceCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} className={cn('bg-surface border rounded-xl p-5 text-center transition-all', isFeatured ? 'border-gold shadow-lg shadow-gold/10' : 'border-border', className)}>
      {badge && <span className="inline-block px-3 py-1 rounded-full bg-gold text-text-inverse text-caption font-semibold mb-3">{badge}</span>}
      <div className="flex items-baseline justify-center gap-1 mb-2">
        {originalPrice && <span className="text-body-sm text-text-muted line-through">{originalPrice}</span>}
        <span className="text-display-sm font-bold text-gold">{price}</span>
      </div>
      {description && <p className="text-body-sm text-text-secondary mb-4">{description}</p>}
      {onSelect && (
        <motion.button whileTap={{ scale: 0.98 }} onClick={onSelect} className={cn('w-full py-2.5 rounded-xl text-body-sm font-semibold transition-colors', isFeatured ? 'bg-gold text-text-inverse hover:bg-gold-light' : 'border border-gold text-gold hover:bg-gold-subtle')}>
          اختر هذه الباقة
        </motion.button>
      )}
    </motion.div>
  );
}
