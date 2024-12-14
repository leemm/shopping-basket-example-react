import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import react from '@vitejs/plugin-react';

const json = JSON.parse(readFileSync(join(process.cwd(), 'catalogue.json'), 'utf8'));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFilesAfterEnv: ['./setupTests.js'],
  },
  define: {
    __CATALOGUE__: JSON.stringify(json)
  }
});
