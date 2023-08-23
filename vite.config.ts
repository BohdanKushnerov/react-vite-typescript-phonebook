import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@components': '/src/components',
      '@redux': '/src/redux',
      '@assets': '/src/assets',
      '@pages': '/src/pages',
      '@utils': '/src/utils',
      '@hooks': '/src/hooks',
    },
  },
  plugins: [react()],
  base: '/react-vite-typescript-phonebook',
  build: {
    outDir: 'build',
  },
});
