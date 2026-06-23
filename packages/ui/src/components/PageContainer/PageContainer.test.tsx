import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PageContainer } from './PageContainer';

describe('PageContainer', () => {
  it('renders children', () => {
    render(<PageContainer>content</PageContainer>);
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('renders as main element', () => {
    const { container } = render(<PageContainer>content</PageContainer>);
    expect(container.querySelector('main')).toBeInTheDocument();
  });

  it('applies max-width and padding classes', () => {
    const { container } = render(<PageContainer maxWidth="xl" paddingY="lg">content</PageContainer>);
    expect(container.firstChild).toHaveClass('max-w-screen-xl');
    expect(container.firstChild).toHaveClass('py-8');
  });

  it('applies responsive padding', () => {
    const { container } = render(<PageContainer>content</PageContainer>);
    expect(container.firstChild).toHaveClass('px-4');
    expect(container.firstChild).toHaveClass('sm:px-6');
    expect(container.firstChild).toHaveClass('lg:px-8');
  });
});
