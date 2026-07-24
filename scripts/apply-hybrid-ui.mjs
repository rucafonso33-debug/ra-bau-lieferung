import fs from 'node:fs';

const file = 'src/App.tsx';
let source = fs.readFileSync(file, 'utf8');

if (!source.includes("import { Logo } from './components/Logo';")) {
  source = source.replace("import { useQuote } from './hooks/useQuote';", "import { useQuote } from './hooks/useQuote';\nimport { Logo } from './components/Logo';");
}

const replaceBlock = (pattern, replacement, label) => {
  if (!pattern.test(source)) throw new Error(`Could not locate ${label}`);
  source = source.replace(pattern, replacement);
};

replaceBlock(
  /function Header\([\s\S]*?\n}\n\nfunction Hero/,
`function Header({ page, navigate, quoteCount }: { page: string; navigate: (page: string) => void; quoteCount: number }) {
  const [open, setOpen] = useState(false);
  const links = [
    ['products', 'Produkte'], ['construction', 'Baustellenzubehör'], ['ceramics', 'Keramik'], ['bathroom', 'Badezimmer'], ['flooring', 'Böden'], ['concepts', 'Raumkonzepte'], ['contact', 'Kontakt'],
  ];
  return <header className="sticky top-0 z-50 border-b border-[#dce3e7] bg-white/95 backdrop-blur">
    <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-2 px-3 sm:px-4 lg:h-20 lg:px-8">
      <button onClick={() => navigate('home')} aria-label="RA Bau Lieferung Startseite" className="min-w-0 shrink text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004b87] focus-visible:ring-offset-2">
        <Logo className="max-w-[132px] sm:max-w-[205px] lg:max-w-none" />
      </button>
      <nav className="hidden items-center gap-5 xl:flex">{links.map(([key, label]) => <button key={key} onClick={() => navigate(key)} className={\`text-xs font-bold \${page === key ? 'text-[#004b87]' : 'text-[#536b79] hover:text-[#004b87]'}\`}>{label}</button>)}</nav>
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2"><button onClick={() => navigate('quote')} aria-label={\`Projektanfrage mit \${quoteCount} Positionen öffnen\`} className="relative inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-lg bg-[#004b87] px-3 text-xs font-extrabold text-white sm:px-4"><ClipboardList size={17} /><span className="hidden sm:inline">Anfrage</span>{quoteCount ? <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d7aa57] px-1 text-[10px] text-[#10293e] sm:static sm:h-auto sm:px-2 sm:py-0.5">{quoteCount}</span> : null}</button><button aria-label="Menü" aria-expanded={open} onClick={() => setOpen(!open)} className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#d8e1e6] xl:hidden">{open ? <X /> : <Menu />}</button></div>
    </div>
    {open ? <nav className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-[#e2e8eb] bg-white px-4 py-3 xl:hidden">{links.map(([key, label]) => <button key={key} onClick={() => { navigate(key); setOpen(false); }} className="block min-h-11 w-full border-b border-[#eef2f4] text-left text-base font-bold text-[#10293e]">{label}</button>)}</nav> : null}
  </header>;
}

function Hero`,
  'Header',
);

replaceBlock(
  /function ProjectEntries\([\s\S]*?\n}\n\nconst categoryRoutes/,
`function ProjectEntries({ navigate }: { navigate: (page: string) => void }) {
  return <section className="border-b border-[#d9e1e5] bg-white"><div className="mx-auto max-w-[1500px] px-5 py-14 lg:px-10 lg:py-20"><div className="max-w-3xl"><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#9a6e22]">Schneller Einstieg nach Raum</p><h2 className="mt-3 font-display text-4xl font-black tracking-[-.04em] text-[#10293e] sm:text-5xl">Was möchten Sie gestalten?</h2><p className="mt-4 text-base leading-7 text-[#5c7280]">Beginnen Sie beim Raum oder bei einer bekannten Referenz. Danach sehen Sie nur die passenden, bereits geprüften Materialien und Komponenten.</p></div><div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{projectEntries.map((item) => <button key={item.id} onClick={() => navigate(item.route)} className="group overflow-hidden rounded-[18px] border border-[#d7e0e5] bg-[#f8fafb] text-left shadow-[0_8px_24px_rgba(16,41,62,.05)] transition hover:-translate-y-1 hover:border-[#b9cbd5] hover:shadow-[0_18px_42px_rgba(16,41,62,.11)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004b87] focus-visible:ring-offset-2"><div className="relative aspect-[16/10] overflow-hidden bg-[#e9edef]"><img src={item.image} alt={item.imageAlt} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" /><span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[.12em] text-[#004b87] shadow-sm">{item.tag}</span></div><div className="p-5"><div className="flex items-start justify-between gap-4"><h3 className="font-display text-2xl font-black leading-tight text-[#10293e]">{item.title}</h3><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eaf1f5] text-[#004b87] transition group-hover:translate-x-1"><ArrowRight size={17} /></span></div><p className="mt-3 text-sm leading-6 text-[#637884]">{item.copy}</p></div></button>)}</div></div></section>;
}

const categoryRoutes`,
  'ProjectEntries',
);

