import type { ThemeDefinition, ColorPalette } from '../../types.js';

// Catppuccin Frappe (Dark) - Semantic mapping
const frappeColors: ColorPalette = {
  // Base colors
  background: '#303446', // base
  foreground: '#c6d0f5', // text
  
  // Surface colors (component backgrounds)
  surface: {
    base: '#303446',      // base
    raised: '#292c3c',    // mantle  
    overlay: '#414559',   // surface0
    muted: '#51576d'      // surface1
  },
  
  // Text colors
  text: {
    primary: '#c6d0f5',   // text
    secondary: '#b5bfe2', // subtext1
    tertiary: '#a5adce',  // subtext0
    disabled: '#737994'   // overlay0
  },
  
  // Border colors
  border: {
    default: '#737994',   // overlay0
    muted: '#626880',     // surface2
    strong: '#838ba7'     // overlay1
  },
  
  // Accent colors (semantic)
  accent: {
    primary: '#8caaee',   // blue
    secondary: '#ca9ee6', // mauve
    success: '#a6d189',   // green
    warning: '#e5c890',   // yellow
    danger: '#e78284',    // red
    info: '#99d1db'       // sky
  },
  
  // Interactive states
  interactive: {
    hover: '#232634',     // crust
    active: '#626880',    // surface2
    disabled: '#737994',  // overlay0
    focus: '#8caaee'      // blue
  },
  
  // Extended Catppuccin-specific colors (optional)
  extended: {
    rosewater: '#f2d5cf',
    flamingo: '#eebebe',
    pink: '#f4b8e4',
    mauve: '#ca9ee6',
    red: '#e78284',
    maroon: '#ea999c',
    peach: '#ef9f76',
    yellow: '#e5c890',
    green: '#a6d189',
    teal: '#81c8be',
    sky: '#99d1db',
    sapphire: '#85c1dc',
    blue: '#8caaee',
    lavender: '#babbf1'
  }
};

export const catppuccinFrappe: ThemeDefinition = {
  id: 'catppuccin-frappe',
  name: 'Catppuccin Frappe',
  variant: 'dark',
  family: 'catppuccin',
  description: 'Soothing pastel theme for the high-spirited!',
  colors: frappeColors
};
