import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroContainer } from './HeroContainer';

describe('HeroContainer', () => {
  it('renders children', () => {
    render(<HeroContainer>content</HeroContainer>);
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('renders as section', () => {
    const { container } = render(<HeroContainer>content</HeroContainer>);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('applies size class', () => {
    const { container } = render(<HeroContainer size="lg">content</HeroContainer>);
    expect(container.firstChild).toHaveClass('min-h-[500px]');
  });

  it('applies gradient class by default', () => {
    const { container } = render(<HeroContainer>content</HeroContainer>);
    expect(container.firstChild).toHaveClass('bg-gradient-to-b');
  });

  it('applies overlay class', () => {
    const { container } = render(<HeroContainer overlay="gold">content</HeroContainer>);
    expect(container.firstChild).toHaveClass('before:bg-gradient-to-b');
  });
});
