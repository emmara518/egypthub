import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Testimonials } from './Testimonials';

const testimonials = [
  { id: '1', authorName: 'Sara', content: 'Amazing trip!', rating: 5 },
  { id: '2', authorName: 'Omar', content: 'Wonderful experience', rating: 4 },
];

describe('Testimonials', () => {
  it('renders all testimonials in grid mode', () => {
    const { container } = render(<Testimonials testimonials={testimonials} variant="grid" />);
    expect(screen.getByText('Sara')).toBeInTheDocument();
    expect(screen.getByText('Omar')).toBeInTheDocument();
    expect(container.textContent).toContain('Amazing trip!');
    expect(container.textContent).toContain('Wonderful experience');
  });
});
