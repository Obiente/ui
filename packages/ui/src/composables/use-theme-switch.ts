import { computed } from 'vue';
import { useThemeManager } from './theme-manager';

export function useThemeSwitch() {
  const themeManager = useThemeManager();
  
  const currentPreferences = computed(() => themeManager.getPreferences());
  const resolvedThemes = computed(() => themeManager.getResolvedThemes());
  
  const currentBaseTheme = computed(() => resolvedThemes.value.resolved.base);
  const currentColorTheme = computed(() => resolvedThemes.value.resolved.color);
  const currentFlairThemes = computed(() => resolvedThemes.value.resolved.flair);
  
  const availableBaseThemes = computed(() => themeManager.listAvailableBaseThemes());
  const availableColorThemes = computed(() => themeManager.listAvailableColorThemes());
  const availableFlairThemes = computed(() => themeManager.listAvailableFlairThemes());
  
  const isDark = computed(() => currentColorTheme.value?.variant === 'dark');
  
  const setBaseTheme = (baseThemeId: string) => {
    themeManager.setBaseTheme(baseThemeId);
  };
  
  const setColorTheme = (colorThemeId: string) => {
    themeManager.setColorTheme(colorThemeId);
  };
  
  const addFlairTheme = (flairThemeId: string) => {
    themeManager.addFlairTheme(flairThemeId);
  };
  
  const removeFlairTheme = (flairThemeId: string) => {
    themeManager.removeFlairTheme(flairThemeId);
  };
  
  const toggleFlairTheme = (flairThemeId: string) => {
    themeManager.toggleFlairTheme(flairThemeId);
  };
  
  const toggleDarkMode = () => {
    if (!currentColorTheme.value) return;
    
    const currentVariant = currentColorTheme.value.variant;
    const targetVariant = currentVariant === 'dark' ? 'light' : 'dark';
    
    // Try to find a theme in the same family with the target variant
    const targetTheme = availableColorThemes.value.find(
      theme => theme.family === currentColorTheme.value?.family && theme.variant === targetVariant
    ) || availableColorThemes.value.find(
      theme => theme.variant === targetVariant
    );
    
    if (targetTheme) {
      setColorTheme(targetTheme.id);
    }
  };
  
  const getColorThemesByFamily = (family: string) => {
    return availableColorThemes.value.filter(theme => theme.family === family);
  };
  
  const hasFlairTheme = (flairThemeId: string) => {
    return currentFlairThemes.value.some(theme => theme.id === flairThemeId);
  };
  
  return {
    // Current state
    currentPreferences,
    resolvedThemes,
    currentBaseTheme,
    currentColorTheme,
    currentFlairThemes,
    isDark,
    
    // Available themes
    availableBaseThemes,
    availableColorThemes,
    availableFlairThemes,
    
    // Actions
    setBaseTheme,
    setColorTheme,
    addFlairTheme,
    removeFlairTheme,
    toggleFlairTheme,
    toggleDarkMode,
    
    // Utilities
    getColorThemesByFamily,
    hasFlairTheme
  };
}
