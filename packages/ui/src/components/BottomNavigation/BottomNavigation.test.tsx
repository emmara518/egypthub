import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BottomNavigation } from './BottomNavigation';

const items = [
  { id: 'home', label: 'Home', icon: <svg data-testid="home-icon" /> },
  { id: 'search', label: 'Search', icon: <svg data-testid="search-icon" />, badge: 3 },
  { id: 'profile', label: 'Profile', icon: <svg data-testid="profile-icon" /> },
];

describe('BottomNavigation', () => {
  it('renders all items', () => {
    render(<BottomNavigation items={items} activeItem="home" onChange={vi.fn()} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('marks active item with aria-current', () => {
    render(<BottomNavigation items={items} activeItem="search" onChange={vi.fn()} />);
    expect(screen.getByLabelText('Search')).toHaveAttribute('aria-current', 'page');
  });

  it('calls onChange on click', () => {
    const handleChange = vi.fn();
    render(<BottomNavigation items={items} activeItem="home" onChange={handleChange} />);
    fireEvent.click(screen.getByLabelText('Profile'));
    expect(handleChange).toHaveBeenCalledWith('profile');
  });

  it('shows badge count', () => {
    render(<BottomNavigation items={items} activeItem="home" onChange={vi.fn()} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('has nav with aria-label', () => {
    const { container } = render(<BottomNavigation items={items} activeItem="home" onChange={vi.fn()} />);
    expect(container.querySelector('nav')).toHaveAttribute('aria-label', 'Bottom navigation');
  });

  it('is hidden on desktop via lg:hidden', () => {
    const { container } = render(<BottomNavigation items={items} activeItem="home" onChange={vi.fn()} />);
    expect(container.firstChild).toHaveClass('lg:hidden');
  });
});
