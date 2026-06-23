import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ToastProvider, useToast } from './ToastProvider';
import { ToastContainer } from './ToastComponent';

function TestHarness() {
  const { toast, dismissAll } = useToast();
  return (
    <div>
      <button onClick={() => toast({ type: 'success', title: 'Success!' })}>
        Show Success
      </button>
      <button onClick={() => toast({ type: 'error', title: 'Error!', description: 'Something went wrong' })}>
        Show Error
      </button>
      <button onClick={() => toast({ type: 'success', title: 'With Action', action: { label: 'Undo', onClick: vi.fn() } })}>
        With Action
      </button>
      <button onClick={dismissAll}>Dismiss All</button>
      <ToastContainer />
    </div>
  );
}

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders success toast on trigger', () => {
    render(
      <ToastProvider>
        <TestHarness />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Success'));
    expect(screen.getByText('Success!')).toBeInTheDocument();
  });

  it('renders error toast with description', () => {
    render(
      <ToastProvider>
        <TestHarness />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Error'));
    expect(screen.getByText('Error!')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('removes toast on close button', () => {
    render(
      <ToastProvider>
        <TestHarness />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Success'));
    expect(screen.getByText('Success!')).toBeInTheDocument();

    const closeButtons = screen.getAllByLabelText('Close notification');
    fireEvent.click(closeButtons[0]);
    expect(screen.queryByText('Success!')).not.toBeInTheDocument();
  });

  it('renders action button', () => {
    render(
      <ToastProvider>
        <TestHarness />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('With Action'));
    expect(screen.getByText('Undo')).toBeInTheDocument();
  });

  it('dismisses all toasts', () => {
    render(
      <ToastProvider>
        <TestHarness />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Success'));
    fireEvent.click(screen.getByText('Show Error'));
    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('Error!')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Dismiss All'));
    expect(screen.queryByText('Success!')).not.toBeInTheDocument();
    expect(screen.queryByText('Error!')).not.toBeInTheDocument();
  });

  it('renders success type with correct styling', () => {
    render(
      <ToastProvider>
        <TestHarness />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Success'));
    const toastEl = screen.getByText('Success!').closest('[role="alert"]');
    expect(toastEl).toHaveClass('border-l-success');
  });
});
