import { loadThemesFromDirectory, findThemeById } from './theme-loader';
import { resolveTheme } from './theme-resolver';
import { generateThemeCSS as generateCSS, generateThemeCSSBundle } from './css-generator';
import { generateThemeManifest as generateManifest } from './manifest-generator';
import type { ResolvedTheme, ThemeCollection } from './theme-types';

export interface ThemeGeneratorOptions {
  baseThemeId?: string;
  colorThemeIds?: string[];
  flairThemeIds?: string[];
  generateBundle?: boolean;
}

export async function generateThemesFromDirectory(
  themesDir: string,
  options: ThemeGeneratorOptions = {}
): Promise<{
  resolvedThemes: ResolvedTheme[];
  themeCollection: ThemeCollection;
  css: string;
  manifest: any;
}> {
  const {
    baseThemeId = 'default',
    colorThemeIds = [],
    flairThemeIds = [],
    generateBundle = false
  } = options;

  // Load all themes from directory
  const themeCollection = await loadThemesFromDirectory(themesDir);

  // Find the base theme
  const baseTheme = findThemeById(themeCollection.base, baseThemeId);
  if (!baseTheme) {
    throw new Error(`Base theme not found: ${baseThemeId}`);
  }

  // Resolve themes
  const resolvedThemes: ResolvedTheme[] = [];

  for (const colorThemeId of colorThemeIds) {
    const colorTheme = findThemeById(themeCollection.color, colorThemeId);
    if (!colorTheme) {
      console.warn(`Color theme not found: ${colorThemeId}`);
      continue;
    }

    // Find requested flair themes
    const flairThemes = flairThemeIds
      .map(id => findThemeById(themeCollection.flair, id))
      .filter((theme): theme is NonNullable<typeof theme> => theme !== undefined);

    const resolvedTheme = resolveTheme(baseTheme, colorTheme, flairThemes);
    resolvedThemes.push(resolvedTheme);
  }

  // Generate CSS
  const css = generateBundle 
    ? generateThemeCSSBundle(resolvedThemes)
    : resolvedThemes.map(theme => generateCSS(theme)).join('\n\n');

  // Generate manifest
  const manifest = generateManifest(resolvedThemes, themeCollection);

  return {
    resolvedThemes,
    themeCollection,
    css,
    manifest
  };
}

// Legacy functions for backward compatibility
export function generateThemeCSS(themeName: string, themesDir: string): string {
  throw new Error('Legacy generateThemeCSS is deprecated. Use generateThemesFromDirectory instead.');
}

export function generateThemeManifest(themes: string[], themesDir: string): any {
  throw new Error('Legacy generateThemeManifest is deprecated. Use generateThemesFromDirectory instead.');
}
