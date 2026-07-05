import { defineConfig } from 'astro/config'
import { unified } from '@astrojs/markdown-remark'
import { remarkReadingTime } from './src/utils/readingTime.mjs'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import cloudflare from '@astrojs/cloudflare'
import expressiveCode from 'astro-expressive-code'

// https://astro.build/config
export default defineConfig({
  markdown: {
    processor: unified({ remarkPlugins: [remarkReadingTime] }),
  },
  integrations: [sitemap(), expressiveCode(), mdx()],
  site: 'https://www.paulvall.dev',
  prefetch: { prefetchAll: true },
  output: 'server',
  // sharp can't run on Workers: prerendered pages get optimized at build,
  // SSR pages serve images as-is
  adapter: cloudflare({ imageService: 'compile' }),
  image: {
    remotePatterns: [{ protocol: 'https' }],
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
