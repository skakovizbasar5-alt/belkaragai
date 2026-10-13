import type { Place } from '../types';
import { BOOK_SOURCE } from './history';

/**
 * ТУРИСТІК НЫСАНДАР ТІЗІМІ
 * ------------------------------------------------------------
 * Ережелер:
 *  1. Нысанның атауын, тарихын және координатын ойдан жазбаңыз.
 *  2. Координат расталмаса: latitude: null, longitude: null.
 *  3. Координат пен дерек жергілікті жерде тексерілгенде ғана verified: true қойыңыз.
 *     verified: false нысан картада сұр, үзік жиекті «Тексерілмеген» белгі болып шығады.
 *  4. Әр нысанға source (дереккөз) жазыңыз.
 *  5. Суретті public/images/places/ бумасына салып, image: '/images/places/файл.jpg' деп жазыңыз.
 */

export const PENDING = 'Мәлімет нақтылануда';

export const places: Place[] = [
  {
    id: 'belqaragai-village',
    name: 'Белқарағай ауылының орталығы',
    category: 'history',
    description:
      'Шығыс Қазақстан облысы, Катонқарағай ауданындағы Белқарағай ауылы. Ауылдың іргетасы 1862 жылы қаланған; 1991 жылға дейін Медведка деп аталған.',
    historicalSignificance:
      'Ауылдың қалыптасуы, Медведка атауының тарихы және 1991 жылы Белқарағай атауының қайтарылуы «Белқарағай тарихы» бөлімінде берілген.',
    latitude: 49.184815,
    longitude: 85.299213,
    image: '/images/route-history.jpg',
    source: `Координат: Яндекс Карталар (yandex.kz/maps/geo/belqaraghay_auyly/1508556602); тарих: ${BOOK_SOURCE}, 210–211-беттер`,
    // Жалпы елді мекен нүктесі — жергілікті жерде қайта тексерілгенше «тексерілмеген» болып тұрады
    verified: false,
  },
  {
    id: 'oralhan-bokey-school',
    name: 'Оралхан Бөкей атындағы Белқарағай орта мектебі',
    category: 'history',
    description:
      'Ауылдың мәдени-білім беру нысаны. Ашық деректерде мекенжайы: Бейбітшілік көшесі, 43.',
    historicalSignificance: PENDING,
    latitude: null,
    longitude: null,
    image: null,
    source: 'Ашық деректер (мекенжай). Координаты бөлек тексерілуі керек.',
    verified: false,
  },
  {
    id: 'terisbulaq',
    name: 'Терісбұлақ өзені маңы',
    category: 'history',
    description: 'Тарихи-географиялық орын. Нақты туристік нүктесі мен координаты нақтылануда.',
    historicalSignificance: PENDING,
    latitude: null,
    longitude: null,
    image: null,
    source: null,
    verified: false,
  },
  {
    id: 'tonqayin',
    name: 'Тоңқайын ауылы',
    category: 'route',
    description:
      'Тарихи-өлкетану бағыты. Қазан төңкерісіне дейін мұнда көшіп-қонып жүрген, мал шаруашылығымен айналысқан қазақтар тұрған.',
    historicalSignificance:
      'Ауыл маңындағы Есімхан тоғайы, Кенарал, Сарыбұлақ, Қаралақ, Шыбынды бұлақ, Үлкен текше және Кіші текше сияқты жер атаулары жергілікті тарихи-географиялық мұра болып табылады.',
    latitude: null,
    longitude: null,
    image: null,
    source: `${BOOK_SOURCE}, 211-бет. Қазіргі орналасуы мен координаты тексерілуі керек.`,
    verified: false,
  },
  {
    id: 'local-nature',
    name: 'Жергілікті табиғи көріністер',
    category: 'nature',
    description:
      'Ауыл айналасындағы табиғи ландшафттар. Атауы, фотосы, қауіпсіз жолы және координаты жергілікті зерттеу арқылы анықталады.',
    historicalSignificance: PENDING,
    latitude: null,
    longitude: null,
    image: null,
    source: null,
    verified: false,
  },
  {
    id: 'eco-point',
    name: 'Экологиялық бақылау нүктесі',
    category: 'eco',
    description:
      'Экомониторинг нүктесі. Оқушы зерттеу жүргізгеннен кейін ғана нақты орын ретінде белгіленеді.',
    historicalSignificance: PENDING,
    latitude: null,
    longitude: null,
    image: null,
    source: null,
    verified: false,
  },
];
