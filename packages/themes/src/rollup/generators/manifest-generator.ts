import type { ResolvedTheme, ThemeCollection } from './theme-types';
import type { BaseTheme } from '../../types/base-theme';
import type { ColorTheme } from '../../types/color-theme';
import type { FlairTheme } from '../../types/flair-theme';

export interface ThemeManifestEntry {
  id: string;
  name: string;
  description?: string;
  type: 'resolved' | 'base' | 'color' | 'flair';
  variant?: 'light' | 'dark';
  family?: string;
  components?: {
    base?: string;
    color?: string;
    flair?: string[];
  };
  cssFile: string;
  metadata?: {
    author?: string;
    version?: string;
    tags?: string[];
  };
}

export interface ThemeManifest {
  version: string;
  generated: string;
  themes: {
    resolved: ThemeManifestEntry[];
    base: ThemeManifestEntry[];
    color: ThemeManifestEntry[];
    flair: ThemeManifestEntry[];
  };
  collections: {
    families: string[];
    variants: string[];
  };
}

export function createThemeManifestEntry(theme: ResolvedTheme): ThemeManifestEntry {
  return {
    id: theme.id,
    name: theme.name,
    description: theme.color.description,
    type: 'resolved',
    variant: theme.color.variant,
    family: theme.color.family,
    components: {
      base: theme.base.id,
      color: theme.color.id,
      flair: theme.flair.map(f => f.id)
    },
    cssFile: `${theme.id}.css`
  };
}

export function createBaseThemeManifestEntry(theme: BaseTheme): ThemeManifestEntry {
  return {
    id: theme.id,
    name: theme.name,
    description: theme.description,
    type: 'base',
    cssFile: `base/${theme.id}.css`
  };
}

export function createColorThemeManifestEntry(theme: ColorTheme): ThemeManifestEntry {
  return {
    id: theme.id,
    name: theme.name,
    description: theme.description,
    type: 'color',
    variant: theme.variant,
    family: theme.family,
    cssFile: `color/${theme.id}.css`
  };
}

export function createFlairThemeManifestEntry(theme: FlairTheme): ThemeManifestEntry {
  return {
    id: theme.id,
    name: theme.name,
    description: theme.description,
    type: 'flair',
    cssFile: `flair/${theme.id}.css`,
    metadata: {
      tags: theme.priority ? [`priority-${theme.priority}`] : undefined
    }
  };
}

export function generateThemeManifest(
  resolvedThemes: ResolvedTheme[],
  themeCollection: ThemeCollection
): ThemeManifest {
  const families = Array.from(new Set(
    themeCollection.color
      .map(t => t.family)
      .filter((f): f is string => f !== undefined)
  ));

  const variants = Array.from(new Set(
    themeCollection.color.map(t => t.variant)
  ));

  return {
    version: '1.0.0',
    generated: new Date().toISOString(),
    themes: {
      resolved: resolvedThemes.map(createThemeManifestEntry),
      base: themeCollection.base.map(createBaseThemeManifestEntry),
      color: themeCollection.color.map(createColorThemeManifestEntry),
      flair: themeCollection.flair.map(createFlairThemeManifestEntry)
    },
    collections: {
      families,
      variants
    }
  };
}
