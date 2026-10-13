import { lazy, Suspense } from 'react';
import { Link, useParams } from 'react-router';
import { BookOpen, Info, MapPin, QrCode, Sparkles } from 'lucide-react';
import { formatCoords, hasCoords, useAllPlaces } from '../lib/store';
import PageHeader from '../components/ui/PageHeader';
import ImageSlot from '../components/ui/ImageSlot';
import { CategoryBadge, VerifiedBadge } from '../components/ui/Badges';
import { MapLoading } from '../components/map/MapExplorer';
import NotFoundPage from './NotFoundPage';

const TourMap = lazy(() => import('../components/map/TourMap'));

/** Нысанның жеке ақпараттық беті — QR-код осы бетке апарады: /place/:id */
export default function PlacePage() {
  const { id } = useParams();
  const places = useAllPlaces();
  const place = places.find((p) => p.id === id);
  if (!place) return <NotFoundPage what="Нысан" />;

  const coords = formatCoords(place);

  return (
    <>
      <PageHeader eyebrow="Нысан туралы" title={place.name} back={{ to: '/#map', label: 'Картаға оралу' }}>
        <div className="mt-5 flex flex-wrap gap-2">
          <CategoryBadge category={place.category} />
          <VerifiedBadge verified={place.verified} />
        </div>
      </PageHeader>

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1.4fr_1fr] lg:py-14">
        <div className="space-y-6">
          <ImageSlot src={place.image} alt={place.name} className="aspect-[16/9] rounded-3xl" caption={place.image ? place.imageCredit : undefined} />
          <section className="card p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-forest-900">Сипаттама</h2>
            <p className="mt-3 leading-relaxed text-forest-900/75">{place.description}</p>
            <h2 className="mt-8 flex items-center gap-2 text-2xl font-semibold text-forest-900">
              <Sparkles className="h-5 w-5 text-gold-500" /> Тарихи немесе табиғи маңызы
            </h2>
            <p className="mt-3 leading-relaxed text-forest-900/75">{place.historicalSignificance}</p>
          </section>
          {place.custom && (
            <p className="flex items-start gap-2 rounded-2xl bg-gold-100 p-4 text-sm text-brown-800">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              Бұл нысан демо-басқару бетінен қосылған және тек осы браузерде сақталған. Басқа құрылғыларда көріну үшін оны{' '}
              <code>src/data/places.ts</code> файлына көшіріңіз.
            </p>
          )}
        </div>

        <aside className="space-y-6">
          <section className="card p-6">
            <h2 className="font-sans text-sm font-bold tracking-wider text-forest-900/50 uppercase">Мәліметтер</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="flex items-center gap-1.5 font-semibold text-forest-900">
                  <MapPin className="h-4 w-4 text-forest-600" /> Координаттары
                </dt>
                <dd className="mt-1 text-forest-900/70">
                  {coords ? (
                    <>
                      {coords}
                      {!place.verified && <span className="ml-1 text-brown-600">(тексерілмеген)</span>}
                    </>
                  ) : (
                    <span className="text-brown-600 italic">Мәлімет нақтылануда</span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-1.5 font-semibold text-forest-900">
                  <BookOpen className="h-4 w-4 text-forest-600" /> Дереккөз
                </dt>
                <dd className="mt-1 break-words text-forest-900/70">
                  {place.source ?? <span className="text-brown-600 italic">Дереккөз нақтылануда</span>}
                </dd>
              </div>
            </dl>
            <Link to={`/qr?place=${encodeURIComponent(place.id)}`} className="btn-forest mt-6 w-full">
              <QrCode className="h-4 w-4" /> Осы нысанның QR-коды
            </Link>
          </section>

          {hasCoords(place) && (
            <section className="card overflow-hidden">
              <Suspense fallback={<MapLoading className="h-72" />}>
                <TourMap places={[place]} selectedId={place.id} className="h-72" />
              </Suspense>
            </section>
          )}
        </aside>
      </div>
    </>
  );
}
