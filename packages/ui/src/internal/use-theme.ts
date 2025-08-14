/**
 * Internal Theme Hook
 * This file contains the useTheme hook for internal usage in the library
 */

import { inject, ref, readonly } from 'vue';
import type { BaseThemeProps, ThemeProviderContext } from '../types/theme';

/**
 * Apply CSS variables from theme to :root
 */
const applyThemeToRoot = (variables: Record<string, string>) => {
  const root = document.documentElement;
  
  // Apply each CSS variable to the root element
  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};

/**
 * Internal hook for theme management
 */
export function useTheme() {
  // Reference to current theme
  const currentTheme = ref<BaseThemeProps | null>(null);
  
  // Try to get theme from provider
  const themeProvider = inject<ThemeProviderContext | null>('themeProvider', null);
  
  /**
   * Apply a theme
   */
  const applyTheme = (theme: BaseThemeProps) => {
    if (theme) {
      // Update current theme reference
      currentTheme.value = theme;
      
      // Apply CSS variables
      applyThemeToRoot(theme.variables);
      
      // Add data attributes to document
      document.documentElement.setAttribute('data-theme', theme.id);
      document.documentElement.setAttribute('data-theme-flavor', theme.flavor);
      
      // Add/remove dark class
      if (theme.flavor === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };
  
  /**
   * Get current theme
   */
  const getTheme = () => readonly(currentTheme);
  
  /**
   * Check if dark mode is active
   */
  const isDarkMode = () => {
    return currentTheme.value?.flavor === 'dark';
  };
  
  return {
    applyTheme,
    getTheme,
    isDarkMode,
    themeProvider
  };
}
