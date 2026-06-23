import type { TextareaHTMLAttributes } from 'react';

export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  size?: TextareaSize;
  maxRows?: number;
  showCount?: boolean;
  isError?: boolean;
  errorMessage?: string;
  label?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
}
