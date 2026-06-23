import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders when isOpen is true', () => {
    render(<Modal isOpen onClose={vi.fn()} title="Test">Content</Modal>);
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<Modal isOpen={false} onClose={vi.fn()} title="Test">Content</Modal>);
    expect(screen.queryByText('Test')).not.toBeInTheDocument();
  });

  it('fires onClose on close button click', () => {
    const handleClose = vi.fn();
    render(<Modal isOpen onClose={handleClose} title="Test" />);
    fireEvent.click(screen.getByLabelText('Close'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('fires onClose on backdrop click when dismissable', () => {
    const handleClose = vi.fn();
    render(<Modal isOpen onClose={handleClose} title="Test" />);
    const dialog = screen.getByRole('dialog');
    fireEvent.click(dialog);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('has correct accessibility attributes', () => {
    render(<Modal isOpen onClose={vi.fn()} title="Title" description="Desc">Content</Modal>);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
    expect(dialog).toHaveAttribute('aria-describedby', 'modal-desc');
  });

  it('renders footer when provided', () => {
    render(
      <Modal isOpen onClose={vi.fn()} title="Test" footer={<button>Save</button>}>
        Content
      </Modal>
    );
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('renders with description', () => {
    render(<Modal isOpen onClose={vi.fn()} title="Test" description="This is a description" />);
    expect(screen.getByText('This is a description')).toBeInTheDocument();
  });

  it('applies size class for sm', () => {
    render(<Modal isOpen onClose={vi.fn()} size="sm" title="Test" />);
    const dialog = screen.getByRole('dialog');
    expect(dialog.innerHTML).toContain('max-w-[400px]');
  });
});
