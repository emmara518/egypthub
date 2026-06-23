import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section } from './Section';

describe('Section', () => {
  it('renders children', () => {
    render(<Section>content</Section>);
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('renders as section by default', () => {
    const { container } = render(<Section>content</Section>);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('renders as custom element', () => {
    const { container } = render(<Section as="article">content</Section>);
    expect(container.querySelector('article')).toBeInTheDocument();
  });

  it('applies padding class', () => {
    const { container } = render(<Section paddingY="lg">content</Section>);
    expect(container.firstChild).toHaveClass('py-16');
  });

  it('applies responsive padding inside', () => {
    const { container } = render(<Section>content</Section>);
    const inner = container.querySelector('.mx-auto');
    expect(inner).toHaveClass('px-4');
    expect(inner).toHaveClass('sm:px-6');
    expect(inner).toHaveClass('lg:px-8');
  });
});
