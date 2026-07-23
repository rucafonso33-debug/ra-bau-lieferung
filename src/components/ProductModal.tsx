import { Check, Mail, MessageCircle, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { emailUrl, whatsappUrl } from '../config/business';
import type { InteriorProduct } from '../types';
import { ProductGallery } from './ProductGallery';

export function ProductModal({ product, selected, onAdd, onRemove, onClose }: { product: InteriorProduct; selected: boolean; onAdd: (components?: string[]) => void; onRemove: () => void; onClose: () => void }) {
  const allComponents = useMemo(() => [...(product.components ?? []), ...(product.optionalComponents ?? [])], [product]);
  const [chosen, setChosen] = useState<string[]>(product.components ?? []);
  const concept = product.brand === 'Raumkonzept';

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  const toggleComponent = (component: string) => setChosen((current) => current.includes(component) ? current.filter((item) => item !== component) : [...current, component]);
  const message = `Guten Tag, ich interessiere mich für ${product.brand ?? ''} ${product.name}, Referenz ${product.reference}.${concept ? ` Gewählte Komponenten: ${chosen.join(', ')}.` : ''} Bitte prüfen Sie Eignung, Verfügbarkeit und Offerte.`;

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-[#071927]/76 p-3 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" aria-label={product.name} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="mx-auto grid max-w-6xl bg-white shadow-2xl lg:grid-cols-[1.08fr_.92fr]">
        <div className="p-4 sm:p-6"><ProductGallery product={product} /></div>
        <div className="relative p-6 sm:p-9">
          <button onClick={onClose} aria-label="Schliessen" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#eef2f4] text-[#10293e]"><X /></button>
          <p className="pr-14 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#8e6725]">{product.brand} · {product.reference}</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-[-.04em] text-[#10293e]">{product.name}</h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-[#536b79]">{product.spec}</p>
          <p className="mt-5 text-sm leading-7 text-[#667b87]">{product.details}</p>

          <dl className="mt-6 grid grid-cols-2 gap-px bg-[#dbe3e7] text-sm">
            {[['Format', product.format], ['Oberfläche', product.finish], ['Anwendung', product.application], ['Verfügbarkeit', product.lead || 'Projektbezogen']].map(([label, value]) => <div key={label} className="bg-[#f6f8f9] p-4"><dt className="text-[9px] font-extrabold uppercase tracking-[.14em] text-[#7d8f99]">{label}</dt><dd className="mt-2 font-bold text-[#10293e]">{value}</dd></div>)}
          </dl>

          {concept && <div className="mt-6 border border-[#d8e1e6] bg-[#f7f9fa] p-5">
            <p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#8e6725]">Komponenten auswählen</p>
            <p className="mt-2 text-xs leading-5 text-[#667b87]">Das Konzept wird als 1 Set angefragt. Einzelne Komponenten können vor dem Senden entfernt oder ergänzt werden.</p>
            <div className="mt-4 space-y-2">{allComponents.map((component) => {
              const active = chosen.includes(component);
              const optional = product.optionalComponents?.includes(component);
              return <button key={component} onClick={() => toggleComponent(component)} className={`flex min-h-11 w-full items-center justify-between gap-3 border px-4 text-left text-xs font-bold ${active ? 'border-[#004b87] bg-white text-[#10293e]' : 'border-[#d7e0e5] bg-[#eef2f3] text-[#6b7e89]'}`}><span>{component}{optional ? ' · optional' : ''}</span><span className={`flex h-6 w-6 items-center justify-center rounded-full ${active ? 'bg-[#004b87] text-white' : 'bg-white'}`}>{active && <Check size={14} />}</span></button>;
            })}</div>
            {product.substitutions?.length ? <p className="mt-4 text-xs leading-5 text-[#667b87]"><strong>Mögliche Anpassung:</strong> {product.substitutions.join(' · ')}</p> : null}
          </div>}

          <div className="mt-5 text-[11px] leading-5 text-[#71848f]"><p><strong>Herstellerkatalog:</strong> {product.sourceCatalog ?? 'Projektbezogen dokumentiert'}</p><p>{product.sourcePage}</p><p className="mt-2">Muster auf Anfrage. Verfügbarkeit und Kosten werden je Hersteller und Referenz bestätigt.</p></div>

          <div className="mt-7 grid gap-2 sm:grid-cols-2">
            <button onClick={selected ? onRemove : () => onAdd(concept ? chosen : undefined)} disabled={!selected && concept && chosen.length === 0} className={`min-h-12 px-4 text-sm font-extrabold disabled:bg-[#b7c2c8] ${selected ? 'bg-[#fff0ee] text-[#9b3f3b]' : 'bg-[#004b87] text-white'}`}>{selected ? 'Aus Anfrage entfernen' : concept ? `${chosen.length} Komponenten als Set anfragen` : 'Zur Anfrage hinzufügen'}</button>
            <a href={whatsappUrl(message)} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#cbd7dc] text-sm font-extrabold text-[#004b87]"><MessageCircle size={17} /> WhatsApp</a>
            <a href={emailUrl(`Anfrage: ${product.name}`, message)} className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#cbd7dc] text-sm font-extrabold text-[#004b87] sm:col-span-2"><Mail size={17} /> E-Mail vorbereiten</a>
          </div>
        </div>
      </div>
    </div>
  );
}
