import { defineConfig } from 'tsup';

export default defineConfig((options: any) => ({
  entry: [
    'src/index.ts'
  ],
  splitting: true,
  treeshake: true,
  clean: true,
  dts: true,
  format: ["esm", "cjs"],
  platform: 'browser',
  target: ['es2020', 'chrome70', 'edge18', 'firefox70', 'node18'],
  // tsconfig: new URL('./tsconfig.build.json', import.meta.url).pathname,
  tsconfig: "./tsconfig.build.json",
  sourcemap: !options.watch,
  minify: !options.watch,
}));