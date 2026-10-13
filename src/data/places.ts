import type { Place } from '../types';

/**
 * ТУРИСТІК НЫСАНДАР ТІЗІМІ
 * ------------------------------------------------------------
 * Нақты деректерді осы файлда толтырыңыз.
 *
 * Ережелер:
 *  1. Нысанның атауын, тарихын және координатын ойдан жазбаңыз.
 *  2. Координат расталмаса: latitude: null, longitude: null.
 *  3. Координат пен дерек тексерілгенде ғана verified: true қойыңыз.
 *     verified: false нысандар картада «Тексерілмеген» деп сұр түспен белгіленеді
 *     (координаты болған жағдайда), тексерілген нүкте ретінде көрсетілмейді.
 *  4. Әр нысанға source (дереккөз) жазыңыз.
 *  5. Суретті public/images/places/ бумасына салып, image: '/images/places/файл.jpg' деп жазыңыз.
 *
 * Төмендегі жазбалар — толтыруға арналған ҮЛГІЛЕР. Оларды нақты нысандармен ауыстырыңыз.
 */

export const PENDING = 'Мәлімет нақтылануда';

export const places: Place[] = [
  {
    id: 'belqaragai-village',
    name: 'Белқарағай ауылы',
    category: 'history',
    description:
      'Жобаның негізгі нысаны — Шығыс Қазақстан облысы, Катонқарағай ауданындағы Белқарағай ауылы. Ауылдың орналасуы мен сипаттамасы нақтылануда.',
    historicalSignificance:
      'Ауылдың тарихы (соның ішінде бұрынғы Медведка атауы) «Белқарағай тарихы» бөліміне дереккөзімен бірге енгізіледі.',
    latitude: null,
    longitude: null,
    image: '/images/route-history.jpg',
    source: 'Белқарағай ауылдық округі әкімінің аппараты: gov.kz/memleket/entities/vko-katon-karagay-belkaragai',
    verified: false,
  },
  {
    id: 'sample-nature',
    name: 'Табиғи нысан (атауы нақтылануда)',
    category: 'nature',
    description: 'Үлгі жазба. Орман алқабы, өзен, бұлақ немесе табиғи көрініс нүктесі туралы мәлімет осында жазылады.',
    historicalSignificance: PENDING,
    latitude: null,
    longitude: null,
    image: null,
    source: null,
    verified: false,
  },
  {
    id: 'sample-history',
    name: 'Тарихи орын (атауы нақтылануда)',
    category: 'history',
    description: 'Үлгі жазба. Ескерткіш, тарихи ғимарат немесе естелік орын туралы мәлімет осында жазылады.',
    historicalSignificance: PENDING,
    latitude: null,
    longitude: null,
    image: null,
    source: null,
    verified: false,
  },
  {
    id: 'sample-recreation',
    name: 'Демалыс орны (атауы нақтылануда)',
    category: 'recreation',
    description: 'Үлгі жазба. Пикник алаңы, көрік нүктесі немесе демалыс аймағы туралы мәлімет осында жазылады.',
    historicalSignificance: PENDING,
    latitude: null,
    longitude: null,
    image: null,
    source: null,
    verified: false,
  },
  {
    id: 'sample-route',
    name: 'Туристік бағыттың бастау нүктесі (нақтылануда)',
    category: 'route',
    description: 'Үлгі жазба. Жаяу жүргіншілер соқпағының немесе экскурсия бағытының бастау нүктесі.',
    historicalSignificance: PENDING,
    latitude: null,
    longitude: null,
    image: null,
    source: null,
    verified: false,
  },
  {
    id: 'sample-eco',
    name: 'Экологиялық бақылау нүктесі (нақтылануда)',
    category: 'eco',
    description:
      'Үлгі жазба. Тұрақты бақылауды қажет ететін аумақ: қоқыс жиналатын жер, ластанған су көзі немесе зақымданған өсімдік жамылғысы.',
    historicalSignificance: PENDING,
    latitude: null,
    longitude: null,
    image: null,
    source: null,
    verified: false,
  },
];
