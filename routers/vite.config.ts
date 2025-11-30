import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
      {
        find: '@components',
        replacement: path.resolve(__dirname, './src/components'),
      },
      {
        find: '@constants',
        replacement: path.resolve(__dirname, './src/constants'),
      },
      {
        find: '@hooks',
        replacement: path.resolve(__dirname, './src/hooks'),
      },
      {
        find: '@middleware',
        replacement: path.resolve(__dirname, './src/middleware'),
      },
      {
        find: '@utils',
        replacement: path.resolve(__dirname, './src/utils'),
      },
    ],
  },
  plugins: [
    react(),
    dts({
      outDir: 'dist',
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      formats: ['es'],
      name: 'RouterLibrary',
      fileName: (format) => `router-library.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-router-dom'],
    },
  },
});
