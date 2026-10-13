import { lazy, Suspense, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Check, ClipboardCopy, Inbox, MapPin, CirclePlus, ShieldAlert, Trash2 } from 'lucide-react';
import {
  addCustomPlace,
  clearDemoData,
  deleteCustomPlace,
  deleteReport,
  formatCoords,
  formatDate,
  setReportStatus,
  useAllPlaces,
  useCustomPlaces,
  useReports,
} from '../lib/store';
import { routes } from '../data/routes';
import { CATEGORIES } from '../data/categories';
import { REPORT_STATUSES, REPORT_TYPE_LABEL } from '../data/reportTypes';
import PageHeader from '../components/ui/PageHeader';
import EmptyState from '../components/ui/EmptyState';
import { CategoryBadge, Pending, VerifiedBadge } from '../components/ui/Badges';
import { MapLoading } from '../components/map/MapExplorer';
import type { CategoryId, ReportStatus } from '../types';

const TourMap = lazy(() => import('../components/map/TourMap'));

type Tab = 'places' | 'routes' | 'reports' | 'add';
const TABS: { id: Tab; label: string }[] = [
  { id: 'places', label: 'Нысандар' },
  { id: 'routes', label: 'Маршруттар' },
  { id: 'reports', label: 'Экологиялық хабарламалар' },
  { id: 'add', label: 'Жаңа нысан қосу' },
];

