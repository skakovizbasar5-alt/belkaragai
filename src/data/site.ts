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
 * Картаның бастапқы көрінісі.
 * НАЗАР АУДАРЫҢЫЗ: бұл — Катонқарағай ауданы аумағына жалпы бағытталған шамамен алынған көрініс,
 * туристік нүкте емес. Белқарағай ауылының расталған координаты анықталғанда осы жерге жазыңыз
 * және zoom мәнін 13–14 етіп өзгертіңіз.
 */
export const MAP_DEFAULT_VIEW = {
  center: [49.2, 85.6] as [number, number],
  zoom: 8,
  approximate: true,
};
