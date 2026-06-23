import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatsBar } from './StatsBar';

const items = [
  { value: '10K+', label: 'Travelers', icon: <svg /> },
  { value: '500+', label: 'Tours' },
];

describe('StatsBar', () => {
  it('renders all items', () => {
    render(<StatsBar items={items} />);
    expect(screen.getByText('10K+')).toBeInTheDocument();
    expect(screen.getByText('Travelers')).toBeInTheDocument();
    expect(screen.getByText('500+')).toBeInTheDocument();
    expect(screen.getByText('Tours')).toBeInTheDocument();
  });
});
