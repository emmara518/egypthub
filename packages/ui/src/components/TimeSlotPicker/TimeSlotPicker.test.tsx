import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TimeSlotPicker } from './TimeSlotPicker';

const slots = [{ id: 'm', label: 'صباحاً', price: '$100' }, { id: 'e', label: 'مساءً', isAvailable: false }];

describe('TimeSlotPicker', () => {
  it('renders all slots', () => {
    render(<TimeSlotPicker slots={slots} onSelect={vi.fn()} />);
    expect(screen.getByText('صباحاً')).toBeInTheDocument();
    expect(screen.getByText('مساءً')).toBeInTheDocument();
  });

  it('calls onSelect for available slot', () => {
    const handleSelect = vi.fn();
    render(<TimeSlotPicker slots={slots} onSelect={handleSelect} />);
    fireEvent.click(screen.getByText('صباحاً'));
    expect(handleSelect).toHaveBeenCalledWith('m');
  });

  it('does not call onSelect for unavailable slot', () => {
    const handleSelect = vi.fn();
    render(<TimeSlotPicker slots={slots} onSelect={handleSelect} />);
    fireEvent.click(screen.getByText('مساءً'));
    expect(handleSelect).not.toHaveBeenCalled();
  });
});
