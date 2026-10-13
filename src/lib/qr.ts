import { SITE } from '../data/site';

/** QR-код үшін негізгі мекенжай: .env (VITE_SITE_URL) немесе қазір ашылып тұрған сайт */
export function defaultBaseUrl(): string {
  if (SITE.publicUrl) return SITE.publicUrl;
  if (typeof window === 'undefined') return '';
  // Сайт ішкі бумада жарияланса (GitHub Pages), сол буманы да қосамыз
  return (window.location.origin + (import.meta.env.BASE_URL || '/')).replace(/\/+$/, '');
}

export type UrlCheck = { ok: true; url: URL } | { ok: false; reason: string };

/**
 * QR-код тек интернетте жұмыс істейтін жария мекенжай үшін жасалады.
 * localhost, 127.0.0.1, 192.168.x.x сияқты жергілікті мекенжайлар басқа телефонда ашылмайды.
 */
export function checkPublicUrl(raw: string): UrlCheck {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return { ok: false, reason: 'Мекенжай дұрыс емес. Мысалы: https://ecotour-belqaragai.netlify.app' };
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    return { ok: false, reason: 'Мекенжай http:// немесе https:// арқылы басталуы керек.' };
  }
  const h = url.hostname;
  const local =
    h === 'localhost' ||
    h.endsWith('.local') ||
    h === '0.0.0.0' ||
    h === '[::1]' ||
    /^127\./.test(h) ||
    /^10\./.test(h) ||
    /^192\.168\./.test(h) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(h) ||
    !h.includes('.');
  if (local) {
    return {
      ok: false,
      reason:
        'Бұл — жергілікті тест мекенжайы. Ол тек сіздің компьютеріңізде (немесе сол Wi-Fi желісінде) ашылады, ал жария сайтта және басқа телефондарда жұмыс істемейді. Сайтты интернетке жариялап, нақты мекенжайды енгізіңіз.',
    };
  }
  return { ok: true, url };
}

export function placeUrl(base: URL | string, placeId: string): string {
  const b = typeof base === 'string' ? base : base.origin + base.pathname;
  return `${b.replace(/\/+$/, '')}/place/${encodeURIComponent(placeId)}`;
}
