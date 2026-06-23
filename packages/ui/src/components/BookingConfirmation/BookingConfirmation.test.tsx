import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookingConfirmation } from './BookingConfirmation';

const details = [{ label: 'الوجهة', value: 'دبي' }, { label: 'التاريخ', value: '15 يوليو' }];

describe('BookingConfirmation', () => {
  it('renders confirmed status', () => {
    render(<BookingConfirmation bookingId="BK-12345" details={details} />);
    expect(screen.getByText('تم تأكيد الحجز')).toBeInTheDocument();
    expect(screen.getByText('BK-12345')).toBeInTheDocument();
  });

  it('renders pending status', () => {
    render(<BookingConfirmation bookingId="BK-123" details={details} status="pending" />);
    expect(screen.getByText('قيد المراجعة')).toBeInTheDocument();
  });

  it('renders cancelled status', () => {
    render(<BookingConfirmation bookingId="BK-123" details={details} status="cancelled" />);
    expect(screen.getByText('تم الإلغاء')).toBeInTheDocument();
  });

  it('calls onViewBooking', () => {
    const handleView = vi.fn();
    render(<BookingConfirmation bookingId="BK-123" details={details} onViewBooking={handleView} />);
    fireEvent.click(screen.getByText('عرض الحجز'));
    expect(handleView).toHaveBeenCalledTimes(1);
  });
});
