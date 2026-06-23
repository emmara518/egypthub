import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BillingAddress } from './BillingAddress';

describe('BillingAddress', () => {
  it('renders all fields', () => {
    render(<BillingAddress onChange={vi.fn()} />);
    expect(screen.getByText('عنوان الفوترة')).toBeInTheDocument();
    expect(screen.getByLabelText('الدولة')).toBeInTheDocument();
    expect(screen.getByLabelText('العنوان')).toBeInTheDocument();
    expect(screen.getByLabelText('المدينة')).toBeInTheDocument();
    expect(screen.getByLabelText('المنطقة')).toBeInTheDocument();
    expect(screen.getByLabelText('الرمز البريدي')).toBeInTheDocument();
  });

  it('calls onChange', () => {
    const handleChange = vi.fn();
    render(<BillingAddress onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText('المدينة'), { target: { value: 'الرياض' } });
    expect(handleChange).toHaveBeenCalledWith('city', 'الرياض');
  });
});
