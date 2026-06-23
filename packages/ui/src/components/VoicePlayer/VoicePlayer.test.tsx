import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { VoicePlayer } from './VoicePlayer';

describe('VoicePlayer', () => {
  it('renders play button', () => {
    render(<VoicePlayer />);
    expect(screen.getByLabelText('تشغيل')).toBeInTheDocument();
  });

  it('shows pause label when playing (controlled)', () => {
    render(<VoicePlayer isPlaying />);
    expect(screen.getByLabelText('إيقاف')).toBeInTheDocument();
  });

  it('calls onPlay when clicked', () => {
    const handlePlay = vi.fn();
    render(<VoicePlayer onPlay={handlePlay} />);
    fireEvent.click(screen.getByLabelText('تشغيل'));
    expect(handlePlay).toHaveBeenCalledTimes(1);
  });

  it('calls onPause when clicked while playing', () => {
    const handlePause = vi.fn();
    render(<VoicePlayer isPlaying onPause={handlePause} />);
    fireEvent.click(screen.getByLabelText('إيقاف'));
    expect(handlePause).toHaveBeenCalledTimes(1);
  });
});
