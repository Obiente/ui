/**
 * SSR theme support for Astro
 */

import type { 
  ThemePreferences, 
  ThemePreferencesWithThemes
} from "./theme-preferences";
import { 
  createThemePreferencesWithThemes,
  parseThemePreferences,
  DEFAULT_THEME_PREFERENCES,
  THEME_PREFERENCES_COOKIE_NAME 
} from "./theme-preferences";

/**
 * Get theme preferences from Astro cookies for SSR
 * Supports the new multi-layered theme system (base + color + flair)
 */
export function getSSRThemeFromAstroCookies(cookies: any): ThemePreferencesWithThemes {
  // Try to get theme preferences from cookie
  const cookieValue = cookies.get(THEME_PREFERENCES_COOKIE_NAME)?.value;
  
  let preferences: ThemePreferences;
  
  if (cookieValue) {
    preferences = parseThemePreferences(cookieValue);
  } else {
    preferences = DEFAULT_THEME_PREFERENCES;
  }

  // Create complete theme preferences with resolved themes and HTML props
  return createThemePreferencesWithThemes(preferences);
}

/**
 * Legacy function for backward compatibility with old single-theme system
 * @deprecated Use getSSRThemeFromAstroCookies instead for full theme system support
 */
export function getSSRThemeFromAstroCookiesLegacy(cookies: any): {
  themeId: string | null;
  theme: any | null;
  htmlProps: Record<string, string>;
} {
  const result = getSSRThemeFromAstroCookies(cookies);
  
  // For backward compatibility, prioritize color theme, then base theme
  const primaryTheme = result.resolved.color || result.resolved.base;
  
  return {
    themeId: primaryTheme?.id || null,
    theme: primaryTheme || null,
    htmlProps: result.htmlProps,
  };
}
