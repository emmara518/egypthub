import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AIRecommendationCard } from './AIRecommendationCard';

const props = { title: 'الأقصر', description: 'مدينة الآثار الفرعونية', matchScore: 95, reason: 'تناسب اهتماماتك' };

describe('AIRecommendationCard', () => {
  it('renders title and description', () => {
    render(<AIRecommendationCard {...props} />);
    expect(screen.getByText('الأقصر')).toBeInTheDocument();
    expect(screen.getByText('مدينة الآثار الفرعونية')).toBeInTheDocument();
  });

  it('renders match score', () => {
    render(<AIRecommendationCard {...props} />);
    expect(screen.getByText('95%')).toBeInTheDocument();
  });

  it('renders reason', () => {
    render(<AIRecommendationCard {...props} />);
    expect(screen.getByText('تناسب اهتماماتك')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<AIRecommendationCard {...props} onClick={handleClick} />);
    fireEvent.click(screen.getByText('الأقصر').closest('button')!);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders image when provided', () => {
    render(<AIRecommendationCard {...props} image="/luxor.jpg" />);
    const img = screen.getByAltText('الأقصر');
    expect(img).toBeInTheDocument();
  });
});
