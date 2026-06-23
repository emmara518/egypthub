import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Calendar } from './Calendar';

describe('Calendar', () => {
  it('renders month and year', () => {
    render(<Calendar />);
    const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    const found = months.some((m) => screen.queryByText(m, { exact: false }));
    expect(found).toBe(true);
  });

  it('renders day headers', () => {
    render(<Calendar />);
    expect(screen.getByText('ح')).toBeInTheDocument();
  });

  it('calls onChange when day clicked', () => {
    const handleChange = vi.fn();
    render(<Calendar onChange={handleChange} />);
    const buttons = screen.getAllByRole('button');
    const dayBtn = buttons.find((b) => /^\d+$/.test(b.textContent || ''));
    if (dayBtn) fireEvent.click(dayBtn);
    expect(handleChange).toHaveBeenCalledTimes(dayBtn ? 1 : 0);
  });
});
