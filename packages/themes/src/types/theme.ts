import type { BaseTheme } from './base-theme';
import type { ColorTheme } from './color-theme';
import type { FlairTheme } from './flair-theme';

export type AnyTheme = BaseTheme | ColorTheme | FlairTheme;

export interface ThemeCollection {
  base: BaseTheme[];
  color: ColorTheme[];
  flair: FlairTheme[];
}

export interface ResolvedTheme {
  id: string;
  name: string;
  base: BaseTheme;
  color: ColorTheme;
  flair: FlairTheme[];
  cssVariables: Record<string, string>;
}

export function isBaseTheme(theme: AnyTheme): theme is BaseTheme {
  return theme.type === 'base';
}

export function isColorTheme(theme: AnyTheme): theme is ColorTheme {
  return theme.type === 'color';
}

export function isFlairTheme(theme: AnyTheme): theme is FlairTheme {
  return theme.type === 'flair';
}


