import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import MusicToggle from './MusicToggle';
import { SITE } from '../../data/site';

/** Бет ауысқанда немесе #бөлім сілтемесі басылғанда дұрыс жерге айналдыру */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  // Жаңа бетке өткенде — беттің басына
  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0 });
  }, [pathname]);

  // #бөлім сілтемесі (сол сілтемені қайта басқанда да) — сол бөлімге
  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    // Бет толық салынғанша сәл күту
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
    return () => window.clearTimeout(t);
  }, [pathname, hash, key]);
  return null;
}

export default function Layout() {
  const { pathname } = useLocation();
  const overlayNav = pathname === '/';
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollManager />
      <a
        href="#main"
        className="sr-only z-[2000] rounded-full bg-gold-300 px-4 py-2 font-semibold text-forest-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Негізгі мазмұнға өту
      </a>
      <Navbar overlay={overlayNav} />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {SITE.backgroundMusic && <MusicToggle />}
    </div>
  );
}
