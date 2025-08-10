/**
 * Theme Provider Utility
 * 
 * Provides composables and functions for consuming themes
 */

import { inject, computed, ComputedRef } from 'vue';
import type { ThemeProviderContext } from '../types/theme';
import { getTheme } from './theme-engine';

/**
 * Composable to use themes in components
 * @returns Theme utilities and state
 */
export function useThemeProvider() {
  // Get theme provider context
  const themeProvider = inject<ThemeProviderContext>('themeProvider');
  
  if (!themeProvider) {
    console.warn('No ThemeProvider found. Make sure your component is wrapped in a ThemeProvider.');
    
    // Return default implementation
    return {
      currentTheme: computed(() => 'default'),
      isDark: computed(() => false),
      changeTheme: () => {},
      toggleDarkMode: () => {},
      availableThemes: computed(() => [])
    };
  }
  
  // Get current theme
  const currentTheme: ComputedRef<string> = computed(() => themeProvider.current);
  
  // Check if current theme is dark
  const isDark: ComputedRef<boolean> = computed(() => themeProvider.isDark);
  
  // Change theme function
  const changeTheme = (themeId: string) => {
    themeProvider.changeTheme(themeId);
  };
  
  // Toggle between dark and light mode
  const toggleDarkMode = () => {
    themeProvider.toggleDarkMode();
  };
  
  // Get available themes
  const availableThemes = computed(() => themeProvider.getAvailableThemes());
  
  return {
    currentTheme,
    isDark,
    changeTheme,
    toggleDarkMode,
    availableThemes
  };
}

/**
 * Generate theme class name based on component and variant
 * @param component Component name (e.g. 'button', 'card')
 * @param variant Optional variant name (e.g. 'primary', 'outline')
 * @param theme Optional theme name (defaults to current theme)
 * @returns CSS class name for the component
 */
export function getThemeClass(
  component: string,
  variant: string = 'default',
  theme?: string
): string {
  // If no theme provided, use theme provider context
  if (!theme) {
    const themeProvider = inject<ThemeProviderContext>('themeProvider');
    if (themeProvider) {
      theme = themeProvider.current;
    } else {
      // Fallback to default
      theme = 'default';
    }
  }
  
  // Normalize theme name for CSS class
  const normalizedTheme = theme.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  
  // Create CSS class name
  if (variant === 'default') {
    return `${normalizedTheme}-${component}`;
  }
  
  return `${normalizedTheme}-${component}-${variant}`;
}
