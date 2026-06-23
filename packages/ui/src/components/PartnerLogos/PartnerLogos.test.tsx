import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PartnerLogos } from './PartnerLogos';

const partners = [
  { id: '1', name: 'EgyptAir', src: '/egyptair.png' },
  { id: '2', name: 'Marriott', src: '/marriott.png' },
];

describe('PartnerLogos', () => {
  it('renders partner images', () => {
    render(<PartnerLogos partners={partners} />);
    const imgs = screen.getAllByRole('img');
    expect(imgs).toHaveLength(2);
    expect(imgs[0]).toHaveAttribute('alt', 'EgyptAir');
  });
});
