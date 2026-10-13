import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { asset } from '../../lib/asset';
import { SITE } from '../../data/site';

const PREF_KEY = 'ecotour.music';

function readPref(): 'on' | 'off' {
  try {
    return localStorage.getItem(PREF_KEY) === 'off' ? 'off' : 'on';
  } catch {
    return 'on';
  }
}
function savePref(v: 'on' | 'off') {
  try {
    localStorage.setItem(PREF_KEY, v);
  } catch {
    /* елемеу */
  }
}

/**
 * Фондық әуен: сайт ашылғанда бірден қосылады.
 * Браузер дыбысты автоматты қосуға рұқсат бермесе — пайдаланушының алғашқы әрекетінде
 * (бетті басқанда, пернені басқанда) қосылады. Батырма арқылы өшіріп-қосуға болады,
 * таңдау браузерде сақталады.
 */
export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const wantOn = useRef(readPref() === 'on');

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    // Алғашқы әрекетте қосу (автоматты ойнатуға тыйым салынған жағдайда)
    const events: (keyof WindowEventMap)[] = ['pointerdown', 'keydown', 'touchend'];
    const onGesture = (e: Event) => {
      // Әуен батырмасының өзін басқанда — батырманың өз әрекеті орындалады
      if (btnRef.current && e.target instanceof Node && btnRef.current.contains(e.target)) return;
      if (wantOn.current && audio.paused) audio.play().catch(() => undefined);
      removeGesture();
    };
    const removeGesture = () => events.forEach((ev) => window.removeEventListener(ev, onGesture, true));

    if (wantOn.current) {
      audio.play().catch(() => {
        events.forEach((ev) => window.addEventListener(ev, onGesture, true));
      });
    }

    // Басқа қойындыға өткенде — уақытша тоқтату
    const onVisibility = () => {
      if (document.hidden) audio.pause();
      else if (wantOn.current) audio.play().catch(() => undefined);
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      removeGesture();
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      wantOn.current = false;
      savePref('off');
      audio.pause();
    } else {
      wantOn.current = true;
      savePref('on');
      audio.play().catch(() => setUnavailable(true));
    }
  };

  if (unavailable) return null;

  return (
    <>
      <audio ref={audioRef} src={asset(SITE.backgroundMusic)} loop preload="auto" onError={() => setUnavailable(true)} />
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'Әуенді өшіру' : 'Әуенді қосу'}
        className="fixed right-4 bottom-4 z-[1100] inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-forest-900/90 px-4 text-sm font-semibold text-white shadow-xl shadow-black/25 backdrop-blur transition hover:bg-forest-800 sm:right-6 sm:bottom-6"
      >
        {playing ? (
          <>
            <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="music-bar w-[3px] rounded-full bg-gold-300" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </span>
            <Volume2 className="h-5 w-5 sm:hidden" />
            <span className="hidden sm:inline">Әуенді өшіру</span>
          </>
        ) : (
          <>
            <VolumeX className="h-5 w-5 text-gold-300" />
            <span className="hidden sm:inline">Әуенді қосу</span>
          </>
        )}
      </button>
    </>
  );
}
