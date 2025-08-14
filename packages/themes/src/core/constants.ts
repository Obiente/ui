/**
 * Theme System Constants
 * Default configurations and mappings for the theme system
 */

import type { SemanticTokens, ComponentThemeClasses } from '../types';

/**
 * Default semantic token mapping
 * Maps semantic concepts to CSS variable references
 */
export const DEFAULT_SEMANTIC_MAPPING: SemanticTokens = {
  surface: {
    base: 'var(--oi-color-base)',
    raised: 'var(--oi-color-surface0)',
    overlay: 'var(--oi-color-surface1)',
    subtle: 'var(--oi-color-mantle)',
    muted: 'var(--oi-color-crust)',
  },
  text: {
    primary: 'var(--oi-color-text)',
    secondary: 'var(--oi-color-subtext1)',
    muted: 'var(--oi-color-subtext0)',
    accent: 'var(--oi-color-blue)',
    inverse: 'var(--oi-color-base)',
  },
  border: {
    default: 'var(--oi-color-overlay0)',
    subtle: 'var(--oi-color-surface2)',
    accent: 'var(--oi-color-blue)',
    focus: 'var(--oi-color-lavender)',
  },
  accent: {
    primary: 'var(--oi-color-blue)',
    secondary: 'var(--oi-color-lavender)',
    success: 'var(--oi-color-green)',
    warning: 'var(--oi-color-yellow)',
    danger: 'var(--oi-color-red)',
    info: 'var(--oi-color-sapphire)',
  },
};

/**
 * Default component theme class names
 * Standard class naming convention for components
 */
export const DEFAULT_COMPONENT_CLASSES: ComponentThemeClasses = {
  button: {
    primary: 'oi-btn-primary',
    secondary: 'oi-btn-secondary',
    outline: 'oi-btn-outline',
    ghost: 'oi-btn-ghost',
    destructive: 'oi-btn-destructive',
  },
  input: {
    default: 'oi-input-default',
    error: 'oi-input-error',
  },
  card: {
    default: 'oi-card-default',
    elevated: 'oi-card-elevated',
    interactive: 'oi-card-interactive',
  },
  badge: {
    primary: 'oi-badge-primary',
    secondary: 'oi-badge-secondary',
    success: 'oi-badge-success',
    warning: 'oi-badge-warning',
    error: 'oi-badge-error',
    outline: 'oi-badge-outline',
  },
  alert: {
    info: 'oi-alert-info',
    success: 'oi-alert-success',
    warning: 'oi-alert-warning',
    error: 'oi-alert-error',
  },
};

/**
 * CSS Variable Prefix
 */
export const CSS_VAR_PREFIX = '--oi-';

/**
 * Theme Class Prefix
 */
export const THEME_CLASS_PREFIX = 'oi-';
