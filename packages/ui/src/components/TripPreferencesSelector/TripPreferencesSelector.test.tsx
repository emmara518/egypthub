import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TripPreferencesSelector } from './TripPreferencesSelector';

const preferences = [
  { id: 'history', label: 'تاريخ', icon: '🏛️' },
  { id: 'food', label: 'طعام', icon: '🍽️' },
  { id: 'nature', label: 'طبيعة', icon: '🌿' },
];

describe('TripPreferencesSelector', () => {
  it('renders all preferences', () => {
    render(<TripPreferencesSelector preferences={preferences} onChange={vi.fn()} />);
    expect(screen.getByText('تاريخ')).toBeInTheDocument();
    expect(screen.getByText('طعام')).toBeInTheDocument();
  });

  it('marks selected preferences', () => {
    render(<TripPreferencesSelector preferences={preferences} selectedIds={['history']} onChange={vi.fn()} />);
    const btn = screen.getByText('تاريخ').closest('button');
    expect(btn).toHaveClass('border-gold');
  });

  it('calls onChange with added id', () => {
    const handleChange = vi.fn();
    render(<TripPreferencesSelector preferences={preferences} onChange={handleChange} />);
    fireEvent.click(screen.getByText('طعام'));
    expect(handleChange).toHaveBeenCalledWith(['food']);
  });

  it('calls onChange with removed id', () => {
    const handleChange = vi.fn();
    render(<TripPreferencesSelector preferences={preferences} selectedIds={['history', 'food']} onChange={handleChange} />);
    fireEvent.click(screen.getByText('تاريخ'));
    expect(handleChange).toHaveBeenCalledWith(['food']);
  });

  it('disables unselected when max reached', () => {
    render(<TripPreferencesSelector preferences={preferences} selectedIds={['history', 'food']} onChange={vi.fn()} max={2} />);
    const btn = screen.getByText('طبيعة').closest('button');
    expect(btn).toBeDisabled();
  });
});
