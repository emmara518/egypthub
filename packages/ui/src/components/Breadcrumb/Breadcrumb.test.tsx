import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Tours', href: '/tours' },
    { label: 'Luxor' },
  ];

  it('renders all items', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Tours')).toBeInTheDocument();
    expect(screen.getByText('Luxor')).toBeInTheDocument();
  });

  it('marks last item as current page', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText('Luxor')).toHaveAttribute('aria-current', 'page');
  });

  it('renders links for items with href', () => {
    render(<Breadcrumb items={items} />);
    const link = screen.getByText('Home');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/');
  });

  it('has nav with aria-label', () => {
    const { container } = render(<Breadcrumb items={items} />);
    expect(container.querySelector('nav')).toHaveAttribute('aria-label', 'Breadcrumb');
  });

  it('renders separators between items', () => {
    const { container } = render(<Breadcrumb items={items} />);
    const separators = container.querySelectorAll('nav li span[aria-hidden="true"]');
    expect(separators.length).toBe(items.length - 1);
  });
});
