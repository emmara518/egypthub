import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OfferCountdown } from './OfferCountdown';

describe('OfferCountdown', () => {
  it('shows expired text when date is past', () => {
    const past = new Date(Date.now() - 1000);
    render(<OfferCountdown targetDate={past} />);
    expect(screen.getByText('انتهى العرض')).toBeInTheDocument();
  });

  it('renders time units for future date', () => {
    const future = new Date(Date.now() + 86400000 * 2);
    const { container } = render(<OfferCountdown targetDate={future} />);
    expect(container.textContent).toContain('يوم');
    expect(container.textContent).toContain('سا');
    expect(container.textContent).toContain('د');
    expect(container.textContent).toContain('ث');
  });
});
