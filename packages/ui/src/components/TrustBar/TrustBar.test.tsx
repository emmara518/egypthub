import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TrustBar } from './TrustBar';

describe('TrustBar', () => {
  it('renders default counts', () => {
    render(<TrustBar />);
    expect(screen.getByText('10,000+')).toBeInTheDocument();
    expect(screen.getByText('25,000+')).toBeInTheDocument();
  });

  it('renders custom counts', () => {
    render(<TrustBar travelersCount="5K" toursCount="100" />);
    expect(screen.getByText('5K')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('renders labels', () => {
    render(<TrustBar />);
    expect(screen.getByText('مسافر')).toBeInTheDocument();
    expect(screen.getByText('تقييم')).toBeInTheDocument();
  });
});
