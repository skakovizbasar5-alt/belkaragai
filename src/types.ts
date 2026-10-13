/** Жобадағы барлық деректер түрлері осы файлда сипатталған. */

export type CategoryId = 'nature' | 'history' | 'recreation' | 'route' | 'eco';

export interface Place {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  historicalSignificance: string;
  /** Расталмаған болса — null. Ойдан толтырмаңыз. */
  latitude: number | null;
  longitude: number | null;
  /** /public ішіндегі сурет жолы, мысалы "/images/places/orman.jpg". Жоқ болса — null. */
  image: string | null;
  /** Сурет астындағы белгі, мысалы "Фото: жоба авторы" немесе "Иллюстрация" */
  imageCredit?: string;
  /** Дереккөз: кітап, мақала, сілтеме немесе куәгер. Жоқ болса — null. */
  source: string | null;
  /** Координаттар мен деректер тексерілгенде ғана true қойыңыз. */
  verified: boolean;
  /** Демо-басқару бетінен қосылған (тек осы браузерде сақталады). */
  custom?: boolean;
}

export interface TourRoute {
  id: string;
  name: string;
  tagline: string;
  description: string;
  /** Маршрут ұзындығы, мысалы "6 км". Расталмаса — null. */
  distance: string | null;
  /** Шамамен жүру уақыты, мысалы "3–4 сағат". Расталмаса — null. */
  duration: string | null;
  /** Күрделілік деңгейі: "Жеңіл", "Орташа", "Күрделі". Расталмаса — null. */
  difficulty: string | null;
  /** Маршрутқа кіретін нысандар (places.ts ішіндегі id). */
  placeIds: string[];
  image: string;
  /**
   * Жол сызығы тек тексерілген жол деректері болғанда ғана сызылады.
   * Нүктелер ретімен [ендік, бойлық] форматында.
   */
  verifiedPath: [number, number][] | null;
}

export interface HistoryEntry {
  id: string;
  /** Жыл немесе кезең, мысалы "1900 ж." немесе "XIX ғ. соңы". Белгісіз болса — null. */
  period: string | null;
  title: string;
  /** Мәтін әлі енгізілмесе — бос жол. */
  text: string;
  /** Дереккөз: кітап атауы, авторы, беті. Жоқ болса — null. */
  source: string | null;
  /** Ескерту: мысалы, аңыз бен дәлелденген деректі ажырату үшін */
  note?: string;
  tags: string[];
}

export type ServiceKind = 'stay' | 'food' | 'products' | 'guide' | 'contacts';

export interface LocalService {
  id: string;
  kind: ServiceKind;
  title: string;
  hint: string;
  /** Расталған жазбалар. Бос болса — толтыруға арналған үлгі көрсетіледі. */
  entries: { name: string; contact: string; address: string; note?: string }[];
}

export type ReportType = 'waste' | 'water' | 'plants' | 'territory' | 'other';
export type ReportStatus = 'new' | 'review' | 'resolved';

export interface EcoReport {
  id: string;
  type: ReportType;
  description: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  photo: string | null;
  contact: string;
  createdAt: string;
  status: ReportStatus;
}
