import { useId, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { CircleCheck, ImagePlus, LoaderCircle, LocateFixed, Send, Trash2 } from 'lucide-react';
import { REPORT_TYPES } from '../../data/reportTypes';
import { addReport } from '../../lib/store';
import { resizeImage } from '../../lib/image';
import type { ReportType } from '../../types';

type Errors = Partial<Record<'type' | 'description' | 'location' | 'photo' | 'contact' | 'form', string>>;

const MAX_FILE_MB = 15;

export default function ReportForm() {
  const uid = useId();
  const [type, setType] = useState<ReportType | ''>('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [contact, setContact] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [locating, setLocating] = useState(false);
  const [done, setDone] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!type) e.type = 'Мәселе түрін таңдаңыз.';
    if (description.trim().length < 15) e.description = 'Мәселені кемінде 15 таңбамен сипаттаңыз.';
    if (description.length > 1000) e.description = 'Сипаттама 1000 таңбадан аспауы керек.';
    if (location.trim().length < 3 && !coords) e.location = 'Орналасқан жерін жазыңыз немесе геолокацияны қосыңыз.';
    if (contact.length > 120) e.contact = 'Байланыс ақпараты тым ұзын.';
    return e;
  };

  const onFile = async (file: File | undefined) => {
    setErrors((e) => ({ ...e, photo: undefined }));
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrors((e) => ({ ...e, photo: 'Тек сурет файлын (JPG, PNG, WEBP) таңдаңыз.' }));
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setErrors((e) => ({ ...e, photo: `Файл көлемі ${MAX_FILE_MB} МБ-тан аспауы керек.` }));
      return;
    }
    try {
      setPhoto(await resizeImage(file));
    } catch {
      setErrors((e) => ({ ...e, photo: 'Суретті оқу мүмкін болмады. Басқа файлды таңдап көріңіз.' }));
    }
  };

  const locate = () => {
    if (!('geolocation' in navigator)) {
      setErrors((e) => ({ ...e, location: 'Бұл құрылғыда геолокация қолжетімсіз.' }));
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords([Number(pos.coords.latitude.toFixed(6)), Number(pos.coords.longitude.toFixed(6))]);
        setErrors((e) => ({ ...e, location: undefined }));
        setLocating(false);
      },
      () => {
        setErrors((e) => ({ ...e, location: 'Орналасуды анықтау мүмкін болмады. Жерін мәтінмен жазыңыз.' }));
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const reset = () => {
    setType('');
    setDescription('');
    setLocation('');
    setCoords(null);
    setPhoto(null);
    setContact('');
    setErrors({});
    setDone(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = Object.keys(e)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    setBusy(true);
    const res = addReport({
      type: type as ReportType,
      description: description.trim(),
      location: location.trim(),
      latitude: coords?.[0] ?? null,
      longitude: coords?.[1] ?? null,
      photo,
      contact: contact.trim(),
    });
    setBusy(false);
    if (!res.ok) {
      setErrors({
        form:
          res.reason === 'quota'
            ? 'Браузер жады толып қалды. Фотосуретсіз жіберіп көріңіз немесе демо-басқару бетінде ескі хабарламаларды өшіріңіз.'
            : 'Браузер деректерді сақтауға рұқсат бермеді (мүмкін, жеке режим қосулы).',
      });
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="card flex flex-col items-center p-8 text-center sm:p-12" role="status">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-forest-100 text-forest-700">
          <CircleCheck className="h-9 w-9" />
        </span>
        <h3 className="mt-5 text-2xl font-semibold text-forest-900">Рақмет! Хабарлама сәтті сақталды.</h3>
        <p className="mt-3 max-w-md text-sm text-forest-900/70">
          Бұл — демо-нұсқа: хабарлама <b>тек осы құрылғының браузерінде</b> (localStorage) сақталды. Ол әкімдікке немесе басқа
          ұйымға автоматты түрде жіберілмейді.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button type="button" onClick={reset} className="btn-forest">
            Тағы хабарлама жіберу
          </button>
          <Link to="/admin?tab=reports" className="btn-outline">
            Сақталған хабарламалар
          </Link>
        </div>
      </div>
    );
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} className="mt-1.5 text-xs font-semibold text-[#b54a32]">
        {errors[k]}
      </p>
    ) : null;
  const invalid = (k: keyof Errors) => (errors[k] ? '!border-[#b54a32] !ring-[#b54a32]/20' : '');

  return (
    <form onSubmit={onSubmit} noValidate className="card space-y-5 p-6 sm:p-8">
      <div>
        <label htmlFor={`${uid}-type`} className="label">
          Мәселе түрі <span className="text-[#b54a32]">*</span>
        </label>
        <select
          id={`${uid}-type`}
          value={type}
          onChange={(e) => setType(e.target.value as ReportType)}
          className={`input ${invalid('type')}`}
          aria-invalid={!!errors.type}
          aria-describedby={errors.type ? `${uid}-type-err` : undefined}
        >
          <option value="">— Таңдаңыз —</option>
          {REPORT_TYPES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
        {err('type')}
      </div>

      <div>
        <label htmlFor={`${uid}-description`} className="label">
          Сипаттамасы <span className="text-[#b54a32]">*</span>
        </label>
        <textarea
          id={`${uid}-description`}
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Не байқадыңыз? Мәселенің көлемі, қашан байқалғаны…"
          className={`input resize-y ${invalid('description')}`}
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? `${uid}-description-err` : undefined}
        />
        <div className="flex justify-between">
          {err('description') ?? <span />}
          <span className="mt-1.5 text-xs text-forest-900/45">{description.length}/1000</span>
        </div>
      </div>

      <div>
        <label htmlFor={`${uid}-location`} className="label">
          Орналасқан жері <span className="text-[#b54a32]">*</span>
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id={`${uid}-location`}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Мысалы: өзен жағасы, көпірдің жанында"
            className={`input ${invalid('location')}`}
            aria-invalid={!!errors.location}
            aria-describedby={errors.location ? `${uid}-location-err` : undefined}
          />
          <button type="button" onClick={locate} disabled={locating} className="btn-outline shrink-0">
            {locating ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <LocateFixed className="h-4 w-4" />}
            Геолокация
          </button>
        </div>
        {coords && (
          <p className="mt-1.5 text-xs text-forest-700">
            Координат анықталды: {coords[0]}, {coords[1]}{' '}
            <button type="button" className="font-semibold text-[#b54a32] underline" onClick={() => setCoords(null)}>
              алып тастау
            </button>
          </p>
        )}
        {err('location')}
      </div>

      <div>
        <span className="label" id={`${uid}-photo-label`}>
          Фотосурет <span className="font-normal text-forest-900/50">(міндетті емес)</span>
        </span>
        {photo ? (
          <div className="flex items-center gap-4 rounded-xl border border-forest-900/10 p-3">
            <img src={photo} alt="Таңдалған фото" className="h-20 w-28 rounded-lg object-cover" />
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#b54a32]"
              onClick={() => {
                setPhoto(null);
                if (fileRef.current) fileRef.current.value = '';
              }}
            >
              <Trash2 className="h-4 w-4" /> Өшіру
            </button>
          </div>
        ) : (
          <label
            htmlFor={`${uid}-photo`}
            className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-forest-900/15 bg-cream-50 px-4 py-6 text-center text-sm text-forest-900/60 transition hover:border-forest-600 hover:bg-forest-50"
          >
            <ImagePlus className="h-7 w-7 text-forest-600" />
            <span>
              <b className="text-forest-800">Фото таңдау</b> немесе камерамен түсіру
            </span>
            <span className="text-xs">JPG, PNG, WEBP · {MAX_FILE_MB} МБ-қа дейін</span>
          </label>
        )}
        <input
          ref={fileRef}
          id={`${uid}-photo`}
          type="file"
          accept="image/*"
          className="sr-only"
          aria-labelledby={`${uid}-photo-label`}
          onChange={(e) => onFile(e.target.files?.[0])}
        />
        {err('photo')}
      </div>

      <div>
        <label htmlFor={`${uid}-contact`} className="label">
          Байланыс ақпараты <span className="font-normal text-forest-900/50">(міндетті емес)</span>
        </label>
        <input
          id={`${uid}-contact`}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Телефон немесе e-mail"
          className={`input ${invalid('contact')}`}
          aria-invalid={!!errors.contact}
        />
        {err('contact')}
      </div>

      {errors.form && (
        <p className="rounded-xl bg-[#b54a32]/10 px-4 py-3 text-sm font-semibold text-[#8a3524]" role="alert">
          {errors.form}
        </p>
      )}
      {Object.keys(errors).some((k) => errors[k as keyof Errors]) && !errors.form && (
        <p className="text-sm font-semibold text-[#b54a32]" role="alert">
          Форманы толтыруда қате бар — белгіленген өрістерді тексеріңіз.
        </p>
      )}

      <button type="submit" disabled={busy} className="btn-gold w-full !py-4 !text-base">
        {busy ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        Хабарлама жіберу
      </button>
      <p className="text-center text-xs text-forest-900/50">
        Демо режим: сервер қосылмаған, хабарлама тек осы браузерде сақталады.
      </p>
    </form>
  );
}
