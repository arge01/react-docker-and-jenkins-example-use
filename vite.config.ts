import react from '@vitejs/plugin-react-swc';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import checker from 'vite-plugin-checker';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "events",
        replacement: "rollup-plugin-node-polyfills/polyfills/events",
      },
      {
        find: /~(.+)/,
        replacement: path.resolve(__dirname, "./node_modules/$1"),
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
      {
        find: '@assets',
        replacement: path.resolve(__dirname, './src/assets'),
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
        find: '@redux',
        replacement: path.resolve(__dirname, './src/redux'),
      },
      {
        find: '@services',
        replacement: path.resolve(__dirname, './src/services'),
      },
      {
        find: '@styles',
        replacement: path.resolve(__dirname, './src/styles'),
      },
      {
        find: '@utils',
        replacement: path.resolve(__dirname, './src/utils'),
      },
      {
        find: '@views',
        replacement: path.resolve(__dirname, './src/views'),
      },
    ],
  },
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    checker({
      typescript: true,
      eslint: {
        lintCommand:
          'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0',
      },
    }),
  ],
});
