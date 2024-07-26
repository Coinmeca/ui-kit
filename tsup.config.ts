import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['./src/**/*.ts'],
	splitting: true,
	treeshake: true,
	clean: true,
	dts: true,
	format: ['esm', 'cjs'],
	platform: 'browser',
	target: 'esnext',
	sourcemap: true,
	minify: true,
	tsconfig: './tsconfig.build.json'
});
