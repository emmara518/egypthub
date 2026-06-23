import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { WalletCard } from './WalletCard';

describe('WalletCard', () => {
  it('renders balance', () => {
    render(<WalletCard balance="1,500" />);
    expect(screen.getByText('$1,500')).toBeInTheDocument();
  });

  it('renders card number', () => {
    render(<WalletCard balance="500" cardNumber="4111111111111111" />);
    expect(screen.getByText(/4111/)).toBeInTheDocument();
  });

  it('calls onTopUp', () => {
    const handleTopUp = vi.fn();
    render(<WalletCard balance="500" onTopUp={handleTopUp} />);
    fireEvent.click(screen.getByText('شحن المحفظة'));
    expect(handleTopUp).toHaveBeenCalledTimes(1);
  });
});
