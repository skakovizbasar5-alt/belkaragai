import type { TourRoute } from '../types';

/**
 * ТУРИСТІК МАРШРУТТАР
 * ------------------------------------------------------------
 * distance, duration, difficulty — тек нақты жол арқылы өлшенгеннен кейін толтырылады.
 * Әйтпесе null қалдырыңыз — сайтта «Нақтылау қажет» деп шығады.
 *
 * placeIds — places.ts ішіндегі нысандардың id мәндері (маршрут реті бойынша).
 * verifiedPath — нақты жол сызығы. Тексерілген GPS-трек болғанда ғана толтырыңыз.
 */

export const routes: TourRoute[] = [
  {
    id: 'nature-trip',
    name: 'Табиғатқа саяхат',
    tagline: 'Ауыл айналасындағы табиғи ландшафттар',
    description:
      'Мақсаты — Белқарағай ауылының айналасындағы табиғи ландшафттарды таныстыру. Нысандар жергілікті табиғи орындар анықталғаннан кейін енгізіледі.',
    distance: null,
    duration: null,
    difficulty: null,
    placeIds: ['belqaragai-village', 'local-nature'],
    image: '/images/route-nature.jpg',
    verifiedPath: null,
  },
  {
    id: 'history-trail',
    name: 'Тарих ізімен',
    tagline: 'Медведкадан Белқарағайға дейін',
    description:
      'Мақсаты — ауылдың атау тарихын, тарихи орындарын және өлкетану деректерін таныстыру. Қашықтығы мен уақыты нысандар белгіленген соң есептеледі.',
    distance: null,
    duration: null,
    difficulty: null,
    placeIds: ['belqaragai-village', 'oralhan-bokey-school', 'mosque', 'terisbulaq'],
    image: '/images/route-history.jpg',
    verifiedPath: null,
  },
  {
    id: 'eco-trip',
    name: 'Эко-саяхат',
    tagline: 'Бақыла. Біл. Сақта.',
    description:
      'Мақсаты — табиғатты бақылау, қоқыс мәселелерін тіркеу және экологиялық жауапкершілікті қалыптастыру. Маршрут тексерілген жолдар мен қауіпсіз орындар негізінде құрылады.',
    distance: null,
    duration: null,
    difficulty: null,
    placeIds: ['local-nature', 'eco-point'],
    image: '/images/route-eco.jpg',
    verifiedPath: null,
  },
];
