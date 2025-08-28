export * from "./utils/themes";
export * from "./types/base-theme";
export * from "./types/color-theme";
export * from "./types/flair-theme";

// Union type for all theme types
import type { BaseTheme } from "./types/base-theme";
import type { ColorTheme } from "./types/color-theme";
import type { FlairTheme } from "./types/flair-theme";

export type ThemeDefinition = BaseTheme | ColorTheme | FlairTheme;