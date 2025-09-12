import { type AnyTheme } from "../../types/theme";
import {
  resolveBaseVariables,
  resolveColorVariables,
  resolveFlairVariables,
} from "./theme-resolver";
function themeHeader(theme: AnyTheme): string {
  return `/*
  * Obiente UI Themes 
  * Theme: ${theme.name} (ID: ${theme.id})
  * Type: ${theme.type}
  * Generated at: ${new Date().toISOString()}
  * This file is auto-generated. Do not edit directly.
  */
  `;
}

function getCssVars(theme: AnyTheme) {
  switch (theme.type) {
    case "base":
      return resolveBaseVariables(theme);
    case "color":
      return resolveColorVariables(theme);
    case "flair":
      return resolveFlairVariables([theme]);
  }
}

export function generateThemeCSS(
  theme: AnyTheme,
  asClass: boolean = false
): string {
  const selector = asClass
    ? `.oui-${theme.type}-${theme.id}`
    : `:root[data-oui-t-${theme.type}="${theme.id}"]`;
  return `
${themeHeader(theme)}
${selector} {
${Object.entries(getCssVars(theme))
  .map(([key, value]) => `  --${key}: ${value};`)
  .join("\n")}
}
`.trim();
}

export function generateThemePreloadLinks(themeIds: string[]): string {
  return themeIds
    .map((id) => `<link rel="preload" href="/themes/${id}.css" as="style">`)
    .join("\n");
}

export function generateThemeStyleLinks(
  themeIds: string[],
  activeTheme?: string
): string {
  return themeIds
    .map((id) => {
      const disabled = activeTheme && id !== activeTheme ? " disabled" : "";
      return `<link rel="stylesheet" href="/themes/${id}.css" data-theme-css="${id}"${disabled}>`;
    })
    .join("\n");
}
