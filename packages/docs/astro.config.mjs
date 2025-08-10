import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

export default defineConfig({
  integrations: [
    vue(),
  ],
  vite: {
    resolve: {
      alias: {
        '@obiente/ui': '../ui/src',
        '@obiente/themes': '../themes/src',
      }
    }
  }
});
