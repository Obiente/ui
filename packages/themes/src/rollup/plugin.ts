import type { Plugin } from "rollup";
import { createFilter } from "@rollup/pluginutils";
import {
  getThemeManagerAsset,
  getThemeInitAsset,
  getSSRHelperAsset,
} from "./generators/bundle-generator";
import { existsSync } from "fs";
import { resolve, join, dirname } from "path";
import { fileURLToPath } from "url";
import { generateThemesFromDirectory } from "./generators/theme-generator";
import { generateThemeCSS } from "./generators/css-generator";
import { generateThemeManifest } from "./generators/manifest-generator";
import type { ObienteThemeOptions } from "./types";

export function obienteTheme(options: ObienteThemeOptions = {}): Plugin {
  const {
    include = ["**/*.html", "**/*.vue", "**/*.astro"],
    exclude = "node_modules/**",
    themes = ["catppuccin-latte", "catppuccin-mocha"],
    defaultTheme = "catppuccin-latte",
    cookieName = "obiente-theme",
    attributeName = "data-theme",
    generateManifest = true,
    ssrSupport = true,
  } = options;

  const filter = createFilter(include, exclude);

  // Get current directory in ESM context
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const themesDir = resolve(__dirname, "../../themes");

  const themeIds =
    Array.isArray(themes) && themes.length > 0 && typeof themes[0] === "string"
      ? (themes as string[])
      : ["catppuccin-latte", "catppuccin-mocha"];

  return {
    name: "obiente-theme",

    buildStart() {
      // Validate themes exist
      themeIds.forEach((theme) => {
        const themePath = join(themesDir, `${theme}.ts`);
        if (!existsSync(themePath)) {
          this.warn(`Theme file not found: ${theme}.ts`);
        }
      });
    },

    transform(code: string, id: string) {
      if (!filter(id)) return null;

      // Inject theme system into HTML/template files
      if (code.includes("<!-- obiente-theme-inject -->")) {
        return injectThemeSystem(code, options);
      }

      return null;
    },
    async generateBundle() {
      try {
        const result = await generateThemesFromDirectory(themesDir, {
          baseThemeId: "default",
          colorThemeIds: themeIds,
          flairThemeIds: [],
          generateBundle: false,
        });
        // Emit CSS files for each resolved theme
        result.resolvedThemes.forEach((theme) => {
          this.emitFile({
            type: "asset",
            fileName: `themes/${theme.id}.css`,
            source: generateThemeCSS(theme),
          });
        });

        // Generate theme manifest
        if (generateManifest) {
          const manifest = generateThemeManifest(
            result.resolvedThemes,
            result.themeCollection
          );
          this.emitFile({
            type: "asset",
            fileName: "themes/manifest.json",
            source: JSON.stringify(manifest, null, 2),
          });
        }

        // Copy static assets
        this.emitFile({
          type: "asset",
          fileName: "obiente-theme-manager.js",
          source: getThemeManagerAsset(),
        });

        console.log(
          this.emitFile({
            type: "asset",
            fileName: "obiente-theme-init.js",
            source: getThemeInitAsset(),
          })
        );

        if (ssrSupport) {
          this.emitFile({
            type: "asset",
            fileName: "obiente-ssr-helpers.js",
            source: getSSRHelperAsset(),
          });
        }
      } catch (error) {
        this.warn?.(`Failed to generate theme bundle: ${error}`);
      }
    },
  };
}

function injectThemeSystem(code: string, options: ObienteThemeOptions): string {
  const {
    themes = [],
    cookieName = "obiente-theme",
    defaultTheme = "",
    attributeName = "data-theme",
  } = options;

  const themeIds =
    Array.isArray(themes) && themes.length > 0 && typeof themes[0] === "string"
      ? (themes as string[])
      : themes.map((t: any) => t.id || t);

  // Generate theme links
  const themeLinks = themeIds
    .map(
      (theme) =>
        `<link rel="stylesheet" href="/themes/${theme}.css" data-theme-css="${theme}">`
    )
    .join("\n");

  const themeScript = `<script src="/obiente-theme-init.js"></script>`;

  return code.replace(
    /<!--\s*obiente-theme-inject\s*-->/g,
    `${themeLinks}\n${themeScript}`
  );
}

export default obienteTheme;
