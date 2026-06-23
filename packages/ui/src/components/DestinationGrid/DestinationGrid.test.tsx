import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DestinationGrid } from './DestinationGrid';

const destinations = [
  { id: '1', image: '/a.jpg', title: 'Luxor', rating: 4.5, reviewCount: 100, price: '$299', duration: '3 days' },
  { id: '2', image: '/b.jpg', title: 'Aswan', rating: 4.7, reviewCount: 80, price: '$199', duration: '2 days' },
];

describe('DestinationGrid', () => {
  it('renders all destinations', () => {
    render(<DestinationGrid destinations={destinations} />);
    expect(screen.getByText('Luxor')).toBeInTheDocument();
    expect(screen.getByText('Aswan')).toBeInTheDocument();
  });
});
