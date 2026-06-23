import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PaymentMethodSelector } from './PaymentMethodSelector';

const options = [{ id: 'visa', label: 'فيزا', icon: 'visa' as const }, { id: 'mada', label: 'مدى', icon: 'mada' as const }];

describe('PaymentMethodSelector', () => {
  it('renders options', () => {
    render(<PaymentMethodSelector options={options} selected="visa" onChange={vi.fn()} />);
    expect(screen.getByText('فيزا')).toBeInTheDocument();
    expect(screen.getByText('مدى')).toBeInTheDocument();
  });

  it('calls onChange', () => {
    const handleChange = vi.fn();
    render(<PaymentMethodSelector options={options} selected="visa" onChange={handleChange} />);
    fireEvent.click(screen.getByText('مدى'));
    expect(handleChange).toHaveBeenCalledWith('mada');
  });
});
