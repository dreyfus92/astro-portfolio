/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'neon-green': '#87CB49',
      },
      backgroundImage: {
        'blue-green-gradient': 'linear-gradient(247.23deg, #4AF2C8 0%, #2F4CB3 100%)',
      }
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  }
}