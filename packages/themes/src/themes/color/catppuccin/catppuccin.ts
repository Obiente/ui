import { flavorEntries } from "https://deno.land/x/catppuccin/mod.ts";
import { defineColorTheme } from "types/color-theme.ts";

const themes = flavorEntries.map(([flavorName, flavor]) => {
  const c = flavor.colors;

  return defineColorTheme({
    id: `catppuccin-${flavorName}`,
    name: `Catppuccin ${flavor.name}`,
    type: "color",
    variant: flavor.dark ? "dark" : "light",
    family: "catppuccin",
    description: `Soothing pastel theme for the high-spirited!`,
    colors: {
      background: c.base.hex,
      foreground: c.text.hex,
      surface: {
        base: c.base.hex,
        raised: c.mantle.hex,
        overlay: c.surface0.hex,
        muted: c.surface1.hex,
      },
      text: {
        primary: c.text.hex,
        secondary: c.subtext1.hex,
        tertiary: c.subtext0.hex,
        disabled: c.overlay0.hex,
      },
      border: {
        default: c.overlay0.hex,
        muted: c.surface2.hex,
        strong: c.overlay1.hex,
      },
      accent: {
        primary: c.blue.hex,
        secondary: c.mauve.hex,
        success: c.green.hex,
        warning: c.yellow.hex,
        danger: c.red.hex,
        info: c.sky.hex,
      },
      interactive: {
        hover: c.crust.hex,
        active: c.surface2.hex,
        disabled: c.overlay0.hex,
        focus: c.blue.hex,
      },
    },
  });
});

export default themes;
