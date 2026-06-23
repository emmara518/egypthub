import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Drawer } from './Drawer';

describe('Drawer', () => {
  it('renders when isOpen is true', () => {
    render(<Drawer isOpen onClose={vi.fn()} title="Drawer Title">Content</Drawer>);
    expect(screen.getByText('Drawer Title')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<Drawer isOpen={false} onClose={vi.fn()} title="Hidden" />);
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('fires onClose on close button click', () => {
    const handleClose = vi.fn();
    render(<Drawer isOpen onClose={handleClose} title="Test" />);
    fireEvent.click(screen.getByLabelText('Close'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('fires onClose on backdrop click when dismissable', () => {
    const handleClose = vi.fn();
    render(<Drawer isOpen onClose={handleClose} title="Test" />);
    const dialog = screen.getByRole('dialog');
    fireEvent.click(dialog);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('has correct accessibility attributes', () => {
    render(<Drawer isOpen onClose={vi.fn()} title="Title" />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('renders description when provided', () => {
    render(<Drawer isOpen onClose={vi.fn()} title="Title" description="Desc" />);
    expect(screen.getByText('Desc')).toBeInTheDocument();
  });

  it('renders drag handle for bottom position', () => {
    render(<Drawer isOpen onClose={vi.fn()} position="bottom" title="Bottom" />);
    const handle = document.querySelector('.cursor-grab');
    expect(handle).toBeInTheDocument();
  });
});
