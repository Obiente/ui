/**
 * Obiente Themes - Main Export
 * A maintainable theme system for Obiente UI
 */

// Theme builder and utilities
export { 
  ThemeBuilder, 
  buildTheme, 
  buildThemeCSS,
  createTheme,
  createThemeVariant 
} from './theme-builder';

// Generated themes
export { catppuccinMochaTheme } from './catppuccin-mocha';
export { catppuccinLatteTheme } from './catppuccin-latte';
export { catppuccinFrappeTheme } from './catppuccin-frappe';
export { catppuccinMacchiatoTheme } from './catppuccin-macchiato';

// Legacy exports for backward compatibility
export { default as catppuccinMocha } from './catppuccin-mocha';
export { default as catppuccinLatte } from './catppuccin-latte';
export { default as catppuccinFrappe } from './catppuccin-frappe';
export { default as catppuccinMacchiato } from './catppuccin-macchiato';

// Core types and utilities
export * from './types';
export * from './core/constants';
export * from './utils/theme-utils';

// Generators
export * from './generators/css-variables';
export * from './generators/component-css';
