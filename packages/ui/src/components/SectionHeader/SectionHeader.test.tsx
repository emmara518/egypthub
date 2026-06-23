import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionHeader } from './SectionHeader';

describe('SectionHeader', () => {
  it('renders title', () => {
    render(<SectionHeader title="My Title" />);
    expect(screen.getByText('My Title')).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(<SectionHeader title="Title" subtitle="Subtitle" />);
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
  });

  it('renders action slot', () => {
    render(<SectionHeader title="Title" action={<button>Action</button>} />);
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('applies heading class to title', () => {
    render(<SectionHeader title="Title" />);
    expect(screen.getByText('Title')).toHaveClass('text-heading-md');
  });
});
