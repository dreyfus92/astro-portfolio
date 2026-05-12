# 🧑🏻‍💻 My personal website

A minimal-JS personal site and blog built with [Astro](https://astro.build/).

## 📚 Stack

- Platform: [Astro](https://astro.build/) (MDX, hybrid `output: 'server'`)
- Deployment: [Vercel](https://vercel.com/) (`@astrojs/vercel`)
- Package manager: [pnpm](https://pnpm.io/)
- CSS: [Tailwind CSS v4](https://tailwindcss.com/) via [`@tailwindcss/vite`](https://tailwindcss.com/docs/installation/framework-guides/astro)
- UI: [astro-icon](https://www.astroicon.dev/), [React](https://react.dev/) for a few islands, [expressive-code](https://expressive-code.com/) for fenced code in posts

## 🚀 Project structure

```text
├── .vscode/
├── public/                 # static assets (favicon, robots.txt, …)
├── src/
│   ├── assets/             # images processed by Astro (e.g. post covers)
│   ├── components/
│   ├── data/
│   │   └── blog/           # MDX posts (Content Collections `posts`)
│   ├── layouts/
│   ├── pages/              # routes: .astro, .ts (e.g. llms.txt)
│   ├── styles/             # global + post typography (Tailwind `@theme`)
│   ├── utils/
│   ├── content.config.ts   # collection schema + glob loader → `data/blog`
│   └── env.d.ts
├── .env.example
├── .gitignore
├── .prettierrc
├── astro.config.ts
├── LICENSE
├── package.json
├── pnpm-lock.yaml
├── README.md
└── tsconfig.json
```

Routes come from `src/pages/` (`.astro`, `.md`, `.mdx`, or `.ts` for endpoints). Blog URLs use each post’s collection **id** (the MDX filename stem), e.g. `/posts/<slug>`.

`src/components/` holds Astro and React components. Anything in `public/` is served as-is at the site root.

**Tailwind:** there is no `tailwind.config.js`. Theme tokens live in CSS (for example `src/styles/index.css` and `src/styles/posts.css`) using Tailwind v4’s CSS-first setup wired through `astro.config.ts` → `vite.plugins: [tailwindcss()]`.

**Content:** MDX lives under `src/data/blog/` and is registered in `src/content.config.ts` with Astro’s `glob` loader so covers can use Astro’s image pipeline.

## 🧞 Running locally

Use **Node.js 20 LTS** (or current **18.17+** if you prefer; Astro 6 expects a recent 18.x).

```bash
git clone git@github.com:dreyfus92/astro-portfolio.git
cd astro-portfolio
# install pnpm: https://pnpm.io/installation — e.g. corepack enable && corepack prepare pnpm@latest --activate
pnpm install
pnpm dev
```

## 📝 License

This project is licensed under the [MIT license](LICENSE).
