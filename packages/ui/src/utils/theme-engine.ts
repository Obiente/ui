/**
 * Theme Engine Utility
 * 
 * Provides functionality for managing themes at application level
 */

import { BaseThemeProps } from '../types/theme';

// Registry of available themes
const themeRegistry: Record<string, BaseThemeProps> = {};

/**
 * Register a theme with the engine
 * @param theme The theme to register
 * @returns The registered theme ID
 */
export function registerTheme(theme: BaseThemeProps): string {
  if (!theme.id) {
    throw new Error('Theme must have an ID');
  }
  
  themeRegistry[theme.id] = theme;
  return theme.id;
}

/**
 * Get a registered theme by ID
 * @param themeId The ID of the theme to retrieve
 * @returns The theme or undefined if not found
 */
export function getTheme(themeId: string): BaseThemeProps | undefined {
  return themeRegistry[themeId];
}

/**
 * Get all registered themes
 * @returns Array of all registered themes
 */
export function getAllThemes(): BaseThemeProps[] {
  return Object.values(themeRegistry);
}

/**
 * Get all theme IDs
 * @returns Array of all registered theme IDs
 */
export function getAllThemeIds(): string[] {
  return Object.keys(themeRegistry);
}

/**
 * Check if a theme exists in the registry
 * @param themeId The theme ID to check
 * @returns True if the theme exists
 */
export function hasTheme(themeId: string): boolean {
  return themeId in themeRegistry;
}

/**
 * Get all themes of a specific flavor (light/dark)
 * @param flavor The flavor to filter by ('light' or 'dark')
 * @returns Array of themes matching the flavor
 */
export function getThemesByFlavor(flavor: 'light' | 'dark'): BaseThemeProps[] {
  return Object.values(themeRegistry).filter(theme => theme.flavor === flavor);
}

/**
 * Get first theme of a specific flavor
 * @param flavor The flavor to find ('light' or 'dark')
 * @returns First matching theme or undefined if none found
 */
export function getFirstThemeByFlavor(flavor: 'light' | 'dark'): BaseThemeProps | undefined {
  return Object.values(themeRegistry).find(theme => theme.flavor === flavor);
}
