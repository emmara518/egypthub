import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from './Tabs';

const tabs = [
  { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
  { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
  { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div>, disabled: true },
];

describe('Tabs', () => {
  it('renders all tab labels', () => {
    render(<Tabs tabs={tabs} activeTab="tab1" onChange={vi.fn()} />);
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Tab 3')).toBeInTheDocument();
  });

  it('shows content for active tab', () => {
    render(<Tabs tabs={tabs} activeTab="tab1" onChange={vi.fn()} />);
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('calls onChange on click', () => {
    const handleChange = vi.fn();
    render(<Tabs tabs={tabs} activeTab="tab2" onChange={handleChange} />);
    fireEvent.click(screen.getByText('Tab 1'));
    expect(handleChange).toHaveBeenCalledWith('tab1');
  });

  it('sets aria-selected correctly', () => {
    render(<Tabs tabs={tabs} activeTab="tab2" onChange={vi.fn()} />);
    expect(screen.getByText('Tab 2').closest('[role="tab"]')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Tab 1').closest('[role="tab"]')).toHaveAttribute('aria-selected', 'false');
  });

  it('disables tabs marked as disabled', () => {
    render(<Tabs tabs={tabs} activeTab="tab1" onChange={vi.fn()} />);
    expect(screen.getByText('Tab 3').closest('button')).toBeDisabled();
  });

  it('supports ArrowRight keyboard navigation', () => {
    const handleChange = vi.fn();
    render(<Tabs tabs={tabs} activeTab="tab1" onChange={handleChange} />);
    fireEvent.keyDown(screen.getByText('Tab 1').closest('button')!, { key: 'ArrowRight' });
    expect(handleChange).toHaveBeenCalledWith('tab2');
  });
});
