// // Re-export main plugin
export { obienteTheme } from "./plugin";
// // Re-export types
export type {
  ObienteThemeOptions,
  ThemeConfiguration,
  CompiledTheme,
  ThemeManifest,
  ThemeManifestEntry,
} from "./types";

// // Re-export theme manager from assets
export { ObienteThemeManager } from "./assets/theme-manager";
export type { ThemeManagerConfig } from "./assets/theme-manager";

// Re-export SSR helpers from assets
export * from "./assets/ssr-helpers";

// Re-export generators
export * from "./generators/theme-generator";
