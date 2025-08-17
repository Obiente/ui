// Type exports
export type { ThemeDefinition, ColorPalette } from './types';

// Theme imports
import { catppuccinLatte } from './themes/catppuccin/latte';
import { catppuccinMocha } from './themes/catppuccin/mocha';
import { catppuccinFrappe } from './themes/catppuccin/frappe';
import { catppuccinMacchiato } from './themes/catppuccin/macchiato';

// Individual theme exports
export { catppuccinLatte, catppuccinMocha, catppuccinFrappe, catppuccinMacchiato };

// Theme registry - add new themes here
const themes = {
  'catppuccin-latte': catppuccinLatte,
  'catppuccin-mocha': catppuccinMocha,
  'catppuccin-frappe': catppuccinFrappe,
  'catppuccin-macchiato': catppuccinMacchiato,
} as const;

export const getTheme = (name: keyof typeof themes) => themes[name];
export const getAllThemes = () => Object.values(themes);
export const getAllThemeNames = () => Object.keys(themes) as (keyof typeof themes)[];
export const getThemesByFamily = (family: string) => 
  Object.entries(themes)
    .filter(([name]) => name.startsWith(`${family}-`))
    .map(([, theme]) => theme);
