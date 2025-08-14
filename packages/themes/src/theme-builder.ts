/**
 * Theme Builder - Main API
 * Orchestrates theme creation and CSS generation
 */

import type { ThemeBuilder as IThemeBuilder, ThemeDefinition } from './types';

// Import modular utilities
import { createTheme, createThemeVariant } from './builders/theme-factory';
import { generateCSSVariables, generateCSSString, generateThemeCSS } from './generators/css-variables';
import { generateComponentClasses, generateComponentCSS } from './generators/component-css';

/**
 * Complete theme bundle with CSS and classes
 */
export interface ThemeBundle {
  theme: ThemeDefinition;
  css: string;
  classes: Record<string, Record<string, string>>;
}

/**
 * Generate complete theme bundle
 */
export function buildTheme(theme: ThemeDefinition): ThemeBundle {
  const css = generateThemeCSS(theme) + '\n\n' + generateComponentCSS(theme);
  const classes = generateComponentClasses(theme);
  
  return {
    theme,
    css,
    classes,
  };
}

/**
 * Generate CSS for multiple themes
 */
export function buildThemeCSS(themes: ThemeDefinition[]): string {
  return themes
    .map(theme => generateThemeCSS(theme) + '\n\n' + generateComponentCSS(theme))
    .join('\n\n');
}

/**
 * Main Theme Builder API
 */
export const ThemeBuilder: IThemeBuilder = {
  createTheme,
  generateCSSVariables,
  generateComponentClasses,
};

// Re-export everything for convenience
export {
  createTheme,
  createThemeVariant,
  generateCSSVariables,
  generateCSSString,
  generateThemeCSS,
  generateComponentClasses,
  generateComponentCSS,
};

// Export utilities
export * from './utils/theme-utils';
export * from './core/constants';
