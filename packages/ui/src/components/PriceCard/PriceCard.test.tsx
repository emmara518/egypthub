import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PriceCard } from './PriceCard';

describe('PriceCard', () => {
  it('renders price', () => {
    render(<PriceCard price="$299" />);
    expect(screen.getByText('$299')).toBeInTheDocument();
  });

  it('renders original price', () => {
    render(<PriceCard price="$299" originalPrice="$399" />);
    expect(screen.getByText('$399')).toBeInTheDocument();
  });

  it('renders badge', () => {
    render(<PriceCard price="$299" badge="الأكثر طلباً" />);
    expect(screen.getByText('الأكثر طلباً')).toBeInTheDocument();
  });

  it('calls onSelect', () => {
    const handleSelect = vi.fn();
    render(<PriceCard price="$299" onSelect={handleSelect} />);
    fireEvent.click(screen.getByText('اختر هذه الباقة'));
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });
});
