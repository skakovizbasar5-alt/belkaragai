import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

export const NAV_ITEMS = [
  { label: 'Басты бет', to: '/#top' },
  { label: 'Туристік карта', to: '/#map' },
  { label: 'Маршруттар', to: '/#routes' },
  { label: 'Тарих', to: '/#history' },
  { label: 'Экомониторинг', to: '/#eco' },
  { label: 'Жоба туралы', to: '/#about' },
];

export default function Navbar({ overlay }: { overlay: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Бет ауысқанда мобильді мәзірді жабу
  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  // Мобильді мәзір ашық тұрғанда Esc арқылы жабу
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const transparent = overlay && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[1000] transition-all duration-300 ${
        transparent ? 'bg-transparent' : 'bg-forest-900/95 shadow-lg shadow-black/10 backdrop-blur'
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4 lg:h-20" aria-label="Негізгі навигация">
        <Link to="/#top" aria-label="EcoTour Belқарағай — басты бет">
          <Logo light />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="rounded-full px-3.5 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full text-white hover:bg-white/10 lg:hidden"
          aria-label={open ? 'Мәзірді жабу' : 'Мәзірді ашу'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-white/10 bg-forest-900 lg:hidden">
          <ul className="container-page flex flex-col py-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="block rounded-xl px-3 py-3.5 text-base font-semibold text-white/90 hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
              <Link to="/qr" className="rounded-xl bg-white/5 px-3 py-3 text-center text-sm font-semibold text-gold-200">
                QR-гид
              </Link>
              <Link to="/admin" className="rounded-xl bg-white/5 px-3 py-3 text-center text-sm font-semibold text-gold-200">
                Демо-басқару
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
