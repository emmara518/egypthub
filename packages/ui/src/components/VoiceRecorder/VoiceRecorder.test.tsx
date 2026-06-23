import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { VoiceRecorder } from './VoiceRecorder';

describe('VoiceRecorder', () => {
  it('renders record button', () => {
    render(<VoiceRecorder />);
    expect(screen.getByLabelText('بدء التسجيل')).toBeInTheDocument();
  });

  it('shows stop label when recording (controlled)', () => {
    render(<VoiceRecorder isRecording />);
    expect(screen.getByLabelText('إيقاف التسجيل')).toBeInTheDocument();
  });

  it('calls onStart when clicked', () => {
    const handleStart = vi.fn();
    render(<VoiceRecorder onStart={handleStart} />);
    fireEvent.click(screen.getByLabelText('بدء التسجيل'));
    expect(handleStart).toHaveBeenCalledTimes(1);
  });

  it('does not call onStart when disabled', () => {
    const handleStart = vi.fn();
    render(<VoiceRecorder onStart={handleStart} isDisabled />);
    fireEvent.click(screen.getByLabelText('بدء التسجيل'));
    expect(handleStart).not.toHaveBeenCalled();
  });
});
