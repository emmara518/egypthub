import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Grid } from './Grid';

describe('Grid', () => {
  it('renders children', () => {
    render(<Grid><span>item</span></Grid>);
    expect(screen.getByText('item')).toBeInTheDocument();
  });

  it('applies default grid class', () => {
    const { container } = render(<Grid>content</Grid>);
    expect(container.firstChild).toHaveClass('grid');
  });

  it('applies column classes', () => {
    const { container } = render(<Grid cols={3}>content</Grid>);
    expect(container.firstChild).toHaveClass('grid-cols-1');
    expect(container.firstChild).toHaveClass('sm:grid-cols-2');
    expect(container.firstChild).toHaveClass('lg:grid-cols-3');
  });

  it('applies gap class', () => {
    const { container } = render(<Grid gap={8}>content</Grid>);
    expect(container.firstChild).toHaveClass('gap-8');
  });

  it('accepts custom className', () => {
    const { container } = render(<Grid className="custom">content</Grid>);
    expect(container.firstChild).toHaveClass('custom');
  });
});
