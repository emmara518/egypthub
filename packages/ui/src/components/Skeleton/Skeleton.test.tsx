import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders with default text variant', () => {
    render(<Skeleton />);
    const skeleton = screen.getByRole('status');
    expect(skeleton).toHaveClass('h-4');
    expect(skeleton).toHaveClass('rounded-md');
  });

  it('renders text-sm variant', () => {
    render(<Skeleton variant="text-sm" />);
    expect(screen.getByRole('status')).toHaveClass('h-3');
  });

  it('renders heading variant', () => {
    render(<Skeleton variant="heading" />);
    expect(screen.getByRole('status')).toHaveClass('h-7');
    expect(screen.getByRole('status')).toHaveClass('w-[60%]');
  });

  it('renders circle variant', () => {
    render(<Skeleton variant="circle" />);
    expect(screen.getByRole('status')).toHaveClass('rounded-full');
    expect(screen.getByRole('status')).toHaveClass('h-10');
  });

  it('renders card variant', () => {
    render(<Skeleton variant="card" />);
    expect(screen.getByRole('status')).toHaveClass('rounded-xl');
    expect(screen.getByRole('status')).toHaveClass('h-[200px]');
  });

  it('renders button variant', () => {
    render(<Skeleton variant="button" />);
    expect(screen.getByRole('status')).toHaveClass('h-10');
    expect(screen.getByRole('status')).toHaveClass('w-[120px]');
  });

  it('renders table variant with rows', () => {
    render(<Skeleton variant="table" />);
    // Table variant contains a container with role status
    const containers = screen.getAllByRole('status');
    expect(containers.length).toBeGreaterThanOrEqual(1);
  });

  it('applies custom width and height', () => {
    render(<Skeleton variant="text" width="200px" height="20px" />);
    expect(screen.getByRole('status')).toHaveStyle({ width: '200px', height: '20px' });
  });

  it('has pulse animation class', () => {
    render(<Skeleton />);
    expect(screen.getByRole('status')).toHaveClass('animate-pulse-skeleton');
  });

  it('is not focusable', () => {
    render(<Skeleton />);
    expect(screen.getByRole('status')).toHaveAttribute('tabindex', '-1');
  });
});
