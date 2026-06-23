import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExperienceCard } from './ExperienceCard';

const props = {
  id: '1',
  image: '/test.jpg',
  title: 'Nile Felucca Ride',
  description: 'A beautiful sunset sail',
  rating: 4.8,
  reviewCount: 56,
  price: '$89',
  duration: '3 hours',
  location: 'Aswan',
};

describe('ExperienceCard', () => {
  it('renders title and description', () => {
    render(<ExperienceCard {...props} />);
    expect(screen.getByText('Nile Felucca Ride')).toBeInTheDocument();
    expect(screen.getByText('A beautiful sunset sail')).toBeInTheDocument();
  });

  it('renders location and duration', () => {
    render(<ExperienceCard {...props} />);
    expect(screen.getByText('Aswan')).toBeInTheDocument();
    expect(screen.getByText('3 hours')).toBeInTheDocument();
  });

  it('renders price', () => {
    render(<ExperienceCard {...props} />);
    expect(screen.getByText('$89')).toBeInTheDocument();
  });
});
