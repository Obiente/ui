/**
 * Simple SSR Theme Utilities
 * 
 * Clean, minimal SSR theme support for Astro
 */

import type { ThemeDefinition } from '@obiente/themes';
import { getAllThemes } from '@obiente/themes';
import { THEME_COOKIE_NAME } from './theme-cookie';

/**
 * Get theme from Astro cookies - simple function for Astro layouts
 */
export function getSSRThemeFromAstroCookies(cookies: any): {
  themeId: string | null;
  theme: ThemeDefinition | null;
  htmlProps: Record<string, string>;
} {
  const availableThemes = getAllThemes();
  
  // Get theme from Astro cookies - only if actually available
  const cookieThemeId = cookies.get(THEME_COOKIE_NAME);
  console.log(cookieThemeId)
  if (cookieThemeId) {
    const cookieTheme = availableThemes.find(t => t.id === cookieThemeId);
    if (cookieTheme) {
      return {
        themeId: cookieTheme.id,
        theme: cookieTheme,
        htmlProps: {
          'data-theme': cookieTheme.id,
          'data-theme-variant': cookieTheme.variant,
          ...(cookieTheme.variant === 'dark' ? { class: 'dark' } : {})
        }
      };
    }
  }
  
  // For static builds or when no cookie is found, don't set any theme
  // Let the client-side theme system handle it
  return {
    themeId: null,
    theme: null,
    htmlProps: {}
  };
}
