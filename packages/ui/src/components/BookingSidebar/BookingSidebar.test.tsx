import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BookingSidebar } from './BookingSidebar';

describe('BookingSidebar', () => {
  it('renders title', () => {
    render(<BookingSidebar><div>content</div></BookingSidebar>);
    expect(screen.getByText('ملخص الحجز')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<BookingSidebar><div>sidebar content</div></BookingSidebar>);
    expect(screen.getByText('sidebar content')).toBeInTheDocument();
  });

  it('renders custom title', () => {
    render(<BookingSidebar title="مخصص"><div /></BookingSidebar>);
    expect(screen.getByText('مخصص')).toBeInTheDocument();
  });
});
