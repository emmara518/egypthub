import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReviewCard } from './ReviewCard';

const props = {
  id: '1',
  authorName: 'Khaled',
  rating: 5,
  content: 'Amazing experience!',
  date: '2 weeks ago',
};

describe('ReviewCard', () => {
  it('renders author name and review content', () => {
    render(<ReviewCard {...props} />);
    expect(screen.getByText('Khaled')).toBeInTheDocument();
    expect(screen.getByText('Amazing experience!')).toBeInTheDocument();
  });

  it('renders date', () => {
    render(<ReviewCard {...props} />);
    expect(screen.getByText('2 weeks ago')).toBeInTheDocument();
  });
});
