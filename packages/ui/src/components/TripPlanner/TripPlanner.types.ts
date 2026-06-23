import type { ReactNode } from 'react';

export interface TripPlannerStep {
  id: string;
  label: string;
  icon?: string;
}

export interface TripPlannerProps {
  children: ReactNode;
  steps: TripPlannerStep[];
  currentStep: string;
  title?: string;
  onStepChange?: (stepId: string) => void;
  className?: string;
}
