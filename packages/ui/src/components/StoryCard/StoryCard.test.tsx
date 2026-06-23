import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StoryCard } from './StoryCard';

const props = {
  id: '1',
  image: '/story.jpg',
  title: 'Hidden Gems of Siwa',
  excerpt: 'Discover the secrets of the desert oasis...',
  authorName: 'Mariam',
  readTime: '5 min',
};

describe('StoryCard', () => {
  it('renders title and excerpt', () => {
    render(<StoryCard {...props} />);
    expect(screen.getByText('Hidden Gems of Siwa')).toBeInTheDocument();
    expect(screen.getByText(/Discover the secrets/)).toBeInTheDocument();
  });

  it('renders author name', () => {
    render(<StoryCard {...props} />);
    expect(screen.getByText('Mariam')).toBeInTheDocument();
  });

  it('renders read time', () => {
    render(<StoryCard {...props} />);
    expect(screen.getByText('5 min')).toBeInTheDocument();
  });
});
