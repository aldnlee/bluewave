import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough',
    routes: {
      strategy: 'include',
      include: ['/*'],
      exclude: ['/_astro/*'],
    },
    platformProxy: {
      enabled: true,
    },
  }),
});