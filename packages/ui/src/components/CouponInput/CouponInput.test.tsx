import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CouponInput } from './CouponInput';

describe('CouponInput', () => {
  it('renders input and apply button', () => {
    render(<CouponInput onApply={vi.fn()} />);
    expect(screen.getByPlaceholderText('أدخل رمز الخصم')).toBeInTheDocument();
    expect(screen.getByText('تطبيق')).toBeInTheDocument();
  });

  it('calls onApply with code', () => {
    const handleApply = vi.fn();
    render(<CouponInput onApply={handleApply} />);
    fireEvent.change(screen.getByPlaceholderText('أدخل رمز الخصم'), { target: { value: 'SAVE20' } });
    fireEvent.click(screen.getByText('تطبيق'));
    expect(handleApply).toHaveBeenCalledWith('SAVE20');
  });

  it('shows applied code', () => {
    render(<CouponInput onApply={vi.fn()} appliedCode="SAVE20" />);
    expect(screen.getByText('SAVE20')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<CouponInput onApply={vi.fn()} error="رمز غير صالح" />);
    expect(screen.getByText('رمز غير صالح')).toBeInTheDocument();
  });
});
