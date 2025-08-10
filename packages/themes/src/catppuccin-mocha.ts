import { Theme } from './types';

// Import the CSS file that contains actual styles
import './catppuccin-mocha.css';

/**
 * Catppuccin Mocha Theme
 * A dark theme with cozy, warm and low-contrast palette
 * https://catppuccin.com
 */
export const catppuccinMochaTheme: Theme = {
  config: {
    id: 'catppuccin-mocha',
    name: 'Catppuccin Mocha',
    flavor: 'dark',
    colors: {
      // Base colors
      rosewater: '#f5e0dc',
      flamingo: '#f2cdcd',
      pink: '#f5c2e7',
      mauve: '#cba6f7',
      red: '#f38ba8',
      maroon: '#eba0ac',
      peach: '#fab387',
      yellow: '#f9e2af',
      green: '#a6e3a1',
      teal: '#94e2d5',
      sky: '#89dceb',
      sapphire: '#74c7ec',
      blue: '#89b4fa',
      lavender: '#b4befe',
      
      // Text colors
      text: '#cdd6f4',
      subtext1: '#bac2de',
      subtext0: '#a6adc8',
      
      // Overlay colors
      overlay2: '#9399b2',
      overlay1: '#7f849c',
      overlay0: '#6c7086',
      
      // Surface colors
      surface2: '#585b70',
      surface1: '#45475a',
      surface0: '#313244',
      
      // Base surface colors
      base: '#1e1e2e',
      mantle: '#181825',
      crust: '#11111b'
    }
  },
  components: {
    button: {
      primary: 'ctp-mocha-btn-primary',
      secondary: 'ctp-mocha-btn-secondary',
      outline: 'ctp-mocha-btn-outline',
      ghost: 'ctp-mocha-btn-ghost',
      destructive: 'ctp-mocha-btn-destructive'
    },
    input: {
      default: 'ctp-mocha-input-default',
      error: 'ctp-mocha-input-error'
    },
    card: {
      default: 'ctp-mocha-card-default',
      elevated: 'ctp-mocha-card-elevated',
      interactive: 'ctp-mocha-card-interactive'
    },
    badge: {
      primary: 'ctp-mocha-badge-primary',
      secondary: 'ctp-mocha-badge-secondary',
      success: 'ctp-mocha-badge-success',
      warning: 'ctp-mocha-badge-warning',
      error: 'ctp-mocha-badge-error',
      outline: 'ctp-mocha-badge-outline'
    },
    alert: {
      info: 'ctp-mocha-alert-info',
      success: 'ctp-mocha-alert-success',
      warning: 'ctp-mocha-alert-warning',
      error: 'ctp-mocha-alert-error'
    }
  }
};

export default catppuccinMochaTheme;
