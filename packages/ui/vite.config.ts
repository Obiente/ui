import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      include: ["src/**/*"],
      exclude: ["src/**/*.stories.*", "src/**/*.test.*"],
    }),
    tailwindcss(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ObienteUI",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
    },
    sourcemap: true,
    rollupOptions: {
      external: [
        "vue",
        "@ark-ui/vue",
        "@obiente/themes",
        "tailwindcss",
        "@tailwindcss/vite",
      ],
      output: {
        globals: {
          vue: "Vue",
          "@ark-ui/vue": "ArkUI",
          "@obiente/themes": "ObienteThemes",
        },
        // Preserve CSS imports as separate files
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "style.css";
          return assetInfo.name || "asset";
        },
      },
    },
    // Ensure CSS is extracted to a separate file
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@obiente/themes": path.resolve(__dirname, "../themes/src/index.ts"),
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
});
