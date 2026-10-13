import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages сайтты /<репо-атауы>/ ішкі бумасында ашады.
// `npm run build:pages` командасы осы режимде жинайды. Басқа хостингте (Netlify, Vercel) — "/".
const PAGES_BASE = '/belkaragai/';

export default defineConfig(({ mode }) => ({
  base: mode === 'pages' ? PAGES_BASE : '/',
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // телефоннан жергілікті желі арқылы ашу үшін
  },
}));
