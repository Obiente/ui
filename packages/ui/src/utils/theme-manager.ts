/**
 * Client-side theme management utilities
 */

import type { 
  ThemePreferences, 
  ThemePreferencesWithThemes
} from "./theme-preferences";
import { 
  createThemePreferencesWithThemes,
  parseThemePreferences,
  serializeThemePreferences,
  DEFAULT_THEME_PREFERENCES,
  THEME_PREFERENCES_COOKIE_NAME,
  addFlairTheme,
  removeFlairTheme,
  toggleFlairTheme
} from "./theme-preferences";

/**
 * Theme manager for client-side theme operations
 */
export class ThemeManager {
  private preferences: ThemePreferences;
  private listeners: Set<(preferences: ThemePreferencesWithThemes) => void> = new Set();

  constructor(initialPreferences?: ThemePreferences) {
    this.preferences = initialPreferences || this.loadFromStorage() || DEFAULT_THEME_PREFERENCES;
  }

  /**
   * Get current theme preferences with resolved themes
   */
  getCurrentThemes(): ThemePreferencesWithThemes {
    return createThemePreferencesWithThemes(this.preferences);
  }

  /**
   * Set base theme
   */
  setBaseTheme(baseThemeId: string): void {
    this.updatePreferences({ ...this.preferences, base: baseThemeId });
  }

  /**
   * Set color theme
   */
  setColorTheme(colorThemeId: string): void {
    this.updatePreferences({ ...this.preferences, color: colorThemeId });
  }

  /**
   * Add flair theme
   */
  addFlairTheme(flairThemeId: string): void {
    this.updatePreferences(addFlairTheme(this.preferences, flairThemeId));
  }

  /**
   * Remove flair theme
   */
  removeFlairTheme(flairThemeId: string): void {
    this.updatePreferences(removeFlairTheme(this.preferences, flairThemeId));
  }

  /**
   * Toggle flair theme
   */
  toggleFlairTheme(flairThemeId: string): void {
    this.updatePreferences(toggleFlairTheme(this.preferences, flairThemeId));
  }

  /**
   * Set complete theme preferences
   */
  setPreferences(preferences: ThemePreferences): void {
    this.updatePreferences(preferences);
  }

  /**
   * Apply themes to the document
   */
  applyToDocument(): void {
    const themes = this.getCurrentThemes();
    
    // Apply HTML attributes
    Object.entries(themes.htmlProps).forEach(([key, value]) => {
      if (key === "class") {
        // Handle class specially to not override existing classes
        document.documentElement.classList.add(...value.split(" "));
      } else {
        document.documentElement.setAttribute(key, value);
      }
    });

    // Apply CSS custom properties if available
    this.applyCSSCustomProperties(themes);
  }

  /**
   * Remove theme classes and attributes from document
   */
  clearFromDocument(): void {
    const attrs = [
      "data-base-theme",
      "data-color-theme", 
      "data-theme-variant",
      "data-flair-themes",
      "data-theme"
    ];
    
    attrs.forEach(attr => {
      document.documentElement.removeAttribute(attr);
    });
    
    document.documentElement.classList.remove("dark");
  }

