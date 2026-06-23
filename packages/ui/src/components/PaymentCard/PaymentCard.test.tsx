import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PaymentCard } from './PaymentCard';

describe('PaymentCard', () => {
  it('renders card details', () => {
    render(<PaymentCard cardNumber="4111111111111111" cardHolder="أحمد محمد" expiry="12/28" />);
    expect(screen.getByText(/4111/)).toBeInTheDocument();
    expect(screen.getByText('أحمد محمد')).toBeInTheDocument();
    expect(screen.getByText('12/28')).toBeInTheDocument();
  });

  it('renders brand label', () => {
    render(<PaymentCard cardNumber="4111" cardHolder="test" expiry="12/28" brand="visa" />);
    expect(screen.getByText('VISA')).toBeInTheDocument();
  });
});
