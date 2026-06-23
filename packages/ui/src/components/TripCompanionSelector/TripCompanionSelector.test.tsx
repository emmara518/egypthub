import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TripCompanionSelector } from './TripCompanionSelector';

describe('TripCompanionSelector', () => {
  it('renders all options', () => {
    render(<TripCompanionSelector onChange={vi.fn()} />);
    expect(screen.getByText('فردي')).toBeInTheDocument();
    expect(screen.getByText('عائلي')).toBeInTheDocument();
  });

  it('marks selected option', () => {
    render(<TripCompanionSelector value="couple" onChange={vi.fn()} />);
    const btn = screen.getByText('ثنائي').closest('[role="radio"]');
    expect(btn).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onChange with selected value', () => {
    const handleChange = vi.fn();
    render(<TripCompanionSelector onChange={handleChange} />);
    fireEvent.click(screen.getByText('أصدقاء'));
    expect(handleChange).toHaveBeenCalledWith('friends');
  });
});
