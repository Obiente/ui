import type { ThemeDefinition, ColorPalette } from '../../types.js';

// Catppuccin Mocha (Dark) - Semantic mapping
const mochaColors: ColorPalette = {
  // Base colors
  background: '#1e1e2e', // base
  foreground: '#cdd6f4', // text
  
  // Surface colors (component backgrounds)
  surface: {
    base: '#1e1e2e',      // base
    raised: '#181825',    // mantle  
    overlay: '#313244',   // surface0
    muted: '#45475a'      // surface1
  },
  
  // Text colors
  text: {
    primary: '#cdd6f4',   // text
    secondary: '#bac2de', // subtext1
    tertiary: '#a6adc8',  // subtext0
    disabled: '#6c7086'   // overlay0
  },
  
  // Border colors
  border: {
    default: '#6c7086',   // overlay0
    muted: '#585b70',     // surface2
    strong: '#7f849c'     // overlay1
  },
  
  // Accent colors (semantic)
  accent: {
    primary: '#89b4fa',   // blue
    secondary: '#cba6f7', // mauve
    success: '#a6e3a1',   // green
    warning: '#f9e2af',   // yellow
    danger: '#f38ba8',    // red
    info: '#89dceb'       // sky
  },
  
  // Interactive states
  interactive: {
    hover: '#11111b',     // crust
    active: '#585b70',    // surface2
    disabled: '#6c7086',  // overlay0
    focus: '#89b4fa'      // blue
  },
  
  // Extended Catppuccin-specific colors (optional)
  extended: {
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
    lavender: '#b4befe'
  }
};

export const catppuccinMocha: ThemeDefinition = {
  id: 'catppuccin-mocha',
  name: 'Catppuccin Mocha',
  variant: 'dark',
  family: 'catppuccin',
  description: 'Soothing pastel theme for the high-spirited!',
  colors: mochaColors
};
