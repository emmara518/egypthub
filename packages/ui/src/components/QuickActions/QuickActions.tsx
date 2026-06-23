'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { QuickActionsProps } from './QuickActions.types';

export function QuickActions({ actions, onAction, columns = 3, className }: QuickActionsProps) {
  const reducedMotion = useReducedMotion();

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  return (
    <div className={cn('grid gap-2', gridCols[columns], className)}>
      {actions.map((action) => (
        <motion.button
          key={action.id}
          whileHover={!reducedMotion ? { y: -2, scale: 1.02 } : undefined}
          whileTap={!reducedMotion ? { scale: 0.98 } : undefined}
          onClick={() => onAction(action.id)}
          className={cn(
            'flex flex-col items-center gap-1.5 p-3 rounded-xl bg-surface border border-border',
            'hover:border-gold-border hover:bg-surface-hover transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-gold/30'
          )}
          aria-label={action.label}
        >
          {action.icon && (
            <span className="text-xl text-gold">{action.icon}</span>
          )}
          <span className="text-caption font-medium text-text-primary text-center leading-tight">
            {action.label}
          </span>
          {action.description && (
            <span className="text-[10px] text-text-muted text-center leading-tight hidden sm:block">
              {action.description}
            </span>
          )}
        </motion.button>
      ))}
    </div>
  );
}
