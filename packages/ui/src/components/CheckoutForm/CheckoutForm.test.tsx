import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckoutForm } from './CheckoutForm';

const fields = [{ name: 'name', label: 'الاسم', required: true }, { name: 'email', label: 'البريد', type: 'email' as const }];

describe('CheckoutForm', () => {
  it('renders fields', () => {
    render(<CheckoutForm fields={fields} onSubmit={vi.fn()} />);
    expect(screen.getByText('الاسم')).toBeInTheDocument();
    expect(screen.getByText('البريد')).toBeInTheDocument();
  });

  it('shows validation error', () => {
    render(<CheckoutForm fields={fields} onSubmit={vi.fn()} />);
    fireEvent.click(screen.getByText('إتمام الدفع'));
    expect(screen.getByText('الاسم مطلوب')).toBeInTheDocument();
  });

  it('calls onSubmit', async () => {
    const handleSubmit = vi.fn();
    const { container } = render(<CheckoutForm fields={fields} onSubmit={handleSubmit} />);
    const inputs = container.querySelectorAll('input');
    fireEvent.change(inputs[0], { target: { value: 'أحمد' } });
    fireEvent.click(screen.getByText('إتمام الدفع'));
    expect(handleSubmit).toHaveBeenCalledWith({ name: 'أحمد' });
  });
});
