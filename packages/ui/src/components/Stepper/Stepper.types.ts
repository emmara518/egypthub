import type { ReactNode } from 'react';

export interface Step {
  label: string;
  description?: string;
  icon?: ReactNode;
  completed?: boolean;
}

export interface StepperProps {
  steps: Step[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}
