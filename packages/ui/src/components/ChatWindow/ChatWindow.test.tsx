import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatWindow } from './ChatWindow';

describe('ChatWindow', () => {
  it('renders title', () => {
    render(<ChatWindow><div>content</div></ChatWindow>);
    expect(screen.getByText('المساعد الذكي')).toBeInTheDocument();
  });

  it('renders children when open', () => {
    render(<ChatWindow><div>test content</div></ChatWindow>);
    expect(screen.getByText('test content')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<ChatWindow subtitle="متصل"><div /></ChatWindow>);
    expect(screen.getByText('متصل')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const handleClose = vi.fn();
    render(<ChatWindow onClose={handleClose}><div /></ChatWindow>);
    fireEvent.click(screen.getByLabelText('إغلاق المحادثة'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not render when isOpen is false', () => {
    const { container } = render(<ChatWindow isOpen={false}><div>hidden</div></ChatWindow>);
    expect(container.textContent).not.toContain('hidden');
  });
});
