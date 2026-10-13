/**
 * «АУЫЛ КӨРІНІСІ» — ВИДЕОЛАР
 * ------------------------------------------------------------
 * Видео файлдары: public/videos/views/
 * Постер (алғашқы кадр) суреттері: public/images/views/
 *
 * Видеоларда дыбыс алынып тасталды (музыканың авторлық құқығы мен көлемді азайту үшін).
 * Бөтен автордың видеосын қолдансаңыз, credit өрісіне авторын жазыңыз.
 */

export interface ViewVideo {
  id: string;
  title: string;
  description: string;
  src: string;
  poster: string;
  orientation: 'landscape' | 'portrait';
  credit?: string;
}

export const views: ViewVideo[] = [
  {
    id: 'aerial',
    title: 'Ауыл үстінен',
    description: 'Белқарағай ауылы құс ұшар биіктіктен: көшелер, үйлер, мешіт және ауылды қоршаған орман мен таулар.',
    src: '/videos/views/aerial.mp4',
    poster: '/images/views/aerial.jpg',
    orientation: 'landscape',
  },
  {
    id: 'nature',
    title: 'Белқарағай табиғаты',
    description: 'Ауылға кіре берістегі белгі, тау өзені, қайыңды тоғай, гүлді шалғын және кең алқап.',
    src: '/videos/views/nature.mp4',
    poster: '/images/views/nature.jpg',
    orientation: 'portrait',
  },
  {
    id: 'road',
    title: 'Ауылға апарар жол',
    description: 'Көктемгі жол бойы: қайыңдар, қарлы шыңдар, жайылымдар және жартасты өзен аңғары.',
    src: '/videos/views/road.mp4',
    poster: '/images/views/road.jpg',
    orientation: 'portrait',
    credit: 'Видео: @merei_kainaruly',
  },
  {
    id: 'mosque',
    title: 'Ауыл мешіті',
    description: 'Ақ мұнаралы, көгілдір күмбезді ауыл мешіті.',
    src: '/videos/views/mosque.mp4',
    poster: '/images/views/mosque.jpg',
    orientation: 'portrait',
  },
];
