import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
  });

  it('renders with size class', () => {
    const { rerender } = render(<Input size="sm" placeholder="sm" />);
    expect(screen.getByPlaceholderText('sm')).toHaveClass('h-8');

    rerender(<Input size="md" placeholder="md" />);
    expect(screen.getByPlaceholderText('md')).toHaveClass('h-10');

    rerender(<Input size="lg" placeholder="lg" />);
    expect(screen.getByPlaceholderText('lg')).toHaveClass('h-12');
  });

  it('renders label', () => {
    render(<Input label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders error state with message', () => {
    render(<Input isError errorMessage="This field is required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders helper text', () => {
    render(<Input helperText="Enter your email address" />);
    expect(screen.getByText('Enter your email address')).toBeInTheDocument();
  });

  it('disables input', () => {
    render(<Input isDisabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('fires onChange', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('shows required indicator', () => {
    render(<Input label="Name" isRequired />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Input className="custom" placeholder="test" />);
    expect(screen.getByPlaceholderText('test')).toHaveClass('custom');
  });

  it('renders with left icon', () => {
    render(<Input leftIcon={<span>🔍</span>} placeholder="search" />);
    expect(screen.getByText('🔍')).toBeInTheDocument();
  });

  it('renders with suffix', () => {
    render(<Input suffix="EGP" placeholder="amount" />);
    expect(screen.getByText('EGP')).toBeInTheDocument();
  });
});
