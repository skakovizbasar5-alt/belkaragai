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
    id: 'history-trail',
    name: 'Тарих ізімен',
    tagline: 'Медведкадан Белқарағайға дейін',
    description:
      'Мақсаты — ауылдың атау тарихын, тарихи орындарын және өлкетану деректерін таныстыру: ауыл орталығы, Оралхан Бөкей атындағы мектеп және ауыл мешіті.',
    distance: null,
    duration: null,
    difficulty: null,
    placeIds: ['belqaragai-village', 'oralhan-bokey-school', 'mosque'],
    image: '/images/views/aerial.jpg',
    verifiedPath: null,
  },
];
