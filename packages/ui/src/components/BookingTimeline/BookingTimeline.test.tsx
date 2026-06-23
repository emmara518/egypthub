import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BookingTimeline } from './BookingTimeline';

const events = [{ id: '1', title: 'تم الحجز', description: 'تم تأكيد الحجز', timestamp: '10:00', status: 'completed' as const }, { id: '2', title: 'قيد المراجعة', status: 'active' as const }];

describe('BookingTimeline', () => {
  it('renders all events', () => {
    render(<BookingTimeline events={events} />);
    expect(screen.getByText('تم الحجز')).toBeInTheDocument();
    expect(screen.getByText('قيد المراجعة')).toBeInTheDocument();
  });

  it('renders descriptions and timestamps', () => {
    render(<BookingTimeline events={events} />);
    expect(screen.getByText('تم تأكيد الحجز')).toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
  });
});
