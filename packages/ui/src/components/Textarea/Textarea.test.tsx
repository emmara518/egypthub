import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders with default props', () => {
    render(<Textarea placeholder="Enter text" />);
    const textarea = screen.getByPlaceholderText('Enter text');
    expect(textarea).toBeInTheDocument();
  });

  it('renders with size', () => {
    const { rerender } = render(<Textarea size="sm" placeholder="sm" />);
    expect(screen.getByPlaceholderText('sm')).toHaveClass('p-3');

    rerender(<Textarea size="md" placeholder="md" />);
    expect(screen.getByPlaceholderText('md')).toHaveClass('p-4');

    rerender(<Textarea size="lg" placeholder="lg" />);
    expect(screen.getByPlaceholderText('lg')).toHaveClass('p-5');
  });

  it('renders label', () => {
    render(<Textarea label="Description" />);
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('renders error state with message', () => {
    render(<Textarea isError errorMessage="Required field" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required field');
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows character count when showCount is true', () => {
    render(<Textarea showCount maxLength={100} value="Hello" onChange={() => {}} />);
    expect(screen.getByText(/5\/100/)).toBeInTheDocument();
  });

  it('fires onChange', () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('disables textarea', () => {
    render(<Textarea isDisabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('shows required indicator', () => {
    render(<Textarea label="Bio" isRequired />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
