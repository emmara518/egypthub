'use client';

import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { TripPlannerProps } from './TripPlanner.types';

export function TripPlanner({ children, steps, currentStep, title = 'مخطط الرحلة', onStepChange, className }: TripPlannerProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className={cn('bg-surface border border-border rounded-2xl overflow-hidden', className)}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <h2 className="text-heading-sm font-semibold text-text-primary">{title}</h2>
      </div>

      {/* Steps Progress */}
      <div className="px-6 py-4 border-b border-border bg-bg-primary">
        <div className="flex items-center justify-between" role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={steps.length}>
          {steps.map((step, i) => {
            const isCompleted = i < currentIndex;
            const isCurrent = i === currentIndex;
            const isFuture = i > currentIndex;

            return (
              <button
                key={step.id}
                onClick={() => !isFuture && onStepChange?.(step.id)}
                disabled={isFuture}
                className={cn(
                  'flex flex-col items-center gap-1 transition-all duration-200',
                  isFuture && 'opacity-40 cursor-not-allowed',
                  !isFuture && 'cursor-pointer'
                )}
              >
                <div
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center text-body-sm font-semibold transition-all duration-300',
                    isCompleted && 'bg-gold text-text-inverse',
                    isCurrent && 'border-2 border-gold bg-gold-subtle text-gold',
                    isFuture && 'border-2 border-border bg-surface text-text-muted'
                  )}
                >
                  {isCompleted ? '✓' : step.icon || i + 1}
                </div>
                <span
                  className={cn(
                    'text-caption',
                    isCurrent && 'text-gold font-medium',
                    isCompleted && 'text-text-primary',
                    isFuture && 'text-text-muted'
                  )}
                >
                  {step.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Body */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="p-6"
      >
        {children}
      </motion.div>
    </div>
  );
}
