import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookingReview } from './BookingReview';

const sections = [{ title: 'الرحلة', items: [{ label: 'الوجهة', value: 'الأقصر' }] }];

describe('BookingReview', () => {
  it('renders title and sections', () => {
    render(<BookingReview title="مراجعة الحجز" sections={sections} />);
    expect(screen.getByText('مراجعة الحجز')).toBeInTheDocument();
    expect(screen.getByText('الرحلة')).toBeInTheDocument();
  });

  it('renders items', () => {
    render(<BookingReview title="مراجعة" sections={sections} />);
    expect(screen.getByText('الأقصر')).toBeInTheDocument();
  });

  it('calls onEdit when edit clicked', () => {
    const handleEdit = vi.fn();
    render(<BookingReview title="مراجعة" sections={sections} onEdit={handleEdit} />);
    fireEvent.click(screen.getByText('تعديل'));
    expect(handleEdit).toHaveBeenCalledWith('الرحلة');
  });

  it('calls onConfirm when button clicked', () => {
    const handleConfirm = vi.fn();
    render(<BookingReview title="مراجعة" sections={sections} onConfirm={handleConfirm} />);
    fireEvent.click(screen.getByText('تأكيد الحجز'));
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });
});
