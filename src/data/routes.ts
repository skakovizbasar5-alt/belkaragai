import type { TourRoute } from '../types';

/**
 * ТУРИСТІК МАРШРУТТАР
 * ------------------------------------------------------------
 * distance, duration, difficulty — тек расталған деректер болғанда толтырылады.
 * Әйтпесе null қалдырыңыз — сайтта «Нақтылау қажет» деп шығады.
 *
 * placeIds — places.ts ішіндегі нысандардың id мәндері (маршрут реті бойынша).
 * verifiedPath — нақты жол сызығы. Тексерілген GPS-трек болғанда ғана толтырыңыз.
 */

export const routes: TourRoute[] = [
  {
    id: 'nature-trip',
    name: 'Табиғатқа саяхат',
    tagline: 'Табиғи көріністер мен демалыс орындары',
    description:
      'Белқарағай өңірінің табиғи көріністерін тамашалап, демалыс орындарында аялдауға арналған бағыт. Таза ауа, орман тынысы және тау бөктерінің көрінісі.',
    distance: null,
    duration: null,
    difficulty: null,
    placeIds: ['sample-nature', 'sample-recreation', 'sample-route'],
    image: '/images/route-nature.jpg',
    verifiedPath: null,
  },
  {
    id: 'history-trail',
    name: 'Тарих ізімен',
    tagline: 'Ауылдың тарихи жадымен танысу',
    description:
      'Ауылдың тарихы мен тарихи орындарын тануға арналған бағыт. Әр аялдамада дереккөзге сүйенген қысқа әңгіме мен QR-гид ұсынылады.',
    distance: null,
    duration: null,
    difficulty: null,
    placeIds: ['belqaragai-village', 'sample-history'],
    image: '/images/route-history.jpg',
    verifiedPath: null,
  },
  {
    id: 'eco-trip',
    name: 'Эко-саяхат',
    tagline: 'Бақыла. Біл. Сақта.',
    description:
      'Табиғатты бақылау және экологиялық жауапкершілікті насихаттау бағыты. Саяхат барысында байқалған мәселені «Экомониторинг» формасы арқылы белгілеуге болады.',
    distance: null,
    duration: null,
    difficulty: null,
    placeIds: ['sample-nature', 'sample-eco'],
    image: '/images/route-eco.jpg',
    verifiedPath: null,
  },
];
