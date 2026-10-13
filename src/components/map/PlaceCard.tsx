import { Link } from 'react-router';
import { Crosshair, QrCode } from 'lucide-react';
import type { Place } from '../../types';
import { CATEGORY_BY_ID } from '../../data/categories';
import { hasCoords } from '../../lib/store';
import { VerifiedBadge } from '../ui/Badges';

interface Props {
  place: Place;
  active: boolean;
  onShow: (id: string) => void;
}

export default function PlaceCard({ place, active, onShow }: Props) {
  const meta = CATEGORY_BY_ID[place.category];
  const Icon = meta.icon;
  const mappable = hasCoords(place);
  return (
    <article
      className={`rounded-2xl border bg-white p-4 transition ${
        active ? 'border-gold-400 shadow-[0_0_0_3px_rgba(226,194,117,.45)]' : 'border-forest-900/10 hover:border-forest-900/25'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white" style={{ backgroundColor: meta.color }}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[0.7rem] font-bold tracking-wide text-forest-900/50 uppercase">{meta.short}</p>
          <h3 className="font-sans text-[0.95rem] leading-snug font-bold text-forest-900">{place.name}</h3>
        </div>
        <VerifiedBadge verified={place.verified} />
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-forest-900/65">{place.description}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {mappable && (
        <button
          type="button"
          onClick={() => onShow(place.id)}
          title="Картадан көрсету"
          className="inline-flex items-center gap-1.5 rounded-full bg-forest-800 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-forest-700 disabled:bg-forest-900/15 disabled:text-forest-900/50"
        >
          <Crosshair className="h-3.5 w-3.5" />
          Картадан көрсету
        </button>
        )}
        <Link
          to={`/place/${place.id}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-forest-900/15 px-3.5 py-2 text-xs font-bold text-forest-800 hover:bg-forest-50"
        >
          <QrCode className="h-3.5 w-3.5" /> Толығырақ
        </Link>
      </div>
    </article>
  );
}
