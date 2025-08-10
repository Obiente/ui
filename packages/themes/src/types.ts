/**
 * Types for Obiente UI Theme System
 */

/**
 * Theme colors interface - defines the color tokens for a theme
 */
export interface ThemeColors {
  // Base colors
  rosewater: string;
  flamingo: string;
  pink: string;
  mauve: string;
  red: string;
  maroon: string;
  peach: string;
  yellow: string;
  green: string;
  teal: string;
  sky: string;
  sapphire: string;
  blue: string;
  lavender: string;
  
  // Text colors
  text: string;
  subtext1: string;
  subtext0: string;
  
  // Overlay colors
  overlay2: string;
  overlay1: string;
  overlay0: string;
  
  // Surface colors
  surface2: string;
  surface1: string;
  surface0: string;
  
  // Base surface colors
  base: string;
  mantle: string;
  crust: string;
}

/**
 * Theme configuration interface
 */
export interface ThemeConfig {
  // Unique theme name identifier
  id: string;
  
  // Display name
  name: string;
  
  // Theme flavor - light or dark
  flavor: 'light' | 'dark';
  
  // Color tokens
  colors: ThemeColors;
}

/**
 * Component theme classes interface
 * Used for applying theme to components via theme-classes prop
 */
export interface ComponentThemeClasses {
  // Button variants
  button: {
    primary: string;
    secondary: string;
    outline: string;
    ghost: string;
    destructive: string;
  };
  
  // Input variants
  input: {
    default: string;
    error: string;
  };
  
  // Card variants
  card: {
    default: string;
    elevated: string;
    interactive: string;
  };
  
  // Badge variants
  badge?: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    outline: string;
  };
  
  // Alert variants
  alert?: {
    info: string;
    success: string;
    warning: string;
    error: string;
  };
  
  // And other components as needed...
}

/**
 * Complete theme interface that combines config and component classes
 */
export interface Theme {
  // Theme configuration (colors, name, etc)
  config: ThemeConfig;
  
  // Component theme classes (used in component props)
  components: ComponentThemeClasses;
}
