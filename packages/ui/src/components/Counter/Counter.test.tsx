import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { Counter } from './Counter';

describe('Counter', () => {
  it('renders end value', () => {
    const { container } = render(<Counter end={100} duration={0} />);
    expect(container.querySelector('.tabular-nums')?.textContent).toBe('100');
  });

  it('renders prefix and suffix', () => {
    const { container } = render(<Counter end={50} prefix="$" suffix="+" duration={0} />);
    expect(container.querySelector('.tabular-nums')?.textContent).toBe('$50+');
  });

  it('renders label', () => {
    render(<Counter end={99} label="Tours" duration={0} />);
    expect(screen.getByText('Tours')).toBeInTheDocument();
  });
});
