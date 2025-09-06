import type { BaseTheme } from '../../types/base-theme';
import type { ColorTheme } from '../../types/color-theme';
import type { FlairTheme } from '../../types/flair-theme';
import type { ResolvedTheme } from './theme-types';

export function resolveBaseVariables(base: BaseTheme): Record<string, string> {
  return {
    '--oi-spacing-base': `${base.spacing}`,
    '--oi-sizing-base': `${base.sizing}`,
    '--oi-radius-base': `${base.radius}`,
    '--oi-typography-base': `${base.typography}`,
    '--oi-elevation-base': `${base.elevation}`,
    ...(base.custom && Object.fromEntries(
      Object.entries(base.custom).map(([key, value]) => [`--oi-${key}`, `${value}`])
    ))
  };
}

export function resolveColorVariables(color: ColorTheme): Record<string, string> {
  const variables: Record<string, string> = {};

  // Main colors
  variables['--oi-background'] = color.colors.background;
  variables['--oi-foreground'] = color.colors.foreground;

  // Surface colors
  Object.entries(color.colors.surface).forEach(([key, value]) => {
    variables[`--oi-surface-${key}`] = value;
  });

  // Text colors
  Object.entries(color.colors.text).forEach(([key, value]) => {
    variables[`--oi-text-${key}`] = value;
  });

  // Border colors
  Object.entries(color.colors.border).forEach(([key, value]) => {
    variables[`--oi-border-${key}`] = value;
  });

  // Accent colors
  Object.entries(color.colors.accent).forEach(([key, value]) => {
    variables[`--oi-accent-${key}`] = value;
  });

  // Interactive colors
  Object.entries(color.colors.interactive).forEach(([key, value]) => {
    variables[`--oi-interactive-${key}`] = value;
  });

  // Extended colors
  if (color.colors.extended) {
    Object.entries(color.colors.extended).forEach(([key, value]) => {
      variables[`--oi-extended-${key}`] = value;
    });
  }

  return variables;
}

export function resolveFlairVariables(flairThemes: FlairTheme[]): Record<string, string> {
  // Sort by priority (higher priority wins)
  const sortedFlair = [...flairThemes].sort((a, b) => (b.priority || 0) - (a.priority || 0));
  
  const variables: Record<string, string> = {};
  
  for (const flair of sortedFlair) {
    Object.entries(flair.tokens).forEach(([key, value]) => {
      // Convert oi- prefixed tokens to CSS variables
      const cssVar = key.startsWith('oi-') ? `--${key}` : `--oi-${key}`;
      variables[cssVar] = value;
    });
  }

  return variables;
}

export function resolveTheme(
  base: BaseTheme,
  color: ColorTheme,
  flair: FlairTheme[] = []
): ResolvedTheme {
  const baseVars = resolveBaseVariables(base);
  const colorVars = resolveColorVariables(color);
  const flairVars = resolveFlairVariables(flair);

  // Merge variables (flair overrides color, color overrides base)
  const cssVariables = {
    ...baseVars,
    ...colorVars,
    ...flairVars
  };

  return {
    id: `${base.id}-${color.id}${flair.length > 0 ? `-${flair.map(f => f.id).join('-')}` : ''}`,
    name: `${base.name} + ${color.name}${flair.length > 0 ? ` + ${flair.map(f => f.name).join(' + ')}` : ''}`,
    base,
    color,
    flair,
    cssVariables
  };
}
