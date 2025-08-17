import type { ThemeDefinition, ColorPalette } from '../../types.js';

// Catppuccin Latte (Light) - Semantic mapping
const latteColors: ColorPalette = {
  // Base colors
  background: '#eff1f5', // base
  foreground: '#4c4f69', // text
  
  // Surface colors (component backgrounds)
  surface: {
    base: '#eff1f5',      // base
    raised: '#e6e9ef',    // mantle  
    overlay: '#ccd0da',   // surface0
    muted: '#bcc0cc'      // surface1
  },
  
  // Text colors
  text: {
    primary: '#4c4f69',   // text
    secondary: '#5c5f77', // subtext1
    tertiary: '#6c6f85',  // subtext0
    disabled: '#9ca0b0'   // overlay0
  },
  
  // Border colors
  border: {
    default: '#9ca0b0',   // overlay0
    muted: '#acb0be',     // surface2
    strong: '#8c8fa1'     // overlay1
  },
  
  // Accent colors (semantic)
  accent: {
    primary: '#1e66f5',   // blue
    secondary: '#8839ef', // mauve
    success: '#40a02b',   // green
    warning: '#df8e1d',   // yellow
    danger: '#d20f39',    // red
    info: '#04a5e5'       // sky
  },
  
  // Interactive states
  interactive: {
    hover: '#dce0e8',     // crust
    active: '#acb0be',    // surface2
    disabled: '#9ca0b0',  // overlay0
    focus: '#1e66f5'      // blue
  },
  
  // Extended Catppuccin-specific colors (optional)
  extended: {
    rosewater: '#dc8a78',
    flamingo: '#dd7878',
    pink: '#ea76cb',
    mauve: '#8839ef',
    red: '#d20f39',
    maroon: '#e64553',
    peach: '#fe640b',
    yellow: '#df8e1d',
    green: '#40a02b',
    teal: '#179299',
    sky: '#04a5e5',
    sapphire: '#209fb5',
    blue: '#1e66f5',
    lavender: '#7287fd'
  }
};

export const catppuccinLatte: ThemeDefinition = {
  id: 'catppuccin-latte',
  name: 'Catppuccin Latte',
  variant: 'light',
  family: 'catppuccin',
  description: 'Soothing pastel theme for the high-spirited!',
  colors: latteColors
};
