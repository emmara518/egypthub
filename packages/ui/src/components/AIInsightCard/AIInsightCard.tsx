'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { AIInsightCardProps } from './AIInsightCard.types';

export function AIInsightCard({ title, description, icon, category, isTip, className }: AIInsightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'bg-surface border rounded-xl p-4 transition-all duration-200',
        isTip ? 'border-gold-border bg-gold-subtle/5' : 'border-border',
        className
      )}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gold-subtle flex items-center justify-center text-gold text-body-md">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          {category && (
            <span className="text-caption font-medium text-gold uppercase tracking-wider">{category}</span>
          )}
          <h4 className="text-body-sm font-semibold text-text-primary mt-0.5">{title}</h4>
          <p className="text-body-sm text-text-secondary mt-1">{description}</p>
        </div>
        {isTip && (
          <span className="flex-shrink-0 text-caption text-gold px-2 py-0.5 rounded-full bg-gold-subtle text-[10px] font-medium">
            نصيحة
          </span>
        )}
      </div>
    </motion.div>
  );
}
