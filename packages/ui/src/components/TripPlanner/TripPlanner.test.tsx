import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TripPlanner } from './TripPlanner';

const steps = [
  { id: 'budget', label: 'الميزانية' },
  { id: 'duration', label: 'المدة' },
  { id: 'companions', label: 'الرفقة' },
];

describe('TripPlanner', () => {
  it('renders title', () => {
    render(<TripPlanner steps={steps} currentStep="budget"><div>content</div></TripPlanner>);
    expect(screen.getByText('مخطط الرحلة')).toBeInTheDocument();
  });

  it('renders all steps', () => {
    render(<TripPlanner steps={steps} currentStep="budget"><div /></TripPlanner>);
    expect(screen.getByText('الميزانية')).toBeInTheDocument();
    expect(screen.getByText('المدة')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<TripPlanner steps={steps} currentStep="budget"><div>step content</div></TripPlanner>);
    expect(screen.getByText('step content')).toBeInTheDocument();
  });

  it('calls onStepChange for completed steps', () => {
    const handleChange = vi.fn();
    render(<TripPlanner steps={steps} currentStep="duration" onStepChange={handleChange}><div /></TripPlanner>);
    fireEvent.click(screen.getByText('الميزانية'));
    expect(handleChange).toHaveBeenCalledWith('budget');
  });

  it('does not call onStepChange for future steps', () => {
    const handleChange = vi.fn();
    render(<TripPlanner steps={steps} currentStep="budget" onStepChange={handleChange}><div /></TripPlanner>);
    fireEvent.click(screen.getByText('المدة'));
    expect(handleChange).not.toHaveBeenCalled();
  });
});
