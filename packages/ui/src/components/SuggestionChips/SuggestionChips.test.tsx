import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SuggestionChips } from './SuggestionChips';

const suggestions = ['الأهرامات', 'الأقصر', 'الغردقة'];

describe('SuggestionChips', () => {
  it('renders all suggestions', () => {
    render(<SuggestionChips suggestions={suggestions} onSelect={vi.fn()} />);
    expect(screen.getByText('الأهرامات')).toBeInTheDocument();
    expect(screen.getByText('الأقصر')).toBeInTheDocument();
    expect(screen.getByText('الغردقة')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', () => {
    const handleSelect = vi.fn();
    render(<SuggestionChips suggestions={suggestions} onSelect={handleSelect} />);
    fireEvent.click(screen.getByText('الأقصر'));
    expect(handleSelect).toHaveBeenCalledWith('الأقصر');
  });

  it('disables buttons when isDisabled is true', () => {
    render(<SuggestionChips suggestions={suggestions} onSelect={vi.fn()} isDisabled />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => expect(btn).toBeDisabled());
  });
});
