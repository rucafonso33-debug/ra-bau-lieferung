import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, loadEnv, type Plugin } from 'vite';

function generatedStorefront(): Plugin {
  const virtualId = path.resolve(__dirname, 'src/__generated_storefront.tsx');
  const partFiles = Array.from({ length: 6 }, (_, index) => path.resolve(__dirname, `src/generated/App.part${index + 1}.txt`));

  return {
    name: 'generated-storefront',
    enforce: 'pre',
    resolveId(id) {
      if (id === 'virtual:storefront') return virtualId;
      return null;
    },
    load(id) {
      if (id !== virtualId) return null;
      return partFiles.map((file) => fs.readFileSync(file, 'utf8')).join('');
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [generatedStorefront(), react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
