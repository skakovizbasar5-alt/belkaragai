import { BookOpenCheck, MapPinCheck, MapPinned, Megaphone, Route } from 'lucide-react';
import { routes } from '../../data/routes';
import { history } from '../../data/history';
import { hasCoords, useAllPlaces, useReports } from '../../lib/store';
import SectionHeading from '../ui/SectionHeading';
import { useReveal } from '../../lib/useReveal';

/** Барлық сандар сайттағы нақты деректерден есептеледі — ойдан шығарылмайды. */
export default function ResultsSection() {
  const places = useAllPlaces();
  const reports = useReports();
  const ref = useReveal<HTMLDivElement>();

  const stats = [
    { icon: MapPinned, label: 'Туристік нысан', value: places.length, note: 'сайтта' },
    { icon: MapPinCheck, label: 'Картадағы нүкте', value: places.filter(hasCoords).length, note: 'координаты бар' },
    { icon: Route, label: 'Маршрут', value: routes.length, note: 'сайтта' },
    { icon: BookOpenCheck, label: 'Тарихи материал', value: history.filter((h) => h.text.trim() && h.source).length, note: 'дереккөзімен' },
    { icon: Megaphone, label: 'Экологиялық хабарлама', value: reports.length, note: 'осы құрылғыда' },
  ];

  return (
    <section id="results" className="bg-forest-950 py-20 text-white sm:py-28">
      <div className="container-page">
        <SectionHeading
          light
          align="center"
          eyebrow="Жоба нәтижелері"
          title={
            <>
              Цифрлық өлке — <span className="text-gold-300 italic">болашаққа қадам</span>
            </>
          }
          lead="Көрсеткіштер сайттағы нақты деректерден автоматты түрде есептеледі."
        />
        <div ref={ref} className="reveal mt-12 grid grid-cols-2 gap-4 lg:grid-cols-5">
          {stats.map(({ icon: Icon, label, value, note }) => (
            <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <Icon className="h-6 w-6 text-gold-300" />
              <p className="mt-5 font-display text-5xl font-semibold text-white">{value}</p>
              <p className="mt-2 text-sm font-semibold text-white/85">{label}</p>
              <p className="mt-0.5 text-xs text-white/45">{value === 0 ? 'Әзірге дерек жоқ' : note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
