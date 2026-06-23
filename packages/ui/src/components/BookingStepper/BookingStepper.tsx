'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { BookingStepperProps } from './BookingStepper.types';

export function BookingStepper({ steps, currentStep, onStepClick, className }: BookingStepperProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <nav className={cn('flex items-center justify-between', className)} aria-label="خطوات الحجز">
      {steps.map((step, i) => {
        const isCompleted = i < currentIndex;
        const isCurrent = i === currentIndex;
        const isFuture = i > currentIndex;

        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <button
              onClick={() => !isFuture && onStepClick?.(step.id)}
              disabled={isFuture}
              className={cn(
                'flex flex-col items-center gap-1 transition-all duration-200',
                isFuture && 'opacity-40 cursor-not-allowed',
                !isFuture && 'cursor-pointer group'
              )}
            >
              <motion.div
                animate={isCurrent ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.4 }}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-body-sm font-semibold transition-all',
                  isCompleted && 'bg-gold text-text-inverse',
                  isCurrent && 'border-2 border-gold bg-gold-subtle text-gold',
                  isFuture && 'border-2 border-border bg-surface text-text-muted'
                )}
              >
                {isCompleted ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                ) : (
                  i + 1
                )}
              </motion.div>
              <span className={cn('text-caption whitespace-nowrap', isCurrent && 'text-gold font-medium', isCompleted && 'text-text-primary', isFuture && 'text-text-muted')}>
                {step.label}
              </span>
            </button>
            {i < steps.length - 1 && (
              <div className={cn('flex-1 h-0.5 mx-2 mt-[-1.5rem]', isCompleted ? 'bg-gold' : 'bg-border')} />
            )}
          </div>
        );
      })}
    </nav>
  );
}
