/**
 * FlairTheme provides a simple way to extend or override base theme tokens.
 *
 * Use flair themes to add visual enhancements (shadows, effects, animations, etc.)
 * or custom CSS properties. Flair themes are stackable and can be combined.
 */
export interface FlairTheme {
  /**
   * Unique identifier for the flair theme.
   */
  id: string;

  /**
   * Human-readable name for the flair theme.
   */
  name: string;

  /**
   * Theme type discriminator.
   * Always "flair" for flair themes.
   */
  readonly type: "flair";

  /**
   * Optional description for the flair theme.
   */
  description?: string;

  /**
   * Indicates that flair themes are stackable.
   * Always true for flair themes.
   */
  readonly stackable: true;

  /**
   * Optional priority for stacking.
   * Higher priority flair themes override lower ones.
   */
  priority?: number;

  /**
   * Flat set of CSS property tokens to extend or override base theme tokens.
   * All keys should use the oi- prefix.
   * Example: { "oi-shadow-lg": "...", "oi-blur": "..." }
   */
  tokens: Record<`oi-${string}`, string>;
}

/**
 * Helper to define a flair theme with proper typing.
 */
export function defineFlairTheme(
  flairTheme: FlairTheme,
): FlairTheme {
  return flairTheme;
}
