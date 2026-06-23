import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BookingSummary } from './BookingSummary';

const lines = [{ label: 'الرحلة', value: 'الأقصر' }, { label: 'التاريخ', value: '15 مايو' }];

describe('BookingSummary', () => {
  it('renders title', () => {
    render(<BookingSummary title="ملخص الحجز" lines={lines} />);
    expect(screen.getByText('ملخص الحجز')).toBeInTheDocument();
  });

  it('renders lines', () => {
    render(<BookingSummary title="ملخص" lines={lines} />);
    expect(screen.getByText('الأقصر')).toBeInTheDocument();
    expect(screen.getByText('15 مايو')).toBeInTheDocument();
  });

  it('renders total', () => {
    render(<BookingSummary title="ملخص" lines={lines} totalLabel="المجموع" totalValue="$599" />);
    expect(screen.getByText('المجموع')).toBeInTheDocument();
    expect(screen.getByText('$599')).toBeInTheDocument();
  });
});
