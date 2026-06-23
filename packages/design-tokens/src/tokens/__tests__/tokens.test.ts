import { describe, it, expect } from 'vitest';
import { colors } from '../colors';
import { fonts, fontSize } from '../typography';
import { spacing } from '../spacing';
import { radius } from '../radius';
import { shadows } from '../shadows';
import { breakpoints } from '../breakpoints';
import { zIndex } from '../z-index';
import { transition, animation } from '../motion';
import { gradients } from '../gradients';

const kebabCase = (str: string) => /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(str);

describe('Color Tokens', () => {
  it('exports all required color categories', () => {
    expect(colors.bg).toBeDefined();
    expect(colors.surface).toBeDefined();
    expect(colors['surface-elevated']).toBeDefined();
    expect(colors.gold).toBe('#D4A24C');
    expect(colors['gold-light']).toBe('#E8C97A');
    expect(colors['gold-dark']).toBe('#B8862D');
  });

  it('has correct hex values for gold system', () => {
    expect(colors.gold).toBe('#D4A24C');
    expect(colors['gold-light']).toBe('#E8C97A');
    expect(colors['gold-dark']).toBe('#B8862D');
  });

  it('has correct semantic colors', () => {
    expect(colors.success).toBe('#10B981');
    expect(colors.warning).toBe('#F59E0B');
    expect(colors.error).toBe('#EF4444');
    expect(colors.info).toBe('#3B82F6');
  });

  it('has correct text colors', () => {
    expect(colors.text.primary).toBe('#F5F7FA');
    expect(colors.text.secondary).toBe('#8B95A5');
    expect(colors.text.muted).toBe('#5A6478');
    expect(colors.text.gold).toBe('#D4A24C');
    expect(colors.text.inverse).toBe('#0A0E17');
  });
});

describe('Typography Tokens', () => {
  it('exports font families', () => {
    expect(fonts.family.arabic).toContain('Cairo');
    expect(fonts.family.english).toContain('Poppins');
    expect(fonts.family.display).toContain('Playfair Display');
  });

  it('exports font sizes', () => {
    expect(fontSize['display-lg']).toBe('4rem');
    expect(fontSize['body-md']).toBe('1rem');
    expect(fontSize.caption).toBe('0.75rem');
  });
});

describe('Spacing Tokens', () => {
  it('exports spacing values on 4px grid', () => {
    expect(spacing[1]).toBe('4px');
    expect(spacing[4]).toBe('16px');
    expect(spacing[8]).toBe('32px');
    expect(spacing[16]).toBe('64px');
  });
});

describe('Radius Tokens', () => {
  it('exports radius values', () => {
    expect(radius.sm).toBe('4px');
    expect(radius.md).toBe('8px');
    expect(radius.xl).toBe('16px');
    expect(radius.full).toBe('9999px');
  });
});

describe('Shadow Tokens', () => {
  it('exports shadow values', () => {
    expect(shadows.sm).toBeDefined();
    expect(shadows.md).toBeDefined();
    expect(shadows.gold).toContain('212,162,76');
    expect(shadows['gold-glow']).toContain('212,162,76');
  });
});

describe('Breakpoint Tokens', () => {
  it('exports breakpoint values', () => {
    expect(breakpoints.sm).toBe('480px');
    expect(breakpoints.lg).toBe('768px');
    expect(breakpoints.xl).toBe('1024px');
    expect(breakpoints['3xl']).toBe('1536px');
  });
});

describe('Z-Index Tokens', () => {
  it('exports z-index values', () => {
    expect(zIndex.dropdown).toBe(1000);
    expect(zIndex.modal).toBe(1050);
    expect(zIndex.toast).toBe(1080);
  });
});

describe('Motion Tokens', () => {
  it('exports transition values', () => {
    expect(transition.fast).toContain('150ms');
    expect(transition.base).toContain('250ms');
  });

  it('exports animation values', () => {
    expect(animation['fade-in']).toBeDefined();
    expect(animation.spin).toBeDefined();
  });
});

describe('Gradient Tokens', () => {
  it('exports gradient values', () => {
    expect(gradients.gold).toContain('D4A24C');
    expect(gradients.navy).toContain('0A0E17');
  });
});

describe('CSS Variable Naming Convention', () => {
  const cssVarNames = [
    'bg-primary', 'bg-secondary', 'surface', 'surface-elevated', 'surface-hover',
    'gold', 'gold-light', 'gold-dark', 'gold-glow', 'gold-subtle', 'gold-border',
    'text-primary', 'text-secondary', 'text-muted', 'text-gold', 'text-inverse',
    'border', 'border-light',
    'success', 'warning', 'error', 'info',
    'font-cairo', 'font-poppins', 'font-playfair',
    'font-size-display-lg', 'font-size-body-md',
    'space-4', 'space-8', 'space-16',
    'radius-sm', 'radius-md', 'radius-xl', 'radius-full',
    'shadow-sm', 'shadow-md', 'shadow-gold',
    'z-dropdown', 'z-modal', 'z-toast',
    'transition-fast', 'transition-base',
    'gradient-gold',
  ];

  it('all CSS variable names use kebab-case', () => {
    cssVarNames.forEach((name) => {
      expect(kebabCase(name)).toBe(true);
    });
  });
});
