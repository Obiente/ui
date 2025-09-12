import { getAllThemes } from "@obiente/themes";
import { generateThemeCSS } from "@obiente/themes/rollup";
import { mkdirSync, writeFileSync } from "fs";
getAllThemes().forEach((theme) => {
  mkdirSync(theme.type, { recursive: true });
  writeFileSync(`${theme.type}/${theme.id}.css`, generateThemeCSS(theme), {
    encoding: "utf-8",
  });
});
