import { ref, computed } from 'vue';
import { getBaseThemes, getColorThemes, getFlairThemes } from '@obiente/themes';
import type { ThemePreferences } from '../utils/theme-preferences';
import { 
  createThemePreferencesWithThemes,
  DEFAULT_THEME_PREFERENCES,
  addFlairTheme,
  removeFlairTheme,
  toggleFlairTheme
} from '../utils/theme-preferences';

// Available themes
const baseThemes = getBaseThemes();
const colorThemes = getColorThemes();
const flairThemes = getFlairThemes();

// Global theme state
const currentPreferences = ref<ThemePreferences>(DEFAULT_THEME_PREFERENCES);

// Computed resolved themes
const resolvedThemes = computed(() => 
  createThemePreferencesWithThemes(currentPreferences.value)
);

function useThemeManager() {
  const setBaseTheme = (baseThemeId: string) => {
    currentPreferences.value = {
      ...currentPreferences.value,
      base: baseThemeId
    };
    applyToDocument();
  };

  const setColorTheme = (colorThemeId: string) => {
    currentPreferences.value = {
      ...currentPreferences.value,
      color: colorThemeId
    };
    applyToDocument();
  };

  const addFlair = (flairThemeId: string) => {
    currentPreferences.value = addFlairTheme(currentPreferences.value, flairThemeId);
    applyToDocument();
  };

  const removeFlair = (flairThemeId: string) => {
    currentPreferences.value = removeFlairTheme(currentPreferences.value, flairThemeId);
    applyToDocument();
  };

  const toggleFlair = (flairThemeId: string) => {
    currentPreferences.value = toggleFlairTheme(currentPreferences.value, flairThemeId);
    applyToDocument();
  };

  const setPreferences = (preferences: ThemePreferences) => {
    currentPreferences.value = preferences;
    applyToDocument();
  };

  const applyToDocument = () => {
    if (typeof document === 'undefined') return;
    
    const themes = resolvedThemes.value;
    const root = document.documentElement;
    
    // Clear existing theme attributes
    const attrs = [
      'data-base-theme',
      'data-color-theme', 
      'data-theme-variant',
      'data-flair-themes',
      'data-theme'
    ];
    
    attrs.forEach(attr => root.removeAttribute(attr));
    root.classList.remove('dark', 'light');
    
    // Apply new HTML attributes
    Object.entries(themes.htmlProps).forEach(([key, value]) => {
      if (key === 'class') {
        root.classList.add(...value.split(' '));
      } else {
        root.setAttribute(key, value);
      }
    });
  };

  const getPreferences = () => currentPreferences.value;
  const getResolvedThemes = () => resolvedThemes.value;
  
  const listAvailableBaseThemes = () => baseThemes;
  const listAvailableColorThemes = () => colorThemes;
  const listAvailableFlairThemes = () => flairThemes;

  const getBaseThemeById = (id: string) => 
    baseThemes.find(theme => theme.id === id) || null;
  
  const getColorThemeById = (id: string) => 
    colorThemes.find(theme => theme.id === id) || null;
    
  const getFlairThemeById = (id: string) => 
    flairThemes.find(theme => theme.id === id) || null;

  return {
    // State
    currentPreferences,
    resolvedThemes,
    
    // Actions
    setBaseTheme,
    setColorTheme,
    addFlairTheme: addFlair,
    removeFlairTheme: removeFlair,
    toggleFlairTheme: toggleFlair,
    setPreferences,
    applyToDocument,
    
    // Getters
    getPreferences,
    getResolvedThemes,
    listAvailableBaseThemes,
    listAvailableColorThemes,
    listAvailableFlairThemes,
    getBaseThemeById,
    getColorThemeById,
    getFlairThemeById,
    
    // Available themes
    baseThemes,
    colorThemes,
    flairThemes
  };
}

export { useThemeManager, currentPreferences, resolvedThemes, baseThemes, colorThemes, flairThemes };
