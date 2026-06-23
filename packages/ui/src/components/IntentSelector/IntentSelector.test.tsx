import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { IntentSelector } from './IntentSelector';

const options = [
  { id: 'culture', label: 'ثقافة', description: 'جولات أثرية', icon: '🏛️' },
  { id: 'adventure', label: 'مغامرة', description: 'أنشطة مثيرة', icon: '🧗' },
];

describe('IntentSelector', () => {
  it('renders all options', () => {
    render(<IntentSelector options={options} onSelect={vi.fn()} />);
    expect(screen.getByText('ثقافة')).toBeInTheDocument();
    expect(screen.getByText('مغامرة')).toBeInTheDocument();
  });

  it('renders descriptions', () => {
    render(<IntentSelector options={options} onSelect={vi.fn()} />);
    expect(screen.getByText('جولات أثرية')).toBeInTheDocument();
  });

  it('marks selected option', () => {
    render(<IntentSelector options={options} onSelect={vi.fn()} selectedId="culture" />);
    const btn = screen.getByText('ثقافة').closest('[role="radio"]');
    expect(btn).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onSelect when clicked', () => {
    const handleSelect = vi.fn();
    render(<IntentSelector options={options} onSelect={handleSelect} />);
    fireEvent.click(screen.getByText('مغامرة'));
    expect(handleSelect).toHaveBeenCalledWith('adventure');
  });
});
