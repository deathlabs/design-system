import { fileURLToPath, URL } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: [
      'react',
      'react-dom',
      '@mui/material',
      '@emotion/react',
      '@emotion/styled',
    ],
    alias: {
      '@deathlabs/design-system': fileURLToPath(
        new URL('../web/src/index.ts', import.meta.url),
      ),
    },
  },
})
