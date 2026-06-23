import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('renders trigger element', () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('shows tooltip on hover after delay', async () => {
    render(
      <Tooltip content="Tooltip text" delay={0}>
        <button>Hover</button>
      </Tooltip>
    );
    fireEvent.mouseEnter(screen.getByText('Hover'));
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip text');
  });

  it('hides tooltip on mouse leave', async () => {
    render(
      <Tooltip content="Tooltip text" delay={0}>
        <button>Hover</button>
      </Tooltip>
    );
    fireEvent.mouseEnter(screen.getByText('Hover'));
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    fireEvent.mouseLeave(screen.getByText('Hover'));
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('is hidden by default', () => {
    render(
      <Tooltip content="Hidden">
        <button>Test</button>
      </Tooltip>
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