replaceBlock(
  /function Advisor\([\s\S]*?\n}\n\nfunction ProductGallery/,
`function Advisor({ navigate, category }: { navigate: (page: string) => void; category?: string }) {
  const message = \`Guten Tag, ich interessiere mich für \${category ?? 'ein Bau- oder Renovationsprojekt'}. Ich sende Raumfoto, ungefähre Masse, Stilwunsch und Lieferort.\`;
  const benefits = [
    ['Stil eingrenzen', 'Raumfoto und gewünschte Wirkung genügen für den ersten Schritt.'],
    ['Technik prüfen', 'Format, Untergrund, Nutzung und Menge werden vor der Offerte geprüft.'],
    ['Referenz bestätigen', 'Keine automatische Bestellung und keine ungeprüfte Produktzusage.'],
  ];
  return <section className="bg-white"><div className="mx-auto max-w-[1500px] px-5 py-14 lg:px-10 lg:py-20"><div className="grid overflow-hidden rounded-[20px] border border-[#d3dee4] bg-white shadow-[0_12px_35px_rgba(16,41,62,.06)] lg:grid-cols-[1.25fr_.75fr]"><div className="p-6 sm:p-8 lg:p-10"><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#9a6e22]">Persönliche Auswahlhilfe</p><h2 className="mt-2 font-display text-3xl font-black tracking-[-.035em] text-[#10293e] sm:text-4xl">Noch nicht sicher, welches Produkt passt?</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-[#5e7380]">Senden Sie Raumfoto, ungefähre Masse, gewünschten Stil und Lieferort. Wir grenzen die Auswahl ein, statt Ihnen einfach mehr Produkte zu zeigen.</p><div className="mt-6 grid gap-3 sm:grid-cols-3">{benefits.map(([title, copy]) => <div key={title} className="rounded-xl bg-[#f4f7f8] p-4"><Check className="h-5 w-5 text-[#9a6e22]" /><p className="mt-3 text-xs font-extrabold text-[#10293e]">{title}</p><p className="mt-1 text-[11px] leading-5 text-[#667b87]">{copy}</p></div>)}</div></div><div className="flex flex-col justify-center gap-3 bg-[#10293e] p-6 text-white sm:p-8 lg:p-10"><a href={whatsappUrl(message)} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#d7aa57] px-5 py-4 text-sm font-extrabold text-[#10293e]"><MessageCircle size={18} /> Auswahl per WhatsApp</a><button onClick={() => navigate('quote')} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-4 text-sm font-extrabold text-white"><ClipboardList size={18} /> Anfrage zusammenstellen</button><p className="text-center text-[10px] leading-4 text-white/55">Jede Position wird vor der Offerte persönlich geprüft.</p></div></div></div></section>;
}

function ProductGallery`,
  'Advisor',
);

replaceBlock(
  /function ProductCard\([\s\S]*?\n}\n\nfunction CategoryPage/,
`function ProductCard({ product, selected, onDetails, onToggle }: { product: InteriorProduct; selected: boolean; onDetails: () => void; onToggle: () => void }) {
  const visual = product.gallery?.[0] ?? { src: product.image, alt: product.name, fit: product.imageFit ?? 'cover', label: 'Produkt' };
  return <article className="group flex overflow-hidden rounded-[18px] border border-[#d7e0e5] bg-white shadow-[0_8px_28px_rgba(16,41,62,.06)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(16,41,62,.12)]"><div className="flex w-full flex-col"><button onClick={onDetails} className="relative block aspect-[4/3] w-full overflow-hidden bg-[#eef1f2] text-left"><img src={visual.src} alt={visual.alt} loading="lazy" decoding="async" className={\`h-full w-full transition duration-700 group-hover:scale-[1.02] \${visual.fit === 'contain' ? 'object-contain bg-white p-4 sm:p-7' : 'object-cover'}\`} /><div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[#081d2d]/80 via-[#081d2d]/10 to-transparent px-4 pb-3 pt-14 text-white"><span className="rounded-full bg-[#10293e]/90 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[.14em]">{visual.label ?? 'Im Raum'}</span>{product.gallery && product.gallery.length > 1 ? <span className="text-[10px] font-bold">{product.gallery.length} Ansichten</span> : null}</div></button><div className="flex flex-1 flex-col p-5 sm:p-6"><p className="text-[9px] font-extrabold uppercase tracking-[.17em] text-[#8e6725]">{product.brand}</p><button onClick={onDetails} className="mt-1.5 text-left"><h3 className="font-display text-[22px] font-black leading-tight tracking-[-.025em] text-[#10293e] sm:text-2xl">{product.name}</h3></button><p className="mt-2 text-[13px] font-semibold leading-5 text-[#506a79] sm:text-sm">{product.spec}</p><p className="mt-3 line-clamp-2 text-[13px] leading-5 text-[#6a7e8a] sm:line-clamp-3 sm:text-sm sm:leading-6">{product.details}</p>{product.components?.length ? <div className="mt-4 flex flex-wrap gap-1.5">{product.components.slice(0, 4).map((component) => <span key={component} className="rounded-full border border-[#d7e0e5] bg-[#f7f9fa] px-2.5 py-1 text-[9px] font-bold text-[#496173]">{component}</span>)}</div> : null}<div className="mt-4 grid grid-cols-2 gap-2 text-[9px] font-semibold leading-4 text-[#546b79] sm:text-[10px]"><span className="rounded-md bg-[#f1f4f5] px-2.5 py-2">{product.format}</span><span className="rounded-md bg-[#f1f4f5] px-2.5 py-2">{product.application}</span></div><div className="mt-auto grid grid-cols-[.82fr_1.18fr] gap-2 pt-5"><button onClick={onDetails} className="min-h-11 rounded-lg border border-[#ccd7de] px-3 text-[11px] font-extrabold text-[#004b87]">Details</button><button onClick={onToggle} className={\`min-h-11 rounded-lg px-3 text-[11px] font-extrabold \${selected ? 'bg-[#fff0ee] text-[#9b3f3b]' : 'bg-[#004b87] text-white'}\`}>{selected ? 'Entfernen' : product.brand === 'Raumkonzept' ? 'Konzept anfragen' : 'Zur Anfrage'}</button></div></div></div></article>;
}

function CategoryPage`,
  'ProductCard',
);

fs.writeFileSync(file, source);
console.log('Applied controlled hybrid visual improvements.');
