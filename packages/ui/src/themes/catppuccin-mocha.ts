import { BaseThemeProps } from '../types/theme';

/**
 * Catppuccin Mocha Theme for Obiente UI
 * https://catppuccin.com
 */
const catppuccinMocha: BaseThemeProps = {
  id: 'catppuccin-mocha',
  name: 'Catppuccin Mocha',
  flavor: 'dark',
  variables: {
    // Base colors from Catppuccin Mocha palette
    '--color-rosewater': '#f5e0dc',
    '--color-flamingo': '#f2cdcd',
    '--color-pink': '#f5c2e7',
    '--color-mauve': '#cba6f7',
    '--color-red': '#f38ba8',
    '--color-maroon': '#eba0ac',
    '--color-peach': '#fab387',
    '--color-yellow': '#f9e2af',
    '--color-green': '#a6e3a1',
    '--color-teal': '#94e2d5',
    '--color-sky': '#89dceb',
    '--color-sapphire': '#74c7ec',
    '--color-blue': '#89b4fa',
    '--color-lavender': '#b4befe',
    
    // Text colors
    '--color-text': '#cdd6f4',
    '--color-subtext1': '#bac2de',
    '--color-subtext0': '#a6adc8',
    
    // Overlay colors
    '--color-overlay2': '#9399b2',
    '--color-overlay1': '#7f849c',
    '--color-overlay0': '#6c7086',
    
    // Surface colors
    '--color-surface2': '#585b70',
    '--color-surface1': '#45475a',
    '--color-surface0': '#313244',
    
    // Base surface colors
    '--color-base': '#1e1e2e',
    '--color-mantle': '#181825',
    '--color-crust': '#11111b',
    
    // Semantic color mapping
    '--color-background': '#1e1e2e',
    '--color-background-muted': '#181825',
    '--color-background-subtle': '#313244',
    '--color-foreground': '#cdd6f4',
    '--color-foreground-muted': '#bac2de',
    '--color-foreground-subtle': '#a6adc8',
    '--color-border': '#6c7086',
    '--color-border-muted': '#585b70',
    '--color-border-subtle': '#45475a',
    
    // Primary colors (blue-based)
    '--color-primary': '#89b4fa',
    '--color-primary-light': '#b4befe',
    '--color-primary-dark': '#74c7ec',
    
    // Secondary colors (mauve-based)
    '--color-secondary': '#cba6f7',
    '--color-secondary-light': '#f5c2e7',
    '--color-secondary-dark': '#c6a0f6',
    
    // Semantic colors
    '--color-success': '#a6e3a1',
    '--color-error': '#f38ba8',
    '--color-warning': '#f9e2af',
    '--color-info': '#89dceb',

    // Shadows
    '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '--shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '--shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    
    // Border radius
    '--radius-sm': '0.25rem',
    '--radius-md': '0.375rem',
    '--radius-lg': '0.5rem',
    '--radius-xl': '0.75rem',
    '--radius-2xl': '1rem'
  }
};

export default catppuccinMocha;
