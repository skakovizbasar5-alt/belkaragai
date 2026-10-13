import { BedDouble, Compass, PhoneCall, ShoppingBasket, UtensilsCrossed, type LucideIcon } from 'lucide-react';
import { services } from '../../data/services';
import SectionHeading from '../ui/SectionHeading';
import { useReveal } from '../../lib/useReveal';
import type { ServiceKind } from '../../types';

const ICONS: Record<ServiceKind, LucideIcon> = {
  stay: BedDouble,
  food: UtensilsCrossed,
  products: ShoppingBasket,
  guide: Compass,
  contacts: PhoneCall,
};

export default function LocalSection() {
  const ref = useReveal<HTMLDivElement>();
  // Расталған жазба жоқ болса — бөлім сайтта көрсетілмейді
  const filled = services.filter((s) => s.entries.length > 0);
  if (filled.length === 0) return null;
  return (
    <section id="local" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Жергілікті әлеует"
          title={
            <>
              Жергілікті мүмкіндіктерді <span className="text-brown-600 italic">бірге ашайық</span>
            </>
          }
          lead="Туристерге қажетті жергілікті қызметтер. Деректер тек иелерінің келісімімен және расталғаннан кейін енгізіледі."
        />
        <div ref={ref} className="reveal mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {filled.map((s) => {
            const Icon = ICONS[s.kind];
            return (
              <article key={s.id} className="card flex flex-col p-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-100 text-brown-700">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-sans text-lg font-bold text-forest-900">{s.title}</h3>
                <p className="mt-1 text-sm text-forest-900/60">{s.hint}</p>
                {s.entries.length > 0 ? (
                  <ul className="mt-4 space-y-3">
                    {s.entries.map((e) => (
                      <li key={e.name} className="rounded-xl bg-cream-100 p-3 text-sm">
                        <p className="font-bold text-forest-900">{e.name}</p>
                        <p className="text-forest-900/70">{e.contact}</p>
                        <p className="text-forest-900/60">{e.address}</p>
                        {e.note && <p className="mt-1 text-xs text-brown-600">{e.note}</p>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <dl className="mt-4 space-y-2 rounded-xl border border-dashed border-forest-900/20 p-3 text-xs">
                    {['Атауы', 'Байланыс', 'Мекенжайы'].map((f) => (
                      <div key={f} className="flex items-center justify-between gap-2">
                        <dt className="text-forest-900/50">{f}</dt>
                        <dd className="h-2 w-16 rounded-full bg-forest-900/10" aria-label="толтырылмаған" />
                      </div>
                    ))}
                    <p className="pt-1 font-semibold text-brown-600">Толтыруға арналған үлгі</p>
                  </dl>
                )}
              </article>
            );
          })}
        </div>
        <p className="mt-6 text-sm text-forest-900/55">
          Деректерді <code className="rounded bg-cream-200 px-1.5">src/data/services.ts</code> файлында толтырыңыз.
        </p>
      </div>
    </section>
  );
}
