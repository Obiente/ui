import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        dts({
            insertTypesEntry: true,
        }),
    ],
    build: {
        lib: {
            entry: {
                index: resolve(__dirname, "src/index.ts"),
                "catppuccin-mocha": resolve(__dirname, "src/catppuccin-mocha.ts"),
                "catppuccin-latte": resolve(__dirname, "src/catppuccin-latte.ts"),
                "catppuccin-frappe": resolve(__dirname, "src/catppuccin-frappe.ts"),
                "catppuccin-macchiato": resolve(__dirname, "src/catppuccin-macchiato.ts"),
            },
            formats: ["es"],
        },
        rollupOptions: {
            external: [],
            output: {
                entryFileNames: "[name].js",
                assetFileNames: "[name].[ext]",
            },
        },
        cssCodeSplit: true,
    },
});
