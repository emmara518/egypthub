import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DestinationCarousel } from './DestinationCarousel';

const destinations = [
  { id: '1', image: '/a.jpg', title: 'Luxor', rating: 4.5, reviewCount: 100 },
  { id: '2', image: '/b.jpg', title: 'Aswan', rating: 4.5, reviewCount: 80 },
  { id: '3', image: '/c.jpg', title: 'Cairo', rating: 4.5, reviewCount: 200 },
  { id: '4', image: '/d.jpg', title: 'Hurghada', rating: 4.5, reviewCount: 150 },
];

describe('DestinationCarousel', () => {
  it('renders all destination titles', () => {
    render(<DestinationCarousel destinations={destinations} />);
    expect(screen.getByText('Luxor')).toBeInTheDocument();
    expect(screen.getByText('Aswan')).toBeInTheDocument();
  });

  it('renders navigation dots', () => {
    render(<DestinationCarousel destinations={destinations} />);
    const dots = screen.getAllByLabelText(/Slide \d/);
    expect(dots.length).toBe(2);
  });
});
