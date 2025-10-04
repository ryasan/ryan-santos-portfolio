import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vite'
import { netlifyPlugin } from '@netlify/remix-edge-adapter/plugin'
import { vitePlugin as remix } from '@remix-run/dev'

export default defineConfig(async () => {
	const checker = await import('vite-plugin-checker').then((mod) => mod.default)

	return {
		plugins: [
			remix({
				future: {
					v3_fetcherPersist: true,
				},
			}),
			checker({
				typescript: true,
			}),
			netlifyPlugin(),
			tsconfigPaths(),
		],
		build: {
			cssMinify: process.env.NODE_ENV === 'production',
		},
	}
})
