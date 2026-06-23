import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DateRangePicker } from './DateRangePicker';

describe('DateRangePicker', () => {
  it('renders placeholder text', () => {
    render(<DateRangePicker onChange={vi.fn()} />);
    expect(screen.getAllByText('اختر تاريخ').length).toBe(2);
  });

  it('renders formatted start date', () => {
    const d = new Date(2026, 5, 15);
    render(<DateRangePicker startDate={d} onChange={vi.fn()} />);
    expect(screen.getByText('15')).toBeInTheDocument();
  });
});
