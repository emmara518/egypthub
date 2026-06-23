import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TravelerSelector } from './TravelerSelector';

const types = [{ id: 'adults', label: 'بالغين', description: '13 سنة فأكثر' }, { id: 'children', label: 'أطفال', description: '2-12 سنة' }];

describe('TravelerSelector', () => {
  it('renders all types', () => {
    render(<TravelerSelector types={types} values={{ adults: 1, children: 0 }} onChange={vi.fn()} />);
    expect(screen.getByText('بالغين')).toBeInTheDocument();
    expect(screen.getByText('أطفال')).toBeInTheDocument();
  });

  it('renders total count', () => {
    render(<TravelerSelector types={types} values={{ adults: 2, children: 1 }} onChange={vi.fn()} />);
    expect(screen.getByText('المجموع: 3 مسافرين')).toBeInTheDocument();
  });
});
