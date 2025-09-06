import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import swc from "unplugin-swc";

export default defineConfig(({ mode }) => {
  const isRollupBuild = mode === "rollup";

  return {
    plugins: [
      swc.rollup(),
      dts({
        insertTypesEntry: true,
        exclude: ["**/*.test.ts", "**/*.spec.ts"],
        include: isRollupBuild ? ["src/rollup/**/*"] : ["src/**/*", "!src/rollup/**/*"],
        outDir: isRollupBuild ? "dist/rollup" : "dist",
      }),
    ],
    build: {
      lib: {
        entry: isRollupBuild ? "./src/rollup/index.ts" : "./src/index.ts",
        name: isRollupBuild ? "ObienteThemesRollup" : "ObienteThemes",
        formats: ["es", "cjs"],
        fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
      },
      outDir: isRollupBuild ? "dist/rollup" : "dist",
      rollupOptions: {
        external: isRollupBuild 
          ? ["@catppuccin/palette", "tailwindcss", "fs", "path", "url"]
          : ["@catppuccin/palette", "tailwindcss"],
        output: {
          globals: {
            "@catppuccin/palette": "CatppuccinPalette",
            tailwindcss: "tailwindcss",
          },
        },
      },
      sourcemap: true,
      emptyOutDir: !isRollupBuild,
    },
  };
});
