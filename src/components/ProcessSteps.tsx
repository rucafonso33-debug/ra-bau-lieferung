import { processSteps } from '../config/business';

export function ProcessSteps() {
  return (
    <section className="bg-[#10293e] text-white">
      <div className="mx-auto max-w-[1540px] px-5 py-16 lg:px-10 lg:py-20">
        <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#d7aa57]">So funktioniert die Anfrage</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-[-.04em]">Ein klarer Weg vom Raum zur schriftlichen Offerte.</h2>
        <div className="mt-9 grid gap-px bg-white/12 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <div key={step} className="bg-[#10293e] p-6 lg:p-8"><span className="text-3xl font-black text-[#d7aa57]">0{index + 1}</span><p className="mt-4 text-sm font-bold leading-6">{step}</p></div>
          ))}
        </div>
        <p className="mt-8 text-sm text-white/62">Muster auf Anfrage. Verfügbarkeit und Kosten werden je Hersteller und Referenz bestätigt.</p>
      </div>
    </section>
  );
}
