import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MapContainer, MapPin, MapTooltip, MapFilters } from './MapContainer';

describe('MapContainer', () => {
  it('renders with coordinates', () => {
    const { container } = render(<MapContainer center={{ lat: 25.7, lng: 32.6 }} />);
    expect(container.textContent).toContain('25.7');
    expect(container.textContent).toContain('32.6');
  });
});

describe('MapPin', () => {
  it('calls onClick', () => {
    const handleClick = vi.fn();
    render(<MapPin position={{ lat: 25.7, lng: 32.6 }} onClick={handleClick} />);
    fireEvent.click(screen.getByLabelText(/Location/));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders label', () => {
    render(<MapPin position={{ lat: 25.7, lng: 32.6 }} label="Luxor Temple" />);
    expect(screen.getByText('Luxor Temple')).toBeInTheDocument();
  });
});

describe('MapTooltip', () => {
  it('renders title and price', () => {
    render(<MapTooltip title="Luxor Temple" price="$299" />);
    expect(screen.getByText('Luxor Temple')).toBeInTheDocument();
    expect(screen.getByText('$299')).toBeInTheDocument();
  });
});

describe('MapFilters', () => {
  it('renders category buttons', () => {
    const categories = [
      { id: 'temples', label: 'Temples', active: true },
      { id: 'museums', label: 'Museums', active: false },
    ];
    render(<MapFilters categories={categories} onToggle={vi.fn()} />);
    expect(screen.getByText('Temples')).toBeInTheDocument();
    expect(screen.getByText('Museums')).toBeInTheDocument();
  });

  it('calls onToggle', () => {
    const handleToggle = vi.fn();
    const categories = [{ id: 'temples', label: 'Temples', active: true }];
    render(<MapFilters categories={categories} onToggle={handleToggle} />);
    fireEvent.click(screen.getByText('Temples'));
    expect(handleToggle).toHaveBeenCalledWith('temples');
  });
});
