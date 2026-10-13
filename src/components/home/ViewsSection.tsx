import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { views, type ViewVideo } from '../../data/views';
import { asset } from '../../lib/asset';
import { useReveal } from '../../lib/useReveal';
import SectionHeading from '../ui/SectionHeading';

/** Постер көрсетіледі; басқанда ғана видео жүктеліп ойнайды (беттің жүктелуін баяулатпау үшін) */
function VideoCard({ v, className = '' }: { v: ViewVideo; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);

  const start = () => {
    setStarted(true);
    requestAnimationFrame(() => ref.current?.play().catch(() => undefined));
  };

  return (
    <figure className={`card group flex flex-col overflow-hidden ${className}`}>
      <div className={`relative flex-1 bg-forest-900 ${v.orientation === 'portrait' ? 'aspect-[9/14]' : 'aspect-video lg:aspect-[21/9]'}`}>
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          src={started ? asset(v.src) : undefined}
          poster={asset(v.poster)}
          controls={started}
          muted
          loop
          playsInline
          preload="none"
          onError={() => started && setFailed(true)}
        />
        {!started && (
          <button
            type="button"
            onClick={start}
            className="absolute inset-0 grid place-items-center bg-gradient-to-t from-forest-950/70 via-transparent to-transparent"
            aria-label={`«${v.title}» видеосын ойнату`}
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-forest-900 shadow-xl transition group-hover:scale-110">
              <Play className="ml-1 h-7 w-7 fill-current" />
            </span>
          </button>
        )}
        {failed && (
          <p className="absolute inset-x-3 bottom-3 rounded-lg bg-black/70 px-3 py-2 text-xs text-white">Видеоны ойнату мүмкін болмады.</p>
        )}
        {v.credit && (
          <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-[0.65rem] font-medium text-white/90 backdrop-blur">
            {v.credit}
          </span>
        )}
      </div>
      <figcaption className="p-5">
        <h3 className="text-xl font-semibold text-forest-900">{v.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-forest-900/65">{v.description}</p>
      </figcaption>
    </figure>
  );
}

export default function ViewsSection() {
  const ref = useReveal<HTMLDivElement>();
  const [main, ...rest] = views;
  if (!main) return null;
  return (
    <section id="views" className="pb-20 sm:pb-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Ауыл көрінісі"
          title={
            <>
              Белқарағай — <span className="text-brown-600 italic">өз көзіңізбен</span>
            </>
          }
          lead="Ауылдың, оны қоршаған табиғаттың және тау аңғарларының бейнекөріністері. Ойнату үшін видеоны басыңыз."
        />
        <div ref={ref} className="reveal mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <VideoCard v={main} className="sm:col-span-2 lg:col-span-3" />
          {rest.map((v) => (
            <VideoCard key={v.id} v={v} />
          ))}
        </div>
      </div>
    </section>
  );
}
