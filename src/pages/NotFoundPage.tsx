import { Link } from 'react-router';
import { Compass } from 'lucide-react';

export default function NotFoundPage({ what = 'Бет' }: { what?: string }) {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-cream-100 px-4 pt-24 pb-16 text-center">
      <div>
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest-100 text-forest-700">
          <Compass className="h-8 w-8" />
        </span>
        <h1 className="mt-6 text-4xl font-semibold text-forest-900">{what} табылмады</h1>
        <p className="mt-3 text-forest-900/65">Сілтеме ескірген немесе қате енгізілген болуы мүмкін.</p>
        <div className="mt-8 flex flex-col justify-center gap-2 sm:flex-row">
          <Link to="/" className="btn-forest">
            Басты бетке
          </Link>
          <Link to="/#map" className="btn-outline">
            Туристік карта
          </Link>
        </div>
      </div>
    </section>
  );
}
