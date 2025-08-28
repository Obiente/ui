import { provide, inject, type InjectionKey } from 'vue';
import type { ThemePreferences } from '../utils/theme-preferences';
import { useThemeManager } from './theme-manager';

export interface ThemeContext {
  currentPreferences: ThemePreferences;
  setBaseTheme: (baseThemeId: string) => void;
  setColorTheme: (colorThemeId: string) => void;
  addFlairTheme: (flairThemeId: string) => void;
  removeFlairTheme: (flairThemeId: string) => void;
  toggleFlairTheme: (flairThemeId: string) => void;
  setPreferences: (preferences: ThemePreferences) => void;
  getPreferences: () => ThemePreferences;
  getResolvedThemes: () => any;
}

export const THEME_CONTEXT_KEY: InjectionKey<ThemeContext> = Symbol('obiente-theme');

export function useThemeContext() {
  const themeManager = useThemeManager();
  
  const provideTheme = (initialPreferences?: ThemePreferences) => {
    if (initialPreferences) {
      themeManager.setPreferences(initialPreferences);
    }
    
    const context: ThemeContext = {
      currentPreferences: themeManager.getPreferences(),
      setBaseTheme: themeManager.setBaseTheme,
      setColorTheme: themeManager.setColorTheme,
      addFlairTheme: themeManager.addFlairTheme,
      removeFlairTheme: themeManager.removeFlairTheme,
      toggleFlairTheme: themeManager.toggleFlairTheme,
      setPreferences: themeManager.setPreferences,
      getPreferences: themeManager.getPreferences,
      getResolvedThemes: themeManager.getResolvedThemes
    };
    
    provide(THEME_CONTEXT_KEY, context);
    return context;
  };

  const injectTheme = (): ThemeContext | null => {
    return inject(THEME_CONTEXT_KEY, null);
  };

  return { provideTheme, injectTheme };
}

export function useTheme(): ThemeContext {
  const context = inject<ThemeContext>(THEME_CONTEXT_KEY);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
