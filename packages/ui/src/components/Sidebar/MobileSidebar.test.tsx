import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MobileSidebar } from './MobileSidebar';

const items = [
  { id: 'home', label: 'الرئيسية', icon: <svg /> },
  { id: 'profile', label: 'الملف الشخصي', icon: <svg /> },
];

describe('MobileSidebar', () => {
  it('renders items when open', () => {
    render(<MobileSidebar items={items} isOpen onClose={vi.fn()} />);
    expect(screen.getByText('الرئيسية')).toBeInTheDocument();
    expect(screen.getByText('الملف الشخصي')).toBeInTheDocument();
  });

  it('does not render items in body when closed', () => {
    render(<MobileSidebar items={items} isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByText('الرئيسية')).not.toBeInTheDocument();
  });
});
