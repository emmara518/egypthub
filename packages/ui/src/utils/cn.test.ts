import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn utility', () => {
  it('merges string arguments', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('handles conditional objects', () => {
    expect(cn('px-4', false && 'text-red')).toBe('px-4');
    expect(cn('px-4', true && 'text-red')).toBe('px-4 text-red');
  });

  it('handles array arguments', () => {
    expect(cn(['p-4', 'm-2'])).toBe('p-4 m-2');
  });

  it('resolves Tailwind conflicts (last wins)', () => {
    expect(cn('px-4', 'px-6')).toBe('px-6');
    expect(cn('text-red', 'text-blue')).toBe('text-blue');
  });

  it('handles falsy values', () => {
    expect(cn('p-4', null, undefined, false, '', 'm-2')).toBe('p-4 m-2');
  });

  it('handles empty arguments', () => {
    expect(cn()).toBe('');
  });

  it('merges deeply nested arrays and objects', () => {
    expect(cn(['p-4', { 'm-2': true }], false && ['hidden'])).toBe('p-4 m-2');
  });
});
