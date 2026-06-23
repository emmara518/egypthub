import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar } from './Avatar';
import { AvatarGroup } from './AvatarGroup';

describe('Avatar', () => {
  it('renders with size class', () => {
    const { rerender } = render(<Avatar size="sm" name="A" />);
    expect(screen.getByText('A').parentElement).toHaveClass('h-8');

    rerender(<Avatar size="md" name="B" />);
    expect(screen.getByText('B').parentElement).toHaveClass('h-10');

    rerender(<Avatar size="lg" name="C" />);
    expect(screen.getByText('C').parentElement).toHaveClass('h-14');
  });

  it('renders initials when no src', () => {
    render(<Avatar name="Ahmed" />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('renders image when src is provided', () => {
    render(<Avatar src="/test.jpg" name="Test" alt="User" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/test.jpg');
    expect(img).toHaveAttribute('alt', 'User');
  });

  it('falls back to initials on image error', () => {
    render(<Avatar src="/bad.jpg" name="Fallback" />);
    const img = screen.getByRole('img');
    fireEvent.error(img);
    expect(screen.getByText('F')).toBeInTheDocument();
  });

  it('renders status dot with correct color', () => {
    render(<Avatar name="Test" status="online" />);
    const dot = screen.getByRole('status');
    expect(dot).toHaveClass('bg-success');
  });

  it('renders offline status', () => {
    render(<Avatar name="Test" status="offline" />);
    expect(screen.getByRole('status')).toHaveClass('bg-text-muted');
  });

  it('renders away status', () => {
    render(<Avatar name="Test" status="away" />);
    expect(screen.getByRole('status')).toHaveClass('bg-warning');
  });

  it('renders gold ring when isPremium is true', () => {
    render(<Avatar name="Premium" isPremium />);
    expect(screen.getByText('P').parentElement).toHaveClass('ring-2');
    expect(screen.getByText('P').parentElement).toHaveClass('ring-gold');
  });

  it('renders as button when onClick is provided', () => {
    const handleClick = vi.fn();
    render(<Avatar name="Click" onClick={handleClick} />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders AvatarGroup with overflow count', () => {
    render(
      <AvatarGroup
        avatars={[
          { name: 'A' },
          { name: 'B' },
          { name: 'C' },
          { name: 'D' },
          { name: 'E' },
          { name: 'F' },
        ]}
        max={4}
      />
    );
    expect(screen.getByText('+2')).toBeInTheDocument();
  });
});
