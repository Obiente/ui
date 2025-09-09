import { ColorTheme } from "@/types/color-theme";
import {
  AnyTheme,
  isBaseTheme,
  isColorTheme,
  ThemeCollection,
  isFlairTheme,
} from "../types/theme";

const themeFiles = import.meta.glob("../themes/**/*.ts", {
  eager: true,
});

const themes: AnyTheme[] = [];

// Aggregate themes from all imported files
for (const [path, moduleExports] of Object.entries(themeFiles)) {
  // Skip index files to avoid duplicates
  if (path.includes("index.ts")) continue;

  const mod = moduleExports as any;

  if (Array.isArray(mod.default)) {
    themes.push(...mod.default);
  } else if (mod.default) {
    themes.push(mod.default);
  }
}

export function getThemeById(id: string) {
  return themes.find((theme) => theme.id === id);
}

export function getAllThemes() {
  return themes;
}

export function getColorThemes() {
  return themes.filter((theme) => theme.type === "color");
}

export function getBaseThemes() {
  return themes.filter((theme) => theme.type === "base");
}

export function getFlairThemes() {
  return themes.filter((theme) => theme.type === "flair");
}

export function getThemesByFamily(
  family: string
): AnyTheme[] {
  return getColorThemes().filter((theme) => "family" in theme && theme.family === family);
}

export function getThemesByVariant(
  variant: "light" | "dark"
): ColorTheme[] {
  return getColorThemes().filter((theme) => theme.variant === variant);
}

export function categorizeThemes(themes: AnyTheme[]): ThemeCollection {
  const collection: ThemeCollection = {
    base: [],
    color: [],
    flair: [],
  };

  for (const theme of themes) {
    if (isBaseTheme(theme)) {
      collection.base.push(theme);
    } else if (isColorTheme(theme)) {
      collection.color.push(theme);
    } else if (isFlairTheme(theme)) {
      collection.flair.push(theme);
    }
  }

  return collection;
}
