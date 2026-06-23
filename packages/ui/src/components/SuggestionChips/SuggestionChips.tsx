'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { SuggestionChipsProps } from './SuggestionChips.types';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export function SuggestionChips({ suggestions, onSelect, isDisabled, className }: SuggestionChipsProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={cn('flex flex-wrap gap-2', className)}
      role="group"
      aria-label="اقتراحات"
    >
      {suggestions.map((suggestion) => (
        <motion.button
          key={suggestion}
          variants={item}
          whileHover={!isDisabled ? { scale: 1.05 } : undefined}
          whileTap={!isDisabled ? { scale: 0.95 } : undefined}
          onClick={() => onSelect(suggestion)}
          disabled={isDisabled}
          className={cn(
            'px-4 py-2 text-body-sm rounded-full border transition-all duration-200',
            'border-border text-text-secondary hover:text-gold hover:border-gold',
            'hover:bg-gold-subtle focus:outline-none focus:ring-2 focus:ring-gold/30',
            'disabled:opacity-40 disabled:cursor-not-allowed'
          )}
        >
          {suggestion}
        </motion.button>
      ))}
    </motion.div>
  );
}
