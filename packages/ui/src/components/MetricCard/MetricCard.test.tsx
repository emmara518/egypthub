import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MetricCard } from './MetricCard';

describe('MetricCard', () => {
  it('renders value and label', () => {
    render(<MetricCard value="12K" label="Travelers" />);
    expect(screen.getByText('12K')).toBeInTheDocument();
    expect(screen.getByText('Travelers')).toBeInTheDocument();
  });

  it('renders trend value', () => {
    render(<MetricCard value="99" label="Tours" trend="up" trendValue="12%" />);
    expect(screen.getByText('12%')).toBeInTheDocument();
  });
});
