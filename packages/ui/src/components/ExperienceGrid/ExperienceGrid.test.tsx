import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ExperienceGrid } from './ExperienceGrid';

const experiences = [
  { id: '1', image: '/a.jpg', title: 'Nile Cruise', rating: 4.5, reviewCount: 50, price: '$199', duration: '4h', location: 'Luxor' },
  { id: '2', image: '/b.jpg', title: 'Desert Safari', rating: 4.8, reviewCount: 30, price: '$89', duration: '6h', location: 'Hurghada' },
];

describe('ExperienceGrid', () => {
  it('renders all experiences', () => {
    render(<ExperienceGrid experiences={experiences} />);
    expect(screen.getByText('Nile Cruise')).toBeInTheDocument();
    expect(screen.getByText('Desert Safari')).toBeInTheDocument();
  });
});
