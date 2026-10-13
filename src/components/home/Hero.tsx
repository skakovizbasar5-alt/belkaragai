import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ChevronDown, Map, Route } from 'lucide-react';
import { SITE } from '../../data/site';
import { asset } from '../../lib/asset';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Қозғалысты азайту баптауы қосулы болса — видео тоқтатылады, тек постер көрсетіледі
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reducedMotion) v.pause();
    else v.play().catch(() => undefined);
  }, [reducedMotion]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[linear-gradient(160deg,#2f6b45_0%,#1f3d2b_45%,#0c1a12_100%)] text-white"
    >
      {/* Видео-фон. Файл: public/videos/belqaragai-intro.mp4 */}
      {!videoFailed && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={asset(SITE.heroVideo)}
          poster={asset(SITE.heroPoster)}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onError={() => setVideoFailed(true)}
        />
      )}
      {/* Видео жүктелмесе — постер суреті, ол да болмаса — табиғи градиент фон қалады */}
      {videoFailed && (
        <img
          src={asset(SITE.heroPoster)}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      )}

      {/* Қоюлау градиент қабат — мәтін анық оқылу үшін */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,26,18,.55)_0%,rgba(12,26,18,.25)_35%,rgba(12,26,18,.55)_70%,rgba(12,26,18,.92)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,rgba(12,26,18,.55),transparent_60%)]" />

      <div className="container-page relative z-10 pt-28 pb-36 sm:pt-32">
        <div className="max-w-4xl">
          <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-gold-300/40 bg-black/20 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-gold-200 uppercase backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-300" />
            {SITE.slogan}
          </p>
          <h1
            className="animate-fade-up mt-6 text-[2.6rem] leading-[1.02] font-semibold tracking-tight sm:text-6xl lg:text-[5.5rem]"
            style={{ animationDelay: '120ms', textShadow: '0 2px 30px rgba(0,0,0,.35)' }}
          >
            БЕЛҚАРАҒАЙҒА
            <br />
            <span className="text-gold-300 italic">ҚОШ КЕЛДІҢІЗ!</span>
          </h1>
          <p
            className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl"
            style={{ animationDelay: '240ms' }}
          >
            «Табиғаттың тынысын сезініп, тарихи мұраны танып, туған өлкенің көркем жерлерін жаңа қырынан ашыңыз».
          </p>
          <div className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '360ms' }}>
            <Link to="/#map" className="btn-gold !px-7 !py-4 !text-base">
              <Map className="h-5 w-5" /> Картаны ашу
            </Link>
            <Link to="/#routes" className="btn-ghost-light !px-7 !py-4 !text-base">
              <Route className="h-5 w-5" /> Маршруттарды көру
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="container-page flex items-end justify-between gap-4 pb-7">
          <p className="font-display text-lg text-white/90 italic sm:text-2xl">
            Табиғат. <span className="text-gold-300">Тарих.</span> Болашақ.
          </p>
          <Link
            to="/#about"
            className="flex flex-col items-center gap-1 text-[0.65rem] font-bold tracking-[0.2em] text-white/80 uppercase hover:text-white"
            aria-label="Төмен жылжу"
          >
            <span className="hidden sm:block">Төмен</span>
            <span className="grid h-11 w-7 place-items-start justify-center rounded-full border-2 border-white/60 pt-1.5">
              <ChevronDown className="animate-scroll-cue h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
