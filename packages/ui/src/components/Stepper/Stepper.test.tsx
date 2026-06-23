import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stepper } from './Stepper';

const steps = [
  { label: 'Details', description: 'Trip info' },
  { label: 'Payment', description: 'Checkout' },
  { label: 'Confirmation' },
];

describe('Stepper', () => {
  it('renders all step labels', () => {
    render(<Stepper steps={steps} currentStep={0} />);
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Payment')).toBeInTheDocument();
    expect(screen.getByText('Confirmation')).toBeInTheDocument();
  });

  it('renders step descriptions', () => {
    render(<Stepper steps={steps} currentStep={0} />);
    expect(screen.getByText('Trip info')).toBeInTheDocument();
    expect(screen.getByText('Checkout')).toBeInTheDocument();
  });

  it('marks active step with aria-current', () => {
    render(<Stepper steps={steps} currentStep={1} />);
    const items = screen.getAllByRole('listitem');
    expect(items[1]).toHaveAttribute('aria-current', 'step');
  });

  it('shows checkmark for completed steps', () => {
    render(<Stepper steps={steps} currentStep={2} />);
    const items = screen.getAllByRole('listitem');
    const firstItem = items[0];
    expect(firstItem.innerHTML).toContain('polyline');
  });

  it('applies horizontal orientation classes', () => {
    const { container } = render(<Stepper steps={steps} currentStep={0} />);
    expect(container.firstChild).toHaveClass('flex-row');
  });

  it('applies vertical orientation classes', () => {
    const { container } = render(<Stepper steps={steps} currentStep={0} orientation="vertical" />);
    expect(container.firstChild).toHaveClass('flex-col');
  });

  it('has role="list" and aria-label', () => {
    const { container } = render(<Stepper steps={steps} currentStep={0} />);
    expect(container.firstChild).toHaveAttribute('aria-label', 'Progress');
  });
});
