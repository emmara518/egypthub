import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders with default props', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders with gold color', () => {
    render(<Badge color="gold">Gold</Badge>);
    expect(screen.getByText('Gold')).toHaveClass('bg-gold');
  });

  it('renders with success color', () => {
    render(<Badge color="success">Success</Badge>);
    expect(screen.getByText('Success')).toHaveClass('bg-success');
  });

  it('renders with error color', () => {
    render(<Badge color="error">Error</Badge>);
    expect(screen.getByText('Error')).toHaveClass('bg-error');
  });

  it('renders dot variant as circle', () => {
    render(<Badge variant="dot" color="gold" />);
    const dot = screen.getByRole('status');
    expect(dot).toBeInTheDocument();
    expect(dot).toHaveClass('rounded-full');
  });

  it('renders outline variant with border', () => {
    render(<Badge variant="outline" color="gold">Outline</Badge>);
    const badge = screen.getByText('Outline');
    expect(badge).toHaveClass('border');
    expect(badge).toHaveClass('border-gold');
  });

  it('renders count variant', () => {
    render(<Badge variant="count">5</Badge>);
    expect(screen.getByText('5')).toHaveClass('bg-gold');
  });

  it('renders with size classes', () => {
    const { rerender } = render(<Badge size="sm">S</Badge>);
    expect(screen.getByText('S')).toHaveClass('h-[18px]');

    rerender(<Badge size="md">M</Badge>);
    expect(screen.getByText('M')).toHaveClass('h-[22px]');

    rerender(<Badge size="lg">L</Badge>);
    expect(screen.getByText('L')).toHaveClass('h-[26px]');
  });

  it('renders outline with correct color', () => {
    render(<Badge variant="outline" color="success">Done</Badge>);
    expect(screen.getByText('Done')).toHaveClass('text-success');
  });
});
