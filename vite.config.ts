import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';

// Ensure src/main.tsx and src/index.tsx exist on disk in any environment (including Vercel / CI)
try {
  const rootDir = process.cwd();
  const srcDirPath = path.resolve(rootDir, 'src');
  const mainTsxPath = path.resolve(srcDirPath, 'main.tsx');
  const indexTsxPath = path.resolve(srcDirPath, 'index.tsx');
  const indexCssPath = path.resolve(srcDirPath, 'index.css');

  const entryCode = `import {createRoot} from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
`;

  if (!fs.existsSync(srcDirPath)) {
    fs.mkdirSync(srcDirPath, { recursive: true });
  }
  if (!fs.existsSync(mainTsxPath)) {
    fs.writeFileSync(mainTsxPath, entryCode);
  }
  if (!fs.existsSync(indexTsxPath)) {
    fs.writeFileSync(indexTsxPath, entryCode);
  }
  if (!fs.existsSync(indexCssPath)) {
    fs.writeFileSync(indexCssPath, `@import "tailwindcss";\n`);
  }
} catch {
  // Ignored in read-only filesystems
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
