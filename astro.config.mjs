import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './src/lib/readingTime.mjs';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import image from "@astrojs/image";
import vercel from "@astrojs/vercel/serverless";
import prefetch from "@astrojs/prefetch";
import react from "@astrojs/react"

export default defineConfig({
  markdown: {
    extendDefaultPlugins: true,
    remarkPlugins: [remarkReadingTime]
  },
  integrations: [tailwind(), mdx(), sitemap(), image(), prefetch(), react()],
  site: "https://www.paulvall.dev/",
  outputDir: {
    output: 'server',
    adapter: vercel()
  }
});