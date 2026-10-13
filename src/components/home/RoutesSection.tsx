import { Link } from 'react-router';
import { ArrowRight, Clock, Gauge, MapPinned, Ruler } from 'lucide-react';
import { routes } from '../../data/routes';
import SectionHeading from '../ui/SectionHeading';
import ImageSlot from '../ui/ImageSlot';
import { Pending } from '../ui/Badges';
import { useReveal } from '../../lib/useReveal';
import type { TourRoute } from '../../types';

function RouteCard({ route, index }: { route: TourRoute; index: number }) {
  const ref = useReveal<HTMLElement>();
  const stats = [
    { icon: Ruler, label: 'Ұзақтығы', value: route.distance },
    { icon: Clock, label: 'Жүру уақыты', value: route.duration },
    { icon: Gauge, label: 'Күрделілігі', value: route.difficulty },
    { icon: MapPinned, label: 'Нүктелер саны', value: String(route.placeIds.length) },
  ];
  return (
    <article ref={ref} className="reveal card group flex flex-col overflow-hidden" style={{ transitionDelay: `${index * 90}ms` }}>
      <div className="relative">
        <ImageSlot src={route.image} alt={route.name} caption="Иллюстрация" className="aspect-[16/10] transition duration-700 group-hover:scale-[1.03]" />
        <span className="absolute top-4 left-4 rounded-full bg-forest-900/80 px-3 py-1 text-xs font-bold text-gold-200 backdrop-blur">
          Маршрут 0{index + 1}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold tracking-wider text-brown-600 uppercase">{route.tagline}</p>
        <h3 className="mt-2 text-2xl font-semibold text-forest-900">{route.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-forest-900/65">{route.description}</p>
        <dl className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-cream-100 p-4">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label}>
              <dt className="flex items-center gap-1.5 text-[0.7rem] font-semibold text-forest-900/55">
                <Icon className="h-3.5 w-3.5" /> {label}
              </dt>
              <dd className="mt-0.5 text-sm font-bold text-forest-900">
                <Pending value={value} />
              </dd>
            </div>
          ))}
        </dl>
        <Link to={`/route/${route.id}`} className="btn-forest mt-5 w-full">
          Маршрутты ашу <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export default function RoutesSection() {
  return (
    <section id="routes" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Туристік маршруттар"
          title={
            <>
              Өзіңе жақын <span className="text-brown-600 italic">бағытты таңда</span>
            </>
          }
          lead="Үш түрлі бағыт — табиғат, тарих және экология. Қашықтық пен уақыт тек расталған деректер болғанда көрсетіледі."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {routes.map((r, i) => (
            <RouteCard key={r.id} route={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
