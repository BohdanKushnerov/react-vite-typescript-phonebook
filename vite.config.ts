import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
      '@interfaces': '/src/interfaces',
      '@myTypes': '/src/myTypes',
    },
  },
  plugins: [react()],
  base: '/react-vite-typescript-phonebook',
  build: {
    outDir: 'build',
  },
});
