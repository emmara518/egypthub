import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DestinationBadge } from './DestinationBadge';

describe('DestinationBadge', () => {
  it('renders featured label', () => {
    render(<DestinationBadge type="featured" />);
    expect(screen.getByText('مميز')).toBeInTheDocument();
  });

  it('renders popular label', () => {
    render(<DestinationBadge type="popular" />);
    expect(screen.getByText('رائج')).toBeInTheDocument();
  });

  it('has correct color class for gold type', () => {
    render(<DestinationBadge type="featured" />);
    expect(screen.getByText('مميز')).toHaveClass('bg-gold/15');
  });
});
