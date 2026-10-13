import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import QRCode from 'qrcode';
import { TriangleAlert, Download, Info, Printer, QrCode } from 'lucide-react';
import { useAllPlaces } from '../lib/store';
import { checkPublicUrl, defaultBaseUrl, placeUrl } from '../lib/qr';
import { CATEGORY_BY_ID } from '../data/categories';
import { SITE } from '../data/site';
import PageHeader from '../components/ui/PageHeader';
import Logo from '../components/layout/Logo';

export default function QrPage() {
  const places = useAllPlaces();
  const [params, setParams] = useSearchParams();
  const initial = params.get('place');
  const [placeId, setPlaceId] = useState<string>(
    initial && places.some((p) => p.id === initial) ? initial : (places[0]?.id ?? ''),
  );
  const [base, setBase] = useState(defaultBaseUrl);
  const [qr, setQr] = useState<{ dataUrl: string; url: string; placeId: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const place = places.find((p) => p.id === placeId);
  const check = useMemo(() => checkPublicUrl(base), [base]);

  // Нысан немесе мекенжай өзгерсе — ескі QR-код жарамсыз болады
  useEffect(() => {
    setQr(null);
    setError(null);
  }, [placeId, base]);

  const generate = async () => {
    if (!place) return;
    if (!check.ok) {
      setError(check.reason);
      return;
    }
    const url = placeUrl(check.url, place.id);
    try {
      const dataUrl = await QRCode.toDataURL(url, {
        width: 640,
        margin: 2,
        errorCorrectionLevel: 'M',
        color: { dark: '#142a1d', light: '#ffffff' },
      });
      setQr({ dataUrl, url, placeId: place.id });
      setParams({ place: place.id }, { replace: true });
    } catch {
      setError('QR-кодты жасау мүмкін болмады.');
    }
  };

  const meta = place ? CATEGORY_BY_ID[place.category] : null;

  return (
    <>
      <PageHeader
        eyebrow="QR-гид"
        title="Нысанға QR-код жасау"
        lead="QR-код сканерленгенде нысанның сайттағы жеке ақпараттық беті ашылады. Кодты PNG ретінде жүктеп, басып шығаруға арналған карточка жасаңыз."
      />

      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_1fr] lg:py-14">
        {/* Баптаулар */}
        <section className="card space-y-5 p-6 sm:p-8">
          <div>
            <label htmlFor="qr-place" className="label">
              1. Нысанды таңдаңыз
            </label>
            <select id="qr-place" className="input" value={placeId} onChange={(e) => setPlaceId(e.target.value)}>
              {places.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                  {p.custom ? ' (демо)' : ''}
                </option>
              ))}
            </select>
            {place?.custom && (
              <p className="mt-2 flex items-start gap-1.5 text-xs text-brown-700">
                <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Бұл нысан тек осы браузерде сақталған. QR басқа телефонда жұмыс істеуі үшін оны src/data/places.ts файлына
                көшіріп, сайтты қайта жариялаңыз.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="qr-base" className="label">
              2. Сайттың жария мекенжайы
            </label>
            <input
              id="qr-base"
              className={`input ${check.ok ? '' : '!border-[#b54a32]'}`}
              value={base}
              onChange={(e) => setBase(e.target.value)}
              placeholder="https://ecotour-belqaragai.netlify.app"
              inputMode="url"
            />
            {!check.ok ? (
              <p className="mt-2 flex items-start gap-1.5 rounded-xl bg-[#b54a32]/10 p-3 text-xs text-[#8a3524]" role="alert">
                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" /> {check.reason}
              </p>
            ) : (
              <p className="mt-2 text-xs text-forest-900/55">
                QR мына мекенжайға апарады: <b className="break-all">{place ? placeUrl(check.url, place.id) : '—'}</b>
              </p>
            )}
            <p className="mt-2 flex items-start gap-1.5 text-xs text-forest-900/55">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Тұрақты мекенжайды .env файлындағы VITE_SITE_URL арқылы беруге болады (README қараңыз).
            </p>
          </div>

          <button type="button" className="btn-gold w-full !py-4" onClick={generate} disabled={!place || !check.ok}>
            <QrCode className="h-5 w-5" /> 3. QR-код жасау
          </button>
          {error && (
            <p className="text-sm font-semibold text-[#b54a32]" role="alert">
              {error}
            </p>
          )}
        </section>

        {/* Нәтиже және басып шығаруға арналған карточка */}
        <section>
          {qr && place && meta ? (
            <div className="space-y-4">
              <article id="print-card" className="card mx-auto max-w-md overflow-hidden">
                <div className="flex items-center justify-between bg-forest-900 px-6 py-4">
                  <Logo light />
                  <span className="text-[0.65rem] font-bold tracking-[0.18em] text-gold-200 uppercase">QR-гид</span>
                </div>
                <div className="p-6 text-center">
                  <span
                    className="inline-flex rounded-full px-3 py-1 text-xs font-bold text-white"
                    style={{ backgroundColor: meta.color }}
                  >
                    {meta.short}
                  </span>
                  <h2 className="mt-3 text-2xl font-semibold text-forest-900">{place.name}</h2>
                  <p className="mx-auto mt-2 line-clamp-3 max-w-sm text-sm text-forest-900/65">{place.description}</p>
                  <img src={qr.dataUrl} alt={`${place.name} — QR-код`} className="mx-auto mt-5 w-56 rounded-xl border border-forest-900/10" />
                  <p className="mt-3 text-sm font-semibold text-forest-900">Сканерлеп, толығырақ біліңіз</p>
                  <p className="mt-1 text-[0.7rem] break-all text-forest-900/45">{qr.url}</p>
                </div>
                <p className="bg-cream-100 px-6 py-3 text-center font-display text-sm text-brown-700 italic">«{SITE.slogan}»</p>
              </article>
              <div className="mx-auto flex max-w-md flex-col gap-2 sm:flex-row">
                <a href={qr.dataUrl} download={`qr-${qr.placeId}.png`} className="btn-forest flex-1">
                  <Download className="h-4 w-4" /> PNG жүктеу
                </a>
                <button type="button" className="btn-outline flex-1" onClick={() => window.print()}>
                  <Printer className="h-4 w-4" /> Карточканы басып шығару
                </button>
              </div>
            </div>
          ) : (
            <div className="grid h-full min-h-[360px] place-items-center rounded-3xl border-2 border-dashed border-forest-900/15 bg-cream-50 p-8 text-center">
              <div>
                <QrCode className="mx-auto h-14 w-14 text-forest-900/25" />
                <p className="mt-3 font-semibold text-forest-900">QR-код осы жерде пайда болады</p>
                <p className="mt-1 text-sm text-forest-900/55">Нысанды таңдап, жария мекенжайды тексеріп, «QR-код жасау» батырмасын басыңыз.</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
