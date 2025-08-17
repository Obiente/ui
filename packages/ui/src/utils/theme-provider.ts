/**
 * Theme Provider Utility
 * 
 * Provides composables and functions for consuming themes
 */

import { inject, computed, ComputedRef } from 'vue';
import { THEME_CONTEXT_KEY } from '../constants/theme';

/**
 * Composable to use themes in components
 * @returns Theme utilities and state
 */
export function useThemeProvider() {
  // Theme context interface that matches ThemeProvider.vue
  interface ThemeContext {
    currentTheme: any;
    availableThemes: any;
    setTheme: (theme: any) => void;
    isDark: any;
  }

  // Get theme provider context
  const themeProvider = inject<ThemeContext>(THEME_CONTEXT_KEY);
  
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
  const currentTheme: ComputedRef<string> = computed(() => themeProvider.currentTheme?.value?.id || 'default');
  
  // Check if current theme is dark
  const isDark: ComputedRef<boolean> = computed(() => themeProvider.isDark?.value || false);
  
  // Change theme function
  const changeTheme = (themeId: string) => {
    const theme = themeProvider.availableThemes?.value?.find((t: any) => t.id === themeId);
    if (theme && themeProvider.setTheme) {
      themeProvider.setTheme(theme);
    }
  };
  
  // Toggle between dark and light mode
  const toggleDarkMode = () => {
    const themes = themeProvider.availableThemes?.value || [];
    const targetVariant = themeProvider.isDark?.value ? 'light' : 'dark';
    const targetTheme = themes.find((theme: any) => theme.variant === targetVariant);
    
    if (targetTheme && themeProvider.setTheme) {
      themeProvider.setTheme(targetTheme);
    }
  };
  
  // Get available themes
  const availableThemes = computed(() => themeProvider.availableThemes?.value || []);
  
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
    interface ThemeContext {
      currentTheme: any;
      availableThemes: any;
      setTheme: (theme: any) => void;
      isDark: any;
    }
    
    const themeProvider = inject<ThemeContext>(THEME_CONTEXT_KEY);
    if (themeProvider) {
      theme = themeProvider.currentTheme?.value?.id || 'default';
    } else {
      // Fallback to default
      theme = 'default';
    }
  }
  
  // Normalize theme name for CSS class
  const normalizedTheme = (theme || 'default').toLowerCase().replace(/[^a-z0-9-]/g, '-');
  
  // Create CSS class name
  if (variant === 'default') {
    return `${normalizedTheme}-${component}`;
  }
  
  return `${normalizedTheme}-${component}-${variant}`;
}
