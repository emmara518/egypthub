import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RewardBadge } from './RewardBadge';

const rewards = [{ id: '1', label: 'خصم 10%', icon: '🎉', description: 'على الرحلات' }, { id: '2', label: 'تذكرة مجانية', icon: '🎫', isLocked: true, description: 'مقفل' }];

describe('RewardBadge', () => {
  it('renders rewards', () => {
    render(<RewardBadge rewards={rewards} />);
    expect(screen.getByText('خصم 10%')).toBeInTheDocument();
    expect(screen.getByText('مقفل')).toBeInTheDocument();
  });

  it('calls onClaim for unlocked', () => {
    const handleClaim = vi.fn();
    render(<RewardBadge rewards={rewards} onClaim={handleClaim} />);
    fireEvent.click(screen.getByText('خصم 10%'));
    expect(handleClaim).toHaveBeenCalledWith('1');
  });
});
