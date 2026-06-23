import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';
import { CardFooter } from './CardFooter';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Content</Card>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders with default variant class', () => {
    render(<Card>Card</Card>);
    expect(screen.getByText('Card')).toHaveClass('bg-surface');
  });

  it('renders with featured variant', () => {
    render(<Card variant="featured">Featured</Card>);
    expect(screen.getByText('Featured')).toHaveClass('bg-surface-elevated');
    expect(screen.getByText('Featured')).toHaveClass('border-gold');
  });

  it('renders with glass variant', () => {
    render(<Card variant="glass">Glass</Card>);
    expect(screen.getByText('Glass')).toHaveClass('backdrop-blur');
  });

  it('adds hover classes when isHoverable is true', () => {
    render(<Card isHoverable>Hover</Card>);
    expect(screen.getByText('Hover')).toHaveClass('hover:-translate-y-1');
  });

  it('fires onClick when provided', () => {
    const handleClick = vi.fn();
    render(<Card onClick={handleClick}>Clickable</Card>);
    fireEvent.click(screen.getByText('Clickable'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has button role when onClick is set', () => {
    render(<Card onClick={() => {}}>Clickable</Card>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('supports keyboard activation with Enter', () => {
    const handleClick = vi.fn();
    render(<Card onClick={handleClick}>Clickable</Card>);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders CardHeader with title', () => {
    render(<CardHeader title="Header Title" />);
    expect(screen.getByText('Header Title')).toBeInTheDocument();
  });

  it('renders CardHeader with subtitle', () => {
    render(<CardHeader title="T" subtitle="Sub" />);
    expect(screen.getByText('Sub')).toBeInTheDocument();
  });

  it('renders CardHeader with action slot', () => {
    render(<CardHeader title="T" action={<button>Action</button>} />);
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('renders CardContent children', () => {
    render(<CardContent>Body content</CardContent>);
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('renders CardFooter children', () => {
    render(<CardFooter>Footer content</CardFooter>);
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });
});
