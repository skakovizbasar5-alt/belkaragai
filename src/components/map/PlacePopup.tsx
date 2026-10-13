import { Link } from 'react-router';
import { ArrowRight, BookOpen, MapPin } from 'lucide-react';
import type { Place } from '../../types';
import { CategoryBadge, VerifiedBadge } from '../ui/Badges';
import ImageSlot from '../ui/ImageSlot';
import { formatCoords } from '../../lib/store';

/** Белгіні басқанда ашылатын ақпараттық терезе */
export default function PlacePopup({ place }: { place: Place }) {
  const coords = formatCoords(place);
  return (
    <div className="font-sans text-forest-950">
      <ImageSlot src={place.image} alt={place.name} className="h-32 w-full" />
      <div className="space-y-2 p-4">
        <div className="flex flex-wrap gap-1.5">
          <CategoryBadge category={place.category} />
          <VerifiedBadge verified={place.verified} />
        </div>
        <h3 className="font-display text-lg leading-snug font-semibold text-forest-900">{place.name}</h3>
        <p className="!my-0 text-[0.8rem] leading-relaxed text-forest-900/75">{place.description}</p>
        {place.historicalSignificance && (
          <p className="!my-0 text-[0.78rem] leading-relaxed">
            <span className="font-bold text-brown-700">Маңызы: </span>
            {place.historicalSignificance}
          </p>
        )}
        {coords && (
          <p className="!my-0 flex items-center gap-1 text-[0.75rem] text-forest-900/60">
            <MapPin className="h-3.5 w-3.5" /> {coords}
          </p>
        )}
        {place.source && (
          <p className="!my-0 flex items-start gap-1 text-[0.75rem] text-forest-900/60">
            <BookOpen className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {place.source}
          </p>
        )}
        <Link
          to={`/place/${place.id}`}
          className="!mt-3 inline-flex items-center gap-1 rounded-full bg-forest-800 px-3.5 py-2 text-xs font-bold !text-white hover:bg-forest-700"
        >
          Жеке бет және QR-код <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
