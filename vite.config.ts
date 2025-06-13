// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		sourcemap: false,
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			}
		},
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['@sveltejs/kit']
				}
			}
		}
	},
});
