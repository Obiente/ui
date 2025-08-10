/**
 * Themes Module for Obiente UI
 * This module provides themes and theme utilities for the UI components
 */

// Export theme types
export * from '../types/theme';

// Export built-in themes
export { default as catppuccinMocha } from './catppuccin-mocha';
export { default as githubLight } from './github-light';

// Theme utility functions
export * from '../utils/theme-provider';
export * from '../utils/theme-engine';
export * from '../utils/theme-cookie';

// Theme Provider component
export { default as ThemeProvider } from '../components/ThemeProvider.vue';
