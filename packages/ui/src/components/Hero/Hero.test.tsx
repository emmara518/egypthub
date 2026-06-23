import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Hero, HeroContent, HeroMedia, HeroSearch, HeroStats, HeroCTA } from './Hero';

describe('Hero', () => {
  it('renders children', () => {
    render(<Hero>content</Hero>);
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});

describe('HeroContent', () => {
  it('renders title and subtitle', () => {
    render(<HeroContent title="Welcome" subtitle="Explore Egypt" />);
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('Explore Egypt')).toBeInTheDocument();
  });
});

describe('HeroSearch', () => {
  it('renders input and calls onChange', () => {
    const handleChange = vi.fn();
    render(<HeroSearch value="" onChange={handleChange} />);
    const input = screen.getByLabelText('ابحث عن وجهتك...');
    fireEvent.change(input, { target: { value: 'Luxor' } });
    expect(handleChange).toHaveBeenCalledWith('Luxor');
  });

  it('calls onSubmit on form submit', () => {
    const handleSubmit = vi.fn();
    render(<HeroSearch value="test" onChange={vi.fn()} onSubmit={handleSubmit} />);
    fireEvent.submit(screen.getByRole('button', { name: 'بحث' }).closest('form')!);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});

describe('HeroStats', () => {
  it('renders stat items', () => {
    const items = [{ value: '10K+', label: 'Travelers' }, { value: '200+', label: 'Tours' }];
    render(<HeroStats items={items} />);
    expect(screen.getByText('10K+')).toBeInTheDocument();
    expect(screen.getByText('Travelers')).toBeInTheDocument();
  });
});

describe('HeroCTA', () => {
  it('renders buttons', () => {
    render(<HeroCTA primaryLabel="Explore" secondaryLabel="Learn More" />);
    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('calls onClick handlers', () => {
    const handlePrimary = vi.fn();
    render(<HeroCTA primaryLabel="Go" primaryOnClick={handlePrimary} />);
    fireEvent.click(screen.getByText('Go'));
    expect(handlePrimary).toHaveBeenCalledTimes(1);
  });
});
