import { ref, computed } from 'vue'
import { getBaseThemes, getColorThemes, getFlairThemes } from '@obiente/themes'
import type { ThemePreferences } from '../utils/theme-preferences'
import { 
  createThemePreferencesWithThemes,
  serializeThemePreferences,
  parseThemePreferences,
  DEFAULT_THEME_PREFERENCES,
  THEME_PREFERENCES_COOKIE_NAME,
  addFlairTheme,
  removeFlairTheme
} from '../utils/theme-preferences'

const preferences = ref<ThemePreferences>(DEFAULT_THEME_PREFERENCES)

export function useTheme() {
  // Cache previous attributes to avoid unnecessary DOM writes
  let cachedHtmlProps: Record<string, string> = {}
  let applyTimeout: number | undefined
  
  const resolved = computed(() => 
    createThemePreferencesWithThemes(preferences.value)
  )
  
  const isDark = computed(() => 
    resolved.value.resolved.color?.variant === 'dark'
  )

  function apply() {
    if (typeof document === 'undefined') return
    
    const root = document.documentElement
    const themes = resolved.value
    const newProps = themes.htmlProps
    
    // Only update attributes that have actually changed
    const propsToUpdate = Object.keys(newProps).filter(
      key => cachedHtmlProps[key] !== newProps[key]
    )
    
    const propsToRemove = Object.keys(cachedHtmlProps).filter(
      key => !(key in newProps)
    )
    
    // Batch DOM updates to minimize reflows
    if (propsToUpdate.length > 0 || propsToRemove.length > 0) {
      // Remove old attributes
      propsToRemove.forEach(key => {
        if (key === 'class') {
          // Remove specific theme classes only
          cachedHtmlProps[key]?.split(' ').forEach(cls => {
            if (cls.startsWith('theme-') || cls === 'dark' || cls === 'light') {
              root.classList.remove(cls)
            }
          })
        } else {
          root.removeAttribute(key)
        }
      })
      
      // Apply new attributes
      propsToUpdate.forEach(key => {
        const value = newProps[key]
        if (key === 'class') {
          root.classList.add(...value.split(' '))
        } else {
          root.setAttribute(key, value)
        }
      })
      
      // Update cache
      cachedHtmlProps = { ...newProps }
    }
  }

  function debouncedApply() {
    if (applyTimeout) clearTimeout(applyTimeout)
    applyTimeout = setTimeout(apply, 16) // ~60fps
  }

  function setBase(id: string) {
    preferences.value = { ...preferences.value, base: id }
    persist()
    debouncedApply()
  }

  function setColor(id: string) {
    preferences.value = { ...preferences.value, color: id }
    persist()
    debouncedApply()
  }

  function addFlair(id: string) {
    preferences.value = addFlairTheme(preferences.value, id)
    persist()
    debouncedApply()
  }

  function removeFlair(id: string) {
    preferences.value = removeFlairTheme(preferences.value, id)
    persist()
    debouncedApply()
  }

  function toggleDark() {
    const current = resolved.value.resolved.color
    if (!current) return
    
    const targetVariant = current.variant === 'dark' ? 'light' : 'dark'
    const colorThemes = getColorThemes()
    
    const target = colorThemes.find(theme => 
      theme.family === current.family && theme.variant === targetVariant
    ) || colorThemes.find(theme => theme.variant === targetVariant)
    
    if (target) setColor(target.id)
  }

  function setPreferences(newPreferences: ThemePreferences) {
    preferences.value = newPreferences
    persist()
    debouncedApply()
  }

  function initialize() {
    if (typeof window === 'undefined') return
    
    const stored = localStorage.getItem(THEME_PREFERENCES_COOKIE_NAME)
    if (stored) {
      try {
        preferences.value = parseThemePreferences(stored)
        apply()
      } catch (e) {
        console.warn('Failed to load theme preferences')
      }
    }
  }

  function persist() {
    if (typeof window === 'undefined') return
    
    const serialized = serializeThemePreferences(preferences.value)
    localStorage.setItem(THEME_PREFERENCES_COOKIE_NAME, serialized)
    
    const expires = new Date()
    expires.setFullYear(expires.getFullYear() + 1)
    document.cookie = `${THEME_PREFERENCES_COOKIE_NAME}=${encodeURIComponent(serialized)}; expires=${expires.toUTCString()}; path=/`
  }

  return {
    preferences: computed(() => preferences.value),
    resolved,
    isDark,
    
    setBase,
    setColor,
    addFlair,
    removeFlair,
    toggleDark,
    setPreferences,
    initialize,
    
    baseThemes: getBaseThemes(),
    colorThemes: getColorThemes(),
    flairThemes: getFlairThemes()
  }
}