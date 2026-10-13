import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

/** Ішкі беттердің (QR, басқару, нысан) жоғарғы тақырыбы */
export default function PageHeader({
  eyebrow,
  title,
  lead,
  back = { to: '/', label: 'Басты бетке' },
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  back?: { to: string; label: string };
  children?: ReactNode;
}) {
  return (
    <section className="bg-forest-900 pt-24 pb-12 text-white lg:pt-32">
      <div className="container-page">
        <Link to={back.to} className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-200 hover:text-gold-100">
          <ArrowLeft className="h-4 w-4" /> {back.label}
        </Link>
        <p className="mt-6 text-xs font-bold tracking-[0.2em] text-gold-300 uppercase">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl lg:text-5xl">{title}</h1>
        {lead && <p className="mt-4 max-w-2xl text-white/75">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
