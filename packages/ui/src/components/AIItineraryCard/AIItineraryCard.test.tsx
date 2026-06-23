import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AIItineraryCard } from './AIItineraryCard';

const days = [
  {
    day: 1,
    date: 'الاثنين',
    activities: [
      { time: '09:00', title: 'زيارة الأهرامات', description: 'جولة في الأهرامات', location: 'الجيزة', duration: '3 ساعات' },
      { time: '13:00', title: 'الغداء', location: 'مطعم محلي' },
    ],
  },
  { day: 2, activities: [{ time: '10:00', title: 'المتحف المصري', duration: 'ساعتان' }] },
];

describe('AIItineraryCard', () => {
  it('renders title', () => {
    render(<AIItineraryCard title="برنامج الرحلة" days={days} />);
    expect(screen.getByText('برنامج الرحلة')).toBeInTheDocument();
  });

  it('renders day entries', () => {
    render(<AIItineraryCard title="برنامج" days={days} />);
    expect(screen.getByText('اليوم 1')).toBeInTheDocument();
    expect(screen.getByText('اليوم 2')).toBeInTheDocument();
  });

  it('renders total days', () => {
    render(<AIItineraryCard title="برنامج" days={days} totalDays={3} />);
    expect(screen.getByText('3 أيام')).toBeInTheDocument();
  });

  it('shows activities for expanded day', () => {
    render(<AIItineraryCard title="برنامج" days={days} />);
    expect(screen.getByText('زيارة الأهرامات')).toBeInTheDocument();
    expect(screen.getByText('09:00')).toBeInTheDocument();
  });

  it('calls onDayClick when day toggled', () => {
    const handleClick = vi.fn();
    render(<AIItineraryCard title="برنامج" days={days} onDayClick={handleClick} />);
    fireEvent.click(screen.getByText('اليوم 2'));
    expect(handleClick).toHaveBeenCalledWith(2);
  });
});
