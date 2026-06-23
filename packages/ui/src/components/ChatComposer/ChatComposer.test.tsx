import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatComposer } from './ChatComposer';

describe('ChatComposer', () => {
  it('renders textarea', () => {
    render(<ChatComposer onSend={vi.fn()} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('calls onSend with message on button click', () => {
    const handleSend = vi.fn();
    render(<ChatComposer onSend={handleSend} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Hello' } });
    fireEvent.click(screen.getByLabelText('إرسال'));
    expect(handleSend).toHaveBeenCalledWith('Hello');
  });

  it('calls onSend on Enter key', () => {
    const handleSend = vi.fn();
    render(<ChatComposer onSend={handleSend} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Hello' } });
    fireEvent.keyDown(textarea, { key: 'Enter' });
    expect(handleSend).toHaveBeenCalledWith('Hello');
  });

  it('does not call onSend for empty message', () => {
    const handleSend = vi.fn();
    render(<ChatComposer onSend={handleSend} />);
    fireEvent.click(screen.getByLabelText('إرسال'));
    expect(handleSend).not.toHaveBeenCalled();
  });

  it('disables button when disabled prop is true', () => {
    render(<ChatComposer onSend={vi.fn()} isDisabled />);
    expect(screen.getByLabelText('إرسال')).toBeDisabled();
  });
});
