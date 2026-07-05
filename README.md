# 🧑🏻‍💻 My personal website

A minimal-JS personal site and blog built with [Astro](https://astro.build/).

## Stack

- **Framework:** [Astro 7](https://astro.build/) (MDX, `output: 'server'`)
- **Deployment:** [Cloudflare Workers](https://workers.cloudflare.com/) via [`@astrojs/cloudflare`](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) and [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) via [`@tailwindcss/vite`](https://tailwindcss.com/docs/installation/framework-guides/astro)
- **Content:** Astro Content Collections (`glob` loader + Zod schema)
- **Code blocks:** [expressive-code](https://expressive-code.com/)
- **Package manager:** [pnpm](https://pnpm.io/)

## Project structure

```text
├── public/                 # Static assets (favicon, robots.txt)
├── src/
│   ├── assets/             # Images processed by Astro (post covers, etc.)
│   ├── components/
│   ├── data/
│   │   └── blog/           # MDX posts (Content Collection: `posts`)
│   ├── layouts/
│   ├── pages/              # Routes (.astro, .ts endpoints)
│   ├── styles/             # Global + post typography (Tailwind @theme)
│   ├── utils/
│   ├── content.config.ts   # Collection schema + glob loader
│   └── env.d.ts
├── astro.config.ts
├── wrangler.jsonc          # Cloudflare Workers config
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── LICENSE
```

### Routes

| Path | File | Notes |
| --- | --- | --- |
| `/` | `pages/index.astro` | Home |
| `/posts` | `pages/posts/index.astro` | Blog index, grouped by year |
| `/posts/[id]` | `pages/posts/[id].astro` | Individual posts (prerendered) |
| `/socials` | `pages/socials.astro` | Social links |
| `/contact` | `pages/contact.astro` | Contact form |
| `/llms.txt` | `pages/llms.txt.ts` | Plain-text blog export for LLMs |

Blog URLs use each post's collection **id** (the MDX filename stem), e.g. `/posts/wirths-law`.

### Content

MDX lives in `src/data/blog/` and is registered in `src/content.config.ts`. Each post requires this frontmatter:

```yaml
title: 'Post title'
description: 'Short summary'
pubDate: 2024-01-14
draft: false
cover: '@assets/posts/cover.png'
coverAlt: 'Cover description'
```

Set `draft: true` to hide a post in production. Covers under `src/assets/` go through Astro's image pipeline at build time.

### Tailwind

There is no `tailwind.config.js`. Theme tokens live in CSS (`src/styles/index.css`, `src/styles/posts.css`) using Tailwind v4's CSS-first setup, wired through `astro.config.ts` → `vite.plugins: [tailwindcss()]`.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm start` | Type-check in watch mode + dev server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview the production build locally |
| `pnpm format` | Format with Prettier |

## Running locally

Requires **Node.js 18.20.8+**, **20.3.0+**, or **22+**.

```bash
git clone git@github.com:dreyfus92/astro-portfolio.git
cd astro-portfolio
pnpm install
pnpm dev
```

To preview the Cloudflare build locally:

```bash
pnpm build
pnpm preview
```

## License

MIT — see [LICENSE](LICENSE).
