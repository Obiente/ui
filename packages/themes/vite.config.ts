import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import swc from "unplugin-swc";

export default defineConfig({
  plugins: [
    swc.vite(),
    dts({
      insertTypesEntry: true,
      exclude: ["**/*.test.ts", "**/*.spec.ts"],
      include: ["src/**/*"],
      outDir: "dist",
    }),
  ],
  build: {
    lib: {
      entry: {
        index: "./src/index.ts",
        "rollup/index": "./src/rollup/index.ts",
      },
      //   name: "ObienteThemes",
      //   formats: ["es", "cjs"],
      //   fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
    },
    outDir: "dist",
    rollupOptions: {
      external: ["@catppuccin/palette", "fs", "path", "url"],
      // input: {
      //   index: "./src/index.ts",
      //   "rollup/index": "./src/rollup/index.ts",
      // },

      // output: [
      //   {
      //     exports: "named",
      //     format: "es",
      //     compact: true,
      //     entryFileNames: "[name].js",
      //   },
      //   {
      //     exports: "named",
      //     format: "cjs",
      //     compact: true,
      //     entryFileNames: "[name].cjs",
      //   },
      // ],
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
