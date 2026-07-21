import React, { useState } from 'react';
import {
  ArrowRight, Building2, Check, ClipboardList,
  FileText, Layers3, Mail, Menu, MessageCircle, Minus, Package,
  Phone, Plus, Search, ShieldCheck, ShoppingBag, Trash2,
  Truck, X
} from 'lucide-react';
import { constructionCategories, interiorCategories } from './data';
import type { ConstructionProduct, InteriorProduct, PageRoute, QuoteItem } from './types';
import { Logo } from './components/Logo';

const PHONE = '41782418913';
const EMAIL = 'rodrigo@ra-bau-lieferung.com';

const constructionRange = [
  { title: 'Nivellieren & Verlegen', items: 'Clips · Keile · Drehkappen · Fugenkreuze · Systemzangen' },
  { title: 'Bewehrung & Betondeckung', items: 'Abstandhalter · Klemmsterne · Distanzleisten · Doppeldrahtbinder' },
  { title: 'Schutz & Verschluss', items: 'Armierungskappen · Rohrstopfen · Schutz- und Verschlussteile' },
  { title: 'Werkzeug & Verbrauch', items: 'Bindehaken · Bindedraht · Verlegehilfen · Projektpackungen' },
];

const routeForCategory: Record<string, PageRoute> = {
  'Feinsteinzeug': 'porcelain',
  'Premium Mosaike': 'mosaics',
  'SPC / Vinyl-Designböden': 'spc',
  'Sanitäre Individuallösungen': 'bathroom'
};

const categoryForRoute: Partial<Record<PageRoute, string>> = {
  porcelain: 'Feinsteinzeug',
  mosaics: 'Premium Mosaike',
  spc: 'SPC / Vinyl-Designböden',
  bathroom: 'Sanitäre Individuallösungen'
};

const categoryMeta: Record<string, { kicker: string; title: string; copy: string }> = {
  Feinsteinzeug: {
    kicker: 'Sparte 02 · Fliesen & Platten',
    title: 'Feinsteinzeug mit echten Werkdaten',
    copy: 'Ausgewählte Serien für Renovationen, Wohnbau und Objektgeschäft. Format, Oberfläche, Karton und Palette sind vor der Anfrage sichtbar.'
  },
  'Premium Mosaike': {
    kicker: 'Sparte 03 · Design & Nassbereich',
    title: 'Premium Mosaike',
    copy: 'Koordinierte Mosaikserien für Dusche, Spa und Akzentwand. Keine Symbolprodukte: jede Auswahl ist auf eine reale Herstellerreferenz zurückgeführt.'
  },
  'SPC / Vinyl-Designböden': {
    kicker: 'Sparte 04 · Renovationsböden',
    title: 'SPC-Vinylböden für schnelle Renovationen',
    copy: 'Wasserfeste Klickböden mit integrierter Unterlage, belastbaren Nutzschichten und klarer Flächenleistung pro Palette.'
  },
  'Sanitäre Individuallösungen': {
    kicker: 'Sparte 05 · Bad komplett',
    title: 'Sanitär & Badlösungen',
    copy: 'Möbel, Armaturen, Duschsysteme, WCs und Duschwannen – einzeln oder als abgestimmtes Badpaket kalkuliert.'
  }
};

type VisualAsset = {
  src: string;
  alt: string;
  fit?: 'cover' | 'contain';
};

type Sparte = {
  route: PageRoute;
  number: string;
  title: string;
  copy: string;
  ranges: string[];
  images: VisualAsset[];
};

const sparten: Sparte[] = [
  {
    route: 'baustellenzubehoor',
    number: '01',
    title: 'Baustellenzubehör',
    copy: 'Praxisnahe Systeme und Verbrauchsmaterial für Verlegung, Bewehrung und Betonbau.',
    ranges: ['Nivelliersysteme', 'Abstandhalter', 'Drahtbinder', 'Schutz & Werkzeug'],
    images: [
      { src: '/images/fliesen-clips.png', alt: 'Nivellierclips für Fliesen', fit: 'contain' },
      { src: '/images/nivellier-keile-real.jpg.png', alt: 'Wiederverwendbare System-Keile', fit: 'contain' },
      { src: '/images/distanzhalter-turm.jpg', alt: 'Abstandhalter-Turm für Bewehrung', fit: 'contain' },
      { src: '/images/Bindehaken.jpg', alt: 'Drill-Bindehaken für Bewehrung', fit: 'contain' }
    ]
  },
  {
    route: 'porcelain',
    number: '02',
    title: 'Feinsteinzeug',
    copy: 'Ausgewählte Serien für Boden, Wand, Bad, Wohnbau und anspruchsvolle Renovationen.',
    ranges: ['Steinoptik', 'Marmoroptik', 'Terrazzo', 'Grossformate'],
    images: [
      { src: '/images/catalog/rubicer-rapolano.png', alt: 'Rubicer Rapolano Feinsteinzeug' },
      { src: '/images/catalog/rubicer-toscana.png', alt: 'Rubicer Toscana Carving' },
      { src: '/images/categories/recer-mastery-room.webp', alt: 'Recer Mastery Feinsteinzeug in einer hochwertigen Innenanwendung' },
      { src: '/images/categories/recer-pixstone-room.webp', alt: 'Recer Pixstone Terrazzooptik in einem modernen Bad' }
    ]
  },
  {
    route: 'mosaics',
    number: '03',
    title: 'Premium Mosaike',
    copy: 'Koordinierte Designmosaike für Dusche, Spa, Akzentwand und exklusive Innenräume.',
    ranges: ['Marmor', 'Naturstein', 'Geometrisch', 'Nassbereich'],
    images: [
      { src: '/images/products/recer-mastery-mosaic.webp', alt: 'Recer Mastery Mix Mosaik', fit: 'contain' },
      { src: '/images/products/recer-bluenza-mosaic.webp', alt: 'Recer Bluenza Mosaik' },
      { src: '/images/products/recer-pixstone-mosaic.webp', alt: 'Recer Pixstone Mosaik', fit: 'contain' },
      { src: '/images/products/recer-rapolano-mosaic.webp', alt: 'Recer Rapolano Mosaik', fit: 'contain' }
    ]
  },
  {
    route: 'spc',
    number: '04',
    title: 'SPC & Vinylböden',
    copy: 'Widerstandsfähige Klickböden für schnelle, saubere Renovationen im Wohn- und Objektbau.',
    ranges: ['Landhausdiele', 'Fischgrät', 'XL-Dielen', 'Objektqualität'],
    images: [
      { src: '/images/products/rubifloor-herringbone-natural.webp', alt: 'Rubifloor Fischgrätboden' },
      { src: '/images/products/rubifloor-rigid-grey.webp', alt: 'Rubifloor Rigid Grey Steinoptik' },
      { src: '/images/products/rubifloor-xl-home.webp', alt: 'Rubifloor XL Home Eichenoptik' },
      { src: '/images/products/rubifloor-premium-cream.webp', alt: 'Rubifloor Premium Cream Designboden' }
    ]
  },
  {
    route: 'bathroom',
    number: '05',
    title: 'Bad & Sanitär',
    copy: 'Einzelprodukte und abgestimmte Lösungen für ein vollständiges, hochwertiges Badezimmer.',
    ranges: ['Badmöbel', 'Armaturen', 'Duschen', 'WC & Duschwannen'],
    images: [
      { src: '/images/catalog/rubicer-stria.png', alt: 'Rubicer Stria Waschtischmöbel' },
      { src: '/images/products/moovlux-tube-tl1001.webp', alt: 'Moovlux Tube Waschtischarmatur', fit: 'contain' },
      { src: '/images/products/imex-toscana-bdt064.webp', alt: 'IMEX Toscana Duschsystem', fit: 'contain' },
      { src: '/images/products/roca-avant-intank.webp', alt: 'Roca Avant In-Tank WC' }
    ]
  }
];

