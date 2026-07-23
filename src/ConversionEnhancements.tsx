import { ArrowRight, CheckCircle2, ClipboardList, MessageCircle, Ruler, Sparkles } from 'lucide-react';
import { projectEntries, selectionBenefits, whatsappUrl } from './storefrontConfig';
import type { PageRoute } from './types';

const benefitIcons = {
  style: Sparkles,
  technical: Ruler,
  confirmed: CheckCircle2,
} as const;

export function ProjectStart({ onNavigate }: { onNavigate: (page: PageRoute) => void }) {
  return (
    <section className="border-b border-[#d9e1e5] bg-white">
      <div className="mx-auto max-w-[1540px] px-5 py-14 lg:px-10 lg:py-20">
        <div className="max-w-3xl">
          <p className="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#9a6e22]">Schneller Einstieg nach Raum</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-[-.04em] text-[#10293e] sm:text-5xl">Was möchten Sie gestalten?</h2>
          <p className="mt-4 text-base leading-7 text-[#5c7280]">Beginnen Sie beim Raum oder bei einer bekannten Referenz. Danach sehen Sie nur die passenden Materialien und Komponenten.</p>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {projectEntries.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.route)}
              className="group overflow-hidden rounded-[18px] border border-[#d7e0e5] bg-[#f8fafb] text-left shadow-[0_8px_24px_rgba(16,41,62,.05)] transition hover:-translate-y-1 hover:border-[#b9cbd5] hover:shadow-[0_18px_42px_rgba(16,41,62,.11)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004b87] focus-visible:ring-offset-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#e9edef]">
                <img src={item.image} alt={item.imageAlt} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                <span className="absolute left-3 top-3 rounded-full bg-white/94 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[.12em] text-[#004b87] shadow-sm">{item.tag}</span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl font-bold leading-tight text-[#10293e]">{item.title}</h3>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eaf1f5] text-[#004b87] transition group-hover:translate-x-1"><ArrowRight size={17} /></span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#637884]">{item.copy}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CategoryAdvisor({ category, onNavigate }: { category: string; onNavigate: (page: PageRoute) => void }) {
  const message = `Guten Tag, ich interessiere mich für den Bereich ${category}. Ich sende Ihnen Raumfoto, ungefähre Masse, Stilwunsch und Lieferort. Bitte helfen Sie mir bei der Auswahl und Kombination.`;

  return (
    <section className="mx-auto max-w-[1540px] px-5 pt-10 lg:px-10 lg:pt-14">
      <div className="grid overflow-hidden rounded-[20px] border border-[#d3dee4] bg-white shadow-[0_12px_35px_rgba(16,41,62,.06)] lg:grid-cols-[1.25fr_.75fr]">
        <div className="p-6 sm:p-8 lg:p-10">
          <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#9a6e22]">Persönliche Auswahlhilfe</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-[-.035em] text-[#10293e]">Noch nicht sicher, welches Produkt passt?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5e7380]">Senden Sie Raumfoto, ungefähre Masse, gewünschten Stil und Lieferort. Wir grenzen die Auswahl ein, statt Ihnen einfach mehr Produkte zu zeigen.</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {selectionBenefits.map((benefit) => {
              const Icon = benefitIcons[benefit.id];
              return (
                <div key={benefit.id} className="rounded-xl bg-[#f4f7f8] p-4">
                  <Icon className="h-5 w-5 text-[#9a6e22]" />
                  <p className="mt-3 text-xs font-extrabold text-[#10293e]">{benefit.title}</p>
                  <p className="mt-1 text-[11px] leading-5 text-[#667b87]">{benefit.copy}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3 bg-[#10293e] p-6 text-white sm:p-8 lg:p-10">
          <a href={whatsappUrl(message)} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#d7aa57] px-5 py-4 text-sm font-extrabold text-[#10293e] transition hover:bg-[#e3bd6e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#10293e]"><MessageCircle size={18} /> Auswahl per WhatsApp</a>
          <button onClick={() => onNavigate('quote-planner')} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/8 px-5 py-4 text-sm font-extrabold text-white transition hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><ClipboardList size={18} /> Anfrage zusammenstellen</button>
          <p className="text-center text-[10px] leading-4 text-white/55">Keine automatische Bestellung. Jede Position wird vor der Offerte geprüft.</p>
        </div>
      </div>
    </section>
  );
}

export function MobileQuoteDock({ count, onNavigate }: { count: number; onNavigate: (page: PageRoute) => void }) {
  if (!count) return null;

  return (
    <>
      <div aria-hidden="true" className="h-24 md:hidden" />
      <div className="fixed inset-x-3 z-[70] rounded-2xl border border-white/15 bg-[#10293e]/96 p-2.5 text-white shadow-[0_18px_50px_rgba(5,20,31,.35)] backdrop-blur md:hidden" style={{ bottom: 'max(.75rem, env(safe-area-inset-bottom))' }}>
        <button onClick={() => onNavigate('quote-planner')} className="flex min-h-12 w-full items-center justify-between gap-4 rounded-xl px-3 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e0b75e]">
          <span className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d7aa57] text-sm font-black text-[#10293e]">{count}</span>
            <span className="min-w-0">
              <span className="block text-xs font-extrabold">Projektanfrage öffnen</span>
              <span className="block truncate text-[10px] text-white/60">Produkte, Mengen und Notizen prüfen</span>
            </span>
          </span>
          <ArrowRight size={18} className="shrink-0 text-[#e0b75e]" />
        </button>
      </div>
    </>
  );
}
