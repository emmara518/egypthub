import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookingStepper } from './BookingStepper';

const steps = [{ id: 'details', label: 'التفاصيل' }, { id: 'payment', label: 'الدفع' }, { id: 'confirm', label: 'التأكيد' }];

describe('BookingStepper', () => {
  it('renders all steps', () => {
    render(<BookingStepper steps={steps} currentStep="details" />);
    expect(screen.getByText('التفاصيل')).toBeInTheDocument();
    expect(screen.getByText('الدفع')).toBeInTheDocument();
  });

  it('calls onStepClick for completed step', () => {
    const handleClick = vi.fn();
    render(<BookingStepper steps={steps} currentStep="payment" onStepClick={handleClick} />);
    fireEvent.click(screen.getByText('التفاصيل'));
    expect(handleClick).toHaveBeenCalledWith('details');
  });

  it('does not call onStepClick for future step', () => {
    const handleClick = vi.fn();
    render(<BookingStepper steps={steps} currentStep="details" onStepClick={handleClick} />);
    fireEvent.click(screen.getByText('الدفع'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
