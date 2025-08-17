import { ref } from 'vue';
import type { ThemeDefinition } from '@obiente/themes';
import { 
  catppuccinMocha, 
  catppuccinLatte, 
  catppuccinFrappe, 
  catppuccinMacchiato 
} from '@obiente/themes';

// Available themes registry
const themes = {
  mocha: catppuccinMocha,
  latte: catppuccinLatte,
  frappe: catppuccinFrappe,
  macchiato: catppuccinMacchiato,
} as const;

// Global theme state
const currentTheme = ref<ThemeDefinition>(themes.mocha);

function useThemeManager() {
  const setTheme = (theme: ThemeDefinition) => {
    currentTheme.value = theme;
    
    // Modern theme application using data-theme attribute
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme.id);
      document.documentElement.setAttribute('data-theme-variant', theme.variant);
      document.documentElement.classList.toggle('dark', theme.variant === 'dark');
    }
  };

  const getTheme = () => currentTheme.value;
  
  const listAvailableThemes = (): ThemeDefinition[] => Object.values(themes);

  const getThemeById = (id: string): ThemeDefinition | null => {
    return themes[id as keyof typeof themes] || null;
  };

  return {
    currentTheme,
    setTheme,
    getTheme,
    getThemeById,
    listAvailableThemes,
    themes
  };
}

export { useThemeManager, currentTheme, themes };
