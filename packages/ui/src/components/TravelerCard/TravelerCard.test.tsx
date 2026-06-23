import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TravelerCard } from './TravelerCard';

describe('TravelerCard', () => {
  it('renders name and type', () => {
    render(<TravelerCard name="أحمد" type="بالغ" />);
    expect(screen.getByText('أحمد')).toBeInTheDocument();
    expect(screen.getByText('بالغ')).toBeInTheDocument();
  });

  it('renders main badge', () => {
    render(<TravelerCard name="أحمد" type="بالغ" isMain />);
    expect(screen.getByText('أساسي')).toBeInTheDocument();
  });

  it('renders passport', () => {
    render(<TravelerCard name="أحمد" type="بالغ" passport="AB123456" />);
    expect(screen.getByText('AB123456')).toBeInTheDocument();
  });

  it('calls onRemove', () => {
    const handleRemove = vi.fn();
    render(<TravelerCard name="أحمد" type="بالغ" onRemove={handleRemove} />);
    fireEvent.click(screen.getByText('إزالة'));
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });
});
