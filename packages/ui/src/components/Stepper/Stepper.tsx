'use client';

import { cn } from '../../utils/cn';
import type { StepperProps } from './Stepper.types';

export function Stepper({
  steps,
  currentStep,
  orientation = 'horizontal',
  className,
}: StepperProps) {
  return (
    <div
      role="list"
      aria-label="Progress"
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'flex-row items-start' : 'flex-col',
        className
      )}
    >
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = step.completed ?? index < currentStep;
        const isLast = index === steps.length - 1;
        const stepNumber = index + 1;

        return (
          <div
            key={step.label}
            role="listitem"
            aria-current={isActive ? 'step' : undefined}
            className={cn(
              'flex',
              orientation === 'horizontal'
                ? 'flex-col items-center flex-1'
                : 'flex-row items-start'
            )}
          >
            <div className={cn(
              'flex items-center',
              orientation === 'horizontal' ? 'flex-col' : 'flex-row'
            )}>
              <div
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full text-body-sm font-semibold transition-colors',
                  'border-2',
                  isCompleted
                    ? 'bg-gold border-gold text-text-inverse'
                    : isActive
                      ? 'border-gold text-gold'
                      : 'border-border text-text-muted'
                )}
              >
                {isCompleted ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : step.icon ? (
                  step.icon
                ) : (
                  stepNumber
                )}
              </div>

              <div className={cn(
                orientation === 'horizontal' ? 'text-center mt-2' : 'mr-3 rtl:ml-3 rtl:mr-0'
              )}>
                <div className={cn(
                  'text-body-sm font-medium',
                  isActive ? 'text-gold' : isCompleted ? 'text-text-primary' : 'text-text-muted'
                )}>
                  {step.label}
                </div>
                {step.description && (
                  <div className="text-caption text-text-muted mt-0.5">
                    {step.description}
                  </div>
                )}
              </div>
            </div>

            {!isLast && (
              <div
                className={cn(
                  'bg-border',
                  orientation === 'horizontal'
                    ? 'h-0.5 flex-1 mt-4 mx-2'
                    : 'w-0.5 h-8 ml-4 rtl:mr-4 rtl:ml-0'
                )}
                role="presentation"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
