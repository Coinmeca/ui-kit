import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['./src/**/*.ts'],
	treeshake: true,
	dts: true,               // Generate declaration files
	sourcemap: true,         // Generate source maps
	clean: true,             // Clean the output directory before each build
	splitting: false,        // Disable code splitting
	minify: true,
	format: ['esm', 'cjs'],
	platform: 'browser',
	target: 'esnext',
	tsconfig: './tsconfig.build.json',
});
