import { ref, computed } from 'vue'
import { getAllThemes, getAllThemeNames } from '@obiente/themes'

/**
 * Modern theme system using pure CSS switching
 * This replaces the old composable that set CSS custom properties via JavaScript
 */

// Current theme state
const currentThemeId = ref<string>('catppuccin-latte')

// Available themes
const themes = getAllThemes()
const themeNames = getAllThemeNames()

/**
 * Get the current theme object
 */
export const currentTheme = computed(() => 
  themes.find(theme => theme.id === currentThemeId.value) || themes[0]
)

/**
 * Switch to a new theme (pure CSS approach)
 * Just changes the data-theme attribute, CSS handles the rest
 */
export function setTheme(themeId: string) {
  if (themeNames.includes(themeId as any)) {
    currentThemeId.value = themeId
    
    // Set data-theme attribute on document root for CSS switching
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', themeId)
    }
    
    // Optional: Save to localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('obiente-theme', themeId)
    }
  }
}

/**
 * Initialize theme system
 * Loads saved theme or uses default
 */
export function initializeTheme() {
  if (typeof window === 'undefined') return
  
  // Load from localStorage or use default
  const savedTheme = localStorage.getItem('obiente-theme') || 'catppuccin-latte'
  setTheme(savedTheme)
}

/**
 * Toggle between light and dark themes
 */
export function toggleDarkMode() {
  const current = currentTheme.value
  
  if (current.variant === 'light') {
    // Switch to corresponding dark theme
    const darkTheme = themes.find(t => 
      t.family === current.family && t.variant === 'dark'
    )
    if (darkTheme) {
      setTheme(darkTheme.id)
    }
  } else {
    // Switch to corresponding light theme  
    const lightTheme = themes.find(t => 
      t.family === current.family && t.variant === 'light'
    )
    if (lightTheme) {
      setTheme(lightTheme.id)
    }
  }
}

/**
 * Get themes by family (e.g., all Catppuccin variants)
 */
export function getThemesByFamily(family: string) {
  return themes.filter(theme => theme.family === family)
}

/**
 * Composable for Vue components
 */
export function useTheme() {
  return {
    currentTheme: currentTheme.value,
    currentThemeId: currentThemeId.value,
    availableThemes: themes,
    setTheme,
    toggleDarkMode,
    getThemesByFamily,
    initializeTheme
  }
}
