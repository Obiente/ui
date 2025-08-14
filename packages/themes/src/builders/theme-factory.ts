/**
 * Theme Creation Utilities
 * Functions to create complete themes from minimal configuration
 */

import type { ThemeDefinition, ColorPalette, SemanticTokens, ComponentThemeClasses } from '../types';
import { DEFAULT_SEMANTIC_MAPPING, DEFAULT_COMPONENT_CLASSES } from '../core/constants';
import { mergeSemanticTokens, mergeComponentClasses, validateTheme } from '../utils/theme-utils';

export interface CreateThemeConfig {
  id: string;
  name: string;
  variant?: 'light' | 'dark' | 'auto';
  colors: ColorPalette;
  semantic?: Partial<SemanticTokens>;
  components?: Partial<ComponentThemeClasses>;
  metadata?: Record<string, any>;
}

/**
 * Create a complete theme from minimal configuration
 */
export function createTheme(config: CreateThemeConfig): ThemeDefinition {
  const theme: ThemeDefinition = {
    id: config.id,
    name: config.name,
    variant: config.variant || 'dark',
    colors: config.colors,
    semantic: mergeSemanticTokens(DEFAULT_SEMANTIC_MAPPING, config.semantic),
    components: mergeComponentClasses(DEFAULT_COMPONENT_CLASSES, config.components),
    metadata: config.metadata,
  };
  
  if (!validateTheme(theme)) {
    throw new Error(`Invalid theme configuration for theme: ${config.id}`);
  }
  
  return theme;
}

/**
 * Create a theme variant (light/dark) from base theme
 */
export function createThemeVariant(
  baseTheme: ThemeDefinition,
  variant: 'light' | 'dark',
  overrides?: Partial<ColorPalette>
): ThemeDefinition {
  return createTheme({
    id: `${baseTheme.id}-${variant}`,
    name: `${baseTheme.name} (${variant})`,
    variant,
    colors: { ...baseTheme.colors, ...overrides },
    semantic: baseTheme.semantic,
    components: baseTheme.components,
    metadata: { ...baseTheme.metadata, variant },
  });
}
