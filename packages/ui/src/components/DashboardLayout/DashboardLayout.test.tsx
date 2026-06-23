import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DashboardLayout } from './DashboardLayout';

const sidebarItems = [
  { id: 'home', label: 'Home', icon: <svg /> },
  { id: 'tours', label: 'Tours', icon: <svg /> },
];

const user = { name: 'Ahmed', role: 'Traveler' };

describe('DashboardLayout', () => {
  it('renders children', () => {
    render(
      <DashboardLayout
        logo={<span>Logo</span>}
        sidebarItems={sidebarItems}
        user={user}
        activeNav="home"
        onNavigate={vi.fn()}
      >
        <h1>Dashboard</h1>
      </DashboardLayout>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders logo in header', () => {
    render(
      <DashboardLayout
        logo={<span>Logo</span>}
        sidebarItems={sidebarItems}
        user={user}
        activeNav="home"
        onNavigate={vi.fn()}
      >
        content
      </DashboardLayout>
    );
    expect(screen.getByText('Logo')).toBeInTheDocument();
  });

  it('renders sidebar items', () => {
    render(
      <DashboardLayout
        logo={<span>Logo</span>}
        sidebarItems={sidebarItems}
        user={user}
        activeNav="home"
        onNavigate={vi.fn()}
      >
        content
      </DashboardLayout>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders user name', () => {
    render(
      <DashboardLayout
        logo={<span>Logo</span>}
        sidebarItems={sidebarItems}
        user={user}
        activeNav="home"
        onNavigate={vi.fn()}
      >
        content
      </DashboardLayout>
    );
    expect(screen.getByText('Ahmed')).toBeInTheDocument();
  });
});
