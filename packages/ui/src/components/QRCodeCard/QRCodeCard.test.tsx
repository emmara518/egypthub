import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QRCodeCard } from './QRCodeCard';

describe('QRCodeCard', () => {
  it('renders booking ID and instructions', () => {
    render(<QRCodeCard qrValue="test" bookingId="BK-001" />);
    expect(screen.getByText('BK-001')).toBeInTheDocument();
    expect(screen.getByText('استخدم رمز QR للدخول إلى الفعالية')).toBeInTheDocument();
  });

  it('renders custom instructions', () => {
    render(<QRCodeCard qrValue="test" bookingId="BK-001" instructions="افحص الرمز" />);
    expect(screen.getByText('افحص الرمز')).toBeInTheDocument();
  });
});
