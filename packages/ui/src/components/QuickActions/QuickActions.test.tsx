import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuickActions } from './QuickActions';

const actions = [
  { id: 'book', label: 'حجز', icon: '✈️', description: 'حجز رحلة' },
  { id: 'explore', label: 'استكشاف', icon: '🔍' },
];

describe('QuickActions', () => {
  it('renders all actions', () => {
    render(<QuickActions actions={actions} onAction={vi.fn()} />);
    expect(screen.getByText('حجز')).toBeInTheDocument();
    expect(screen.getByText('استكشاف')).toBeInTheDocument();
  });

  it('renders icons', () => {
    render(<QuickActions actions={actions} onAction={vi.fn()} />);
    expect(screen.getByText('✈️')).toBeInTheDocument();
  });

  it('renders descriptions', () => {
    render(<QuickActions actions={actions} onAction={vi.fn()} />);
    expect(screen.getByText('حجز رحلة')).toBeInTheDocument();
  });

  it('calls onAction with action id', () => {
    const handleAction = vi.fn();
    render(<QuickActions actions={actions} onAction={handleAction} />);
    fireEvent.click(screen.getByText('حجز'));
    expect(handleAction).toHaveBeenCalledWith('book');
  });
});
