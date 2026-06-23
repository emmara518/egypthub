import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StoryPreview } from './StoryPreview';

const props = {
  image: '/story.jpg',
  title: 'Hidden Gems',
  excerpt: 'Discover...',
  authorName: 'Mariam',
  content: 'Full story content here...',
  readTime: '5 min',
  isOpen: true,
  onClose: vi.fn(),
};

describe('StoryPreview', () => {
  it('renders title', () => {
    render(<StoryPreview {...props} />);
    expect(screen.getByText('Hidden Gems')).toBeInTheDocument();
  });

  it('renders story content', () => {
    render(<StoryPreview {...props} />);
    expect(screen.getByText('Full story content here...')).toBeInTheDocument();
  });

  it('renders author name', () => {
    render(<StoryPreview {...props} />);
    expect(screen.getByText('Mariam')).toBeInTheDocument();
  });
});
