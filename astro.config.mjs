import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './src/lib/readingTime.mjs';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import image from "@astrojs/image";

// https://astro.build/config
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  markdown: {
    extendDefaultPlugins: true,
    remarkPlugins: [remarkReadingTime]
  },
  integrations: [tailwind(), mdx(), sitemap(), prefetch(), image()],
  site: "https://www.paulvall.dev/",
  output: "server",
  adapter: vercel()
});