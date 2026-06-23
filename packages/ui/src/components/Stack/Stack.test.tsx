import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stack } from './Stack';

describe('Stack', () => {
  it('renders children', () => {
    render(<Stack><span>item</span></Stack>);
    expect(screen.getByText('item')).toBeInTheDocument();
  });

  it('applies flex-col by default', () => {
    const { container } = render(<Stack>content</Stack>);
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('flex-col');
  });

  it('applies gap class', () => {
    const { container } = render(<Stack gap={6}>content</Stack>);
    expect(container.firstChild).toHaveClass('gap-6');
  });
});
