import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const peerDependencies = [
  'react',
  'react-dom',
  '@mui/material',
  '@emotion/react',
  '@emotion/styled',
];

export default defineConfig({
  plugins: [react(), dts({ include: ['src'] })],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: (id) =>
        peerDependencies.some(
          (dependency) => id === dependency || id.startsWith(`${dependency}/`),
        ),
    },
  },
});
