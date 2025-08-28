/**
 * Theme preferences management for multi-layered theme system
 */

import type { BaseTheme, ColorTheme, FlairTheme } from "@obiente/themes";
import { getBaseThemes, getColorThemes, getFlairThemes } from "@obiente/themes";

export interface ThemePreferences {
  /** Currently selected base theme ID */
  base: string | null;
  /** Currently selected color theme ID */
  color: string | null;
  /** Array of active flair theme IDs (stackable) */
  flair: string[];
}

export interface ResolvedThemes {
  base: BaseTheme | null;
  color: ColorTheme | null;
  flair: FlairTheme[];
}

export interface ThemePreferencesWithThemes extends ThemePreferences {
  resolved: ResolvedThemes;
  htmlProps: Record<string, string>;
}

export const THEME_PREFERENCES_COOKIE_NAME = "oi-theme-prefs";

/**
 * Default theme preferences
 */
export const DEFAULT_THEME_PREFERENCES: ThemePreferences = {
  base: "default",
  color: "catppuccin-latte", // Light theme as default
  flair: [],
};

/**
 * Resolve theme IDs to actual theme objects
 */
export function resolveThemes(preferences: ThemePreferences): ResolvedThemes {
  const baseThemes = getBaseThemes();
  const colorThemes = getColorThemes();
  const flairThemes = getFlairThemes();

  const base = preferences.base 
    ? baseThemes.find(t => t.id === preferences.base) || null
    : null;

  const color = preferences.color 
    ? colorThemes.find(t => t.id === preferences.color) || null
    : null;

  const flair = preferences.flair
    .map(id => flairThemes.find(t => t.id === id))
    .filter((theme): theme is FlairTheme => theme !== undefined)
    .sort((a, b) => (a.priority || 0) - (b.priority || 0)); // Sort by priority

  return { base, color, flair };
}

/**
 * Generate HTML props for theme application
 */
export function getThemeHtmlProps(resolved: ResolvedThemes): Record<string, string> {
  const props: Record<string, string> = {};

  // Base theme
  if (resolved.base) {
    props["data-base-theme"] = resolved.base.id;
  }

  // Color theme
  if (resolved.color) {
    props["data-color-theme"] = resolved.color.id;
    props["data-theme-variant"] = resolved.color.variant;
    
    // Add dark class for CSS frameworks that use it
    if (resolved.color.variant === "dark") {
      props.class = props.class ? `${props.class} dark` : "dark";
    }
  }

  // Flair themes
  if (resolved.flair.length > 0) {
    props["data-flair-themes"] = resolved.flair.map(t => t.id).join(",");
  }

  // Legacy data-theme for backward compatibility
  const legacyThemeId = [
    resolved.base?.id,
    resolved.color?.id,
    ...resolved.flair.map(t => t.id)
  ].filter(Boolean).join("+");
  
  if (legacyThemeId) {
    props["data-theme"] = legacyThemeId;
  }

  return props;
}

/**
 * Create complete theme preferences with resolved themes and HTML props
 */
export function createThemePreferencesWithThemes(preferences: ThemePreferences): ThemePreferencesWithThemes {
  const resolved = resolveThemes(preferences);
  const htmlProps = getThemeHtmlProps(resolved);

  return {
    ...preferences,
    resolved,
    htmlProps,
  };
}

/**
 * Parse theme preferences from a JSON string
 */
export function parseThemePreferences(json: string): ThemePreferences {
  try {
    const parsed = JSON.parse(json);
    return {
      base: typeof parsed.base === "string" ? parsed.base : DEFAULT_THEME_PREFERENCES.base,
      color: typeof parsed.color === "string" ? parsed.color : DEFAULT_THEME_PREFERENCES.color,
      flair: Array.isArray(parsed.flair) ? parsed.flair.filter((id: any) => typeof id === "string") : DEFAULT_THEME_PREFERENCES.flair,
    };
  } catch {
    return DEFAULT_THEME_PREFERENCES;
  }
}

/**
 * Serialize theme preferences to a JSON string
 */
export function serializeThemePreferences(preferences: ThemePreferences): string {
  return JSON.stringify(preferences);
}

/**
 * Add a flair theme to preferences (if not already present)
 */
export function addFlairTheme(preferences: ThemePreferences, flairId: string): ThemePreferences {
  if (preferences.flair.includes(flairId)) {
    return preferences;
  }
  
  return {
    ...preferences,
    flair: [...preferences.flair, flairId],
  };
}

/**
 * Remove a flair theme from preferences
 */
export function removeFlairTheme(preferences: ThemePreferences, flairId: string): ThemePreferences {
  return {
    ...preferences,
    flair: preferences.flair.filter(id => id !== flairId),
  };
}

/**
 * Toggle a flair theme in preferences
 */
export function toggleFlairTheme(preferences: ThemePreferences, flairId: string): ThemePreferences {
  return preferences.flair.includes(flairId)
    ? removeFlairTheme(preferences, flairId)
    : addFlairTheme(preferences, flairId);
}
