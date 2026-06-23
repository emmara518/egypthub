'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { RewardBadgeProps } from './RewardBadge.types';

export function RewardBadge({ rewards, onClaim, className }: RewardBadgeProps) {
  return (
    <div className={cn('grid grid-cols-2 sm:grid-cols-3 gap-3', className)}>
      {rewards.map((reward) => (
        <motion.div key={reward.id} whileHover={reward.isLocked ? undefined : { y: -2 }} className={cn('p-4 rounded-xl border text-center transition-all', reward.isLocked ? 'border-border bg-surface opacity-50' : 'border-gold/30 bg-gold/5 cursor-pointer hover:border-gold')} onClick={() => { if (!reward.isLocked) onClaim?.(reward.id); }}>
          <span className="text-display-xs block mb-1">{reward.icon}</span>
          <p className={cn('text-body-sm font-medium', reward.isLocked ? 'text-text-muted' : 'text-text-primary')}>{reward.label}</p>
          {reward.description && <p className="text-caption text-text-muted mt-0.5">{reward.isLocked ? 'مقفل' : reward.description}</p>}
        </motion.div>
      ))}
    </div>
  );
}
