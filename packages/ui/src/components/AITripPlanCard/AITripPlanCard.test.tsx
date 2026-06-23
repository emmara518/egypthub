import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AITripPlanCard } from './AITripPlanCard';

const props = {
  title: 'رحلة الأقصر',
  description: 'رحلة ثقافية لمدة 3 أيام',
  duration: '3 أيام',
  budget: 'ميزانية متوسطة',
  highlights: ['آثار', 'متاحف'],
  days: [
    { day: 1, title: 'الوصول', description: 'الوصول إلى الأقصر' },
    { day: 2, title: 'جولة', description: 'جولة في معبد الكرنك' },
  ],
};

describe('AITripPlanCard', () => {
  it('renders title and description', () => {
    render(<AITripPlanCard {...props} />);
    expect(screen.getByText('رحلة الأقصر')).toBeInTheDocument();
    expect(screen.getByText('رحلة ثقافية لمدة 3 أيام')).toBeInTheDocument();
  });

  it('renders duration and budget', () => {
    render(<AITripPlanCard {...props} />);
    expect(screen.getByText('3 أيام')).toBeInTheDocument();
    expect(screen.getByText('ميزانية متوسطة')).toBeInTheDocument();
  });

  it('renders highlight badges', () => {
    render(<AITripPlanCard {...props} />);
    expect(screen.getByText('آثار')).toBeInTheDocument();
    expect(screen.getByText('متاحف')).toBeInTheDocument();
  });

  it('renders day entries', () => {
    render(<AITripPlanCard {...props} />);
    expect(screen.getByText('الوصول')).toBeInTheDocument();
    expect(screen.getByText('جولة')).toBeInTheDocument();
  });

  it('calls onSelect when button clicked', () => {
    const handleSelect = vi.fn();
    render(<AITripPlanCard {...props} onSelect={handleSelect} />);
    fireEvent.click(screen.getByText('اختر هذه الخطة'));
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });
});
