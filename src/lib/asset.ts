/**
 * public/ бумасындағы файлдың толық жолы.
 * Сайт ішкі бумада жарияланса (мысалы GitHub Pages: /ecotour-belqaragai/), сол бума автоматты түрде қосылады.
 */
const BASE = import.meta.env.BASE_URL || '/';

export function asset(path: string): string;
export function asset(path: string | null): string | null;
export function asset(path: string | null): string | null {
  if (!path) return path;
  if (/^(https?:|data:|blob:)/.test(path) || !path.startsWith('/')) return path;
  return BASE.replace(/\/+$/, '') + path;
}

/** React Router үшін базалық жол ("/" немесе "/ecotour-belqaragai") */
export const ROUTER_BASENAME = BASE.replace(/\/+$/, '') || '/';
