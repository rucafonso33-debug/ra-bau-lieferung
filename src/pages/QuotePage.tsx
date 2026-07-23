import { ClipboardList, Mail, MessageCircle, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { business, emailUrl, whatsappUrl, type AppPage } from '../config/business';
import type { QuoteItem } from '../types';
import { SmartImage } from '../components/SmartImage';

export function QuotePage({ items, onUpdate, onRemove, onNavigate }: { items: QuoteItem[]; onUpdate: (id: string, patch: Partial<QuoteItem>) => void; onRemove: (id: string) => void; onNavigate: (page: AppPage) => void }) {
  const [customer, setCustomer] = useState({ type: 'Privatkunde', name: '', email: '', phone: '', postal: '', city: '', timeline: '', message: '' });

  const summary = useMemo(() => {
    const products = items.map((item, index) => {
      const components = item.selectedComponents?.length ? `\n   Komponenten: ${item.selectedComponents.join(', ')}` : '';
      const note = item.customNote ? `\n   Notiz: ${item.customNote}` : '';
      return `${index + 1}. ${item.brand ? `${item.brand} · ` : ''}${item.name}\n   ${item.quantity} ${item.unit}${item.reference ? ` · ${item.reference}` : ''}${components}${note}`;
    }).join('\n\n');
    return `Guten Tag,\n\nich möchte eine Projektanfrage senden.\n\nKundentyp: ${customer.type}\nName / Firma: ${customer.name || '-'}\nE-Mail: ${customer.email || '-'}\nTelefon: ${customer.phone || '-'}\nLieferort: ${customer.postal} ${customer.city}\nGewünschter Zeitraum: ${customer.timeline || '-'}\n\nProdukte:\n${products || '-'}\n\nProjekt / Foto-Beschreibung:\n${customer.message || '-'}\n\nBitte prüfen Sie Referenzen, Eignung, Verfügbarkeit, Transport, Einfuhr und schriftliche Offerte.`;
  }, [items, customer]);

  return <main className="bg-[#f3f5f6]">
    <section className="border-b border-[#d9e1e5] bg-white"><div className="mx-auto max-w-[1200px] px-5 py-14 lg:px-10"><p className="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#9a6e22]">Projektanfrage</p><h1 className="mt-3 font-display text-5xl font-bold tracking-[-.04em] text-[#10293e]">Produkte, Mengen und Projektdaten.</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-[#576f7e]">Keine automatische Bestellung. Jede Position wird anhand von Referenz, Menge, Eignung, Verfügbarkeit und Lieferort geprüft.</p></div></section>

    <section className="mx-auto grid max-w-[1200px] gap-8 px-5 py-12 lg:grid-cols-[1.15fr_.85fr] lg:px-10 lg:py-16">
      <div>
        <div className="flex items-center justify-between gap-4"><h2 className="font-display text-3xl font-bold text-[#10293e]">Produktauswahl</h2><span className="text-xs font-bold text-[#5d7381]">{items.length} Positionen</span></div>
        <div className="mt-5 space-y-4">{items.length ? items.map((item) => <QuoteRow key={item.id} item={item} onUpdate={onUpdate} onRemove={onRemove} />) : <div className="border border-dashed border-[#c9d6dd] bg-white px-7 py-14 text-center"><ClipboardList className="mx-auto h-9 w-9 text-[#8ca0ac]" /><p className="mt-4 font-bold text-[#314b5d]">Noch keine Produkte ausgewählt.</p><p className="mt-2 text-sm text-[#6b7e89]">Öffnen Sie eine Sparte und fügen Sie Produkte oder ein Raumkonzept hinzu.</p><button onClick={() => onNavigate('products')} className="mt-5 min-h-11 bg-[#004b87] px-5 text-xs font-extrabold text-white">Produkte ansehen</button></div>}</div>
      </div>

      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="border border-[#d6e0e5] bg-white p-6 shadow-[0_14px_42px_rgba(16,41,62,.07)] sm:p-7">
          <h2 className="font-display text-3xl font-bold text-[#10293e]">Projektdaten</h2>
          <div className="mt-6 grid gap-4">
            <Field label="Kundentyp"><select value={customer.type} onChange={(event) => setCustomer({ ...customer, type: event.target.value })} className="h-12 w-full border border-[#cbd7de] bg-white px-3 text-sm"><option>Privatkunde</option><option>Architekt / Innenarchitekt</option><option>Bauunternehmen / Verarbeiter</option></select></Field>
            <Field label="Name / Firma"><input value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} className="h-12 w-full border border-[#cbd7de] px-3 text-sm" /></Field>
            <Field label="E-Mail"><input type="email" value={customer.email} onChange={(event) => setCustomer({ ...customer, email: event.target.value })} className="h-12 w-full border border-[#cbd7de] px-3 text-sm" /></Field>
            <Field label="Telefon"><input value={customer.phone} onChange={(event) => setCustomer({ ...customer, phone: event.target.value })} className="h-12 w-full border border-[#cbd7de] px-3 text-sm" /></Field>
            <div className="grid grid-cols-[.72fr_1.28fr] gap-3"><Field label="PLZ"><input value={customer.postal} onChange={(event) => setCustomer({ ...customer, postal: event.target.value })} className="h-12 w-full border border-[#cbd7de] px-3 text-sm" /></Field><Field label="Ort"><input value={customer.city} onChange={(event) => setCustomer({ ...customer, city: event.target.value })} className="h-12 w-full border border-[#cbd7de] px-3 text-sm" /></Field></div>
            <Field label="Gewünschter Zeitraum"><input value={customer.timeline} onChange={(event) => setCustomer({ ...customer, timeline: event.target.value })} placeholder="z. B. Oktober 2026" className="h-12 w-full border border-[#cbd7de] px-3 text-sm" /></Field>
            <Field label="Projekt / Foto-Beschreibung"><textarea value={customer.message} onChange={(event) => setCustomer({ ...customer, message: event.target.value })} rows={5} placeholder="Raum, Stil, Masse, bestehende Produkte oder Foto beschreiben" className="w-full border border-[#cbd7de] p-3 text-sm" /></Field>
          </div>
          <div className="mt-6 grid gap-2">
            <a aria-disabled={!items.length} href={items.length ? whatsappUrl(summary) : undefined} target="_blank" rel="noreferrer" className={`inline-flex min-h-12 items-center justify-center gap-2 px-4 text-sm font-extrabold ${items.length ? 'bg-[#d7aa57] text-[#10293e]' : 'pointer-events-none bg-[#d7dee2] text-[#7a8b94]'}`}><MessageCircle size={17} /> Per WhatsApp senden</a>
            <a aria-disabled={!items.length} href={items.length ? emailUrl('Projektanfrage RA Bau Lieferung', summary) : undefined} className={`inline-flex min-h-12 items-center justify-center gap-2 px-4 text-sm font-extrabold ${items.length ? 'bg-[#004b87] text-white' : 'pointer-events-none bg-[#aab7bf] text-white'}`}><Mail size={17} /> E-Mail vorbereiten</a>
          </div>
          <p className="mt-4 text-center text-[10px] leading-5 text-[#71848f]">Die Anfrage wird erst gesendet, wenn Sie WhatsApp oder E-Mail ausdrücklich öffnen und bestätigen. Muster auf Anfrage; Kosten und Verfügbarkeit werden je Referenz bestätigt.</p>
          <p className="mt-4 text-center text-[10px] text-[#82939c]">Kontakt: {business.contact} · {business.country}</p>
        </div>
      </div>
    </section>
  </main>;
}

function QuoteRow({ item, onUpdate, onRemove }: { item: QuoteItem; onUpdate: (id: string, patch: Partial<QuoteItem>) => void; onRemove: (id: string) => void }) {
  const setComponents = (component: string) => {
    const current = item.selectedComponents ?? [];
    const next = current.includes(component) ? current.filter((value) => value !== component) : [...current, component];
    onUpdate(item.id, { selectedComponents: next, customNote: `Gewählte Komponenten: ${next.join(', ')}` });
  };

  return <article className="grid gap-4 border border-[#d8e1e6] bg-white p-4 sm:grid-cols-[110px_1fr_auto]">
    <div className="aspect-square overflow-hidden border border-[#e0e6e9] bg-white"><SmartImage asset={{ src: item.image, alt: item.name, fit: 'contain' }} className="h-full w-full p-3" /></div>
    <div><p className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#8e6725]">{item.brand}</p><h3 className="mt-1 font-display text-xl font-bold text-[#10293e]">{item.name}</h3><p className="mt-1 text-xs leading-5 text-[#667c89]">{item.reference || item.spec}</p><div className="mt-4 flex flex-wrap gap-2"><input value={item.quantity} onChange={(event) => onUpdate(item.id, { quantity: event.target.value })} className="h-11 w-24 border border-[#cbd7de] px-3 text-sm" aria-label={`Menge ${item.name}`} /><span className="flex h-11 items-center border border-[#cbd7de] bg-[#f5f7f8] px-4 text-sm font-bold">{item.unit}</span></div>
      {item.components?.length ? <div className="mt-4"><p className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#7a8d97]">Komponenten</p><div className="mt-2 flex flex-wrap gap-2">{item.components.map((component) => { const active = item.selectedComponents?.includes(component); return <button key={component} onClick={() => setComponents(component)} className={`min-h-9 border px-3 text-[10px] font-bold ${active ? 'border-[#004b87] bg-[#eef5f9] text-[#004b87]' : 'border-[#d6dfe4] bg-[#f4f6f7] text-[#6b7e89]'}`}>{active ? '✓ ' : ''}{component}</button>; })}</div></div> : null}
      <textarea value={item.customNote || ''} onChange={(event) => onUpdate(item.id, { customNote: event.target.value })} placeholder="Variante, Farbe, Format oder Hinweis" rows={3} className="mt-3 w-full border border-[#d5dfe4] px-3 py-2 text-xs" />
    </div>
    <button onClick={() => onRemove(item.id)} className="flex h-11 w-11 items-center justify-center self-start text-[#8a5960] hover:bg-[#f8eeee]" aria-label={`${item.name} entfernen`}><Trash2 size={18} /></button>
  </article>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-xs font-bold text-[#415b6d]">{label}<span className="mt-2 block">{children}</span></label>;
}
