export type VoiceStatusType = 'idle' | 'listening' | 'processing' | 'speaking' | 'error';

export interface VoiceStatusProps {
  status?: VoiceStatusType;
  message?: string;
  className?: string;
}
