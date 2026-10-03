import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const staticRoutes = ['szczegoly', 'plan', 'faq', 'kontakt', 'rsvp'];

function staticRoutePages() {
  return {
    name: 'static-route-pages',
    apply: 'build',
    closeBundle() {
      const outputDirectory = resolve('dist');
      const indexFile = resolve(outputDirectory, 'index.html');

      for (const route of staticRoutes) {
        const routeDirectory = resolve(outputDirectory, route);
        mkdirSync(routeDirectory, { recursive: true });
        copyFileSync(indexFile, resolve(routeDirectory, 'index.html'));
      }
    },
  };
}

export default defineConfig(({ command }) => ({
  plugins: [react(), staticRoutePages()],
  base: command === 'build' ? '/OurBigDay/' : '/',
}));
