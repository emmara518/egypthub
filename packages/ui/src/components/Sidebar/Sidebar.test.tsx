import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from './Sidebar';

const items = [
  { id: 'home', label: 'Home', icon: <svg data-testid="home-icon" /> },
  { id: 'search', label: 'Search', icon: <svg data-testid="search-icon" />, badge: 3 },
];

const user = { name: 'Ahmed', role: 'Traveler' };

describe('Sidebar', () => {
  it('renders nav items', () => {
    render(<Sidebar items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('renders user info when provided', () => {
    render(<Sidebar items={items} user={user} />);
    expect(screen.getByText('Ahmed')).toBeInTheDocument();
    expect(screen.getByText('Traveler')).toBeInTheDocument();
  });

  it('shows badge count', () => {
    render(<Sidebar items={items} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('calls onNavigate on item click', () => {
    const handleNav = vi.fn();
    render(<Sidebar items={items} onNavigate={handleNav} />);
    fireEvent.click(screen.getByText('Home'));
    expect(handleNav).toHaveBeenCalledWith('home');
  });

  it('marks active item with aria-current', () => {
    render(<Sidebar items={items} activeItem="search" />);
    // The Search button's parent has aria-current - get it from the button
    expect(screen.getByText('Search').closest('button')).toHaveAttribute('aria-current', 'page');
  });

  it('has aside with aria-label', () => {
    const { container } = render(<Sidebar items={items} />);
    expect(container.querySelector('aside')).toHaveAttribute('aria-label', 'Sidebar navigation');
  });

  it('applies collapsed width', () => {
    const { container } = render(<Sidebar items={items} isCollapsed />);
    expect(container.firstChild).toHaveClass('w-[72px]');
  });
});
