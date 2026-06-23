export interface VoiceRecorderProps {
  onStart?: () => void;
  onStop?: (duration: number) => void;
  isRecording?: boolean;
  maxDuration?: number;
  isDisabled?: boolean;
  className?: string;
}
