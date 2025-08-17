import { computed } from 'vue';
import { useTheme } from './theme-context';
import { useThemeManager } from './theme-manager';
import type { ThemeDefinition } from '@obiente/themes';

export function useThemeSwitch() {
  const themeContext = useTheme();
  const { listAvailableThemes } = useThemeManager();
  
  const availableThemes = computed(() => listAvailableThemes());
  
  const currentTheme = computed(() => themeContext.currentTheme);
  
  const setTheme = (theme: ThemeDefinition) => {
    themeContext.setTheme(theme);
  };
  
  const isDark = computed(() => currentTheme.value?.variant === 'dark');
  
  const toggleDarkMode = () => {
    if (!currentTheme.value) return;
    
    const currentVariant = currentTheme.value.variant;
    const targetVariant = currentVariant === 'dark' ? 'light' : 'dark';
    
    const targetTheme = availableThemes.value.find(
      theme => theme.variant === targetVariant
    );
    
    if (targetTheme) {
      setTheme(targetTheme);
    }
  };
  
  return {
    currentTheme,
    availableThemes,
    setTheme,
    isDark,
    toggleDarkMode
  };
}
