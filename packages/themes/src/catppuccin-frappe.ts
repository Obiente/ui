/**
 * Catppuccin Frappé Theme
 * The signature medium dark theme
 * Official palette: https://catppuccin.com/palette
 */

import { createTheme } from './theme-builder';

export const catppuccinFrappeTheme = createTheme({
  id: 'catppuccin-frappe',
  name: 'Catppuccin Frappé',
  variant: 'dark',
  colors: {
    // Base colors
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
    lavender: '#babbf1',
    
    // Text colors
    text: '#c6d0f5',
    subtext1: '#b5bfe2',
    subtext0: '#a5adce',
    
    // Surface colors
    overlay2: '#949cbb',
    overlay1: '#838ba7',
    overlay0: '#737994',
    surface2: '#626880',
    surface1: '#51576d',
    surface0: '#414559',
    base: '#303446',
    mantle: '#292c3c',
    crust: '#232634',
  },
});

export default catppuccinFrappeTheme;
