import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';

const navLinks = [
  { id: 'home', label: 'Home', active: true },
  { id: 'tours', label: 'Tours' },
  { id: 'about', label: 'About' },
];

const user = { name: 'Ahmed' };

describe('Header', () => {
  it('renders logo', () => {
    render(<Header logo={<span>Logo</span>} />);
    expect(screen.getByText('Logo')).toBeInTheDocument();
  });

  it('renders nav links', () => {
    render(<Header logo={<span>Logo</span>} navLinks={navLinks} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Tours')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('marks active nav link', () => {
    render(<Header logo={<span>Logo</span>} navLinks={navLinks} />);
    expect(screen.getByText('Home').closest('button')).toHaveAttribute('aria-current', 'page');
  });

  it('calls onNotificationClick', () => {
    const handleClick = vi.fn();
    render(<Header logo={<span>Logo</span>} onNotificationClick={handleClick} notificationCount={5} />);
    fireEvent.click(screen.getByLabelText('Notifications (5)'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders notification badge', () => {
    render(<Header logo={<span>Logo</span>} notificationCount={3} onNotificationClick={vi.fn()} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders user avatar initial', () => {
    render(<Header logo={<span>Logo</span>} user={user} />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });
});
