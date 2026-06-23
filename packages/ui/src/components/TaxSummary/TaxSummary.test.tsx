import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TaxSummary } from './TaxSummary';

const taxRows = [{ label: 'ضريبة القيمة المضافة', amount: '150' }, { label: 'رسوم الخدمة', amount: '50' }];

describe('TaxSummary', () => {
  it('renders title and rows', () => {
    render(<TaxSummary taxRows={taxRows} />);
    expect(screen.getByText('الضرائب والرسوم')).toBeInTheDocument();
    expect(screen.getByText('ضريبة القيمة المضافة')).toBeInTheDocument();
  });

  it('renders total', () => {
    render(<TaxSummary taxRows={taxRows} totalAmount="200" />);
    expect(screen.getByText('$200')).toBeInTheDocument();
  });
});
