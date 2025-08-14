/**
 * Theme Integration Hook
 * Connects the new theme system with Vue components
 */

import { ref, inject, readonly, computed, type Ref } from 'vue';
import type { ThemeDefinition } from '@obiente/themes';

interface CSSVariables {
  [key: string]: string;
}

export interface ThemeContext {
  currentTheme: Readonly<Ref<ThemeDefinition | null>>;
  availableThemes: Readonly<Ref<ThemeDefinition[]>>;
  setTheme: (theme: ThemeDefinition) => void;
  setThemeById: (themeId: string) => void;
  isDark: Readonly<Ref<boolean>>;
  toggleDarkMode: () => void;
}

const THEME_CONTEXT_KEY = Symbol('obiente-theme');

/**
 * Generate CSS variables from theme (comprehensive version)
 * Maps raw theme colors to semantic UI variables used in base CSS
 */
function generateCSSVariables(theme: ThemeDefinition): CSSVariables {
  const variables: CSSVariables = {};
  
  // Generate raw color variables
  Object.entries(theme.colors).forEach(([name, value]) => {
    variables[`--oi-color-${name}`] = value;
  });

  // Generate semantic UI variables that match our base CSS
  // These map the raw theme colors to semantic UI concepts
  
  // Primary colors (used for buttons, links, etc.)
  variables['--oi-color-primary'] = theme.colors.blue || theme.colors.sapphire || '#3b82f6';
  variables['--oi-color-secondary'] = theme.colors.overlay1 || theme.colors.surface2 || '#6b7280';
  variables['--oi-color-success'] = theme.colors.green || '#10b981';
  variables['--oi-color-warning'] = theme.colors.yellow || theme.colors.peach || '#f59e0b';
  variables['--oi-color-error'] = theme.colors.red || theme.colors.maroon || '#ef4444';
  
  // Surface colors
  variables['--oi-color-surface'] = theme.colors.surface0 || theme.colors.base || '#ffffff';
  variables['--oi-color-background'] = theme.colors.base || theme.colors.mantle || '#ffffff';
  
  // Text colors
  variables['--oi-color-text'] = theme.colors.text || '#111827';
  variables['--oi-color-text-muted'] = theme.colors.subtext1 || theme.colors.subtext0 || '#6b7280';
  
  // Border colors
  variables['--oi-color-border'] = theme.colors.overlay0 || theme.colors.surface2 || '#e5e7eb';
  
  // Interactive states (hover, focus, etc.)
  variables['--oi-color-primary-hover'] = theme.colors.lavender || theme.colors.blue || '#2563eb';
  variables['--oi-color-secondary-hover'] = theme.colors.overlay2 || theme.colors.surface1 || '#4b5563';
  variables['--oi-color-error-hover'] = theme.colors.maroon || theme.colors.red || '#dc2626';
  
  // Surface variations for cards, etc.
  variables['--oi-surface-foreground'] = theme.variant === 'dark' ? '#ffffff' : '#000000';
  
  // Alert background colors (subtle variants)
  const surface = variables['--oi-color-surface'];
  variables['--oi-color-info-background'] = theme.variant === 'dark' 
    ? `color-mix(in srgb, ${theme.colors.blue || theme.colors.sapphire} 20%, ${surface})`
    : `color-mix(in srgb, ${theme.colors.blue || theme.colors.sapphire} 10%, ${surface})`;
  variables['--oi-color-success-background'] = theme.variant === 'dark'
    ? `color-mix(in srgb, ${theme.colors.green} 20%, ${surface})`
    : `color-mix(in srgb, ${theme.colors.green} 10%, ${surface})`;
  variables['--oi-color-warning-background'] = theme.variant === 'dark'
    ? `color-mix(in srgb, ${theme.colors.yellow || theme.colors.peach} 20%, ${surface})`
    : `color-mix(in srgb, ${theme.colors.yellow || theme.colors.peach} 10%, ${surface})`;
  variables['--oi-color-error-background'] = theme.variant === 'dark'
    ? `color-mix(in srgb, ${theme.colors.red} 20%, ${surface})`
    : `color-mix(in srgb, ${theme.colors.red} 10%, ${surface})`;
    
  // Info color (often same as primary)
  variables['--oi-color-info'] = theme.colors.sapphire || theme.colors.blue || variables['--oi-color-primary'];
  
  return variables;
}

