import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ReferralCard } from './ReferralCard';

Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });

describe('ReferralCard', () => {
  it('renders referral code', () => {
    render(<ReferralCard referralCode="EGYPT2024" />);
    expect(screen.getByText('EGYPT2024')).toBeInTheDocument();
    expect(screen.getByText('ادعُ أصدقاءك')).toBeInTheDocument();
  });

  it('renders reward description', () => {
    render(<ReferralCard referralCode="EGYPT2024" rewardDescription="احصل على $50" />);
    expect(screen.getByText('احصل على $50')).toBeInTheDocument();
  });

  it('calls onDismiss', () => {
    const handleDismiss = vi.fn();
    render(<ReferralCard referralCode="EGYPT2024" onDismiss={handleDismiss} />);
    fireEvent.click(screen.getByLabelText('إغلاق'));
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });
});