function wa(text: string) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
}

function hires(src: string) {
  return src.startsWith('/images/') ? `/images/4k/${src.slice('/images/'.length)}.webp` : src;
}

export default function App() {
  const [page, setPage] = useState<PageRoute>('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quote, setQuote] = useState<QuoteItem[]>([]);
  const [selected, setSelected] = useState<InteriorProduct | null>(null);
  const [selectedConstruction, setSelectedConstruction] = useState<ConstructionProduct | null>(null);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const navigate = (next: PageRoute) => {
    setPage(next);
    setMobileOpen(false);
    setSearch('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };

  const addProduct = (product: InteriorProduct) => {
    const isPieceProduct = [
      'Waschtisch',
      'Duschsystem',
      'Duschwanne',
      'WC'
    ].some(type => product.application.includes(type));

    setQuote(current => {
      const existing = current.find(item => item.reference === product.reference);
      if (existing) return current;
      return [...current, {
        id: product.id,
        name: product.name,
        spec: product.spec,
        brand: product.brand,
        image: product.image,
        quantity: isPieceProduct ? '1' : '25',
        unit: isPieceProduct ? 'Stk.' : 'm²',
        reference: product.reference,
        customNote: ''
      }];
    });
    notify(`${product.name} wurde zur Anfrage hinzugefügt.`);
  };

  const addConstruction = (product: ConstructionProduct) => {
    setQuote(current => current.some(item => item.name === product.name) ? current : [...current, {
      id: `construction-${product.id}`,
      name: product.name,
      spec: product.variants,
      brand: 'RA Bau Sortiment',
      image: product.image,
      quantity: product.defaultQuantity,
      unit: product.unit,
      reference: product.pack
    }]);
    notify(`${product.name} wurde zur Anfrage hinzugefügt.`);
  };

  const updateItem = (id: string, patch: Partial<QuoteItem>) => {
    setQuote(items => items.map(item => item.id === id ? { ...item, ...patch } : item));
  };

  const submitQuote = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!quote.length) return;
    setSubmitting(true);
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const list = quote.map((item, index) => `${index + 1}. ${item.brand ? `${item.brand} · ` : ''}${item.name} · ${item.reference || item.spec} · ${item.quantity} ${item.unit}${item.customNote ? ` · ${item.customNote}` : ''}`).join('\n');
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'Neue Projektanfrage über RA Bau Lieferung',
          _template: 'table',
          _replyto: payload.email,
          ...payload,
          Produktauswahl: list
        })
      });
      if (!response.ok) throw new Error('submit');
      setSent(true);
    } catch {
      notify('Senden nicht möglich. Bitte WhatsApp oder E-Mail verwenden.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7f7] text-[#102c45] selection:bg-[#e4b85e] selection:text-[#102c45]">
      <Header page={page} quoteCount={quote.length} mobileOpen={mobileOpen} onMobile={() => setMobileOpen(v => !v)} onNavigate={navigate} />

      {page === 'home' && <Home onNavigate={navigate} />}
      {page === 'interior' && <CatalogOverview onNavigate={navigate} />}
      {categoryForRoute[page] && (
        <CategoryPage
          category={categoryForRoute[page]!}
          search={search}
          onSearch={setSearch}
          quote={quote}
          onAdd={addProduct}
          onSelect={setSelected}
          onNavigate={navigate}
        />
      )}
      {page === 'baustellenzubehoor' && <ConstructionPage quote={quote} onAdd={addConstruction} onSelect={setSelectedConstruction} onNavigate={navigate} />}
      {page === 'quote-planner' && <QuotePage quote={quote} sent={sent} submitting={submitting} onSubmit={submitQuote} onUpdate={updateItem} onRemove={id => setQuote(q => q.filter(i => i.id !== id))} onAddCustom={item => setQuote(q => [...q, item])} onNavigate={navigate} />}
      {page === 'contact' && <ContactPage />}

      <Footer onNavigate={navigate} />
      <a href={wa('Guten Tag, ich möchte eine Materialanfrage besprechen.')} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#20bd67] text-white shadow-2xl transition hover:-translate-y-1" aria-label="WhatsApp öffnen"><MessageCircle size={25} /></a>
      {toast && <div className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-full bg-[#132335] px-5 py-3 text-sm font-bold text-white shadow-2xl"><Check className="mr-2 inline h-4 w-4 text-[#d7aa57]" />{toast}</div>}
      {selected && <ProductModal product={selected} inQuote={quote.some(i => i.reference === selected.reference)} onClose={() => setSelected(null)} onAdd={() => addProduct(selected)} />}
      {selectedConstruction && <ConstructionModal product={selectedConstruction} inQuote={quote.some(i => i.id === `construction-${selectedConstruction.id}`)} onClose={() => setSelectedConstruction(null)} onAdd={() => addConstruction(selectedConstruction)} />}
    </div>
  );
}

function Header({ page, quoteCount, mobileOpen, onMobile, onNavigate }: { page: PageRoute; quoteCount: number; mobileOpen: boolean; onMobile: () => void; onNavigate: (p: PageRoute) => void }) {
  const links: Array<[PageRoute, string]> = [['baustellenzubehoor', 'Baustellenzubehör'], ['porcelain', 'Feinsteinzeug'], ['mosaics', 'Premium Mosaike'], ['spc', 'SPC & Vinyl'], ['bathroom', 'Bad & Sanitär']];
  return <header className="sticky top-0 z-50 border-b border-[#d9dde1] bg-white/95 backdrop-blur-xl">
    <div className="mx-auto flex h-[78px] max-w-[1500px] items-center gap-5 px-4 lg:px-8">
      <button onClick={() => onNavigate('home')} className="shrink-0" aria-label="Startseite"><Logo /></button>
      <nav className="ml-auto hidden items-center gap-1.5 xl:flex" aria-label="Produktsparten">
        {links.map(([route, label], index) => <button key={route} onClick={() => onNavigate(route)} className={`rounded-xl px-3.5 py-2.5 text-[12px] font-bold transition ${page === route ? 'bg-[#123d63] text-white shadow-sm' : 'text-[#4d5d6a] hover:bg-[#eef3f6] hover:text-[#123d63]'}`}><span className="mr-1.5 text-[9px] opacity-60">0{index + 1}</span>{label}</button>)}
      </nav>
      <button onClick={() => onNavigate('quote-planner')} className="ml-auto flex items-center gap-2 rounded-xl bg-[#e4b85e] px-4 py-3 text-xs font-extrabold text-[#102c45] shadow-sm transition hover:bg-[#edc976] xl:ml-3">
        <ShoppingBag size={16} /><span className="hidden sm:inline">Offerte zusammenstellen</span><span className="rounded-full bg-[#123d63] px-1.5 py-0.5 text-[10px] text-white">{quoteCount}</span>
      </button>
      <button className="rounded-xl p-2.5 text-[#123d63] xl:hidden" onClick={onMobile} aria-label={mobileOpen ? 'Menü schliessen' : 'Menü öffnen'}>{mobileOpen ? <X /> : <Menu />}</button>
    </div>
    {mobileOpen && <nav className="border-t border-[#e0e4e7] bg-white px-4 py-4 xl:hidden" aria-label="Produktsparten mobil">{links.map(([route, label], index) => <button key={route} onClick={() => onNavigate(route)} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm font-bold ${page === route ? 'bg-[#123d63] text-white' : 'text-[#314554] hover:bg-[#eef3f6]'}`}><span className="text-[10px] opacity-55">0{index + 1}</span>{label}</button>)}<button onClick={() => onNavigate('interior')} className="mt-2 block w-full rounded-xl border border-[#d9dfe3] px-4 py-3 text-left text-sm font-bold text-[#314554]">Alle Sparten im Überblick</button></nav>}
  </header>;
}

function Home({ onNavigate }: { onNavigate: (p: PageRoute) => void }) {
  return <main>
    <section className="overflow-hidden border-b border-[#dbe1e5] bg-[#f7f8f7]">
      <div className="mx-auto grid min-h-[700px] max-w-[1500px] items-center gap-12 px-5 py-16 lg:grid-cols-[.82fr_1.18fr] lg:px-10 lg:py-20">
        <div className="max-w-2xl">
          <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[.24em] text-[#a77825]">RA Bau Lieferung · Bau- und Renovationsmaterial</p>
          <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-[-.045em] text-[#102c45] sm:text-6xl lg:text-[72px]">Produkte finden.<br /><span className="text-[#b8842d]">Projekt kalkulieren.</span><br />Offerte erhalten.</h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-[#586a77] sm:text-lg">Fünf klar getrennte Sparten, reale Produkte und technische Angaben. Wählen Sie Material, Menge und Lieferort – wir erstellen die projektbezogene Offerte.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => onNavigate('interior')} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#123d63] px-7 py-4 text-sm font-extrabold text-white transition hover:bg-[#0d3151]">Produkte nach Sparte <ArrowRight size={17} /></button>
            <button onClick={() => onNavigate('quote-planner')} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#cbd4da] bg-white px-7 py-4 text-sm font-extrabold text-[#123d63] transition hover:border-[#123d63]"><ClipboardList size={17} /> Offerte zusammenstellen</button>
          </div>
          <div className="mt-9 grid max-w-xl grid-cols-3 gap-4 border-t border-[#d7dee2] pt-6 text-[11px] font-bold text-[#5c6d78]"><span>Reale Produktbilder</span><span>Werkdaten & Logistik</span><span>Weitere Marken auf Anfrage</span></div>
        </div>
        <HeroProductWall onNavigate={onNavigate} />
      </div>
    </section>

    <section className="bg-white">
      <div className="mx-auto max-w-[1500px] px-5 py-20 lg:px-10 lg:py-24">
        <SectionTitle kicker="Unser Sortiment" title="Fünf Sparten. Jede mit eigener Produktauswahl." copy="Keine vermischten Produktlisten: Wählen Sie zuerst die Sparte. Dort finden Sie die passenden Produktgruppen, konkreten Artikel, Varianten und Verpackungsdaten." />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {sparten.map((sparte, index) => <button key={sparte.number} onClick={() => onNavigate(sparte.route)} className={`group overflow-hidden rounded-[26px] border border-[#dce2e5] bg-[#f6f8f8] text-left shadow-[0_14px_42px_rgba(16,44,69,.06)] transition duration-300 hover:-translate-y-1 hover:border-[#b9c8d2] hover:shadow-[0_20px_55px_rgba(16,44,69,.12)] ${index === sparten.length - 1 ? 'lg:col-span-2' : ''}`}>
            <SparteVisual sparte={sparte} />
            <div className="p-6 sm:p-8"><div className="flex items-center justify-between gap-4"><div><span className="text-[10px] font-extrabold uppercase tracking-[.22em] text-[#a77825]">Sparte {sparte.number}</span><h2 className="mt-2 font-display text-3xl font-semibold tracking-[-.03em] text-[#102c45] sm:text-4xl">{sparte.title}</h2></div><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#123d63] shadow-sm transition group-hover:translate-x-1"><ArrowRight size={19} /></span></div><p className="mt-4 max-w-2xl text-sm leading-6 text-[#60717c]">{sparte.copy}</p><div className="mt-5 flex flex-wrap gap-2">{sparte.ranges.map(range => <span key={range} className="rounded-lg border border-[#d9e0e4] bg-white px-3 py-1.5 text-[10px] font-bold text-[#526673]">{range}</span>)}</div></div>
          </button>)}
        </div>
      </div>
    </section>

    <section className="border-t border-[#dce2e5] bg-[#edf2f4]">
      <div className="mx-auto max-w-[1500px] px-5 py-20 lg:px-10">
      <div className="grid overflow-hidden rounded-[28px] bg-[#123d63] text-white lg:grid-cols-[1.1fr_.9fr]">
        <div className="p-8 sm:p-12 lg:p-16"><p className="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#e4b85e]">Nicht in der Online-Auswahl?</p><h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold tracking-[-.035em]">Wir beschaffen auch andere Marken, Referenzen und Ausführungen.</h2><p className="mt-5 max-w-xl leading-7 text-white/70">Senden Sie Foto, Hersteller, Referenz, Masse und Menge. Wir prüfen die Beschaffung und schlagen bei Bedarf eine kompatible Alternative vor.</p><a href={wa('Guten Tag, ich suche ein Produkt, das nicht im Online-Katalog aufgeführt ist.')} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#e4b85e] px-6 py-3.5 text-sm font-extrabold text-[#102c45]">Wunschprodukt anfragen <MessageCircle size={17} /></a></div>
        <div className="grid grid-cols-2 gap-px bg-white/10 p-px"><TrustTile dark icon={<FileText />} title="Referenzprüfung" text="Werkdaten statt Vermutungen" /><TrustTile dark icon={<Layers3 />} title="Projektpakete" text="Produkte sinnvoll kombinieren" /><TrustTile dark icon={<Truck />} title="Schweiz-Logistik" text="Fracht und Verzollung kalkuliert" /><TrustTile dark icon={<ShieldCheck />} title="Schriftliche Offerte" text="Preis, Menge und Ausführung fixiert" /></div>
      </div>
      </div>
    </section>
  </main>;
}

function HeroProductWall({ onNavigate }: { onNavigate: (p: PageRoute) => void }) {
  return <div className="grid min-h-[570px] grid-cols-2 gap-3 sm:grid-cols-12 sm:grid-rows-6">
    {sparten.map((sparte, index) => {
      const layout = [
        'sm:col-span-7 sm:row-span-3',
        'sm:col-span-5 sm:row-span-3',
        'sm:col-span-4 sm:row-span-3',
        'sm:col-span-4 sm:row-span-3',
        'col-span-2 sm:col-span-4 sm:row-span-3'
      ][index];
      const visual = sparte.images[index % sparte.images.length];
      return <button key={sparte.number} onClick={() => onNavigate(sparte.route)} className={`group relative min-h-48 overflow-hidden rounded-[22px] bg-[#e7ecee] text-left shadow-[0_18px_48px_rgba(16,44,69,.12)] ${layout}`}>
        <img src={hires(visual.src)} alt={visual.alt} className={`h-full w-full transition duration-700 group-hover:scale-[1.04] ${visual.fit === 'contain' ? 'object-contain p-7 mix-blend-multiply' : 'object-cover'}`} />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b2338]/95 via-[#0b2338]/55 to-transparent px-4 pb-4 pt-12 text-white"><span className="text-[9px] font-extrabold tracking-[.2em] text-[#edc66f]">SPARTE {sparte.number}</span><h2 className="mt-1 text-sm font-extrabold sm:text-base">{sparte.title}</h2></div>
      </button>;
    })}
  </div>;
}

function SparteVisual({ sparte, compact = false }: { sparte: Sparte; compact?: boolean }) {
  return <div className={`relative grid grid-cols-2 grid-rows-2 gap-1 overflow-hidden bg-[#dfe5e8] p-1 ${compact ? 'h-[250px]' : 'h-[340px]'}`}>
    {sparte.images.map((image, index) => <div key={image.src} className="overflow-hidden bg-[#f3f5f4]"><img src={hires(image.src)} alt={image.alt} loading="lazy" decoding="async" className={`h-full w-full transition duration-700 group-hover:scale-[1.035] ${image.fit === 'contain' ? 'object-contain p-5 mix-blend-multiply' : 'object-cover'}`} /></div>)}
  </div>;
}

function CatalogOverview({ onNavigate }: { onNavigate: (p: PageRoute) => void }) {
  return <main className="bg-[#f5f7f7]">
    <section className="border-b border-[#dce2e5] bg-white"><div className="mx-auto max-w-[1500px] px-5 py-16 lg:px-10 lg:py-20"><SectionTitle kicker="Gesamtsortiment · 5 Sparten" title="Wählen Sie den richtigen Produktbereich" copy="Jede Sparte enthält ausschliesslich die zugehörigen Produktgruppen und konkreten Artikel. So gelangen Sie ohne Umwege von der Auswahl zur projektbezogenen Offerte." /></div></section>
    <section className="mx-auto grid max-w-[1500px] gap-6 px-5 py-12 lg:px-10 lg:py-16">
      {sparten.map((sparte, index) => {
        const productCount = index === 0 ? constructionCategories.flatMap(category => category.products).length : interiorCategories[index - 1].products.length;
        return <button key={sparte.number} onClick={() => onNavigate(sparte.route)} className="group grid w-full overflow-hidden rounded-[26px] border border-[#dce2e5] bg-white text-left shadow-[0_12px_38px_rgba(16,44,69,.06)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(16,44,69,.11)] md:grid-cols-[420px_1fr_auto]">
          <SparteVisual sparte={sparte} compact />
          <div className="self-center p-7 sm:p-9"><span className="text-[10px] font-extrabold uppercase tracking-[.22em] text-[#a77825]">Sparte {sparte.number}</span><h2 className="mt-2 font-display text-3xl font-semibold tracking-[-.03em] text-[#102c45] sm:text-4xl">{sparte.title}</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-[#60717c]">{sparte.copy}</p><div className="mt-5 flex flex-wrap gap-2">{sparte.ranges.map(range => <span key={range} className="rounded-lg bg-[#eef3f5] px-3 py-1.5 text-[10px] font-bold text-[#526673]">{range}</span>)}</div><p className="mt-5 text-xs font-extrabold text-[#123d63]">{productCount} konkrete Auswahlprodukte · weitere Artikel auf Anfrage</p></div>
          <div className="hidden items-center px-8 text-[#b8842d] md:flex"><ArrowRight size={28} className="transition group-hover:translate-x-1" /></div>
        </button>;
      })}
    </section>
  </main>;
}

function CategoryPage({ category, search, onSearch, quote, onAdd, onSelect, onNavigate }: { category: string; search: string; onSearch: (s: string) => void; quote: QuoteItem[]; onAdd: (p: InteriorProduct) => void; onSelect: (p: InteriorProduct) => void; onNavigate: (p: PageRoute) => void }) {
  const data = interiorCategories.find(c => c.germanTitle === category)!;
  const meta = categoryMeta[category];
  const sparte = sparten.find(item => item.route === routeForCategory[category])!;
  const products = data.products.filter(p => `${p.name} ${p.brand} ${p.reference} ${p.finish}`.toLowerCase().includes(search.toLowerCase()));
  return <main>
    <section className="border-b border-[#dce2e5] bg-[#f7f9f9]">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-14 lg:grid-cols-[.88fr_1.12fr] lg:px-10 lg:py-18">
        <div className="self-center"><p className="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#a77825]">{meta.kicker}</p><h1 className="mt-4 font-display text-5xl font-semibold tracking-[-.04em] text-[#102c45] sm:text-6xl">{meta.title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-[#60717c]">{meta.copy}</p><div className="mt-7 flex flex-wrap gap-2 text-[11px] font-bold text-[#526673]"><span className="rounded-lg border border-[#d6dee3] bg-white px-3 py-2">Reale Referenzen</span><span className="rounded-lg border border-[#d6dee3] bg-white px-3 py-2">Verpackung & Palette</span><span className="rounded-lg border border-[#d6dee3] bg-white px-3 py-2">Weitere Marken auf Anfrage</span></div></div>
        <div className="overflow-hidden rounded-[24px] shadow-[0_20px_55px_rgba(16,44,69,.13)]"><SparteVisual sparte={sparte} /></div>
      </div>
    </section>
    <section className="mx-auto max-w-[1500px] px-5 py-14 lg:px-10 lg:py-18">
      <div className="mb-9 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><p className="text-[11px] font-extrabold uppercase tracking-[.2em] text-[#a77825]">Sparte {sparte.number} · konkrete Auswahl</p><h2 className="mt-2 font-display text-3xl font-semibold tracking-[-.03em] text-[#102c45] sm:text-4xl">{products.length} Produkte vergleichen</h2></div><label className="flex h-12 w-full items-center gap-3 rounded-xl border border-[#d2dbe0] bg-white px-5 shadow-sm lg:w-[360px]"><Search size={17} className="text-[#72828e]" /><input value={search} onChange={e => onSearch(e.target.value)} placeholder="Name, Marke oder Referenz" className="w-full bg-transparent text-sm outline-none" /></label></div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{products.map(p => <ProductCard key={p.id} product={p} onSelect={onSelect} onAdd={onAdd} inQuote={quote.some(i => i.reference === p.reference)} />)}</div>
      <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[22px] border border-dashed border-[#aebcc5] bg-[#edf2f4] p-7 sm:flex-row sm:items-center"><div><h3 className="text-xl font-extrabold text-[#102c45]">Andere Ausführung, Marke oder Referenz?</h3><p className="mt-1 text-sm text-[#60717c]">Fügen Sie das Wunschprodukt im Offertenbereich frei hinzu oder senden Sie uns ein Foto.</p></div><button onClick={() => onNavigate('quote-planner')} className="rounded-xl bg-[#123d63] px-5 py-3 text-xs font-extrabold text-white">Freie Position hinzufügen</button></div>
    </section>
  </main>;
}

function ProductCard({ product, onSelect, onAdd, inQuote = false }: { key?: string; product: InteriorProduct; onSelect: (p: InteriorProduct) => void; onAdd: (p: InteriorProduct) => void; inQuote?: boolean }) {
  const contain = product.imageFit === 'contain';
  return <article className="group overflow-hidden rounded-[24px] border border-[#dce2e5] bg-white shadow-[0_12px_36px_rgba(16,44,69,.06)] transition hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(16,44,69,.12)]">
    <button onClick={() => onSelect(product)} className="relative block h-[360px] w-full overflow-hidden bg-[#eef2f3] text-left">
      <img src={hires(product.image)} alt={product.name} loading="lazy" decoding="async" className={`h-full w-full transition duration-500 group-hover:scale-[1.025] ${contain ? 'object-contain p-8 mix-blend-multiply' : 'object-cover'}`} />
      <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">{product.badges?.slice(0, 2).map(b => <span key={b} className="rounded-lg bg-white/95 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-[#102c45] shadow-sm">{b}</span>)}</div>
      <span className="absolute bottom-4 right-4 rounded-lg bg-[#123d63]/92 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur">Produkt ansehen</span>
    </button>
    <div className="p-6">
      <div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#a77825]">{product.brand}</p><h3 className="mt-1 font-display text-xl font-semibold leading-tight tracking-[-.02em] text-[#102c45]">{product.name}</h3></div></div>
      <p className="mt-3 min-h-10 text-xs leading-5 text-[#60717c]">{product.spec}</p>
      <div className="mt-4 grid grid-cols-2 gap-3 border-y border-[#e0e6e9] py-4 text-[11px]"><div><span className="block text-[#82909a]">Karton</span><strong className="mt-1 block leading-4 text-[#263e50]">{product.box}</strong></div><div><span className="block text-[#82909a]">Palette / Einheit</span><strong className="mt-1 block leading-4 text-[#263e50]">{product.pallet}</strong></div></div>
      <div className="mt-5 grid grid-cols-[1fr_auto] gap-2"><button onClick={() => onAdd(product)} disabled={inQuote} className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-extrabold transition ${inQuote ? 'bg-[#e3eadf] text-[#3c6d43]' : 'bg-[#e4b85e] text-[#102c45] hover:bg-[#edc976]'}`}>{inQuote ? <><Check size={15} /> Hinzugefügt</> : <><Plus size={15} /> Zur Anfrage</>}</button><button onClick={() => onSelect(product)} className="rounded-xl border border-[#d2dbe0] px-4 text-xs font-extrabold text-[#123d63]">Details</button></div>
    </div>
  </article>;
}

function ProductModal({ product, inQuote, onClose, onAdd }: { product: InteriorProduct; inQuote: boolean; onClose: () => void; onAdd: () => void }) {
  return <div role="dialog" aria-modal="true" aria-label={`Produktdetails: ${product.name}`} className="fixed inset-0 z-[80] flex items-end justify-center bg-[#0a1420]/70 p-0 backdrop-blur-sm sm:items-center sm:p-5" onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <div className="max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-t-[30px] bg-[#fffefb] shadow-2xl sm:rounded-[30px]">
      <div className="grid lg:grid-cols-2"><div className="relative min-h-[420px] bg-[#eef2f3]"><img src={hires(product.image)} alt={product.name} className={`absolute inset-0 h-full w-full ${product.imageFit === 'contain' ? 'object-contain p-10 mix-blend-multiply' : 'object-cover'}`} /><button onClick={onClose} aria-label="Produktdetails schliessen" className="absolute left-4 top-4 rounded-full bg-white p-2 shadow"><X size={19} /></button></div>
        <div className="p-7 sm:p-10"><p className="text-xs font-black uppercase tracking-[.2em] text-[#a77e34]">{product.brand}</p><h2 className="mt-2 font-display text-4xl font-bold tracking-tight">{product.name}</h2><p className="mt-4 leading-7 text-[#65717c]">{product.details}</p><div className="mt-7 space-y-0 divide-y divide-[#e2ded5] border-y border-[#e2ded5]"><Spec label="Referenz" value={product.reference} /><Spec label="Format / Aufbau" value={product.format} /><Spec label="Oberfläche" value={product.finish} /><Spec label="Anwendung" value={product.application} /><Spec label="Karton" value={product.box} /><Spec label="Palette / Einheit" value={product.pallet} /></div><p className="mt-5 text-[11px] leading-5 text-[#7c858d]">Werkdaten gemäss vorliegendem Herstellerkatalog. Preis, aktuelle Verfügbarkeit, Farbton/Charge und Liefertermin werden in der schriftlichen Offerte bestätigt.</p><div className="mt-7 flex flex-col gap-2 sm:flex-row"><button onClick={onAdd} disabled={inQuote} className={`flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-black ${inQuote ? 'bg-[#e3eadf] text-[#3c6d43]' : 'bg-[#d7aa57] text-[#132335]'}`}>{inQuote ? <><Check size={17} /> Bereits hinzugefügt</> : <><Plus size={17} /> Zur Projektanfrage</>}</button><a href={wa(`Guten Tag, ich interessiere mich für ${product.brand} ${product.name}, Referenz ${product.reference}.`)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full border border-[#d7d3c9] px-6 py-4 text-sm font-black"><MessageCircle size={17} /> Frage stellen</a></div></div>
      </div>
    </div>
  </div>;
}

function Spec({ label, value }: { label: string; value: string }) { return <div className="grid grid-cols-[120px_1fr] gap-4 py-3 text-sm"><span className="text-[#8a9298]">{label}</span><strong className="text-[#263747]">{value}</strong></div>; }

function ConstructionMiniCard({ product, onAdd, onOpen }: { key?: string; product: ConstructionProduct; onAdd: (product: ConstructionProduct) => void; onOpen: () => void }) {
  return <article className="overflow-hidden rounded-[24px] border border-[#dedbd2] bg-[#f7f5ef] p-4">
    <button onClick={onOpen} className="flex h-44 w-full items-center justify-center rounded-[18px] bg-white p-4"><img src={hires(product.image)} alt={product.name} className="h-full w-full object-contain mix-blend-multiply" /></button>
    <h3 className="mt-4 text-base font-black text-[#132335]">{product.name}</h3><p className="mt-1 text-[11px] leading-5 text-[#697580]">{product.pack}</p>
    <button onClick={() => onAdd(product)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#d7aa57] px-4 py-2.5 text-[11px] font-black text-[#132335]"><Plus size={14} /> Zur Anfrage</button>
  </article>;
}

function ConstructionPage({ quote, onAdd, onSelect, onNavigate }: { quote: QuoteItem[]; onAdd: (p: ConstructionProduct) => void; onSelect: (p: ConstructionProduct) => void; onNavigate: (p: PageRoute) => void }) {
  return <main>
    <section className="border-b border-[#dce2e5] bg-[#f7f9f9]"><div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-14 lg:grid-cols-[.88fr_1.12fr] lg:px-10 lg:py-18"><div className="self-center"><p className="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#a77825]">Sparte 01 · Direkter Baustellenbedarf</p><h1 className="mt-4 font-display text-5xl font-semibold tracking-[-.04em] text-[#102c45] sm:text-6xl">Baustellenzubehör</h1><p className="mt-5 max-w-2xl leading-7 text-[#60717c]">Nivelliersysteme, Bewehrungszubehör und konkrete Verbrauchspakete. Alle Artikel dieser Sparte bleiben zusammen – mit Varianten, Einheit und Startmenge direkt am Produkt.</p><div className="mt-7 flex flex-wrap gap-2 text-[11px] font-bold text-[#526673]"><span className="rounded-lg border border-[#d6dee3] bg-white px-3 py-2">Konkrete Packungen</span><span className="rounded-lg border border-[#d6dee3] bg-white px-3 py-2">Varianten auswählbar</span><span className="rounded-lg border border-[#d6dee3] bg-white px-3 py-2">Weitere Artikel auf Anfrage</span></div></div><div className="overflow-hidden rounded-[24px] shadow-[0_20px_55px_rgba(16,44,69,.13)]"><SparteVisual sparte={sparten[0]} /></div></div></section>

    <section className="mx-auto max-w-[1480px] px-5 pt-16 lg:px-10">
      <div className="grid gap-8 rounded-[30px] border border-[#ded8cd] bg-[#fffefb] p-7 sm:p-10 lg:grid-cols-[.8fr_1.2fr] lg:p-12">
        <div><p className="text-[10px] font-black uppercase tracking-[.22em] text-[#a77e34]">Das vollständige Beschaffungsfeld</p><h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-[#132335]">Die bekannten Sortimente bleiben. Die konkrete Auswahl wächst.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-[#68737e]">RA Bau Lieferung zeigt online bewusst die Artikel, die wir konkret kalkulieren können. Gleichzeitig beschaffen wir innerhalb dieser Produktfamilien weitere Grössen, Ausführungen und kompatible Lösungen – auch wenn sie noch nicht als Einzelkarte aufgeführt sind.</p></div>
        <div className="grid gap-3 sm:grid-cols-2">{constructionRange.map(range => <div key={range.title} className="rounded-[22px] bg-[#f0ede6] p-5"><Package size={20} className="text-[#a77e34]" /><h3 className="mt-4 text-sm font-black text-[#132335]">{range.title}</h3><p className="mt-2 text-xs leading-5 text-[#697580]">{range.items}</p></div>)}</div>
      </div>
      <div className="mt-10 flex flex-wrap items-end justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[.22em] text-[#a77e34]">Direkt auswählbar</p><h2 className="mt-2 text-3xl font-bold text-[#132335]">Diese Artikel und Pakete sind bereits konkret erfasst.</h2></div><p className="max-w-lg text-xs leading-5 text-[#68737e]">Menge und Variante auswählen, zur Projektanfrage hinzufügen und eine schriftliche Offerte mit Verfügbarkeit und Liefertermin erhalten.</p></div>
    </section>

    <section className="mx-auto max-w-[1480px] space-y-20 px-5 py-12 lg:px-10">{constructionCategories.map((category, categoryIndex) => <div key={category.title}>
      <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="text-[10px] font-black uppercase tracking-[.22em] text-[#a77e34]">Sortimentsgruppe 0{categoryIndex + 1}</p><h2 className="mt-2 text-3xl font-bold">{category.title}</h2><p className="mt-3 max-w-3xl text-sm leading-6 text-[#68737e]">{category.description}</p></div><span className="text-xs font-bold text-[#68737e]">{category.products.length} konkrete Auswahlprodukte</span></div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{category.products.map(product => <ConstructionCard key={product.id} product={product} inQuote={quote.some(item => item.id === `construction-${product.id}`)} onAdd={onAdd} onSelect={onSelect} />)}</div>
    </div>)}</section>

    <section className="mx-auto mb-16 max-w-[1480px] px-5 lg:px-10"><div className="grid overflow-hidden rounded-[30px] bg-[#e6ded0] lg:grid-cols-[1fr_auto]"><div className="p-8 sm:p-10"><p className="text-xs font-black uppercase tracking-[.2em] text-[#80642f]">Nicht aufgeführt?</p><h2 className="mt-2 text-3xl font-bold">Weitere Grössen, Packungen und Baustellenartikel beschaffen wir ebenfalls.</h2><p className="mt-3 max-w-3xl text-sm leading-6 text-[#65717c]">Nennen Sie Produkt, Abmessung, Menge, Einsatz und Lieferort. Die Online-Auswahl zeigt unsere konkreten Schwerpunkte, begrenzt das verfügbare Sortiment aber nicht.</p></div><button onClick={() => onNavigate('quote-planner')} className="flex min-w-64 items-center justify-center gap-3 bg-[#d7aa57] px-8 py-6 text-sm font-black text-[#132335]">Freie Position anfragen <ArrowRight size={17} /></button></div></section>
  </main>;
}

function ConstructionCard({ product, inQuote, onAdd, onSelect }: { key?: string; product: ConstructionProduct; inQuote: boolean; onAdd: (product: ConstructionProduct) => void; onSelect: (product: ConstructionProduct) => void }) {
  return <article className="group overflow-hidden rounded-[26px] border border-[#dedbd2] bg-[#fffefb] shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
    <button onClick={() => onSelect(product)} className="relative flex h-[270px] w-full items-center justify-center overflow-hidden bg-[#efede7] p-8"><img src={hires(product.image)} alt={product.name} loading="lazy" className="h-full w-full object-contain mix-blend-multiply transition duration-500 group-hover:scale-[1.03]" /><div className="absolute left-4 top-4 flex flex-wrap gap-1.5">{product.badges?.map(badge => <span key={badge} className="rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-[#132335] shadow-sm">{badge}</span>)}</div><span className="absolute bottom-4 right-4 rounded-full bg-[#132335]/90 px-3 py-1.5 text-[10px] font-bold text-white">Details ansehen</span></button>
    <div className="p-5"><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#a77e34]">RA Bau Sortiment</p><h3 className="mt-1 text-xl font-bold text-[#132335]">{product.name}</h3><p className="mt-3 min-h-10 text-xs leading-5 text-[#697580]">{product.description}</p><div className="mt-4 grid grid-cols-2 gap-3 border-y border-[#e4e1d9] py-4 text-[11px]"><div><span className="block text-[#92999f]">Varianten</span><strong className="mt-1 block leading-4 text-[#253647]">{product.variants}</strong></div><div><span className="block text-[#92999f]">Einheit</span><strong className="mt-1 block leading-4 text-[#253647]">{product.pack}</strong></div></div><div className="mt-5 grid grid-cols-[1fr_auto] gap-2"><button onClick={() => onAdd(product)} disabled={inQuote} className={`flex items-center justify-center gap-2 rounded-full px-4 py-3 text-xs font-black ${inQuote ? 'bg-[#e3eadf] text-[#3c6d43]' : 'bg-[#d7aa57] text-[#132335]'}`}>{inQuote ? <><Check size={15} /> Hinzugefügt</> : <><Plus size={15} /> Zur Anfrage</>}</button><button onClick={() => onSelect(product)} className="rounded-full border border-[#d7d3c9] px-4 text-xs font-black">Details</button></div></div>
  </article>;
}

function ConstructionModal({ product, inQuote, onClose, onAdd }: { product: ConstructionProduct; inQuote: boolean; onClose: () => void; onAdd: () => void }) {
  return <div role="dialog" aria-modal="true" aria-label={`Produktdetails: ${product.name}`} className="fixed inset-0 z-[80] flex items-end justify-center bg-[#0a1420]/70 p-0 backdrop-blur-sm sm:items-center sm:p-5" onMouseDown={event => event.target === event.currentTarget && onClose()}><div className="max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-t-[30px] bg-[#fffefb] shadow-2xl sm:rounded-[30px]"><div className="grid lg:grid-cols-2"><div className="relative flex min-h-[340px] items-center justify-center bg-[#ebe8e0] p-10"><img src={hires(product.image)} alt={product.name} className="h-full max-h-[430px] w-full object-contain mix-blend-multiply" /><button onClick={onClose} aria-label="Produktdetails schliessen" className="absolute left-4 top-4 rounded-full bg-white p-2 shadow"><X size={19} /></button></div><div className="p-7 sm:p-10"><p className="text-xs font-black uppercase tracking-[.2em] text-[#a77e34]">RA Bau Sortiment</p><h2 className="mt-2 font-display text-4xl font-bold tracking-tight">{product.name}</h2><p className="mt-4 leading-7 text-[#65717c]">{product.description}</p><div className="mt-7 divide-y divide-[#e2ded5] border-y border-[#e2ded5]"><Spec label="Ausführung" value={product.variants} /><Spec label="Einheit" value={product.pack} /><Spec label="Einsatz" value={product.application} /><Spec label="Startmenge" value={`${product.defaultQuantity} ${product.unit}`} /></div><p className="mt-5 text-[11px] leading-5 text-[#7c858d]">Ausführung, Verpackung, Verfügbarkeit und Liefertermin werden in der schriftlichen Offerte bestätigt. Andere Grössen und Mengen können direkt in der Anfrage ergänzt werden.</p><div className="mt-7 flex flex-col gap-2 sm:flex-row"><button onClick={onAdd} disabled={inQuote} className={`flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-black ${inQuote ? 'bg-[#e3eadf] text-[#3c6d43]' : 'bg-[#d7aa57] text-[#132335]'}`}>{inQuote ? <><Check size={17} /> Bereits hinzugefügt</> : <><Plus size={17} /> Zur Projektanfrage</>}</button><a href={wa(`Guten Tag, ich interessiere mich für ${product.name}. Gewünschte Ausführung: ${product.variants}.`)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-full border border-[#d7d3c9] px-6 py-4 text-sm font-black"><MessageCircle size={17} /> Frage stellen</a></div></div></div></div></div>;
}

function QuotePage({ quote, sent, submitting, onSubmit, onUpdate, onRemove, onAddCustom, onNavigate }: { quote: QuoteItem[]; sent: boolean; submitting: boolean; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; onUpdate: (id: string, p: Partial<QuoteItem>) => void; onRemove: (id: string) => void; onAddCustom: (item: QuoteItem) => void; onNavigate: (p: PageRoute) => void }) {
  const [custom, setCustom] = useState(false);
  return <main className="mx-auto max-w-[1380px] px-5 py-14 lg:px-10">
    <SectionTitle kicker="Offerten-Planer" title="Ihre Projektanfrage" copy="Produkte, Mengen und Lieferort einmal sauber erfassen. Wir antworten mit Preis, Verfügbarkeit, Lieferzeit und möglichen Alternativen." />
    {sent ? <div className="mt-10 rounded-[30px] bg-[#dfe9dc] p-10 text-center"><Check className="mx-auto h-12 w-12 text-[#3f7046]" /><h2 className="mt-4 text-3xl font-bold">Anfrage ist eingegangen.</h2><p className="mt-2 text-[#56655a]">Wir prüfen die Zusammenstellung und melden uns mit den nächsten Schritten.</p></div> : <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
      <div className="space-y-4">{quote.length === 0 ? <div className="rounded-[28px] border border-dashed border-[#bcb4a5] bg-[#ebe7de] p-12 text-center"><ShoppingBag className="mx-auto text-[#a77e34]" size={38} /><h2 className="mt-4 text-2xl font-bold">Noch keine Produkte ausgewählt</h2><p className="mt-2 text-sm text-[#68737e]">Öffnen Sie das Gesamtsortiment oder fügen Sie eine freie Position hinzu.</p><button onClick={() => onNavigate('interior')} className="mt-6 rounded-full bg-[#132335] px-6 py-3 text-xs font-black text-white">Zum Gesamtsortiment</button></div> : quote.map(item => <div key={item.id} className="grid gap-4 rounded-[24px] border border-[#ddd9d0] bg-[#fffefb] p-4 sm:grid-cols-[110px_1fr] sm:p-5"><img src={hires(item.image)} alt="" className="h-28 w-full rounded-[16px] object-contain bg-[#efede7] p-2" /><div><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-black uppercase tracking-wider text-[#a77e34]">{item.brand || 'Baustellenzubehör'}</p><h3 className="text-lg font-bold">{item.name}</h3><p className="mt-1 text-xs text-[#737d86]">{item.reference || item.spec}</p></div><button onClick={() => onRemove(item.id)} className="rounded-full p-2 text-[#9b5c55] hover:bg-[#f5e9e7]" aria-label="Entfernen"><Trash2 size={17} /></button></div><div className="mt-4 grid gap-2 sm:grid-cols-[120px_105px_1fr]"><input value={item.quantity} onChange={e => onUpdate(item.id, { quantity: e.target.value })} className="rounded-xl border border-[#d8d3c9] px-3 py-2.5 text-sm font-bold outline-none focus:border-[#a77e34]" aria-label="Menge" /><select value={item.unit} onChange={e => onUpdate(item.id, { unit: e.target.value })} className="rounded-xl border border-[#d8d3c9] bg-white px-3 py-2.5 text-sm font-bold"><option>m²</option><option>Stk.</option><option>Pack</option><option>Rolle</option><option>Set</option><option>Karton</option><option>Palette</option></select><input value={item.customNote || ''} onChange={e => onUpdate(item.id, { customNote: e.target.value })} placeholder="Farbe, Format oder Hinweis" className="rounded-xl border border-[#d8d3c9] px-3 py-2.5 text-sm outline-none focus:border-[#a77e34]" /></div></div></div>)}
        <button onClick={() => setCustom(v => !v)} className="flex w-full items-center justify-between rounded-[22px] border border-dashed border-[#b9b1a1] p-5 text-left"><span><strong className="block text-sm">Freies Produkt hinzufügen</strong><span className="text-xs text-[#788188]">Marke, Referenz oder Beschreibung manuell erfassen</span></span>{custom ? <Minus /> : <Plus />}</button>
        {custom && <CustomItem onAdd={item => { onAddCustom(item); setCustom(false); }} />}
      </div>
      <form onSubmit={onSubmit} className="h-fit rounded-[28px] bg-[#132335] p-6 text-white sm:p-8 lg:sticky lg:top-28"><h2 className="text-2xl font-bold">Projektdaten</h2><p className="mt-2 text-xs leading-5 text-white/60">Pflichtfelder: Kontakt, E-Mail und Lieferort. Je genauer die Angaben, desto schneller die Offerte.</p><div className="mt-6 space-y-3"><FormInput name="company" placeholder="Firma" /><FormInput name="contactName" placeholder="Ansprechperson *" required /><FormInput name="email" type="email" placeholder="E-Mail *" required /><FormInput name="phone" type="tel" placeholder="Telefon" /><FormInput name="deliveryAddress" placeholder="PLZ / Ort der Lieferung *" required /><select name="timeframe" className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm outline-none"><option className="text-black">Liefertermin flexibel</option><option className="text-black">So schnell wie möglich</option><option className="text-black">Innerhalb 4 Wochen</option><option className="text-black">In 2–3 Monaten</option></select><textarea name="notes" rows={4} placeholder="Projekt, Etappe, gewünschte Marke oder weitere Hinweise" className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-white/45" /></div><label className="mt-4 flex gap-3 text-[11px] leading-5 text-white/60"><input type="checkbox" required className="mt-1" />Ich bestätige, dass diese Anfrage unverbindlich ist und zur Erstellung einer projektbezogenen Offerte verwendet wird.</label><button disabled={!quote.length || submitting} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#d7aa57] px-5 py-4 text-sm font-black text-[#132335] disabled:cursor-not-allowed disabled:opacity-40">{submitting ? 'Wird gesendet …' : 'Offerte anfragen'} <ArrowRight size={17} /></button><p className="mt-4 text-center text-[10px] text-white/45">Keine Online-Zahlung · kein verbindlicher Kauf · Antwort per E-Mail oder Telefon</p></form>
    </div>}
  </main>;
}

function CustomItem({ onAdd }: { onAdd: (item: QuoteItem) => void }) {
  const [name, setName] = useState('');
  return <div className="rounded-[22px] bg-[#e9e4da] p-5"><p className="text-sm font-bold">Freie Position</p><div className="mt-3 grid gap-2 sm:grid-cols-2"><input value={name} onChange={e => setName(e.target.value)} placeholder="Produkt / Marke / Referenz" className="rounded-xl border border-[#d0c9bc] bg-white px-3 py-3 text-sm" /><button disabled={!name.trim()} onClick={() => onAdd({ id: `custom-${Date.now()}`, name, spec: 'Freie Projektposition', image: '/images/baustellenzubehoor_premium.png', quantity: '1', unit: 'Stk.', isCustom: true })} className="rounded-xl bg-[#132335] px-4 py-3 text-xs font-black text-white disabled:opacity-40">Position übernehmen</button></div></div>;
}

function ContactPage() {
  return <main className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 lg:grid-cols-[.8fr_1.2fr] lg:px-10"><div><p className="text-xs font-black uppercase tracking-[.2em] text-[#a77e34]">Direkter Kontakt</p><h1 className="mt-3 font-display text-5xl font-bold">Sprechen wir über Ihr Projekt.</h1><p className="mt-5 leading-7 text-[#69747e]">Für konkrete Produkte ist der Offerten-Planer der schnellste Weg. Für Partnerschaften, Sortimentsfragen und allgemeine Anfragen erreichen Sie uns direkt.</p><div className="mt-8 space-y-3"><a href={`tel:${PHONE}`} className="flex items-center gap-3 rounded-2xl bg-white p-4 font-bold"><Phone className="text-[#a77e34]" /> +41 78 241 89 13</a><a href={`mailto:${EMAIL}`} className="flex items-center gap-3 rounded-2xl bg-white p-4 font-bold"><Mail className="text-[#a77e34]" /> {EMAIL}</a><a href={wa('Guten Tag, ich möchte ein Projekt besprechen.')} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl bg-[#20bd67] p-4 font-bold text-white"><MessageCircle /> WhatsApp</a></div></div><div className="overflow-hidden rounded-[30px] bg-[#132335] p-8 text-white sm:p-12"><h2 className="text-2xl font-bold">So erhalten Sie schneller eine belastbare Antwort</h2><div className="mt-8 grid gap-4 sm:grid-cols-2"><TrustTile dark icon={<Package />} title="Produkt" text="Marke, Referenz, Format" /><TrustTile dark icon={<Layers3 />} title="Menge" text="m², Stück oder Paletten" /><TrustTile dark icon={<Building2 />} title="Projekt" text="Nutzung und Bauphase" /><TrustTile dark icon={<Truck />} title="Lieferung" text="PLZ, Ort und Termin" /></div></div></main>;
}

function FormInput(props: React.InputHTMLAttributes<HTMLInputElement>) { return <input {...props} className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-white/45 focus:border-[#d7aa57]" />; }
function SectionTitle({ kicker, title, copy }: { kicker: string; title: string; copy: string }) { return <div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[.22em] text-[#a77e34]">{kicker}</p><h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-[-.03em] sm:text-5xl">{title}</h2><p className="mt-4 text-sm leading-7 text-[#68747f] sm:text-base">{copy}</p></div>; }
function TrustTile({ icon, title, text, dark = false }: { icon: React.ReactNode; title: string; text: string; dark?: boolean }) { return <div className={`${dark ? 'border border-white/10 bg-white/5' : 'bg-[#fffefb]'} p-6`}><div className="text-[#b58a3d]">{icon}</div><h3 className="mt-4 text-sm font-black">{title}</h3><p className={`mt-1 text-xs ${dark ? 'text-white/55' : 'text-[#778087]'}`}>{text}</p></div>; }

function Footer({ onNavigate }: { onNavigate: (p: PageRoute) => void }) {
  return <footer className="bg-[#0d1925] px-5 py-12 text-white lg:px-10"><div className="mx-auto grid max-w-[1480px] gap-10 md:grid-cols-[1.2fr_.8fr_.8fr]"><div><Logo /><p className="mt-5 max-w-md text-xs leading-6 text-white/55">Baustellenzubehör und Ausbaumaterial für Bau- und Renovationsprojekte. Produkt auswählen, Menge definieren und projektbezogene Offerte erhalten.</p></div><div><h3 className="text-xs font-black uppercase tracking-[.18em] text-[#d7aa57]">Sparten</h3><div className="mt-4 space-y-2 text-sm text-white/65">{[['baustellenzubehoor','Baustellenzubehör'],['porcelain','Feinsteinzeug'],['mosaics','Premium Mosaike'],['spc','SPC & Vinyl'],['bathroom','Bad & Sanitär']].map(([r,l]) => <button key={r} onClick={() => onNavigate(r as PageRoute)} className="block hover:text-white">{l}</button>)}</div></div><div><h3 className="text-xs font-black uppercase tracking-[.18em] text-[#d7aa57]">Projektanfrage</h3><div className="mt-4 space-y-2 text-sm text-white/65"><button onClick={() => onNavigate('quote-planner')} className="block hover:text-white">Offerte zusammenstellen</button><a className="block" href={`mailto:${EMAIL}`}>{EMAIL}</a><a className="block" href={wa('Guten Tag, ich möchte ein Projekt besprechen.')} target="_blank" rel="noreferrer">WhatsApp</a></div></div></div><div className="mx-auto mt-10 flex max-w-[1480px] flex-col justify-between gap-2 border-t border-white/10 pt-5 text-[10px] text-white/35 sm:flex-row"><span>© 2026 RA Bau Lieferung</span><span>Ausführung, Preis und Verfügbarkeit werden projektbezogen bestätigt.</span></div></footer>;
}
