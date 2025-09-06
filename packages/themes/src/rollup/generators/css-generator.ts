import type { ResolvedTheme } from './theme-types';

export function generateThemeCSS(resolvedTheme: ResolvedTheme): string {
  const { id, cssVariables } = resolvedTheme;
  
  // Generate CSS variables
  const cssVars = Object.entries(cssVariables)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');

  return `
/* Theme: ${resolvedTheme.name} */
:root[data-theme="${id}"] {
${cssVars}
}

/* Theme class variant */
.theme-${id} {
${cssVars}
}
`.trim();
}

export function generateThemeCSSBundle(resolvedThemes: ResolvedTheme[]): string {
  const cssBlocks = resolvedThemes.map(theme => generateThemeCSS(theme));
  
  const header = `
/*!
 * Obiente UI Themes
 * Generated at: ${new Date().toISOString()}
 * Themes: ${resolvedThemes.map(t => t.name).join(', ')}
 */
`;

  return header + '\n\n' + cssBlocks.join('\n\n');
}

export function generateThemePreloadLinks(themeIds: string[]): string {
  return themeIds.map(id => 
    `<link rel="preload" href="/themes/${id}.css" as="style">`
  ).join('\n');
}

export function generateThemeStyleLinks(themeIds: string[], activeTheme?: string): string {
  return themeIds.map(id => {
    const disabled = activeTheme && id !== activeTheme ? ' disabled' : '';
    return `<link rel="stylesheet" href="/themes/${id}.css" data-theme-css="${id}"${disabled}>`;
  }).join('\n');
}
