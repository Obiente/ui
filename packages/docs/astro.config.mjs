import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  integrations: [
    vue(),
  ],
  vite: {
    resolve: {
      alias: {
        '@obiente/ui': path.resolve(__dirname, '../ui/src/index.ts'),
        '@obiente/themes': path.resolve(__dirname, '../themes/src/index.ts'),
      }
    }
  }
});
