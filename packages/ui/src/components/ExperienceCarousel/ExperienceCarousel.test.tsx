import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ExperienceCarousel } from './ExperienceCarousel';

const experiences = [
  { id: '1', image: '/a.jpg', title: 'Nile Cruise', rating: 4.5, reviewCount: 50, price: '$199', duration: '4h', location: 'Luxor' },
  { id: '2', image: '/b.jpg', title: 'Safari', rating: 4.8, reviewCount: 30, price: '$89', duration: '6h', location: 'Hurghada' },
  { id: '3', image: '/c.jpg', title: 'Diving', rating: 4.9, reviewCount: 80, price: '$149', duration: '3h', location: 'Dahab' },
  { id: '4', image: '/d.jpg', title: 'Balloon', rating: 4.7, reviewCount: 60, price: '$129', duration: '2h', location: 'Luxor' },
];

describe('ExperienceCarousel', () => {
  it('renders all experience titles', () => {
    render(<ExperienceCarousel experiences={experiences} />);
    expect(screen.getByText('Nile Cruise')).toBeInTheDocument();
    expect(screen.getByText('Balloon')).toBeInTheDocument();
  });
});