  /**
   * Subscribe to theme changes
   */
  subscribe(listener: (preferences: ThemePreferencesWithThemes) => void): () => void {
    this.listeners.add(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Load preferences from localStorage/cookies
   */
  private loadFromStorage(): ThemePreferences | null {
    try {
      // Try localStorage first
      const stored = localStorage.getItem(THEME_PREFERENCES_COOKIE_NAME);
      if (stored) {
        return parseThemePreferences(stored);
      }

      // Fallback to cookies
      const cookies = document.cookie.split(";");
      const themeCookie = cookies.find(c => c.trim().startsWith(`${THEME_PREFERENCES_COOKIE_NAME}=`));
      if (themeCookie) {
        const value = themeCookie.split("=")[1];
        return parseThemePreferences(decodeURIComponent(value));
      }
    } catch (error) {
      console.warn("Failed to load theme preferences:", error);
    }
    
    return null;
  }

  /**
   * Save preferences to localStorage and cookies
   */
  private saveToStorage(preferences: ThemePreferences): void {
    const serialized = serializeThemePreferences(preferences);
    
    try {
      // Save to localStorage
      localStorage.setItem(THEME_PREFERENCES_COOKIE_NAME, serialized);
      
      // Save to cookies (for SSR)
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1); // 1 year
      document.cookie = `${THEME_PREFERENCES_COOKIE_NAME}=${encodeURIComponent(serialized)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    } catch (error) {
      console.warn("Failed to save theme preferences:", error);
    }
  }

  /**
   * Update preferences and notify listeners
   */
  private updatePreferences(newPreferences: ThemePreferences): void {
    this.preferences = newPreferences;
    this.saveToStorage(newPreferences);
    
    const themesWithResolved = this.getCurrentThemes();
    this.listeners.forEach(listener => listener(themesWithResolved));
  }

  /**
   * Apply CSS custom properties based on theme configuration
   */
  private applyCSSCustomProperties(themes: ThemePreferencesWithThemes): void {
    const { resolved } = themes;
    
    // Apply base theme multipliers
    if (resolved.base) {
      const root = document.documentElement.style;
      root.setProperty("--oi-spacing-multiplier", resolved.base.spacing.toString());
      root.setProperty("--oi-sizing-multiplier", resolved.base.sizing.toString());
      root.setProperty("--oi-radius-multiplier", resolved.base.radius.toString());
      root.setProperty("--oi-typography-multiplier", resolved.base.typography.toString());
      root.setProperty("--oi-elevation-multiplier", resolved.base.elevation.toString());
      
      // Apply custom multipliers if available
      if (resolved.base.custom) {
        Object.entries(resolved.base.custom).forEach(([key, value]) => {
          root.setProperty(`--oi-${key}-multiplier`, value.toString());
        });
      }
    }

    // Apply color theme
    if (resolved.color) {
      const root = document.documentElement.style;
      const colors = resolved.color.colors;
      
      // Background and foreground
      root.setProperty("--oi-color-background", colors.background);
      root.setProperty("--oi-color-foreground", colors.foreground);
      
      // Surface colors
      Object.entries(colors.surface).forEach(([key, value]) => {
        root.setProperty(`--oi-color-surface-${key}`, value);
      });
      
      // Text colors
      Object.entries(colors.text).forEach(([key, value]) => {
        root.setProperty(`--oi-color-text-${key}`, value);
      });
      
      // Border colors
      Object.entries(colors.border).forEach(([key, value]) => {
        root.setProperty(`--oi-color-border-${key}`, value);
      });
      
      // Accent colors
      Object.entries(colors.accent).forEach(([key, value]) => {
        root.setProperty(`--oi-color-accent-${key}`, value);
      });
      
      // Interactive colors
      Object.entries(colors.interactive).forEach(([key, value]) => {
        root.setProperty(`--oi-color-interactive-${key}`, value);
      });
      
      // Extended colors
      if (colors.extended) {
        Object.entries(colors.extended).forEach(([key, value]) => {
          root.setProperty(`--oi-color-extended-${key}`, value);
        });
      }
    }

    // Apply flair themes
    resolved.flair.forEach(flair => {
      const root = document.documentElement.style;
      Object.entries(flair.tokens).forEach(([key, value]) => {
        root.setProperty(`--${key}`, value);
      });
    });
  }
}

/**
 * Create a global theme manager instance
 */
export function createThemeManager(initialPreferences?: ThemePreferences): ThemeManager {
  return new ThemeManager(initialPreferences);
}

/**
 * Initialize themes from SSR data
 */
export function initializeThemesFromSSR(ssrThemes: ThemePreferencesWithThemes): ThemeManager {
  const manager = new ThemeManager({
    base: ssrThemes.base,
    color: ssrThemes.color,
    flair: ssrThemes.flair
  });
  
  manager.applyToDocument();
  return manager;
}
