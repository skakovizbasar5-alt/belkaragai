import { lazy, Suspense, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router';
import { Info, Search, WifiOff, X } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { MAP_DEFAULT_VIEW } from '../../data/site';
import { hasCoords, useAllPlaces } from '../../lib/store';
import type { CategoryId } from '../../types';
import PlaceCard from './PlaceCard';
import EmptyState from '../ui/EmptyState';

const TourMap = lazy(() => import('./TourMap'));

export function MapLoading({ className = '' }: { className?: string }) {
  return (
    <div className={`grid place-items-center bg-forest-100 ${className}`} role="status">
      <div className="flex flex-col items-center gap-3 text-forest-800">
        <span className="h-10 w-10 animate-spin rounded-full border-4 border-forest-300 border-t-forest-800" />
        <span className="text-sm font-semibold">Карта жүктелуде…</span>
      </div>
    </div>
  );
}

/** Интернет немесе карта плиткалары жоқ болса ескерту */
export function useTileStatus() {
  const [tileErrors, setTileErrors] = useState(0);
  const [online, setOnline] = useState(() => (typeof navigator === 'undefined' ? true : navigator.onLine));
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);
  return {
    offline: !online || tileErrors >= 3,
    onTileError: () => setTileErrors((n) => n + 1),
    onTileLoad: () => setTileErrors(0),
  };
}

export function OfflineNotice() {
  return (
    <div className="flex items-start gap-2 rounded-xl bg-brown-700 px-4 py-3 text-sm text-white" role="alert">
      <WifiOff className="mt-0.5 h-4 w-4 shrink-0" />
      <p>
        Карта плиткалары жүктелмеді — интернет байланысы жоқ болуы мүмкін. Нысандар тізімі төменде (немесе жанында) толық
        қолжетімді.
      </p>
    </div>
  );
}

