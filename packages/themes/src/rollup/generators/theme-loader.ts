import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import type { AnyTheme, ThemeCollection } from './theme-types';
import { categorizeThemes } from './theme-types';

export async function loadThemeFromFile(themePath: string): Promise<AnyTheme | AnyTheme[]> {
  if (!existsSync(themePath)) {
    throw new Error(`Theme file not found: ${themePath}`);
  }

  try {
    // For now, we'll use a simple require approach
    // In a real implementation, you'd want to use a proper TypeScript loader
    delete require.cache[require.resolve(themePath)];
    const themeModule = require(themePath);
    
    // Handle both default export and named exports
    return themeModule.default || themeModule;
  } catch (error) {
    throw new Error(`Failed to load theme from ${themePath}: ${error}`);
  }
}

export async function loadThemesFromDirectory(themesDir: string): Promise<ThemeCollection> {
  const themes: AnyTheme[] = [];

  // Load base themes
  const baseDir = join(themesDir, 'base');
  if (existsSync(baseDir)) {
    const baseFiles = require('fs').readdirSync(baseDir)
      .filter((file: string) => file.endsWith('.ts') && file !== 'index.ts');
    
    for (const file of baseFiles) {
      try {
        const theme = await loadThemeFromFile(join(baseDir, file));
        if (Array.isArray(theme)) {
          themes.push(...theme);
        } else {
          themes.push(theme);
        }
      } catch (error) {
        console.warn(`Failed to load base theme ${file}:`, error);
      }
    }
  }

  // Load color themes
  const colorDir = join(themesDir, 'color');
  if (existsSync(colorDir)) {
    const colorFiles = require('fs').readdirSync(colorDir)
      .filter((file: string) => file.endsWith('.ts') && file !== 'index.ts');
    
    for (const file of colorFiles) {
      try {
        const theme = await loadThemeFromFile(join(colorDir, file));
        if (Array.isArray(theme)) {
          themes.push(...theme);
        } else {
          themes.push(theme);
        }
      } catch (error) {
        console.warn(`Failed to load color theme ${file}:`, error);
      }
    }
  }

  // Load flair themes
  const flairDir = join(themesDir, 'flair');
  if (existsSync(flairDir)) {
    const flairFiles = require('fs').readdirSync(flairDir)
      .filter((file: string) => file.endsWith('.ts') && file !== 'index.ts');
    
    for (const file of flairFiles) {
      try {
        const theme = await loadThemeFromFile(join(flairDir, file));
        if (Array.isArray(theme)) {
          themes.push(...theme);
        } else {
          themes.push(theme);
        }
      } catch (error) {
        console.warn(`Failed to load flair theme ${file}:`, error);
      }
    }
  }

  return categorizeThemes(themes);
}

export function findThemeById<T extends AnyTheme>(themes: T[], id: string): T | undefined {
  return themes.find(theme => theme.id === id);
}

export function getThemesByFamily(themes: AnyTheme[], family: string): AnyTheme[] {
  return themes.filter(theme => 
    'family' in theme && theme.family === family
  );
}

export function getThemesByVariant(themes: AnyTheme[], variant: 'light' | 'dark'): AnyTheme[] {
  return themes.filter(theme => 
    'variant' in theme && theme.variant === variant
  );
}
