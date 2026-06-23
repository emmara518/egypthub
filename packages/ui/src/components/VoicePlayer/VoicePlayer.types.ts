export interface VoicePlayerProps {
  src?: string;
  isPlaying?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  className?: string;
}
