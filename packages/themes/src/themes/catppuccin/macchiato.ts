import type { ThemeDefinition, ColorPalette } from '../../types.js';

// Catppuccin Macchiato (Dark) - Semantic mapping
const macchiatoColors: ColorPalette = {
  // Base colors
  background: '#24273a', // base
  foreground: '#cad3f5', // text
  
  // Surface colors (component backgrounds)
  surface: {
    base: '#24273a',      // base
    raised: '#1e2030',    // mantle  
    overlay: '#363a4f',   // surface0
    muted: '#494d64'      // surface1
  },
  
  // Text colors
  text: {
    primary: '#cad3f5',   // text
    secondary: '#b8c0e0', // subtext1
    tertiary: '#a5adcb',  // subtext0
    disabled: '#6e738d'   // overlay0
  },
  
  // Border colors
  border: {
    default: '#6e738d',   // overlay0
    muted: '#5b6078',     // surface2
    strong: '#8087a2'     // overlay1
  },
  
  // Accent colors (semantic)
  accent: {
    primary: '#8aadf4',   // blue
    secondary: '#c6a0f6', // mauve
    success: '#a6da95',   // green
    warning: '#eed49f',   // yellow
    danger: '#ed8796',    // red
    info: '#91d7e3'       // sky
  },
  
  // Interactive states
  interactive: {
    hover: '#181926',     // crust
    active: '#5b6078',    // surface2
    disabled: '#6e738d',  // overlay0
    focus: '#8aadf4'      // blue
  },
  
  // Extended Catppuccin-specific colors (optional)
  extended: {
    rosewater: '#f4dbd6',
    flamingo: '#f0c6c6',
    pink: '#f5bde6',
    mauve: '#c6a0f6',
    red: '#ed8796',
    maroon: '#ee99a0',
    peach: '#f5a97f',
    yellow: '#eed49f',
    green: '#a6da95',
    teal: '#8bd5ca',
    sky: '#91d7e3',
    sapphire: '#7dc4e4',
    blue: '#8aadf4',
    lavender: '#b7bdf8'
  }
};

export const catppuccinMacchiato: ThemeDefinition = {
  id: 'catppuccin-macchiato',
  name: 'Catppuccin Macchiato',
  variant: 'dark',
  family: 'catppuccin',
  description: 'Soothing pastel theme for the high-spirited!',
  colors: macchiatoColors
};
