import { lazy, Suspense } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowRight, Clock, Gauge, Info, MapPinned, Ruler } from 'lucide-react';
import { routes } from '../data/routes';
import { hasCoords, useAllPlaces } from '../lib/store';
import PageHeader from '../components/ui/PageHeader';
import { CategoryBadge, VerifiedBadge } from '../components/ui/Badges';
import { MapLoading, OfflineNotice, useTileStatus } from '../components/map/MapExplorer';
import NotFoundPage from './NotFoundPage';
import type { Place } from '../types';

const TourMap = lazy(() => import('../components/map/TourMap'));

export default function RoutePage() {
  const { id } = useParams();
  const route = routes.find((r) => r.id === id);
  const allPlaces = useAllPlaces();
  const tiles = useTileStatus();
  if (!route) return <NotFoundPage what="Маршрут" />;

  const stops = route.placeIds.map((pid) => allPlaces.find((p) => p.id === pid)).filter((p): p is Place => Boolean(p));
  const mapped = stops.filter(hasCoords);
  // Жол сызығы тек барлық нүкте тексерілген және расталған трек болғанда ғана сызылады
  const canDrawPath = Boolean(route.verifiedPath && route.verifiedPath.length > 1 && stops.every((s) => s.verified && hasCoords(s)));

  const stats = [
    { icon: Ruler, label: 'Ұзақтығы', value: route.distance },
    { icon: Clock, label: 'Шамамен жүру уақыты', value: route.duration },
    { icon: Gauge, label: 'Күрделілік деңгейі', value: route.difficulty },
    { icon: MapPinned, label: 'Нүктелер саны', value: String(route.placeIds.length) },
  ].filter((s) => s.value);

  return (
    <>
      <PageHeader eyebrow={route.tagline} title={route.name} lead={route.description} back={{ to: '/#routes', label: 'Барлық маршруттар' }}>
        <dl className="mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-2xl bg-white/10 p-4">
              <dt className="flex items-center gap-1.5 text-xs text-white/60">
                <Icon className="h-3.5 w-3.5" /> {label}
              </dt>
              <dd className="mt-1 font-bold text-white [&_span]:text-gold-200">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_1.4fr] lg:py-14">
        <section>
          <h2 className="text-2xl font-semibold text-forest-900">Маршрут нүктелері</h2>
          <ol className="mt-5 space-y-3">
            {stops.map((p, i) => (
              <li key={p.id} className="card flex gap-4 p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest-800 font-display font-semibold text-gold-300">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap gap-1.5">
                    <CategoryBadge category={p.category} />
                    <VerifiedBadge verified={p.verified} />
                  </div>
                  <p className="mt-2 font-bold text-forest-900">{p.name}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-forest-900/65">{p.description}</p>
                  <Link to={`/place/${p.id}`} className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-forest-700 hover:underline">
                    Толығырақ <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </li>
            ))}
          </ol>
          {stops.length < route.placeIds.length && (
            <p className="mt-3 text-xs text-brown-600">Кейбір нүктелер places.ts ішінде табылмады — id мәндерін тексеріңіз.</p>
          )}
        </section>

        <section className="lg:sticky lg:top-24 lg:self-start">
          <div className="card overflow-hidden">
            <div className="relative">
              <Suspense fallback={<MapLoading className="h-[420px] lg:h-[560px]" />}>
                <TourMap
                  places={stops}
                  path={canDrawPath ? route.verifiedPath : null}
                  onTileError={tiles.onTileError}
                  onTileLoad={tiles.onTileLoad}
                  className="h-[420px] lg:h-[560px]"
                />
              </Suspense>
              {tiles.offline && (
                <div className="absolute inset-x-3 bottom-8 z-[500]">
                  <OfflineNotice />
                </div>
              )}
            </div>
            <div className="flex items-start gap-2 border-t border-forest-900/10 p-4 text-sm text-forest-900/70">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-brown-600" />
              <p>
                Картада: <b>{mapped.length}</b> / {stops.length} нүкте.{' '}
                {canDrawPath
                  ? 'Жол сызығы тексерілген трек бойынша салынған.'
                  : 'Нақты жол сызығы тексерілген координаттар мен жол деректері енгізілгенде ғана сызылады.'}
                {mapped.length < stops.length && ' Координаты расталмаған нүктелер картада көрсетілмейді.'}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
