import type { ReactNode } from 'react';
import { useReveal } from '../../lib/useReveal';

interface Props {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeading({ eyebrow, title, lead, align = 'left', light = false }: Props) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <span className={`eyebrow ${light ? 'text-gold-300' : ''}`}>
        <span className={`h-px w-8 ${light ? 'bg-gold-300' : 'bg-brown-500'}`} aria-hidden="true" />
        {eyebrow}
      </span>
      <h2
        className={`mt-4 text-3xl leading-[1.12] font-semibold sm:text-4xl lg:text-5xl ${light ? 'text-white' : 'text-forest-900'}`}
      >
        {title}
      </h2>
      {lead && <p className={`mt-5 text-base leading-relaxed sm:text-lg ${light ? 'text-white/75' : 'text-forest-900/70'}`}>{lead}</p>}
    </div>
  );
}
