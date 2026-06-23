import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ShareBooking } from './ShareBooking';

Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });

describe('ShareBooking', () => {
  it('renders share buttons', () => {
    render(<ShareBooking url="https://egypthub.com/trip/123" />);
    expect(screen.getByText('واتساب')).toBeInTheDocument();
    expect(screen.getByText('بريد')).toBeInTheDocument();
    expect(screen.getByText('رابط')).toBeInTheDocument();
  });

  it('renders filtered platforms', () => {
    render(<ShareBooking url="https://egypthub.com/trip/123" platforms={['whatsapp']} />);
    expect(screen.getByText('واتساب')).toBeInTheDocument();
    expect(screen.queryByText('بريد')).not.toBeInTheDocument();
  });
});
