import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DiscountBadge } from './DiscountBadge';

describe('DiscountBadge', () => {
  it('renders percentage value', () => {
    render(<DiscountBadge value="20" type="percentage" />);
    expect(screen.getByText('20%')).toBeInTheDocument();
  });

  it('renders free type', () => {
    render(<DiscountBadge value="" type="free" />);
    expect(screen.getByText('مجاناً')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<DiscountBadge value="20" description="خصم الحجز المبكر" />);
    expect(screen.getByText('خصم الحجز المبكر')).toBeInTheDocument();
  });

  it('shows expired label', () => {
    render(<DiscountBadge value="20" isExpired />);
    expect(screen.getByText('منتهي')).toBeInTheDocument();
  });
});
