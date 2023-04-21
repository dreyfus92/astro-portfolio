/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'neon-green': '#87CB49',
			}
		},
	},
	plugins: [],
	future: {
		hoverOnlyWhenSupported: true,
	}
}
