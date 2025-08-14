/**
 * Theme Utility Functions
 * Helper functions for theme manipulation and merging
 */

import type { SemanticTokens, ComponentThemeClasses } from '../types';

/**
 * Deep merge semantic tokens with base configuration
 */
export function mergeSemanticTokens(
  base: SemanticTokens,
  override?: Partial<SemanticTokens>
): SemanticTokens {
  if (!override) return base;
  
  return {
    surface: { ...base.surface, ...override.surface },
    text: { ...base.text, ...override.text },
    border: { ...base.border, ...override.border },
    accent: { ...base.accent, ...override.accent },
  };
}

/**
 * Deep merge component theme classes with base configuration
 */
export function mergeComponentClasses(
  base: ComponentThemeClasses,
  override?: Partial<ComponentThemeClasses>
): ComponentThemeClasses {
  if (!override) return base;
  
  const result: ComponentThemeClasses = { ...base };
  
  Object.entries(override).forEach(([component, variants]) => {
    if (result[component]) {
      result[component] = { ...result[component], ...variants };
    } else {
      result[component] = variants;
    }
  });
  
  return result;
}

/**
 * Validate theme configuration
 */
export function validateTheme(theme: any): boolean {
  if (!theme.id || typeof theme.id !== 'string') return false;
  if (!theme.name || typeof theme.name !== 'string') return false;
  if (!theme.colors || typeof theme.colors !== 'object') return false;
  
  return true;
}

/**
 * Generate prefixed class name
 */
export function prefixClassName(prefix: string, className: string): string {
  return `${prefix}-${className}`;
}

/**
 * Generate CSS variable name
 */
export function cssVariableName(prefix: string, name: string): string {
  return `--${prefix}-${name}`;
}
