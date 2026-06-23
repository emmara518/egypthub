import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TripDurationSelector } from './TripDurationSelector';

describe('TripDurationSelector', () => {
  it('renders default value', () => {
    render(<TripDurationSelector onChange={vi.fn()} />);
    expect(screen.getByText('3 أيام')).toBeInTheDocument();
  });

  it('renders custom value', () => {
    render(<TripDurationSelector value={7} onChange={vi.fn()} />);
    expect(screen.getByText('7 أيام')).toBeInTheDocument();
  });

  it('calls onChange on slider change', () => {
    const handleChange = vi.fn();
    render(<TripDurationSelector value={5} onChange={handleChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '10' } });
    expect(handleChange).toHaveBeenCalledWith(10);
  });

  it('renders range slider', () => {
    render(<TripDurationSelector onChange={vi.fn()} />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });
});
