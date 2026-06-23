import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders with default props', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-busy', 'true');
  });

  it('renders with size class', () => {
    const { rerender } = render(<Spinner size="sm" />);
    expect(screen.getByRole('status').firstChild).toHaveClass('h-5');

    rerender(<Spinner size="md" />);
    expect(screen.getByRole('status').firstChild).toHaveClass('h-6');

    rerender(<Spinner size="lg" />);
    expect(screen.getByRole('status').firstChild).toHaveClass('h-8');
  });

  it('renders with color class', () => {
    render(<Spinner color="gold" />);
    expect(screen.getByRole('status').firstChild).toHaveClass('border-t-gold');
  });

  it('has animation class', () => {
    render(<Spinner />);
    expect(screen.getByRole('status').firstChild).toHaveClass('animate-spin');
  });

  it('centers when isCentered is true', () => {
    render(<Spinner isCentered />);
    expect(screen.getByRole('status')).toHaveClass('mx-auto');
  });

  it('renders visually hidden label', () => {
    render(<Spinner label="جار التحميل" />);
    expect(screen.getByText('جار التحميل')).toHaveClass('sr-only');
  });
});
