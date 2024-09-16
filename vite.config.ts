import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import { netlifyPlugin } from '@netlify/remix-edge-adapter/plugin';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [
		remix(),
		netlifyPlugin(),
		tsconfigPaths(),
	],
	build: {
		cssMinify: process.env.NODE_ENV === 'production',
	}
});
