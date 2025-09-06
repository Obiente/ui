import type { BaseTheme } from '../types/base-theme';
import type { ColorTheme } from '../types/color-theme';
import type { FlairTheme } from '../types/flair-theme';

export interface ObienteThemeOptions {
  include?: string | string[];
  exclude?: string | string[];
  themes?: string[] | ThemeConfiguration[];
  defaultTheme?: string;
  cookieName?: string;
  attributeName?: string;
  generateManifest?: boolean;
  ssrSupport?: boolean;
}

export type ThemeType = BaseTheme | ColorTheme | FlairTheme;

export interface ThemeConfiguration {
  /** Base theme to use (affects spacing, sizing, etc.) */
  base: string;
  /** Color theme to use */
  color: string;
  /** Optional flair themes to stack */
  flair?: string[];
  /** Combined theme ID for the final theme */
  id: string;
  /** Display name for the theme */
  name?: string;
}

export interface CompiledTheme {
  id: string;
  name: string;
  configuration: ThemeConfiguration;
  cssVariables: Record<string, string>;
  customCSS?: string;
}

export interface ThemeManifestEntry {
  id: string;
  name: string;
  description?: string;
  configuration: ThemeConfiguration;
  variant: 'light' | 'dark';
  family?: string;
  cssFile: string;
}

export interface ThemeManifest {
  themes: ThemeManifestEntry[];
  defaultTheme: string | null;
  generated: string;
  availableThemes: {
    base: string[];
    color: string[];
    flair: string[];
  };
}
