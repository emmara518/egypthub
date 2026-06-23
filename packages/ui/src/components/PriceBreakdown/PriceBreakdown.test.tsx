import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PriceBreakdown } from './PriceBreakdown';

const lines = [{ label: 'سعر الرحلة', amount: '1,000' }, { label: 'الخصم', amount: '100', isDiscount: true }];

describe('PriceBreakdown', () => {
  it('renders lines', () => {
    render(<PriceBreakdown lines={lines} />);
    expect(screen.getByText('سعر الرحلة')).toBeInTheDocument();
    expect(screen.getByText('$1,000')).toBeInTheDocument();
  });

  it('renders total', () => {
    render(<PriceBreakdown lines={lines} totalAmount="900" />);
    expect(screen.getByText('$900')).toBeInTheDocument();
    expect(screen.getByText('الإجمالي')).toBeInTheDocument();
  });
});
