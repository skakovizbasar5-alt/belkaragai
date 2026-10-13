import { useState } from 'react';
import { BookOpen, FilePenLine, Quote } from 'lucide-react';
import { BOOK_SOURCE, history } from '../../data/history';
import SectionHeading from '../ui/SectionHeading';
import { useReveal } from '../../lib/useReveal';
import type { HistoryEntry } from '../../types';

function isReady(e: HistoryEntry) {
  return Boolean(e.text.trim() && e.source);
}

export default function HistorySection() {
  const [activeId, setActiveId] = useState(history[0]?.id ?? '');
  const active = history.find((h) => h.id === activeId) ?? history[0];
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="history" className="relative overflow-hidden bg-forest-900 py-20 text-white sm:py-28">
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-gold-400/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-page relative">
        <SectionHeading
          light
          eyebrow="Белқарағай тарихы"
          title={
            <>
              Ауылдың <span className="text-gold-300 italic">тарихи жады</span>
            </>
          }
          lead={
            <>
              Уақыт шкаласындағы кезеңді таңдаңыз. Материалдар {BOOK_SOURCE} үзінділері және басқа дереккөздер негізінде
              толықтырылады. Дереккөзсіз мәлімет факт ретінде көрсетілмейді.
            </>
          }
        />

        <div ref={ref} className="reveal mt-12">
          {history.length === 0 ? (
            <p className="rounded-2xl border border-white/15 p-8 text-center text-white/70">Әзірге дерек жоқ.</p>
          ) : (
            <>
              {/* Уақыт шкаласы */}
              <div className="relative">
                <div className="absolute top-[22px] right-0 left-0 h-px bg-white/20" aria-hidden="true" />
                <ol className="relative -mx-4 flex gap-2 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0" role="tablist" aria-label="Тарихи кезеңдер">
                  {history.map((h, i) => {
                    const on = h.id === active.id;
                    return (
                      <li key={h.id} className="min-w-[150px] flex-1">
                        <button
                          type="button"
                          role="tab"
                          aria-selected={on}
                          aria-controls="history-panel"
                          onClick={() => setActiveId(h.id)}
                          className="group flex w-full flex-col items-start gap-3 text-left"
                        >
                          <span
                            className={`grid h-11 w-11 place-items-center rounded-full border-2 font-display text-sm font-semibold transition ${
                              on
                                ? 'border-gold-300 bg-gold-300 text-forest-950'
                                : 'border-white/30 bg-forest-900 text-white/70 group-hover:border-gold-300/70'
                            }`}
                          >
                            {i + 1}
                          </span>
                          <span>
                            <span className={`block text-xs font-bold tracking-wider uppercase ${on ? 'text-gold-300' : 'text-white/45'}`}>
                              {h.period ?? 'Кезеңі нақтылануда'}
                            </span>
                            <span className={`mt-1 block text-sm font-semibold ${on ? 'text-white' : 'text-white/70'}`}>{h.title}</span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Таңдалған материал */}
              <article
                id="history-panel"
                role="tabpanel"
                key={active.id}
                className="animate-fade-up mt-8 grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-10 lg:grid-cols-[1fr_300px]"
              >
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] text-gold-300 uppercase">{active.period ?? 'Кезеңі нақтылануда'}</p>
                  <h3 className="mt-3 text-3xl font-semibold">{active.title}</h3>
                  {active.text.trim() ? (
                    <div className="mt-5 flex gap-3">
                      <Quote className="h-6 w-6 shrink-0 text-gold-300/60" />
                      <p className="text-lg leading-relaxed text-white/85">{active.text}</p>
                    </div>
                  ) : (
                    <div className="mt-5 flex items-start gap-3 rounded-2xl border border-dashed border-gold-300/40 bg-gold-300/5 p-5">
                      <FilePenLine className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" />
                      <p className="text-white/75">
                        Материал дайындалуда. Бұл карточкаға {BOOK_SOURCE} үзіндісі дереккөзімен бірге енгізіледі
                        (<code className="rounded bg-white/10 px-1 text-sm">src/data/history.ts</code>).
                      </p>
                    </div>
                  )}
                  {active.tags.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {active.tags.map((t) => (
                        <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <aside className="rounded-2xl bg-forest-950/50 p-5">
                  <p className="flex items-center gap-2 text-xs font-bold tracking-wider text-gold-300 uppercase">
                    <BookOpen className="h-4 w-4" /> Дереккөз
                  </p>
                  <p className="mt-2 text-sm text-white/80">{active.source ?? 'Дереккөз нақтылануда'}</p>
                  <p
                    className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                      isReady(active) ? 'bg-forest-500/40 text-forest-100' : 'bg-gold-300/15 text-gold-200'
                    }`}
                  >
                    {isReady(active) ? 'Дереккөзі көрсетілген' : 'Мәлімет нақтылануда'}
                  </p>
                </aside>
              </article>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
