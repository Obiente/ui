/**
 * CSS Variable Generation
 * Utilities for generating CSS variables from theme definitions
 */

import type { ThemeDefinition, CSSVariables } from '../types';
import { CSS_VAR_PREFIX } from '../core/constants';

/**
 * Generate CSS variables from theme colors and semantic tokens
 */
export function generateCSSVariables(theme: ThemeDefinition): CSSVariables {
  const variables: CSSVariables = {};
  
  // Generate color variables
  Object.entries(theme.colors).forEach(([name, value]) => {
    variables[`${CSS_VAR_PREFIX}color-${name}`] = value;
  });
  
  // Generate semantic variables
  Object.entries(theme.semantic).forEach(([category, tokens]) => {
    Object.entries(tokens).forEach(([token, value]) => {
      variables[`${CSS_VAR_PREFIX}${category}-${token}`] = String(value);
    });
  });
  
  return variables;
}

/**
 * Generate CSS string from theme variables
 */
export function generateCSSString(
  variables: CSSVariables, 
  selector: string = ':root'
): string {
  const cssRules = Object.entries(variables)
    .map(([property, value]) => `  ${property}: ${value};`)
    .join('\n');
    
  return `${selector} {\n${cssRules}\n}`;
}

/**
 * Generate CSS variables with theme-specific selector
 */
export function generateThemeCSS(theme: ThemeDefinition): string {
  const variables = generateCSSVariables(theme);
  const selector = `[data-theme="${theme.id}"], .theme-${theme.id}`;
  return generateCSSString(variables, selector);
}
