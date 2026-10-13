/**
 * Сайттың жалпы баптаулары.
 */

export const SITE = {
  name: 'EcoTour Belқарағай',
  slogan: 'Табиғатты таны. Тарихты сақта. Болашаққа жол аш!',
  heroVideo: '/videos/belqaragai-intro.mp4',
  heroPoster: '/images/hero-poster.jpg',
  /**
   * Сайттың интернеттегі нақты мекенжайы. QR-кодтар осы мекенжайға жасалады.
   * .env файлында VITE_SITE_URL арқылы беріледі (README қараңыз).
   */
  publicUrl: (import.meta.env.VITE_SITE_URL ?? '').replace(/\/+$/, ''),
};

/**
 * Картаның бастапқы көрінісі — Белқарағай ауылының жалпы нүктесі.
 * Дереккөз: Яндекс Карталар (yandex.kz/maps/geo/belqaraghay_auyly/1508556602).
 * Бұл ауылдың жалпы орны; туристік нысандардың жеке координаттары бөлек тексеріледі.
 */
export const MAP_DEFAULT_VIEW = {
  center: [49.184815, 85.299213] as [number, number],
  zoom: 13,
  approximate: false,
};
