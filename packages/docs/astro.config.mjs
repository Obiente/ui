import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import node from "@astrojs/node";

export default defineConfig({
  integrations: [vue()],
  adapter: node({
    mode: "standalone",
  }),
  server: true,
  vite: {
    ssr: {
      noExternal: ["@obiente/themes"],
    },
    optimizeDeps: {
      include: ["@obiente/ui", "@obiente/themes"],
      exclude: ["@ark-ui/vue", "@zag-js/color-picker"],
      force: true,
    },
  },
});
