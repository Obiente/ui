import type { BaseTheme } from "./base-theme";
import type { ColorTheme } from "./color-theme";
import type { FlairTheme } from "./flair-theme";

const reservedIds: ReadonlyArray<string> = [
  "light",
  "dark",
  "system",
  "auto",
  "color",
  "base",
  "flair",
  "resolved",
  "none",
  "null",
  "undefined",
  "true",
  "false",
  // "default",
];
export const uniqueIds = new Set<string>(reservedIds);

export interface ThemeMeta {
  /**
   * Unique identifier for the theme.
   * Must be unique across all themes and cannot use {@link reservedIds | reserved keywords}.
   */
  id: string;
  /**
   * Human-readable name for the theme.
   */
  name: string;
  /**
   * Optional description for the theme.
   * @description Can be used for documentation or theme selection UI.
   */
  description?: string;
}
export type AnyTheme = BaseTheme | ColorTheme | FlairTheme;

export interface ThemeCollection {
  base: BaseTheme[];
  color: ColorTheme[];
  flair: FlairTheme[];
}

export interface ResolvedTheme {
  id: string;
  name: string;
  base: BaseTheme;
  color: ColorTheme;
  flair: FlairTheme[];
  cssVariables: Record<string, string>;
}

export function isBaseTheme(theme: AnyTheme): theme is BaseTheme {
  return theme.type === "base";
}

export function isColorTheme(theme: AnyTheme): theme is ColorTheme {
  return theme.type === "color";
}

export function isFlairTheme(theme: AnyTheme): theme is FlairTheme {
  return theme.type === "flair";
}

export function defineTheme(theme: AnyTheme): AnyTheme {
  if (uniqueIds.has(theme.id)) {
    throw new Error(
      `Theme ID "${theme.id}" is already in use or is a reserved keyword. Please choose a unique ID.`
    );
  }
  uniqueIds.add(theme.id);
  return theme;
}
