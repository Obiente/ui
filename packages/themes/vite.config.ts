import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import swc from 'unplugin-swc';

export default defineConfig({
  plugins: [
    swc.vite({
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: false,
          decorators: false,
        },
        target: 'es2022',
        loose: false,
      },
      module: {
        type: 'es6',
      },
      sourceMaps: true,
    }),
    dts({
      insertTypesEntry: true,
      exclude: ['**/*.test.ts', '**/*.spec.ts']
    })
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'ObienteThemes',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
    },
    rollupOptions: {
      external: ['@catppuccin/palette', 'tailwindcss'],
      output: {
        globals: {
          '@catppuccin/palette': 'CatppuccinPalette',
          'tailwindcss': 'tailwindcss'
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true
  }
});
