import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookingReference } from './BookingReference';

Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });

describe('BookingReference', () => {
  it('renders code', () => {
    render(<BookingReference referenceCode="BK-2024-001" />);
    expect(screen.getByText('BK-2024-001')).toBeInTheDocument();
    expect(screen.getByText('رمز الحجز')).toBeInTheDocument();
  });

  it('copies to clipboard', async () => {
    const handleCopy = vi.fn();
    render(<BookingReference referenceCode="BK-001" onCopy={handleCopy} />);
    fireEvent.click(screen.getByText('نسخ'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('BK-001');
  });
});
