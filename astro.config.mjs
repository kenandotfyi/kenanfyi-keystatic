// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import svelte from '@astrojs/svelte';
import keystatic from '@keystatic/astro';
import icon from 'astro-icon';
import node from '@astrojs/node';

const enableCMS = process.env.PUBLIC_ENABLE_CMS === 'true';

export default defineConfig({
  output: enableCMS ? 'server' : 'static',
  adapter: enableCMS ? node({ mode: 'standalone' }) : undefined,
  integrations: [
    react(),
    markdoc(),
    svelte(),
    icon(),
    ...(enableCMS ? [keystatic()] : []),
  ],
});
