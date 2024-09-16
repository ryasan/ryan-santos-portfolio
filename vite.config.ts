import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { netlifyPlugin } from '@netlify/remix-edge-adapter/plugin';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
	plugins: [
		remix(),
		netlifyPlugin(),
		tsconfigPaths(),
		// viteStaticCopy({
		// 	targets: [
		// 		{
		// 			src: 'app/assets/*',
		// 			dest: 'assets',
		// 		},
		// 	],
		// }),
	],
});
