import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AIInsightCard } from './AIInsightCard';

describe('AIInsightCard', () => {
  it('renders title and description', () => {
    render(<AIInsightCard title="معلومة" description="نص المعلومات" />);
    expect(screen.getByText('معلومة')).toBeInTheDocument();
    expect(screen.getByText('نص المعلومات')).toBeInTheDocument();
  });

  it('renders category', () => {
    render(<AIInsightCard title="معلومة" description="نص" category="تاريخ" />);
    expect(screen.getByText('تاريخ')).toBeInTheDocument();
  });

  it('renders tip badge when isTip is true', () => {
    const { container } = render(<AIInsightCard title="نصيحة مهمة" description="نص" isTip />);
    expect(container.textContent).toContain('نصيحة');
  });

  it('renders icon when provided', () => {
    render(<AIInsightCard title="معلومة" description="نص" icon="🔍" />);
    expect(screen.getByText('🔍')).toBeInTheDocument();
  });
});
