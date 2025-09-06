import type { BaseTheme } from '../../types/base-theme';
import type { ColorTheme } from '../../types/color-theme';
import type { FlairTheme } from '../../types/flair-theme';

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

export function categorizeThemes(themes: AnyTheme[]): ThemeCollection {
  const collection: ThemeCollection = {
    base: [],
    color: [],
    flair: []
  };

  for (const theme of themes) {
    if (isBaseTheme(theme)) {
      collection.base.push(theme);
    } else if (isColorTheme(theme)) {
      collection.color.push(theme);
    } else if (isFlairTheme(theme)) {
      collection.flair.push(theme);
    }
  }

  return collection;
}
