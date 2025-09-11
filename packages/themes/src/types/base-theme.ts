import { ThemeMeta } from "./theme";

/**
 * Defines the base theme structure for Obiente UI.
 *
 * Provides numeric multipliers for Tailwind CSS primitives (spacing, sizing, radius, typography, elevation).
 * Used to scale core design tokens across all components and themes.
 */
export interface BaseTheme extends ThemeMeta {
  /**
   * Theme type discriminator.
   * Always "base" for base themes.
   */
  readonly type: "base";

  /** Base spacing multiplier (affects all spacing values) */
  spacing: number;

  /** Base sizing multiplier (affects width/height values) */
  sizing: number;

  /** Base radius multiplier (affects border-radius values) */
  radius: number;

  /** Base typography multiplier (affects font sizes) */
  typography: number;

  /** Base elevation multiplier (affects z-index and shadow intensity) */
  elevation: number;

  /** Custom multipliers for specific adjustments */
  custom?: Record<string, number>;
}

export function defineBaseTheme(
  baseTheme: BaseTheme,
): BaseTheme {
  return baseTheme;
}
