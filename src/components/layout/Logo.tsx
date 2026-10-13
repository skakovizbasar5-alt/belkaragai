export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden="true">
        <rect width="40" height="40" rx="12" fill={light ? 'rgba(255,255,255,.14)' : '#1f3d2b'} />
        <path d="M20 6 11 20h4.5L9.5 29H18v5h4v-5h8.5l-6-9H29z" fill="#e2c275" />
      </svg>
      <span className="leading-none">
        <span className={`block text-[0.65rem] font-bold tracking-[0.22em] uppercase ${light ? 'text-gold-200' : 'text-brown-600'}`}>
          EcoTour
        </span>
        <span className={`font-display text-lg font-semibold ${light ? 'text-white' : 'text-forest-900'}`}>Belқарағай</span>
      </span>
    </span>
  );
}
