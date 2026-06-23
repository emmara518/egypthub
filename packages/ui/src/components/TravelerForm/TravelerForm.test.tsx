import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TravelerForm } from './TravelerForm';

describe('TravelerForm', () => {
  it('renders traveler heading', () => {
    render(<TravelerForm index={0} type="بالغ" onChange={vi.fn()} />);
    expect(screen.getByText('المسافر 1 — بالغ')).toBeInTheDocument();
  });

  it('calls onChange on input', () => {
    const handleChange = vi.fn();
    render(<TravelerForm index={0} type="بالغ" onChange={handleChange} />);
    fireEvent.change(screen.getByPlaceholderText('الاسم الأول'), { target: { value: 'أحمد' } });
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ firstName: 'أحمد' }));
  });
});
