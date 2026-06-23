import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { VoiceWaveform } from './VoiceWaveform';

describe('VoiceWaveform', () => {
  it('renders waveform', () => {
    const { container } = render(<VoiceWaveform />);
    expect(container.querySelector('[role="img"]')).toBeInTheDocument();
  });

  it('renders custom bar count', () => {
    const { container } = render(<VoiceWaveform bars={16} />);
    const bars = container.querySelectorAll('.rounded-full');
    expect(bars.length).toBe(16);
  });

  it('renders active state', () => {
    const { container } = render(<VoiceWaveform isActive />);
    const bars = container.querySelectorAll('.bg-gold');
    expect(bars.length).toBeGreaterThan(0);
  });
});
