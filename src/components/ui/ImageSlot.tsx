import { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { asset } from '../../lib/asset';

interface Props {
  src: string | null;
  alt: string;
  className?: string;
  caption?: string;
}

/** Фотосуретке арналған блок: сурет жоқ немесе жүктелмесе — әдемі бос орын көрсетеді */
export default function ImageSlot({ src, alt, className = '', caption }: Props) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_30%_20%,var(--color-forest-100),var(--color-cream-200))] text-forest-800/50 ${className}`}
        role="img"
        aria-label={`${alt}: фотосурет әлі қосылмаған`}
      >
        <ImageIcon className="h-8 w-8" />
        <span className="text-xs font-semibold">Фотосурет орны</span>
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img src={asset(src)} alt={alt} loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover" />
      {caption && (
        <span className="absolute right-2 bottom-2 rounded-full bg-black/45 px-2 py-0.5 text-[0.65rem] font-medium text-white/90 backdrop-blur">
          {caption}
        </span>
      )}
    </div>
  );
}
