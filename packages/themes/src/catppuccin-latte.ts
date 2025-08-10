import { BaseThemeProps } from '../types/theme';

/**
 * GitHub Light Theme for Obiente UI
 * A light theme inspired by GitHub's light mode
 */
const catppuccinLatte: BaseThemeProps = {
  id: 'catppuccin-latte',
  name: 'Catppuccin Latte',
  flavor: 'light',
  variables: {
    // Base colors from Catppuccin Latte palette
    '--color-rosewater': '#dc8a78',
    '--color-flamingo': '#dd7878',
    '--color-pink': '#ea76cb',
    '--color-mauve': '#8839ef',
    '--color-red': '#d20f39',
    '--color-maroon': '#e64553',
    '--color-peach': '#fe640b',
    '--color-yellow': '#df8e1d',
    '--color-green': '#40a02b',
    '--color-teal': '#179299',
    '--color-sky': '#04a5e5',
    '--color-sapphire': '#209fb5',
    '--color-blue': '#1e66f5',
    '--color-lavender': '#7287fd',
    
    // Text colors
    '--color-text': '#4c4f69',
    '--color-subtext1': '#5c5f77',
    '--color-subtext0': '#6c6f85',
    
    // Overlay colors
    '--color-overlay2': '#7c7f93',
    '--color-overlay1': '#8c8fa1',
    '--color-overlay0': '#9ca0b0',
    
    // Surface colors
    '--color-surface2': '#acb0be',
    '--color-surface1': '#bcc0cc',
    '--color-surface0': '#ccd0da',
    
    // Base surface colors
    '--color-base': '#eff1f5',
    '--color-mantle': '#e6e9ef',
    '--color-crust': '#dce0e8',
    
    // Semantic color mapping
    '--color-background': '#eff1f5',
    '--color-background-muted': '#e6e9ef',
    '--color-background-subtle': '#dce0e8',
    '--color-foreground': '#4c4f69',
    '--color-foreground-muted': '#5c5f77',
    '--color-foreground-subtle': '#6c6f85',
    '--color-border': '#9ca0b0',
    '--color-border-muted': '#acb0be',
    '--color-border-subtle': '#bcc0cc',
    
    // Primary colors (blue-based)
    '--color-primary': '#1e66f5',
    '--color-primary-light': '#7287fd',
    '--color-primary-dark': '#1a4dd1',
    
    // Secondary colors (mauve-based)
    '--color-secondary': '#8839ef',
    '--color-secondary-light': '#ea76cb',
    '--color-secondary-dark': '#7122d5',
    
    // Semantic colors
    '--color-success': '#40a02b',
    '--color-error': '#d20f39',
    '--color-warning': '#df8e1d',
    '--color-info': '#1e66f5',

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

export default catppuccinLatte;