export default function MapExplorer() {
  const places = useAllPlaces();
  const [active, setActive] = useState<Set<CategoryId>>(new Set());
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [focusNonce, setFocusNonce] = useState(0);
  const tiles = useTileStatus();
  const mapRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLocaleLowerCase('kk');
    return places.filter((p) => {
      if (active.size > 0 && !active.has(p.category)) return false;
      if (!q) return true;
      return (
        p.name.toLocaleLowerCase('kk').includes(q) ||
        p.description.toLocaleLowerCase('kk').includes(q)
      );
    });
  }, [places, active, deferredQuery]);

  const mappedCount = filtered.filter(hasCoords).length;
  const anyCoords = places.some(hasCoords);

  // Сүзгі өзгергенде таңдалған нысан тізімнен шығып кетсе — таңдауды алып тастау
  useEffect(() => {
    if (selectedId && !filtered.some((p) => p.id === selectedId)) setSelectedId(null);
  }, [filtered, selectedId]);

  const toggle = (id: CategoryId) =>
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const showOnMap = (id: string) => {
    setSelectedId(id);
    setFocusNonce((n) => n + 1);
    // Карта экранда толық көрінбесе — соған айналдыру (телефонда карта тізімнің үстінде орналасқан)
    const el = mapRef.current;
    if (el) {
      const r = el.getBoundingClientRect();
      const navH = 80;
      if (r.top < navH || r.bottom > window.innerHeight) {
        const mobile = window.matchMedia('(max-width: 1023px)').matches;
        el.scrollIntoView({ behavior: 'smooth', block: mobile ? 'start' : 'center' });
      }
    }
  };

  return (
    <div className="card overflow-hidden">
      {/* Іздеу және сүзгілер */}
      <div className="border-b border-forest-900/10 p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative block lg:w-80">
            <span className="sr-only">Нысанды атауы бойынша іздеу</span>
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-forest-900/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Нысан атауы бойынша іздеу…"
              className="input !rounded-full !pl-10"
            />
          </label>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-wrap lg:px-0 lg:pb-0" role="group" aria-label="Санат бойынша сүзгі">
            <button
              type="button"
              onClick={() => setActive(new Set())}
              aria-pressed={active.size === 0}
              className={`chip ${active.size === 0 ? 'border-forest-800 bg-forest-800 text-white' : 'border-forest-900/15 bg-white text-forest-800 hover:bg-forest-50'}`}
            >
              Барлығы
            </button>
            {CATEGORIES.map((c) => {
              const on = active.has(c.id);
              const Icon = c.icon;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggle(c.id)}
                  aria-pressed={on}
                  className={`chip ${on ? 'text-white' : 'border-forest-900/15 bg-white text-forest-800 hover:bg-forest-50'}`}
                  style={on ? { backgroundColor: c.color, borderColor: c.color } : undefined}
                >
                  <Icon className="h-3.5 w-3.5" style={on ? undefined : { color: c.color }} />
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
        <p className="mt-3 text-xs text-forest-900/55" aria-live="polite">
          Табылды: <b>{filtered.length}</b> нысан · картада: <b>{mappedCount}</b>
          {active.size > 0 || query ? (
            <button
              type="button"
              onClick={() => {
                setActive(new Set());
                setQuery('');
              }}
              className="ml-2 inline-flex items-center gap-0.5 font-semibold text-brown-600 underline-offset-2 hover:underline"
            >
              <X className="h-3 w-3" /> Сүзгіні тазалау
            </button>
          ) : null}
        </p>
      </div>

      <div className="grid lg:grid-cols-[400px_1fr]">
        {/* Карта (телефонда — жоғарыда) */}
        <div ref={mapRef} className="relative order-1 scroll-mt-20 lg:order-2">
          <Suspense fallback={<MapLoading className="h-[380px] sm:h-[460px] lg:h-[640px]" />}>
            <TourMap
              places={filtered}
              selectedId={selectedId}
              focusNonce={focusNonce}
              onSelect={setSelectedId}
              onTileError={tiles.onTileError}
              onTileLoad={tiles.onTileLoad}
              className="h-[380px] sm:h-[460px] lg:h-[640px]"
            />
          </Suspense>
          <div className="pointer-events-none absolute inset-x-3 bottom-8 z-[500] space-y-2 sm:left-auto sm:max-w-sm">
            {tiles.offline && <OfflineNotice />}
            {!anyCoords && (
              <div className="pointer-events-auto flex items-start gap-2 rounded-xl bg-white/95 px-4 py-3 text-xs text-forest-900 shadow-lg backdrop-blur">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-brown-600" />
                <p>
                  Расталған координаттар әлі енгізілмеген, сондықтан картада белгі жоқ. Нысандарды{' '}
                  <code className="rounded bg-cream-200 px-1">src/data/places.ts</code> файлында немесе{' '}
                  <Link to="/admin" className="font-bold text-forest-700 underline">
                    демо-басқару бетінде
                  </Link>{' '}
                  қосыңыз.
                  {MAP_DEFAULT_VIEW.approximate && ' Карта көрінісі — аудан аумағының шамамен алынған бағыты.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Нысандар тізімі */}
        <div className="order-2 border-t border-forest-900/10 bg-cream-50 lg:order-1 lg:border-t-0 lg:border-r">
          <div className="max-h-[640px] space-y-3 overflow-y-auto p-4">
            {filtered.length === 0 ? (
              <EmptyState title="Ештеңе табылмады">Іздеу сөзін немесе санат сүзгісін өзгертіп көріңіз.</EmptyState>
            ) : (
              filtered.map((p) => <PlaceCard key={p.id} place={p} active={p.id === selectedId} onShow={showOnMap} />)
            )}
          </div>
        </div>
      </div>

      {/* Аңыз (легенда) */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-forest-900/10 px-5 py-3 text-xs text-forest-900/70">
        {CATEGORIES.map((c) => (
          <span key={c.id} className="inline-flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: c.color }} /> {c.label}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full border-2 border-dashed border-white bg-[#8a8f8b] ring-1 ring-[#8a8f8b]" /> Тексерілмеген нүкте
        </span>
      </div>
    </div>
  );
}
