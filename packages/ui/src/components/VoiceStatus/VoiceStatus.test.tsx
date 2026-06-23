import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VoiceStatus } from './VoiceStatus';

describe('VoiceStatus', () => {
  it('renders idle label by default', () => {
    render(<VoiceStatus />);
    expect(screen.getByText('انقر للتحدث')).toBeInTheDocument();
  });

  it('renders listening label', () => {
    render(<VoiceStatus status="listening" />);
    expect(screen.getByText('استماع...')).toBeInTheDocument();
  });

  it('renders processing label', () => {
    render(<VoiceStatus status="processing" />);
    expect(screen.getByText('معالجة...')).toBeInTheDocument();
  });

  it('renders speaking label', () => {
    render(<VoiceStatus status="speaking" />);
    expect(screen.getByText('تحدث...')).toBeInTheDocument();
  });

  it('renders error label', () => {
    render(<VoiceStatus status="error" />);
    expect(screen.getByText('حدث خطأ')).toBeInTheDocument();
  });

  it('renders custom message', () => {
    render(<VoiceStatus message="مخصص" />);
    expect(screen.getByText('مخصص')).toBeInTheDocument();
  });
});
