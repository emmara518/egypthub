import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GuestCounter } from './GuestCounter';

describe('GuestCounter', () => {
  it('renders value', () => {
    render(<GuestCounter value={3} onChange={vi.fn()} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('calls onChange with incremented value', () => {
    const handleChange = vi.fn();
    render(<GuestCounter value={2} onChange={handleChange} />);
    fireEvent.click(screen.getByLabelText('زيادة'));
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('calls onChange with decremented value', () => {
    const handleChange = vi.fn();
    render(<GuestCounter value={2} onChange={handleChange} />);
    fireEvent.click(screen.getByLabelText('إنقاص'));
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('disables decrement at min', () => {
    render(<GuestCounter value={0} onChange={vi.fn()} min={0} />);
    expect(screen.getByLabelText('إنقاص')).toBeDisabled();
  });

  it('disables increment at max', () => {
    render(<GuestCounter value={10} onChange={vi.fn()} max={10} />);
    expect(screen.getByLabelText('زيادة')).toBeDisabled();
  });
});
