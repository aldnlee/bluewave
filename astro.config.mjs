import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough'
  }),
  redirects: {
    '/': '/wave' // Mengalihkan akses dari domain utama (/) langsung ke /wave
  },
  vite: {
    plugins: [tailwindcss()]
  }
});