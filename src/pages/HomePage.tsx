import { ArrowRight, ClipboardList, MessageCircle } from 'lucide-react';
import { whatsappUrl, type AppPage } from '../config/business';
import { ProcessSteps } from '../components/ProcessSteps';
import { SmartImage } from '../components/SmartImage';

const roomEntries: Array<{ page: AppPage; title: string; tag: string; copy: string; image: string; alt: string }> = [
  { page: 'bathroom', title: 'Badezimmer planen', tag: 'Komplett oder einzeln', copy: 'Möbel, Armatur, Dusche, WC und Oberflächen als zusammenhängende Auswahl.', image: '/images/catalog/rubicer-stria.png', alt: 'Badezimmer mit Rubicer Stria Badmöbel' },
  { page: 'flooring', title: 'Boden & Wohnraum', tag: 'SPC · Vinyl · Kork', copy: 'Fischgrat, XL-Dielen, natürliche Holzdekore und belastbare Projektlösungen.', image: '/images/products/rubifloor-herringbone-natural.webp', alt: 'Wohnraum mit natürlichem Fischgratboden' },
  { page: 'ceramics', title: 'Keramik für Bad & Küche', tag: 'Wand · Boden · Akzent', copy: 'Travertin, Marmor, Natursteinwirkung, Carving und koordinierte Mosaike.', image: '/images/categories/recer-pixstone-room.webp', alt: 'Heller Innenraum mit grossformatiger Keramik' },
  { page: 'quote', title: 'Bekannte Referenz', tag: 'Schnellster Weg', copy: 'Marke, Foto oder Artikelnummer senden und Eignung sowie Offerte prüfen lassen.', image: '/images/catalog/recer-mastery.png', alt: 'Recer Mastery als Herstellerreferenz' },
];

const categories: Array<{ page: AppPage; title: string; kicker: string; copy: string; image: string; alt: string }> = [
  { page: 'ceramics', title: 'Keramik & Feinsteinzeug', kicker: 'Sparte 02', copy: 'Fünf Kollektionen mit klarer Materialwirkung und verifizierten Herstellerdaten.', image: '/images/catalog/recer-mastery.png', alt: 'Recer Mastery Keramik' },
  { page: 'bathroom', title: 'Badezimmer', kicker: 'Sparte 03', copy: 'Möbel, Armaturen, Dusche, WC und Duschwannen ohne vermischte Produktgruppen.', image: '/images/catalog/rubicer-stria.png', alt: 'Rubicer Stria Badezimmermöbel' },
  { page: 'flooring', title: 'Vinyl, SPC & Kork', kicker: 'Sparte 04', copy: 'Fischgrat, XL-Dielen, helle Eiche, Projektqualität und Steinoptik.', image: '/images/products/rubifloor-xl-home.webp', alt: 'Rubifloor XL Home Boden' },
  { page: 'concepts', title: 'Raumkonzepte', kicker: 'Sparte 05', copy: 'Fünf gekennzeichnete Visualisierungen mit einzeln konfigurierbaren Komponenten.', image: '/images/concepts/warm-stone-spa.svg', alt: 'Warm Stone Spa Raumkonzept Visualisierung' },
];

