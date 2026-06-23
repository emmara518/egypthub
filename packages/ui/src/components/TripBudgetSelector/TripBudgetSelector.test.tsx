import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TripBudgetSelector } from './TripBudgetSelector';

describe('TripBudgetSelector', () => {
  it('renders all options', () => {
    render(<TripBudgetSelector onChange={vi.fn()} />);
    expect(screen.getByText('اقتصادية')).toBeInTheDocument();
    expect(screen.getByText('فاخرة')).toBeInTheDocument();
  });

  it('marks selected option', () => {
    render(<TripBudgetSelector value="moderate" onChange={vi.fn()} />);
    const btn = screen.getByText('متوسطة').closest('[role="radio"]');
    expect(btn).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onChange with selected value', () => {
    const handleChange = vi.fn();
    render(<TripBudgetSelector onChange={handleChange} />);
    fireEvent.click(screen.getByText('فاخرة'));
    expect(handleChange).toHaveBeenCalledWith('luxury');
  });
});
