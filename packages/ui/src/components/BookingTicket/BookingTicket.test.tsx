import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BookingTicket } from './BookingTicket';

const passengers = [{ name: 'أحمد محمد', type: 'بالغ', seat: '12A' }];

describe('BookingTicket', () => {
  it('renders ticket details', () => {
    render(<BookingTicket title="رحلة دبي" date="15 يوليو" time="10:00" location="مطار دبي" passengers={passengers} bookingRef="BK-001" />);
    expect(screen.getByText('رحلة دبي')).toBeInTheDocument();
    expect(screen.getByText('15 يوليو')).toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
    expect(screen.getByText('مطار دبي')).toBeInTheDocument();
    expect(screen.getByText('أحمد محمد')).toBeInTheDocument();
    expect(screen.getByText('BK-001')).toBeInTheDocument();
  });
});