export function HomePage({ onNavigate }: { onNavigate: (page: AppPage) => void }) {
  return (
    <main>
      <section className="bg-[#10293e] text-white">
        <div className="mx-auto grid max-w-[1540px] lg:grid-cols-[.92fr_1.08fr]">
          <div className="flex flex-col justify-center px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
            <p className="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#d7aa57]">Materialien für Schweizer Projekte</p>
            <h1 className="mt-5 max-w-2xl font-display text-5xl font-black leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-7xl">Materialien, die Räume aufwerten.</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/72">Beginnen Sie beim Raum oder bei einer konkreten Herstellerreferenz. Wir verbinden Materialwirkung, technische Prüfung und projektbezogene Lieferung in einer klaren Anfrage.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><button onClick={() => onNavigate('products')} className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#d7aa57] px-6 text-sm font-extrabold text-[#10293e]">Produkte entdecken <ArrowRight size={17} /></button><button onClick={() => onNavigate('quote')} className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/25 px-6 text-sm font-extrabold"><ClipboardList size={17} /> Referenz anfragen</button></div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-bold uppercase tracking-[.14em] text-white/55"><span>Kuratiertes Sortiment</span><span>Herstellerreferenzen</span><span>Persönlicher Kontakt</span></div>
          </div>
          <div className="min-h-[390px] lg:min-h-[680px]"><SmartImage asset={{ src: '/images/categories/recer-pixstone-room.webp', alt: 'Heller hochwertiger Innenraum mit grossformatiger Keramik', fit: 'cover' }} priority className="h-full w-full" /></div>
        </div>
      </section>

      <section className="bg-white"><div className="mx-auto max-w-[1540px] px-5 py-16 lg:px-10 lg:py-20"><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#9a6e22]">Schneller Einstieg nach Raum</p><h2 className="mt-3 font-display text-4xl font-black tracking-[-.04em] text-[#10293e] sm:text-5xl">Was möchten Sie gestalten?</h2><p className="mt-4 max-w-3xl text-base leading-7 text-[#5d7381]">Der Kunde muss keine interne Katalogstruktur kennen. Starten Sie beim gewünschten Ergebnis oder bei einer bereits bekannten Referenz.</p><div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{roomEntries.map((item) => <button key={item.page} onClick={() => onNavigate(item.page)} className="group overflow-hidden border border-[#d7e0e5] bg-[#f7f9fa] text-left transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(16,41,62,.10)]"><div className="aspect-[16/10] overflow-hidden"><SmartImage asset={{ src: item.image, alt: item.alt, fit: 'cover' }} className="h-full w-full transition duration-700 group-hover:scale-[1.03]" /></div><div className="p-5"><p className="text-[9px] font-extrabold uppercase tracking-[.13em] text-[#8e6725]">{item.tag}</p><h3 className="mt-2 font-display text-2xl font-black text-[#10293e]">{item.title}</h3><p className="mt-2 text-sm leading-6 text-[#637884]">{item.copy}</p></div></button>)}</div></div></section>

      <section className="bg-[#eef2f3]"><div className="mx-auto max-w-[1540px] px-5 py-16 lg:px-10 lg:py-20"><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#9a6e22]">Spartes 02–05</p><h2 className="mt-3 max-w-4xl font-display text-4xl font-black tracking-[-.04em] text-[#10293e] sm:text-5xl">Eine klare Auswahl statt endloser Listen.</h2><div className="mt-9 grid gap-px bg-[#ccd7dc] lg:grid-cols-2">{categories.map((item) => <button key={item.page} onClick={() => onNavigate(item.page)} className="group grid bg-white text-left sm:grid-cols-[.9fr_1.1fr]"><div className="aspect-[4/3] overflow-hidden sm:aspect-auto"><SmartImage asset={{ src: item.image, alt: item.alt, fit: 'cover' }} className="h-full w-full transition duration-700 group-hover:scale-[1.025]" /></div><div className="flex flex-col justify-center p-7 lg:p-10"><p className="text-[9px] font-extrabold uppercase tracking-[.14em] text-[#8e6725]">{item.kicker}</p><h3 className="mt-2 font-display text-3xl font-black text-[#10293e]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[#617783]">{item.copy}</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-[#004b87]">Auswahl öffnen <ArrowRight size={15} /></span></div></button>)}</div></div></section>

      <ProcessSteps />

      <section className="bg-white"><div className="mx-auto grid max-w-[1540px] lg:grid-cols-[1.2fr_.8fr]"><div className="px-5 py-14 lg:px-10 lg:py-20"><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#9a6e22]">Persönliche Auswahlhilfe</p><h2 className="mt-3 font-display text-4xl font-black tracking-[-.04em] text-[#10293e]">Noch nicht sicher, was passt?</h2><p className="mt-4 max-w-2xl text-base leading-7 text-[#617783]">Senden Sie Raumfoto, ungefähre Masse, gewünschten Stil und Lieferort. Wir grenzen die Auswahl ein, statt Ihnen einfach mehr Produkte zu zeigen.</p></div><div className="flex flex-col justify-center gap-3 bg-[#e9eef0] p-6 lg:p-10"><a href={whatsappUrl('Guten Tag, ich möchte Hilfe bei der Auswahl für mein Bau- oder Renovationsprojekt. Ich sende Raumfoto, ungefähre Masse, Stilwunsch und Lieferort.')} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#d7aa57] px-5 text-sm font-extrabold text-[#10293e]"><MessageCircle size={18} /> Auswahl per WhatsApp</a><button onClick={() => onNavigate('quote')} className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#b8c7cf] bg-white px-5 text-sm font-extrabold text-[#004b87]"><ClipboardList size={18} /> Anfrage zusammenstellen</button></div></div></section>
    </main>
  );
}
