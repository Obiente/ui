import { ThemeMeta } from "./theme";

/**
 * ColorPalette defines the direct color values used in a custom theme.
 *
 * These are raw color values for mapping theme tokens to actual colors in the design system.
 */
export interface ColorPalette {
  /**
   * Base background color for the UI.
   * Used for the main app background and root surfaces.
   */
  background: string;

  /**
   * Base foreground color for text and icons.
   * Used for primary content on backgrounds and surfaces.
   */
  foreground: string;

  /**
   * Surface colors for component backgrounds.
   */
  surface: {
    /** Default surface (e.g., cards, panels) */
    base: string;
    /** Elevated surfaces (e.g., modals, popovers) */
    raised: string;
    /** Overlay backgrounds (e.g., dropdowns, tooltips) */
    overlay: string;
    /** Subtle surfaces (e.g., disabled states, separators) */
    muted: string;
  };

  /**
   * Text colors for various content states.
   */
  text: {
    /** Main text color */
    primary: string;
    /** Less prominent text (e.g., captions) */
    secondary: string;
    /** Least prominent text (e.g., placeholders) */
    tertiary: string;
    /** Text for disabled elements */
    disabled: string;
  };

  /**
   * Border colors for UI elements.
   */
  border: {
    /** Standard border color */
    default: string;
    /** Subtle borders (e.g., separators) */
    muted: string;
    /** High-contrast borders (e.g., focus rings) */
    strong: string;
  };

  /**
   * Accent colors for semantic actions and statuses.
   */
  accent: {
    /** Main accent (e.g., buttons, links) */
    primary: string;
    /** Secondary accent (e.g., alternate actions) */
    secondary: string;
    /** Success state (e.g., confirmations) */
    success: string;
    /** Warning state (e.g., cautions) */
    warning: string;
    /** Error state (e.g., destructive actions) */
    danger: string;
    /** Informational state (e.g., highlights) */
    info: string;
  };

  /**
   * Colors for interactive component states.
   */
  interactive: {
    /** Hover state background or border */
    hover: string;
    /** Active/pressed state */
    active: string;
    /** Disabled state for interactive elements */
    disabled: string;
    /** Focus ring or highlight */
    focus: string;
  };

  /**
   * Extended colors for custom or design-system-specific needs.
   * Use for additional tokens not covered by the core palette.
   */
  extended?: Record<string, string>;
}

/**
 * Defines the color theme structure for Obiente UI.
 *
 * Provides semantic color tokens for all components and themes.
 * Used to switch between light/dark variants and theme families.
 */
export interface ColorTheme extends ThemeMeta {
  /**
   * Theme type discriminator.
   * Always "color" for color themes.
   */
  readonly type: "color";

  /**
   * Theme variant, determines if the theme is light or dark.
   */
  variant: "light" | "dark";

  /**
   * Semantic color palette for the theme.
   * Contains all color tokens used by the design system.
   */
  colors: ColorPalette;

  /**
   * Optional theme family (e.g., "Catppuccin", "Nord").
   * Used to group related themes.
   */
  family?: string;
}