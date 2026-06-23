import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OfferBanner } from './OfferBanner';

const future = new Date(Date.now() + 86400000);

describe('OfferBanner', () => {
  it('renders title, description and discount', () => {
    render(<OfferBanner title="Summer Sale" description="Best deals" discount={30} ctaLabel="Shop Now" expiresAt={future} />);
    expect(screen.getByText('Summer Sale')).toBeInTheDocument();
    expect(screen.getByText('Best deals')).toBeInTheDocument();
    expect(screen.getByText('30%')).toBeInTheDocument();
  });

  it('calls onCtaClick', () => {
    const handleClick = vi.fn();
    render(<OfferBanner title="Sale" description="Desc" discount={20} ctaLabel="Get Deal" onCtaClick={handleClick} expiresAt={future} />);
    fireEvent.click(screen.getByText('Get Deal'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
