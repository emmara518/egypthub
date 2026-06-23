import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DestinationCard } from './DestinationCard';

const props = {
  id: '1',
  image: '/test.jpg',
  title: 'Luxor',
  subtitle: 'City of Temples',
  rating: 4.5,
  reviewCount: 128,
  price: '$299',
  duration: '3 days',
};

describe('DestinationCard', () => {
  it('renders title and subtitle', () => {
    render(<DestinationCard {...props} />);
    expect(screen.getByText('Luxor')).toBeInTheDocument();
    expect(screen.getByText('City of Temples')).toBeInTheDocument();
  });

  it('renders price and duration', () => {
    render(<DestinationCard {...props} />);
    expect(screen.getByText('$299')).toBeInTheDocument();
    expect(screen.getByText('3 days')).toBeInTheDocument();
  });

  it('renders review count', () => {
    render(<DestinationCard {...props} />);
    expect(screen.getByText('(128)')).toBeInTheDocument();
  });

  it('renders badge when provided', () => {
    render(<DestinationCard {...props} badge="featured" />);
    expect(screen.getByText('مميز')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<DestinationCard {...props} onClick={handleClick} />);
    fireEvent.click(screen.getByText('Luxor').closest('.rounded-xl')!);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
