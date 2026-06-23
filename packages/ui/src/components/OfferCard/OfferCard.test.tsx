import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OfferCard } from './OfferCard';

const future = new Date(Date.now() + 86400000);

describe('OfferCard', () => {
  it('renders title and description', () => {
    render(<OfferCard id="1" title="Summer Sale" description="Save big" discount={30} expiresAt={future} />);
    expect(screen.getByText('Summer Sale')).toBeInTheDocument();
    expect(screen.getByText('Save big')).toBeInTheDocument();
  });

  it('renders discount percentage', () => {
    render(<OfferCard id="1" title="Sale" description="Desc" discount={25} expiresAt={future} />);
    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  it('renders promo code', () => {
    render(<OfferCard id="1" title="Sale" description="Desc" discount={20} code="SUMMER20" expiresAt={future} />);
    expect(screen.getByText('SUMMER20')).toBeInTheDocument();
  });
});
