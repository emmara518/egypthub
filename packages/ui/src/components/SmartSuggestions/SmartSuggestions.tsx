'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { Spinner } from '../Spinner';
import type { SmartSuggestionsProps } from './SmartSuggestions.types';

export function SmartSuggestions({ suggestions, onSelect, isLoading, className }: SmartSuggestionsProps) {
  if (isLoading) {
    return (
      <div className={cn('flex items-center justify-center py-6', className)}>
        <Spinner size="sm" />
      </div>
    );
  }

  return (
    <div className={cn('space-y-1', className)} role="listbox" aria-label="اقتراحات ذكية">
      {suggestions.map((suggestion) => (
        <motion.button
          key={suggestion.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: 4 }}
          onClick={() => onSelect(suggestion)}
          className={cn(
            'w-full text-start flex items-center gap-3 px-4 py-3 rounded-xl',
            'bg-surface border border-border hover:border-gold-border',
            'transition-all duration-200 text-text-primary',
            'focus:outline-none focus:ring-2 focus:ring-gold/30'
          )}
          role="option"
          aria-selected={false}
        >
          {suggestion.icon && (
            <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gold-subtle flex items-center justify-center text-gold text-body-sm">
              {suggestion.icon}
            </span>
          )}
          <div className="flex-1 min-w-0">
            <span className="text-body-sm block truncate">{suggestion.text}</span>
            {suggestion.category && (
              <span className="text-caption text-text-muted">{suggestion.category}</span>
            )}
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted flex-shrink-0 rtl:rotate-180">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </motion.button>
      ))}
    </div>
  );
}
