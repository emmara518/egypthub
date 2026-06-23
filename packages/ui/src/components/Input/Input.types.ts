import type { ReactNode, InputHTMLAttributes } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  suffix?: string;
  isError?: boolean;
  errorMessage?: string;
  label?: string;
  helperText?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
}
