/**
 * Obiente UI - Utilities
 * 
 * This file exports utility functions used throughout the UI library.
 */

export * from './theme-provider';
export * from './theme-cookie';
export * from './ssr-theme';

/**
 * Generate a unique ID
 * @param prefix An optional prefix for the ID
 * @returns A unique ID string
 */
export function generateId(prefix = 'oi-'): string {
  return `${prefix}${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Utility function to merge CSS classes
 * @param classes List of class names or class name objects
 * @returns Combined class string
 */
export function mergeClasses(...classes: (string | Record<string, boolean> | undefined)[]): string {
  return classes
    .map(cls => {
      if (!cls) return '';
      if (typeof cls === 'string') return cls;
      return Object.entries(cls)
        .filter(([, value]) => Boolean(value))
        .map(([key]) => key)
        .join(' ');
    })
    .filter(Boolean)
    .join(' ');
}

/**
 * Format a value as a CSS variable
 * @param name The variable name
 * @param value The variable value
 * @returns The CSS variable string
 */
export function cssVar(name: string, value?: string): string {
  if (!name.startsWith('--')) {
    name = `--${name}`;
  }
  
  return value !== undefined ? `${name}: ${value}` : `var(${name})`;
}

/**
 * Convert an object to CSS variable styles
 * @param obj The object to convert
 * @param prefix Optional prefix for variable names
 * @returns An object of CSS variable styles
 */
export function objectToCssVars(obj: Record<string, any>, prefix = ''): Record<string, string> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (typeof value === 'object' && value !== null) {
      const nestedVars = objectToCssVars(value, `${prefix}${key}-`);
      return { ...acc, ...nestedVars };
    }
    
    const varName = `--${prefix}${key}`;
    return { ...acc, [varName]: value };
  }, {});
}
