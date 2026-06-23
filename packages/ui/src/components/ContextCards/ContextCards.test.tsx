import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContextCards } from './ContextCards';

const cards = [
  { id: '1', title: 'معلومة', summary: 'نص المعلومة', type: 'info' as const },
  { id: '2', title: 'نصيحة', summary: 'نص النصيحة', type: 'tip' as const },
];

describe('ContextCards', () => {
  it('renders all cards', () => {
    render(<ContextCards cards={cards} />);
    expect(screen.getByText('معلومة')).toBeInTheDocument();
    expect(screen.getByText('نصيحة')).toBeInTheDocument();
  });

  it('renders summaries', () => {
    render(<ContextCards cards={cards} />);
    expect(screen.getByText('نص المعلومة')).toBeInTheDocument();
  });

  it('calls onCardClick when clicked', () => {
    const handleClick = vi.fn();
    render(<ContextCards cards={cards} onCardClick={handleClick} />);
    fireEvent.click(screen.getByText('معلومة'));
    expect(handleClick).toHaveBeenCalledWith('1');
  });
});
