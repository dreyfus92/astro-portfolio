# 🧑🏻‍💻 My personal website

An attempt to create a miniminal js personal blog using [Astro](https://astro.build/).

![screenshot](/public/sc1.png)

## 📚 Stack

- Platform: [Astro](https://astro.build/)
- Deployment: [Vercel](https://vercel.com/)
- Package manager: [pnpm](https://pnpm.io/)
- CSS: [Tailwind CSS](https://tailwindcss.com/)

## 🚀 Project Structure

Inside of my Astro project, you'll see the following folders and files:

```bash
├── .vscode/
├── public/
│   ├──favicon/
│   ├── banner.png
│   ├── robots.txt
│   └── sc1.png
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   └── utils/
├── .env.example
├── .eslintrc.cjs
├── .gitignore
├── .LICENSE
├── README.md
├── astro.config.ts
├── package-json
├── pnpm-lock.yaml
├── tailwind.config.js
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where you should place any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling. The `tailwind.config.js` file is where you can customize your Tailwind theme.

I'm using the `assets` folder to store my images and the `content` folder to store my markdown files so I can take advantage of Astro's built-in image optimization.

## 🧞 Running Locally

This app requires Node.js v18.4.1 or later.

```bash
git clone git@github.com:dreyfus92/astro-portfolio.git
cd astro-portfolio
npm install -g pnpm
pnpm i
pnpm dev
```

## 📝 License

This project is licensed under the [MIT license](/LICENSE).