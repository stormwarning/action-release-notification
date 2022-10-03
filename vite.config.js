// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite'

const config = defineConfig({
	build: {
		lib: {
			entry: 'src/main.ts',
			formats: ['cjs'],
			fileName: 'main',
		},
	},
	test: {
		globals: true,
	},
})

export default config
