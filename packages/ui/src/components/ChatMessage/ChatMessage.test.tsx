import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChatMessage } from './ChatMessage';

const base = { id: '1', content: 'Hello', role: 'assistant' as const };

describe('ChatMessage', () => {
  it('renders message content', () => {
    render(<ChatMessage {...base} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders sender name when provided', () => {
    render(<ChatMessage {...base} senderName="Assistant" />);
    expect(screen.getByText('Assistant')).toBeInTheDocument();
  });

  it('renders avatar when provided', () => {
    render(<ChatMessage {...base} avatar="/avatar.jpg" />);
    const img = screen.getByAltText('المساعد');
    expect(img).toBeInTheDocument();
  });

  it('sets data-message-role attribute', () => {
    const { container } = render(<ChatMessage {...base} />);
    expect(container.querySelector('[data-message-role="assistant"]')).toBeInTheDocument();
  });

  it('renders user message with correct role', () => {
    const { container } = render(<ChatMessage {...base} role="user" />);
    expect(container.querySelector('[data-message-role="user"]')).toBeInTheDocument();
  });
});
