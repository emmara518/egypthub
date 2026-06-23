import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChatBubble } from './ChatBubble';

describe('ChatBubble', () => {
  it('renders message text', () => {
    render(<ChatBubble message="Hello" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders timestamp when provided', () => {
    render(<ChatBubble message="Hi" timestamp="10:30" />);
    expect(screen.getByText('10:30')).toBeInTheDocument();
  });

  it('renders status icon for user messages', () => {
    render(<ChatBubble message="Hi" isUser status="sent" />);
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('applies user styling when isUser is true', () => {
    const { container } = render(<ChatBubble message="Hi" isUser />);
    expect(container.querySelector('.bg-gold')).toBeInTheDocument();
  });

  it('applies assistant styling by default', () => {
    const { container } = render(<ChatBubble message="Hi" />);
    expect(container.querySelector('.bg-surface')).toBeInTheDocument();
  });
});
