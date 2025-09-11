import {
  AnyTheme,
  isBaseTheme,
  isColorTheme,
  ThemeCollection,
  isFlairTheme,
} from "../types/theme";
import { ColorTheme } from "@/types/color-theme";
import { BaseTheme } from "@/types/base-theme";
import { FlairTheme } from "@/types/flair-theme";

const themeFiles = import.meta.glob<AnyTheme | AnyTheme[]>(
  ["../themes/**/*.ts"],
  {
    eager: true,
    import: "default",
  }
);

const themes: AnyTheme[] = [];
const themeIds: string[] = [];
for (const mod of Object.values(themeFiles)) {
  if (Array.isArray(mod)) {
    themes.push(...mod);
    themeIds.push(...mod.map((theme: AnyTheme) => theme.id));
  } else if (mod) {
    themes.push(mod);
    themeIds.push(mod.id);
  }
}

export function getThemeById(id: string): AnyTheme | undefined;
export function getThemeById(id: string, type: "base"): BaseTheme | undefined;
export function getThemeById(id: string, type: "color"): ColorTheme | undefined;
export function getThemeById(id: string, type: "flair"): FlairTheme | undefined;
export function getThemeById(
  id: string,
  type?: "base" | "color" | "flair"
): AnyTheme | undefined {
  const theme = themes.find((theme) => theme.id === id);
  if (!theme) return undefined;

  if (type) {
    if (type === "base" && !isBaseTheme(theme)) return undefined;
    if (type === "color" && !isColorTheme(theme)) return undefined;
    if (type === "flair" && !isFlairTheme(theme)) return undefined;
  }

  return theme;
}

export function getAllThemes() {
  return themes;
}

export function getColorThemes(): ColorTheme[] {
  return themes.filter((theme) => theme.type === "color");
}

export function getBaseThemes(): BaseTheme[] {
  return themes.filter((theme) => theme.type === "base");
}

export function getFlairThemes(): FlairTheme[] {
  return themes.filter((theme) => theme.type === "flair");
}

export function getThemesByFamily(family: string) {
  return getColorThemes().filter(
    (theme) => "family" in theme && theme.family === family
  );
}

export function getThemesByVariant(variant: "light" | "dark"): ColorTheme[] {
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
