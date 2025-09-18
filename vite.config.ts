import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    checker({
      typescript: {
        tsconfigPath: './tsconfig.lib.json',
      },
    }),
  ],
  build: {
    outDir: './dist',
    minify: false,
    sourcemap: false,
    ssr: true, // avoid "node:..." browser imports warnings
    target: 'node22',
    lib: {
      entry: ['./src/index.ts'],
      formats: ['es'],
    },
  },
});
