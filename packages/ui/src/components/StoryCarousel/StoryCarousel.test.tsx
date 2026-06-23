import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StoryCarousel } from './StoryCarousel';

const stories = [
  { id: '1', image: '/a.jpg', title: 'Story A', excerpt: 'Excerpt A', authorName: 'Ali', readTime: '3 min' },
  { id: '2', image: '/b.jpg', title: 'Story B', excerpt: 'Excerpt B', authorName: 'Noor', readTime: '5 min' },
];

describe('StoryCarousel', () => {
  it('renders all story titles', () => {
    render(<StoryCarousel stories={stories} />);
    expect(screen.getByText('Story A')).toBeInTheDocument();
    expect(screen.getByText('Story B')).toBeInTheDocument();
  });
});
