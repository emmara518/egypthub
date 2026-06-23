import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PointsCard } from './PointsCard';

describe('PointsCard', () => {
  it('renders points and tier label', () => {
    render(<PointsCard points={1200} tier="gold" />);
    expect(screen.getByText(/1,200/)).toBeInTheDocument();
    expect(screen.getByText('ذهبي')).toBeInTheDocument();
  });

  it('renders progress to next tier', () => {
    render(<PointsCard points={800} tier="silver" nextTier="ذهبي" pointsToNext={200} />);
    expect(screen.getByText(/200/)).toBeInTheDocument();
  });
});
