import { Link } from 'react-router';
import { Droplets, Info, Leaf, Trash, TreeDeciduous } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import ReportForm from '../eco/ReportForm';
import { useReports } from '../../lib/store';

const TIPS = [
  { icon: Trash, text: 'Қоқысты өзіңізбен бірге алып кетіңіз' },
  { icon: Droplets, text: 'Су көздерін ластамаңыз' },
  { icon: TreeDeciduous, text: 'Ағаштар мен өсімдіктерге зиян келтірмеңіз' },
  { icon: Leaf, text: 'Белгіленген соқпақтармен жүріңіз' },
];

export default function EcoSection() {
  const reports = useReports();
  return (
    <section id="eco" className="bg-cream-200/60 py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Экологиялық мониторинг"
            title={
              <>
                Туған өлке тазалығы — <span className="text-brown-600 italic">ортақ жауапкершілік</span>
              </>
            }
            lead="Табиғатқа зиян келтіретін жағдайды байқасаңыз — хабарлаңыз. Жиналған мәліметтер өлкенің экологиялық картасын жасауға көмектеседі."
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {TIPS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 rounded-2xl bg-white/70 p-4 text-sm font-semibold text-forest-900">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-forest-100 text-forest-700">
                  <Icon className="h-5 w-5" />
                </span>
                {text}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-gold-500/40 bg-gold-100 p-5 text-sm text-brown-800">
            <Info className="mt-0.5 h-5 w-5 shrink-0" />
            <p>
              <b>Демо режим.</b> Сервер қосылмаған, сондықтан хабарламалар осы құрылғының браузерінде (localStorage) сақталады
              және ешқандай ұйымға автоматты түрде жіберілмейді. Осы құрылғыда сақталғаны: <b>{reports.length}</b>.{' '}
              <Link to="/admin?tab=reports" className="font-bold underline">
                Демо-басқару бетінде қарау
              </Link>
            </p>
          </div>
        </div>
        <ReportForm />
      </div>
    </section>
  );
}
