import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InstallmentSelector } from './InstallmentSelector';

const plans = [{ id: '3', months: 3, monthlyAmount: '200', isNoInterest: true }, { id: '6', months: 6, monthlyAmount: '110' }];

describe('InstallmentSelector', () => {
  it('renders plans', () => {
    render(<InstallmentSelector plans={plans} selected="3" onChange={vi.fn()} />);
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('shows no-interest badge', () => {
    render(<InstallmentSelector plans={plans} selected="3" onChange={vi.fn()} />);
    expect(screen.getByText('بدون فوائد')).toBeInTheDocument();
  });

  it('calls onChange', () => {
    const handleChange = vi.fn();
    render(<InstallmentSelector plans={plans} selected="3" onChange={handleChange} />);
    fireEvent.click(screen.getByText('6'));
    expect(handleChange).toHaveBeenCalledWith('6');
  });
});
