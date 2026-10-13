import { Link } from 'react-router';
import Logo from './Logo';
import { NAV_ITEMS } from './Navbar';
import { AUTHOR, SITE } from '../../data/site';

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-white/75">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-sm font-display text-lg text-gold-200 italic">«{SITE.slogan}»</p>
          <p className="mt-3 max-w-sm text-sm">
            Белқарағай ауылының табиғи және тарихи әлеуетін таныстыратын мектеп оқушысының ғылыми жобасы.
          </p>
          <p className="mt-3 text-sm">
            Орындаған оқушы: <span className="text-white">{AUTHOR.student}</span>
            <br />
            Жетекшісі: <span className="text-white">{AUTHOR.supervisor}</span>
          </p>
        </div>
        <div>
          <h3 className="font-sans text-xs font-bold tracking-[0.2em] text-gold-300 uppercase">Бөлімдер</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_ITEMS.map((i) => (
              <li key={i.to}>
                <Link to={i.to} className="hover:text-white">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-sans text-xs font-bold tracking-[0.2em] text-gold-300 uppercase">Құралдар</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/qr" className="hover:text-white">
                QR-гид генераторы
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-white">
                Демо-басқару беті
              </Link>
            </li>
            <li>
              <Link to="/#views" className="hover:text-white">
                Ауыл көрінісі
              </Link>
            </li>
            <li>
              <Link to="/#local" className="hover:text-white">
                Жергілікті әлеует
              </Link>
            </li>
            <li>
              <Link to="/#results" className="hover:text-white">
                Жоба нәтижелері
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} EcoTour Belқарағай. Табиғат. Тарих. Болашақ.</p>
          <p>
            Карта деректері: ©{' '}
            <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" className="underline hover:text-white">
              OpenStreetMap
            </a>{' '}
            қатысушылары
          </p>
        </div>
      </div>
    </footer>
  );
}
