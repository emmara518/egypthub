import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ConversationTimeline } from './ConversationTimeline';

const entries = [
  { id: '1', title: 'مرحباً', description: 'بدأ المحادثة', timestamp: '10:00', isCompleted: true },
  { id: '2', title: 'اقتراح وجهة', description: 'تم اقتراح الأقصر', timestamp: '10:01', isActive: true },
  { id: '3', title: 'تأكيد الحجز', timestamp: '10:02' },
];

describe('ConversationTimeline', () => {
  it('renders all entries', () => {
    render(<ConversationTimeline entries={entries} />);
    expect(screen.getByText('مرحباً')).toBeInTheDocument();
    expect(screen.getByText('اقتراح وجهة')).toBeInTheDocument();
    expect(screen.getByText('تأكيد الحجز')).toBeInTheDocument();
  });

  it('renders descriptions', () => {
    render(<ConversationTimeline entries={entries} />);
    expect(screen.getByText('بدأ المحادثة')).toBeInTheDocument();
    expect(screen.getByText('تم اقتراح الأقصر')).toBeInTheDocument();
  });

  it('renders timestamps', () => {
    render(<ConversationTimeline entries={entries} />);
    expect(screen.getByText('10:00')).toBeInTheDocument();
    expect(screen.getByText('10:01')).toBeInTheDocument();
  });
});
