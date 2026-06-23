import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SmartSuggestions } from './SmartSuggestions';

const suggestions = [
  { id: '1', text: 'زيارة الأهرامات', category: 'معالم', icon: '🏛️' },
  { id: '2', text: 'رحلة نيلية', category: 'أنشطة' },
];

describe('SmartSuggestions', () => {
  it('renders all suggestions', () => {
    render(<SmartSuggestions suggestions={suggestions} onSelect={vi.fn()} />);
    expect(screen.getByText('زيارة الأهرامات')).toBeInTheDocument();
    expect(screen.getByText('رحلة نيلية')).toBeInTheDocument();
  });

  it('renders categories', () => {
    render(<SmartSuggestions suggestions={suggestions} onSelect={vi.fn()} />);
    expect(screen.getByText('معالم')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', () => {
    const handleSelect = vi.fn();
    render(<SmartSuggestions suggestions={suggestions} onSelect={handleSelect} />);
    fireEvent.click(screen.getByText('زيارة الأهرامات'));
    expect(handleSelect).toHaveBeenCalledWith(suggestions[0]);
  });

  it('shows spinner when loading', () => {
    const { container } = render(<SmartSuggestions suggestions={[]} onSelect={vi.fn()} isLoading />);
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });
});
