export interface ChatComposerProps {
  onSend: (message: string) => void;
  placeholder?: string;
  isDisabled?: boolean;
  className?: string;
}
