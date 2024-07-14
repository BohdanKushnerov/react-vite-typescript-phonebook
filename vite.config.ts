import react from '@vitejs/plugin-react';

import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@components': '/src/components',
      '@redux': '/src/redux',
      '@assets': '/src/assets',
      '@pages': '/src/pages',
      '@router': '/src/router',
      '@utils': '/src/utils',
      '@hooks': '/src/hooks',
      '@interfaces': '/src/interfaces',
      '@myTypes': '/src/myTypes',
    },
  },
  plugins: [react()],
  build: {
    outDir: 'build',
  },
});