/* ---------------- Нысандар ---------------- */
function PlacesTab() {
  const places = useAllPlaces();
  const custom = useCustomPlaces();
  const [copied, setCopied] = useState(false);

  const exportCustom = async () => {
    const data = custom.map(({ custom: _c, ...rest }) => rest);
    const text = JSON.stringify(data, null, 2);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Көшіріп алыңыз:', text);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-forest-900/65">
          Барлығы: <b>{places.length}</b> · places.ts: <b>{places.length - custom.length}</b> · демо-қосылған: <b>{custom.length}</b>
        </p>
        <button type="button" className="btn-outline !py-2" onClick={exportCustom} disabled={custom.length === 0}>
          {copied ? <Check className="h-4 w-4" /> : <ClipboardCopy className="h-4 w-4" />}
          {copied ? 'Көшірілді' : 'Демо-нысандарды JSON ретінде көшіру'}
        </button>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-forest-900/10 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-cream-100 text-xs tracking-wide text-forest-900/60 uppercase">
            <tr>
              <th className="px-4 py-3">Атауы</th>
              <th className="px-4 py-3">Санаты</th>
              <th className="px-4 py-3">Координат</th>
              <th className="px-4 py-3">Дереккөз</th>
              <th className="px-4 py-3">Күйі</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-forest-900/5">
            {places.map((p) => (
              <tr key={p.id} className="align-top">
                <td className="px-4 py-3">
                  <Link to={`/place/${p.id}`} className="font-semibold text-forest-900 hover:underline">
                    {p.name}
                  </Link>
                  <p className="text-xs text-forest-900/45">{p.custom ? 'демо (localStorage)' : 'places.ts'}</p>
                </td>
                <td className="px-4 py-3">
                  <CategoryBadge category={p.category} />
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-forest-900/70">
                  <Pending value={formatCoords(p)} text="Нақтылануда" />
                </td>
                <td className="max-w-[220px] px-4 py-3 text-xs text-forest-900/70">
                  <Pending value={p.source} text="Жоқ" />
                </td>
                <td className="px-4 py-3">
                  <VerifiedBadge verified={p.verified} />
                </td>
                <td className="px-4 py-3 text-right">
                  {p.custom && (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#b54a32] hover:underline"
                      onClick={() => window.confirm(`«${p.name}» нысанын өшіру керек пе?`) && deleteCustomPlace(p.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Өшіру
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------- Маршруттар ---------------- */
function RoutesTab() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {routes.map((r) => (
        <article key={r.id} className="card p-5">
          <h3 className="text-xl font-semibold text-forest-900">{r.name}</h3>
          <dl className="mt-3 space-y-1.5 text-sm">
            <div className="flex justify-between gap-2">
              <dt className="text-forest-900/55">Ұзақтығы</dt>
              <dd>
                <Pending value={r.distance} />
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-forest-900/55">Уақыты</dt>
              <dd>
                <Pending value={r.duration} />
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-forest-900/55">Күрделілігі</dt>
              <dd>
                <Pending value={r.difficulty} />
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-forest-900/55">Нүктелер</dt>
              <dd className="font-semibold">{r.placeIds.length}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-forest-900/55">Жол сызығы</dt>
              <dd>{r.verifiedPath ? 'Бар' : <Pending value={null} text="Жоқ" />}</dd>
            </div>
          </dl>
          <Link to={`/route/${r.id}`} className="btn-outline mt-4 w-full !py-2">
            Маршрутты ашу
          </Link>
        </article>
      ))}
      <p className="text-sm text-forest-900/55 md:col-span-3">
        Маршруттарды <code className="rounded bg-cream-200 px-1.5">src/data/routes.ts</code> файлында өзгертіңіз.
      </p>
    </div>
  );
}

/* ---------------- Хабарламалар ---------------- */
function ReportsTab() {
  const reports = useReports();
  if (reports.length === 0) {
    return (
      <EmptyState title="Әзірге хабарлама жоқ" icon={<Inbox className="h-6 w-6" />}>
        Басты беттегі «Экомониторинг» формасы арқылы жіберілген хабарламалар осында көрінеді.{' '}
        <Link to="/#eco" className="font-bold text-forest-700 underline">
          Форманы ашу
        </Link>
      </EmptyState>
    );
  }
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {reports.map((r) => {
        const status = REPORT_STATUSES.find((s) => s.id === r.status) ?? REPORT_STATUSES[0];
        return (
          <article key={r.id} className="card flex flex-col gap-4 p-5 sm:flex-row">
            {r.photo ? (
              <a href={r.photo} target="_blank" rel="noreferrer" className="shrink-0">
                <img src={r.photo} alt="Хабарлама фотосы" className="h-28 w-full rounded-xl object-cover sm:w-36" />
              </a>
            ) : (
              <div className="grid h-28 w-full shrink-0 place-items-center rounded-xl bg-cream-100 text-xs text-forest-900/40 sm:w-36">
                Фото жоқ
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-forest-800 px-2.5 py-1 text-[0.7rem] font-bold text-white">{REPORT_TYPE_LABEL[r.type]}</span>
                <span className={`rounded-full px-2.5 py-1 text-[0.7rem] font-bold ${status.className}`}>{status.label}</span>
                <span className="text-xs text-forest-900/45">{formatDate(r.createdAt)}</span>
              </div>
              <p className="mt-2 text-sm text-forest-900">{r.description}</p>
              <p className="mt-2 flex items-start gap-1 text-xs text-forest-900/60">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {r.location || '—'}
                {r.latitude !== null && r.longitude !== null && ` (${r.latitude}, ${r.longitude})`}
              </p>
              {r.contact && <p className="mt-1 text-xs text-forest-900/60">Байланыс: {r.contact}</p>}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <label className="sr-only" htmlFor={`st-${r.id}`}>
                  Мәртебе
                </label>
                <select
                  id={`st-${r.id}`}
                  value={r.status}
                  onChange={(e) => setReportStatus(r.id, e.target.value as ReportStatus)}
                  className="input !w-auto !py-2 !text-xs"
                >
                  {REPORT_STATUSES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#b54a32] hover:underline"
                  onClick={() => window.confirm('Хабарламаны өшіру керек пе?') && deleteReport(r.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" /> Өшіру
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/* ---------------- Жаңа нысан қосу ---------------- */
function AddPlaceTab({ onAdded }: { onAdded: () => void }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<CategoryId>('nature');
  const [description, setDescription] = useState('');
  const [significance, setSignificance] = useState('');
  const [source, setSource] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [image, setImage] = useState('');
  const [verified, setVerified] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const latN = lat.trim() === '' ? null : Number(lat.replace(',', '.'));
  const lngN = lng.trim() === '' ? null : Number(lng.replace(',', '.'));
  const coordsValid = latN !== null && lngN !== null && Number.isFinite(latN) && Number.isFinite(lngN);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (name.trim().length < 3) err.name = 'Атауын жазыңыз (кемінде 3 таңба).';
    if (description.trim().length < 10) err.description = 'Қысқаша сипаттама жазыңыз (кемінде 10 таңба).';
    if ((lat.trim() === '') !== (lng.trim() === '')) err.coords = 'Ендік пен бойлықты бірге толтырыңыз немесе екеуін де бос қалдырыңыз.';
    if (latN !== null && (!Number.isFinite(latN) || latN < -90 || latN > 90)) err.coords = 'Ендік −90…90 аралығында болуы керек.';
    if (lngN !== null && (!Number.isFinite(lngN) || lngN < -180 || lngN > 180)) err.coords = 'Бойлық −180…180 аралығында болуы керек.';
    if (verified && (!coordsValid || !source.trim()))
      err.verified = '«Тексерілген» деп белгілеу үшін координат пен дереккөз міндетті.';
    setErrors(err);
    if (Object.keys(err).length) return;

    const res = addCustomPlace({
      name: name.trim(),
      category,
      description: description.trim(),
      historicalSignificance: significance.trim() || 'Мәлімет нақтылануда',
      latitude: coordsValid ? latN : null,
      longitude: coordsValid ? lngN : null,
      image: image.trim() || null,
      source: source.trim() || null,
      verified,
    });
    if (!res.ok) {
      setErrors({ form: 'Браузер деректерді сақтай алмады.' });
      return;
    }
    onAdded();
  };

  const E = ({ k }: { k: string }) => (errors[k] ? <p className="mt-1 text-xs font-semibold text-[#b54a32]">{errors[k]}</p> : null);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={submit} noValidate className="card space-y-4 p-6">
        <div>
          <label className="label" htmlFor="np-name">
            Атауы *
          </label>
          <input id="np-name" className="input" value={name} onChange={(e) => setName(e.target.value)} />
          <E k="name" />
        </div>
        <div>
          <label className="label" htmlFor="np-cat">
            Санаты
          </label>
          <select id="np-cat" className="input" value={category} onChange={(e) => setCategory(e.target.value as CategoryId)}>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="np-desc">
            Сипаттамасы *
          </label>
          <textarea id="np-desc" rows={3} className="input" value={description} onChange={(e) => setDescription(e.target.value)} />
          <E k="description" />
        </div>
        <div>
          <label className="label" htmlFor="np-sig">
            Тарихи немесе табиғи маңызы
          </label>
          <textarea id="np-sig" rows={2} className="input" value={significance} onChange={(e) => setSignificance(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label" htmlFor="np-lat">
              Ендік (lat)
            </label>
            <input id="np-lat" className="input" inputMode="decimal" placeholder="бос = нақтылануда" value={lat} onChange={(e) => setLat(e.target.value)} />
          </div>
          <div>
            <label className="label" htmlFor="np-lng">
              Бойлық (lng)
            </label>
            <input id="np-lng" className="input" inputMode="decimal" placeholder="бос = нақтылануда" value={lng} onChange={(e) => setLng(e.target.value)} />
          </div>
          <p className="col-span-2 -mt-1 text-xs text-forest-900/55">Кеңес: оң жақтағы картаны басып, координатты таңдауға болады.</p>
          <div className="col-span-2">
            <E k="coords" />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="np-src">
            Дереккөз
          </label>
          <input id="np-src" className="input" placeholder="Кітап, беті / сілтеме / куәгер" value={source} onChange={(e) => setSource(e.target.value)} />
        </div>
        <div>
          <label className="label" htmlFor="np-img">
            Сурет жолы
          </label>
          <input id="np-img" className="input" placeholder="/images/places/файл.jpg" value={image} onChange={(e) => setImage(e.target.value)} />
        </div>
        <label className="flex items-start gap-3 rounded-xl bg-cream-100 p-3 text-sm">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-forest-700" checked={verified} onChange={(e) => setVerified(e.target.checked)} />
          <span>
            <b>Тексерілген нысан</b>
            <span className="block text-xs text-forest-900/60">Координат пен дерек жергілікті жерде немесе сенімді көзден расталған.</span>
          </span>
        </label>
        <E k="verified" />
        <E k="form" />
        <button type="submit" className="btn-forest w-full">
          <CirclePlus className="h-4 w-4" /> Нысанды қосу
        </button>
      </form>

      <div className="card overflow-hidden lg:sticky lg:top-24 lg:self-start">
        <Suspense fallback={<MapLoading className="h-[420px]" />}>
          <TourMap
            places={[]}
            fitToPlaces={false}
            className="h-[420px]"
            pick={{
              value: coordsValid ? [latN, lngN] : null,
              onPick: (a, b) => {
                setLat(String(a));
                setLng(String(b));
              },
            }}
          />
        </Suspense>
        <p className="p-4 text-xs text-forest-900/60">
          Картаны басып координат таңдаңыз. Маңызды: картадан таңдалған нүкте — шамамен алынған мән. Оны жергілікті жерде
          тексермейінше «Тексерілген» белгісін қоймаңыз.
        </p>
      </div>
    </div>
  );
}

/* ---------------- Бет ---------------- */
export default function AdminPage() {
  const [params, setParams] = useSearchParams();
  const tabParam = params.get('tab') as Tab | null;
  const tab: Tab = TABS.some((t) => t.id === tabParam) ? (tabParam as Tab) : 'places';
  const reports = useReports();
  const [flash, setFlash] = useState<string | null>(null);

  const go = (t: Tab) => setParams({ tab: t }, { replace: true });

  const clearAll = () => {
    if (window.confirm('Барлық демо-деректер (хабарламалар және демо-нысандар) осы браузерден өшіріледі. Жалғастырасыз ба?')) {
      clearDemoData();
      setFlash('Демо-деректер тазаланды.');
      window.setTimeout(() => setFlash(null), 2500);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Демо-басқару беті"
        title="Жоба деректерін басқару"
        lead="Нысандар, маршруттар және экологиялық хабарламалар бір жерде."
      >
        <div className="mt-6 flex max-w-3xl items-start gap-3 rounded-2xl border border-gold-300/40 bg-gold-300/10 p-4 text-sm text-gold-100">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            Бұл — <b>демонстрациялық</b> бет: құпиясөз де, серверлік авторизация да жоқ, сондықтан ол қауіпсіз әкімші жүйесі
            емес. Барлық өзгерістер тек осы браузердің localStorage жадында сақталады.
          </p>
        </div>
      </PageHeader>

      <div className="container-page py-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0" role="tablist" aria-label="Басқару бөлімдері">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => go(t.id)}
                className={`chip !py-2.5 !text-sm ${tab === t.id ? 'border-forest-800 bg-forest-800 text-white' : 'border-forest-900/15 bg-white text-forest-800 hover:bg-forest-50'}`}
              >
                {t.label}
                {t.id === 'reports' && (
                  <span className={`rounded-full px-1.5 text-xs ${tab === t.id ? 'bg-white/20' : 'bg-forest-100'}`}>{reports.length}</span>
                )}
              </button>
            ))}
          </div>
          <button type="button" onClick={clearAll} className="btn !py-2.5 border border-[#b54a32]/30 text-[#b54a32] hover:bg-[#b54a32]/5">
            <Trash2 className="h-4 w-4" /> Демо-деректерді тазалау
          </button>
        </div>
        {flash && (
          <p className="mt-4 rounded-xl bg-forest-100 px-4 py-3 text-sm font-semibold text-forest-800" role="status">
            {flash}
          </p>
        )}

        <div className="mt-8" role="tabpanel">
          {tab === 'places' && <PlacesTab />}
          {tab === 'routes' && <RoutesTab />}
          {tab === 'reports' && <ReportsTab />}
          {tab === 'add' && (
            <AddPlaceTab
              onAdded={() => {
                setFlash('Нысан қосылды. Ол картада және нысандар тізімінде көрінеді.');
                window.setTimeout(() => setFlash(null), 3000);
                go('places');
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
