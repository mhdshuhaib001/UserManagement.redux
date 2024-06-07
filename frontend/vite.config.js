// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'css',
      enforce: 'pre',
      apply: 'build',
      transform(_, id) {
        if (id.endsWith('.css')) {
          return {
            code: `
              import { createPopper } from '@popperjs/core';
              ${code}
            `,
            map: null, // provide source map if available
          };
        }
      },
    },
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
