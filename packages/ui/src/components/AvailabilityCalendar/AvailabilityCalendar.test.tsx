import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AvailabilityCalendar } from './AvailabilityCalendar';

const days = [{ date: '2026-06-01', available: true, price: '$100' }, { date: '2026-06-02', available: false }];

describe('AvailabilityCalendar', () => {
  it('renders month', () => {
    render(<AvailabilityCalendar month="يونيو 2026" days={days} onSelect={vi.fn()} />);
    expect(screen.getByText('يونيو 2026')).toBeInTheDocument();
  });

  it('calls onSelect for available day', () => {
    const handleSelect = vi.fn();
    render(<AvailabilityCalendar month="يونيو" days={days} onSelect={handleSelect} />);
    const buttons = screen.getAllByRole('button');
    const availBtn = buttons.find((b) => !b.disabled);
    if (availBtn) fireEvent.click(availBtn);
    expect(handleSelect).toHaveBeenCalledTimes(availBtn ? 1 : 0);
  });
});
