import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RatingStars } from './RatingStars';

describe('RatingStars', () => {
  it('renders correct number of stars', () => {
    const { container } = render(<RatingStars rating={3} maxRating={5} />);
    const stars = container.querySelectorAll('button');
    expect(stars.length).toBe(5);
  });

  it('shows aria-label with rating info', () => {
    render(<RatingStars rating={4} maxRating={5} />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Rated 4 out of 5');
  });

  it('calls onChange in interactive mode', () => {
    const handleChange = vi.fn();
    render(<RatingStars rating={3} interactive onChange={handleChange} />);
    const stars = screen.getAllByRole('radio');
    fireEvent.click(stars[4]);
    expect(handleChange).toHaveBeenCalledWith(5);
  });

  it('shows value text when showValue is true', () => {
    render(<RatingStars rating={4.5} showValue />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });
});
