import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AIWelcome } from './AIWelcome';

describe('AIWelcome', () => {
  it('renders greeting', () => {
    const { container } = render(<AIWelcome />);
    expect(container.textContent).toContain('مرحباً');
  });

  it('renders default message', () => {
    render(<AIWelcome />);
    expect(screen.getByText('كيف يمكنني مساعدتك في التخطيط لرحلتك إلى مصر؟')).toBeInTheDocument();
  });

  it('renders user name', () => {
    const { container } = render(<AIWelcome userName="أحمد" />);
    expect(container.textContent).toContain('أحمد');
  });

  it('renders custom greeting', () => {
    const { container } = render(<AIWelcome greeting="أهلاً وسهلاً" />);
    expect(container.textContent).toContain('أهلاً وسهلاً');
  });
});
