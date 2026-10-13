import { Landmark, Leaf, Recycle } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { useReveal } from '../../lib/useReveal';
import ImageSlot from '../ui/ImageSlot';
import { AUTHOR } from '../../data/site';

const PILLARS = [
  {
    icon: Leaf,
    title: 'Табиғи мұра',
    text: 'Өлкенің орманы, өзен-бұлақтары, тау бөктері мен демалыс орындарын бір цифрлық картада жинау.',
  },
  {
    icon: Landmark,
    title: 'Тарихи жады',
    text: 'Ауылдың атауы, бұрынғы Медведка кезеңі және тарихи даму жолы туралы дереккөзге сүйенген материалдар.',
  },
  {
    icon: Recycle,
    title: 'Экологиялық жауапкершілік',
    text: 'Тұрғындар мен туристер байқаған экологиялық мәселелерді жинап, туған өлкені бірге сақтау.',
  },
];

export default function AboutSection() {
  const imgRef = useReveal<HTMLDivElement>();
  const gridRef = useReveal<HTMLDivElement>();
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="Жоба туралы"
              title={
                <>
                  Бір өлке. Мың тарих. <span className="text-brown-600 italic">Шексіз мүмкіндік.</span>
                </>
              }
              lead="EcoTour Belқарағай — Белқарағай ауылының табиғи және тарихи әлеуетін цифрлық форматта таныстыратын платформа. Туристік нысандар бір интерактивті картада жиналады, маршруттар ұсынылады, ал әрбір тұрғын мен қонақ экологиялық мәселе туралы хабарлай алады."
            />
            <p className="mt-5 text-forest-900/70">
              Жобаның басты қағидасы — <b className="text-forest-900">шынайылық</b>: сайттағы әр дерек дереккөзімен беріледі, ал
              расталмаған мәлімет «Нақтылануда» деп ашық белгіленеді.
            </p>
            <dl className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-forest-900/10 bg-white px-5 py-4">
                <dt className="text-xs font-bold tracking-wider text-brown-600 uppercase">Орындаған оқушы</dt>
                <dd className="mt-1 font-semibold text-forest-900">{AUTHOR.student}</dd>
              </div>
              <div className="rounded-2xl border border-forest-900/10 bg-white px-5 py-4">
                <dt className="text-xs font-bold tracking-wider text-brown-600 uppercase">Жетекшісі</dt>
                <dd className="mt-1 font-semibold text-forest-900">{AUTHOR.supervisor}</dd>
              </div>
            </dl>
          </div>
          <div ref={imgRef} className="reveal relative">
            <ImageSlot
              src="/images/views/aerial.jpg"
              alt="Белқарағай ауылы құс ұшар биіктіктен"
              className="aspect-[4/3] rounded-[2rem] shadow-2xl shadow-forest-900/20"
            />
            <div className="absolute -bottom-6 -left-4 hidden rounded-2xl bg-forest-800 px-6 py-5 text-white shadow-xl sm:block">
              <p className="font-display text-3xl font-semibold text-gold-300">3</p>
              <p className="text-sm text-white/80">негізгі бағыт</p>
            </div>
          </div>
        </div>

        <div ref={gridRef} className="reveal mt-20 grid gap-5 md:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, text }, i) => (
            <article key={title} className="card group p-7 transition hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-forest-800 text-gold-300 transition group-hover:bg-gold-400 group-hover:text-forest-900">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="font-display text-4xl text-forest-900/10">0{i + 1}</span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-forest-900">{title}</h3>
              <p className="mt-3 leading-relaxed text-forest-900/65">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
