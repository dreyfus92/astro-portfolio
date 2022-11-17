# 🧑🏻‍💻 My personal website

An attempt to create a miniminal js personal blog using [Astro](https://astro.build/).

![screenshot](/public/images/sc1.png)

## 📚 Stack

- Platform: [Astro](https://astro.build/)
- Deployment: [Vercel](https://vercel.com/)
- Package manager: [pnpm](https://pnpm.io/)
- CSS: [Tailwind CSS](https://tailwindcss.com/)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   ├── layouts/
│   ├── lib/
│   └── pages/
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Running Locally

This app requires Node.js v16.15.0 or later.

```bash
git clone git@github.com:dreyfus92/astro-portfolio.git
cd astro-portfolio
npm install -g pnpm
pnpm i
pnpm dev

