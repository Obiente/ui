/**
 * Theme System Types for Obiente UI
 * This file includes types used across the entire UI library
 */

/**
 * Base theme properties interface that all themes should implement
 */
export interface BaseThemeProps {
  // Theme identifier
  id: string;
  
  // Display name
  name: string;
  
  // Theme flavor - light or dark
  flavor: 'light' | 'dark';
  
  // CSS variables map for the theme
  variables: Record<string, string>;
}

/**
 * Theme color tokens available in all themes
 */
export interface ThemeColorTokens {
  // Primary colors
  primary: string;
  primaryLight: string;
  primaryDark: string;
  
  // Secondary colors
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  
  // State/Semantic colors
  success: string;
  error: string;
  warning: string;
  info: string;
  
  // Background colors
  background: string;
  backgroundMuted: string;
  backgroundSubtle: string;
  
  // Foreground colors
  foreground: string;
  foregroundMuted: string;
  foregroundSubtle: string;
  
  // Border colors
  border: string;
  borderMuted: string;
  borderSubtle: string;
}

/**
 * Theme registration options
 */
export interface ThemeRegistrationOptions {
  // Whether this theme should be the default theme
  isDefault?: boolean;
  
  // Whether this theme should persist in localStorage
  persistent?: boolean;
}

/**
 * Theme provider context interface
 */
export interface ThemeProviderContext {
  // Current active theme
  current: string;
  
  // Whether current theme is dark mode
  isDark: boolean;
  
  // Change theme function
  changeTheme: (themeId: string) => void;
  
  // Toggle between light/dark modes
  toggleDarkMode: () => void;
  
  // Get list of available themes
  getAvailableThemes: () => string[];
}

/**
 * Theme provider props
 */
export interface ThemeProviderProps {
  // Initial theme id to use
  initialTheme?: string;
  
  // Whether to use system preference for dark mode
  useSystemPreference?: boolean;
  
  // Whether to persist theme choice
  persistent?: boolean;
  
  // Default theme to use if no theme is set
  defaultTheme?: string;
  
  // Available themes
  availableThemes?: string[];
  
  // Children
  children?: any;
}
