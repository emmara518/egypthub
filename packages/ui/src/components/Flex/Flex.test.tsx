import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Flex } from './Flex';

describe('Flex', () => {
  it('renders children', () => {
    render(<Flex><span>item</span></Flex>);
    expect(screen.getByText('item')).toBeInTheDocument();
  });

  it('applies flex class', () => {
    const { container } = render(<Flex>content</Flex>);
    expect(container.firstChild).toHaveClass('flex');
  });

  it('applies direction class', () => {
    const { container } = render(<Flex direction="column">content</Flex>);
    expect(container.firstChild).toHaveClass('flex-col');
  });

  it('applies align class', () => {
    const { container } = render(<Flex align="center">content</Flex>);
    expect(container.firstChild).toHaveClass('items-center');
  });

  it('applies justify class', () => {
    const { container } = render(<Flex justify="between">content</Flex>);
    expect(container.firstChild).toHaveClass('justify-between');
  });

  it('applies wrap class', () => {
    const { container } = render(<Flex wrap>content</Flex>);
    expect(container.firstChild).toHaveClass('flex-wrap');
  });

  it('applies gap class', () => {
    const { container } = render(<Flex gap={6}>content</Flex>);
    expect(container.firstChild).toHaveClass('gap-6');
  });
});