/**
 * Generate theme CSS (simplified version)
 */
function generateThemeCSS(theme: ThemeDefinition): string {
  const variables = generateCSSVariables(theme);
  const selector = `[data-theme="${theme.id}"]`;
  
  const cssRules = Object.entries(variables)
    .map(([property, value]) => `  ${property}: ${value};`)
    .join('\n');
    
  return `${selector} {\n${cssRules}\n}`;
}

/**
 * Inject CSS styles into document head
 */
function injectThemeCSS(css: string, themeId: string) {
  if (typeof document === 'undefined') return;
  
  const styleId = `obiente-theme-${themeId}`;
  
  // Remove existing theme CSS
  const existing = document.getElementById(styleId);
  if (existing) {
    existing.remove();
  }
  
  // Create new style element
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = css;
  document.head.appendChild(style);
}

/**
 * Apply theme CSS variables to document root
 */
function applyThemeVariables(theme: ThemeDefinition) {
  if (typeof document === 'undefined') return;
  
  const variables = generateCSSVariables(theme);
  const root = document.documentElement;
  
  // Clear existing theme variables
  const existingVars = Array.from(root.style).filter(prop => prop.startsWith('--oi-'));
  existingVars.forEach(prop => root.style.removeProperty(prop));
  
  // Apply new variables
  Object.entries(variables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
  
  // Set theme data attributes
  root.setAttribute('data-theme', theme.id);
  root.setAttribute('data-theme-variant', theme.variant);
  
  // Add/remove dark class
  root.classList.toggle('dark', theme.variant === 'dark');
}

/**
 * Theme management composable
 */
export function useTheme(): ThemeContext {
  const context = inject<ThemeContext>(THEME_CONTEXT_KEY);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

/**
 * Optional theme hook that doesn't throw if no provider exists
 */
export function useThemeOptional(): ThemeContext | null {
  return inject<ThemeContext | null>(THEME_CONTEXT_KEY, null);
}

/**
 * Create theme context for provider
 */
export function createThemeContext(
  themes: ThemeDefinition[],
  initialTheme?: ThemeDefinition
): ThemeContext {
  const currentTheme = ref<ThemeDefinition | null>(initialTheme || themes[0] || null);
  const availableThemes = ref<ThemeDefinition[]>(themes);
  
  const isDark = computed(() => currentTheme.value?.variant === 'dark');
  
  const setTheme = (theme: ThemeDefinition) => {
    if (!theme) return;
    
    currentTheme.value = theme;
    
    // Apply CSS variables
    applyThemeVariables(theme);
    
    // Generate and inject component CSS
    const css = generateThemeCSS(theme);
    injectThemeCSS(css, theme.id);
    
    // Store in localStorage for persistence (only on client)
    if (typeof window !== 'undefined') {
      localStorage.setItem('obiente-theme', theme.id);
    }
  };
  
  const setThemeById = (themeId: string) => {
    const theme = availableThemes.value.find((t: ThemeDefinition) => t.id === themeId);
    if (theme) {
      setTheme(theme);
    } else {
      console.warn(`Theme with id "${themeId}" not found`);
    }
  };
  
  const toggleDarkMode = () => {
    if (!currentTheme.value) return;
    
    const currentVariant = currentTheme.value.variant;
    const targetVariant = currentVariant === 'dark' ? 'light' : 'dark';
    
    // Find a theme with the target variant
    const targetTheme = availableThemes.value.find(
      (theme: ThemeDefinition) => theme.variant === targetVariant
    );
    
    if (targetTheme) {
      setTheme(targetTheme);
    }
  };
  
  return {
    currentTheme: readonly(currentTheme),
    availableThemes: readonly(availableThemes) as Readonly<Ref<ThemeDefinition[]>>,
    setTheme,
    setThemeById,
    isDark: readonly(isDark),
    toggleDarkMode,
  };
}

export { THEME_CONTEXT_KEY };
export type { ThemeDefinition };
