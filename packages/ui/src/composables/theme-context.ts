import { provide, inject, type InjectionKey } from 'vue';
import type { ThemeDefinition } from '@obiente/themes';

export interface ThemeContext {
  currentTheme: ThemeDefinition | null;
  setTheme: (theme: ThemeDefinition) => void;
  getTheme: () => ThemeDefinition | null;
}

export const THEME_CONTEXT_KEY: InjectionKey<ThemeContext> = Symbol('obiente-theme');

export function useThemeContext() {
  const provideTheme = (theme: ThemeDefinition) => {
    const context: ThemeContext = {
      currentTheme: theme,
      setTheme: (newTheme: ThemeDefinition) => {
        context.currentTheme = newTheme;
      },
      getTheme: () => context.currentTheme
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
