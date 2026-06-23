import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MobileHeader } from './MobileHeader';

describe('MobileHeader', () => {
  it('renders logo', () => {
    render(<MobileHeader logo={<span>Logo</span>} />);
    expect(screen.getByText('Logo')).toBeInTheDocument();
  });

  it('toggles menu button', () => {
    const handleToggle = vi.fn();
    render(<MobileHeader logo={<span>Logo</span>} onMenuToggle={handleToggle} />);
    fireEvent.click(screen.getByLabelText('Open menu'));
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  it('shows close icon when menu is open', () => {
    render(<MobileHeader logo={<span>Logo</span>} isMenuOpen onMenuToggle={vi.fn()} />);
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
  });

  it('renders notification badge', () => {
    render(<MobileHeader logo={<span>Logo</span>} notificationCount={2} onNotificationClick={vi.fn()} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('hidden on desktop via lg:hidden', () => {
    const { container } = render(<MobileHeader logo={<span>Logo</span>} />);
    expect(container.firstChild).toHaveClass('lg:hidden');
  });
});
