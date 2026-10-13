import { Link } from 'react-router';
import { Download, Printer, QrCode, ScanLine } from 'lucide-react';
import { useReveal } from '../../lib/useReveal';

const STEPS = [
  { icon: QrCode, title: 'Нысанды таңдаңыз', text: 'Тізімнен туристік нысанды белгілеңіз.' },
  { icon: Download, title: 'QR-код жасаңыз', text: 'Код нысанның жеке бетіне апарады. PNG ретінде жүктеуге болады.' },
  { icon: Printer, title: 'Басып шығарыңыз', text: 'Шағын ақпараттық карточканы нысанның жанына орнатыңыз.' },
];

export default function QrPromo() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="qr" className="pb-20 sm:pb-28">
      <div className="container-page">
        <div
          ref={ref}
          className="reveal relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#7a5535,#4a3220)] p-8 text-white sm:p-12"
        >
          <ScanLine className="absolute -right-10 -bottom-10 h-64 w-64 text-white/5" aria-hidden="true" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-gold-200 uppercase">QR-гид</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Әр нысанның өз QR-коды</h2>
              <p className="mt-4 text-white/75">
                Турист кодты телефонымен сканерлеп, сол жердің тарихы мен сипаттамасын бірден оқиды.
              </p>
              <Link to="/qr" className="btn-gold mt-7">
                <QrCode className="h-5 w-5" /> QR-гидті ашу
              </Link>
            </div>
            <ol className="grid gap-4 sm:grid-cols-3">
              {STEPS.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <Icon className="h-6 w-6 text-gold-200" />
                    <span className="font-display text-2xl text-white/25">{i + 1}</span>
                  </div>
                  <p className="mt-4 font-bold">{title}</p>
                  <p className="mt-1 text-sm text-white/70">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
