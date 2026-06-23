export interface BookingStep { id: string; label: string; description?: string; }

export interface BookingStepperProps {
  steps: BookingStep[];
  currentStep: string;
  onStepClick?: (stepId: string) => void;
  className?: string;
}
