import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './src/utils/readingTime.mjs';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";
import prefetch from "@astrojs/prefetch";

export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'dark-plus',
      langs: [],
      wrap: true
    },
    remarkPlugins: [remarkReadingTime],
    syntaxHighlight: 'shiki'
  },
  integrations: [tailwind({
    applyBaseStyles: false
  }), mdx(), sitemap(), prefetch()],
  site: "https://www.paulvall.dev/",
  output: 'hybrid',
  adapter: vercel({
    edgeMiddleware: true
  })
});