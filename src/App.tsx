import { useEffect, useMemo, useState, type FormEvent, type MouseEvent, type ReactNode } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  Download,
  Handshake,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
} from 'lucide-react';
import { categories, categoryById, products, type CategoryId, type Product } from './catalogData';
import { buildInquiryMessage, type InquiryData, type InquiryTopic } from './inquiry';
import { trackConversion } from './analytics';
import { Logo } from './components/Logo';
import { storefront } from './storefrontConfig';

const formSubmitEndpoint = 'https://formsubmit.co/ajax/76906bb8a1c1598dbf4103bf25227949';

const routeByCategory: Record<CategoryId, string> = {
  grossformat: '/grossformatplatten',
  keramik: '/feinsteinzeug',
  mosaik: '/mosaike',
  badmoebel: '/badmoebel',
  bad: '/bad-sanitaer',
  boden: '/spc-vinyl',
  baustelle: '/baustellenzubehoer',
};

const categoryByPath: Record<string, CategoryId> = {
  ...Object.fromEntries(Object.entries(routeByCategory).map(([id, path]) => [path, id])) as Record<string, CategoryId>,
  '/sanitaerkeramik': 'bad',
  '/armaturen-duschen': 'bad',
  '/duschloesungen': 'bad',
};

const titleByPath: Record<string, string> = {
  '/': 'Baustoffe, Fliesen & Badlösungen für Fachbetriebe | RA Bau Lieferung',
  '/produkte': 'Baustoffe & Badlösungen für Fachbetriebe | RA Bau Lieferung',
  '/kataloge': 'Produktkataloge für Fachbetriebe | RA Bau Lieferung',
  '/ablauf': 'So funktioniert die Produktanfrage | RA Bau Lieferung',
  '/kontakt': 'Preis, Verfügbarkeit & Konditionen anfragen | RA Bau Lieferung',
  '/grossformatplatten': 'Premium-Grossformatplatten für Fachbetriebe Schweiz | RA Bau Lieferung',
  '/feinsteinzeug': 'Feinsteinzeug & Fliesen Grosshandel Schweiz | RA Bau Lieferung',
  '/mosaike': 'Mosaik & Steinfliesen für Fachbetriebe Schweiz | RA Bau Lieferung',
  '/badmoebel': 'Badmöbel Grosshandel Schweiz | RA Bau Lieferung',
  '/bad-sanitaer': 'Sanitär Grosshandel Schweiz | RA Bau Lieferung',
  '/spc-vinyl': 'SPC & Vinyl für Fachbetriebe Schweiz | RA Bau Lieferung',
  '/baustellenzubehoer': 'Baustellenzubehör Schweiz | RA Bau Lieferung',
};

const emptyInquiry: InquiryData = {
  requestTypes: ['Preisanfrage'],
  productAreas: [],
  selection: '',
  customerType: 'Fachbetrieb',
  name: '',
  company: '',
  email: '',
  phone: '',
  quantity: '',
  location: '',
  timeline: '',
  message: '',
  attachmentName: '',
  preferredChannel: 'whatsapp',
};

function Header({ currentPath, onNavigate, onRequest }: { currentPath: string; onNavigate: (path: string) => void; onRequest: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [
    ['/produkte', 'Sortiment'],
    ['/grossformatplatten', 'Premium-Grossformat'],
    ['/kataloge', 'Kataloge'],
    ['/ablauf', 'Ablauf'],
    ['/kontakt', 'Kontakt'],
  ];
  const productLinks: [string, string][] = [
    ['/grossformatplatten', 'Premium-Grossformat'],
    ['/mosaike', 'Mosaik'],
    ['/bad-sanitaer', 'Sanitär & Bad'],
    ['/badmoebel', 'Badmöbel'],
    ['/feinsteinzeug', 'Fliesen'],
    ['/spc-vinyl', 'SPC & Vinyl'],
    ['/baustellenzubehoer', 'Baustelle'],
  ];

  const go = (event: MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    setOpen(false);
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#dfe4e5] bg-[#fbfaf7]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[84px] lg:px-10">
        <a href="/" onClick={(event) => go(event, '/')} aria-label="RA Bau Lieferung Startseite" className="shrink-0">
          <Logo className="max-w-[190px]" />
        </a>
        <nav className="hidden items-center gap-7 xl:flex">
          {links.map(([path, label]) => (
            <a key={path} href={path} onClick={(event) => go(event, path)} aria-current={currentPath === path ? 'page' : undefined} className={`text-xs font-extrabold tracking-wide transition hover:text-[#004b87] ${currentPath === path ? 'text-[#004b87]' : 'text-[#4f6369]'}`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={`tel:+${storefront.phoneDigits}`} onClick={() => trackConversion('phone_click', { source: 'header' })} className="hidden min-h-11 items-center gap-2 rounded-full border border-[#cfd9dc] px-4 text-xs font-extrabold text-[#17384b] sm:inline-flex">
            <Phone size={15} /> {storefront.phoneDisplay}
          </a>
          <button onClick={onRequest} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#004b87] px-4 text-xs font-extrabold text-white sm:px-5">
            Preis anfragen <ArrowRight size={15} />
          </button>
          <button aria-label="Menü öffnen" aria-expanded={open} onClick={() => setOpen(!open)} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#cfd9dc] xl:hidden">
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="border-t border-[#e0e5e6] bg-[#fbfaf7] px-5 py-3 xl:hidden">
          {links.map(([path, label]) => (
            <a key={path} href={path} onClick={(event) => go(event, path)} aria-current={currentPath === path ? 'page' : undefined} className={`flex min-h-12 w-full items-center border-b border-[#e6e9e9] text-left text-sm font-bold ${currentPath === path ? 'text-[#004b87]' : 'text-[#17384b]'}`}>
              {label}
            </a>
          ))}
        </nav>
      ) : null}
      <nav aria-label="Produktbereiche" className="border-t border-[#e4e8e8] bg-white/90">
        <div className="mx-auto flex max-w-[1500px] gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-10">
          {productLinks.map(([path, label]) => (
            <a key={path} href={path} onClick={(event) => go(event, path)} aria-current={currentPath === path ? 'page' : undefined} className={`flex min-h-8 shrink-0 items-center rounded-full px-3 text-[10px] font-black transition ${currentPath === path ? 'bg-[#17384b] text-white' : 'text-[#60757c] hover:bg-[#eef1ee] hover:text-[#17384b]'}`}>
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

const heroSlides = [
  { name: 'Calacatta Gold', detail: 'Grossformat · Marmoroptik', image: '/images/showcase/calacatta-gold.webp', alt: 'Grossformatige Keramik in heller Calacatta-Optik mit goldener Aderung' },
  { name: 'Amazonite', detail: 'Grossformat · Natursteinoptik', image: '/images/products-2026/slab-amazonite.webp', alt: 'Bad mit ausdrucksstarker blaugrüner Grossformatplatte' },
  { name: 'Travertin Brick', detail: 'Mosaik · warme Natursteinwirkung', image: '/images/showcase/stone-mosaic-travertin.webp', alt: 'Stäbchenmosaik in warmer Travertinoptik' },
  { name: 'Marmy Relief 3D', detail: 'Mosaik · Relief & Marmoroptik', image: '/images/products-2026/mosaic-marmy-relief.webp', alt: 'Dreidimensionale Mosaikfläche in heller Marmoroptik mit goldenen Akzenten' },
  { name: 'Stria Oak 120', detail: 'Badmöbel · gerillte Eichenfront', image: '/images/products-2026/furniture-stria-oak.webp', alt: 'Hängendes Badmöbel mit gerillter heller Eichenfront und Rundspiegel' },
  { name: 'Walnut Double 120', detail: 'Badmöbel · Doppelwaschtisch', image: '/images/showcase/furniture-natural.webp', alt: 'Schwebender Doppelwaschtisch mit gerillter dunkler Holzfront' },
  { name: 'Fly White', detail: 'Sanitärkeramik · WC & Bidet', image: '/images/products-2026/sanitary-fly-white.webp', alt: 'Modernes bodenstehendes WC und Bidet in Weiss' },
  { name: 'Glamic Black', detail: 'Sanitärkeramik · Schwarz matt', image: '/images/products-2026/sanitary-glamic-black.webp', alt: 'Modernes WC und Bidet in mattem Schwarz' },
  { name: 'Smart Thermostat', detail: 'Bad · Duschsystem', image: '/images/products-2026/shower-rs-smart.webp', alt: 'Thermostatische Duschsäule mit Kopf- und Handbrause' },
];

function Hero({ onProducts, onQuote, onCatalogs }: { onProducts: () => void; onQuote: () => void; onCatalogs: () => void }) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % heroSlides.length), 4300);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate min-h-[calc(100svh-116px)] overflow-hidden bg-[#102f3f] text-white lg:min-h-[calc(100svh-128px)]">
      <div className="absolute inset-0" role="img" aria-label={heroSlides[activeSlide].alt}>
        {heroSlides.map((slide, index) => (
          <img
            key={slide.image}
            src={slide.image}
            alt=""
            fetchPriority={index === 0 ? 'high' : 'auto'}
            className={`hero-slide absolute inset-0 h-full w-full object-cover ${index === activeSlide ? 'hero-slide-active' : ''}`}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#071e2c]/92 via-[#0a2635]/68 to-[#071e2c]/18" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#071e2c]/80 via-transparent to-[#071e2c]/22" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-116px)] max-w-[1500px] flex-col justify-between px-5 py-8 sm:px-8 lg:min-h-[calc(100svh-128px)] lg:px-10 lg:py-12">
        <div className="flex flex-1 flex-col justify-center py-14 lg:py-20">
          <p className="text-[11px] font-black uppercase tracking-[.23em] text-[#d7b46a]">Ausgewählte Qualitätsprodukte für Fachbetriebe</p>
          <h1 className="mt-5 max-w-[760px] font-display text-[2.35rem] font-black leading-[.98] tracking-[-.05em] text-balance sm:text-6xl lg:text-[4.15rem]">
            Ausgewählte Baustoffe und Badlösungen für Schweizer Fachbetriebe.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8">
            Hochwertige Materialien, ausgewählte Marken und organisierte Lieferung für Fachbetriebe und Wiederverkäufer in der Schweiz.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button onClick={onProducts} className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#d7b46a] px-6 text-sm font-black text-[#102f3f] sm:w-auto">
              Produkte ansehen <ArrowRight size={17} />
            </button>
            <button onClick={onQuote} className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#004b87] px-6 text-sm font-black text-white sm:w-auto">
              <MessageCircle size={17} /> Preis & Verfügbarkeit
            </button>
            <button onClick={onCatalogs} className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 text-sm font-black text-white sm:w-auto">
              <BookOpen size={17} /> Kataloge ansehen
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-5 border-t border-white/16 pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div aria-live="polite" className="max-w-sm">
            <p className="text-[9px] font-black uppercase tracking-[.2em] text-[#d7b46a]">Referenz {String(activeSlide + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}</p>
            <p className="mt-2 font-display text-xl font-black">{heroSlides[activeSlide].name}</p>
            <p className="mt-1 text-xs text-white/58">{heroSlides[activeSlide].detail}</p>
          </div>
          <div className="flex gap-2" aria-label="Referenzen im Titelbereich">
            {heroSlides.map((slide, index) => (
              <button key={slide.image} type="button" onClick={() => setActiveSlide(index)} aria-label={`${slide.name} anzeigen`} aria-current={index === activeSlide ? 'true' : undefined} className={`h-1.5 rounded-full transition-all ${index === activeSlide ? 'w-9 bg-[#d7b46a]' : 'w-4 bg-white/35 hover:bg-white/65'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: Sparkles, title: 'Ausgewählte Qualität', copy: 'Sorgfältig ausgewählte Produkte von Herstellern aus Portugal und Spanien.' },
    { icon: Handshake, title: 'Konditionen für Fachkunden', copy: 'Individuelle Einkaufskonditionen für Fachbetriebe und Wiederverkäufer.' },
    { icon: ShieldCheck, title: 'Direkter Ansprechpartner', copy: 'Ein zentraler Kontakt für Produkte, Preise, Verfügbarkeit und Lieferung.' },
    { icon: Truck, title: 'Lieferung in die Schweiz', copy: 'Organisation der Lieferung an Betrieb, Lager oder Baustelle, je nach Produkt und Möglichkeit.' },
  ];
  return (
    <section className="border-b border-[#dfe4e5] bg-[#fbfaf7]">
      <div className="mx-auto max-w-[1500px] px-5 py-14 sm:px-8 lg:px-10 lg:py-18">
        <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#a87828]">Qualität für professionelle Anwendungen</p>
        <h2 className="mt-3 font-display text-3xl font-black tracking-[-.04em] text-[#17384b] sm:text-4xl">Warum RA Bau Lieferung?</h2>
        <div className="mt-8 grid gap-px overflow-hidden rounded-[22px] bg-[#dfe4e5] md:grid-cols-2 xl:grid-cols-4">
          {items.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="bg-[#fbfaf7] px-6 py-7 lg:px-8">
              <Icon className="text-[#a87828]" size={22} />
              <h3 className="mt-4 text-sm font-black text-[#17384b]">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-[#66797f]">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#a87828]">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl font-black leading-[1.02] tracking-[-.045em] text-[#17384b] sm:text-5xl">{title}</h2>
      <p className="mt-5 text-base leading-7 text-[#66797f]">{copy}</p>
    </div>
  );
}

function CategoryGrid({ onSelect }: { onSelect: (id: CategoryId) => void }) {
  const commercialOrder: CategoryId[] = ['grossformat', 'mosaik', 'bad', 'badmoebel', 'keramik', 'boden', 'baustelle'];
  const orderedCategories = commercialOrder.map((id) => categoryById[id]);
  return (
    <section id="sortiment" className="scroll-mt-24 bg-[#f2f0e9]">
      <div className="mx-auto max-w-[1500px] px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <SectionHeading eyebrow="Qualitätssortiment für Fachkunden" title="Ausgewählte Produktbereiche. Klar geordnet." copy="Hochwertige Baustoffe, Fliesen, Grossformat, Mosaik, Badmöbel und Sanitärlösungen für Fachbetriebe, Bauunternehmen, Fliesenleger, Sanitärbetriebe und Wiederverkäufer in der Schweiz." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {orderedCategories.map((category, index) => (
            <a key={category.id} href={routeByCategory[category.id]} onClick={(event) => { event.preventDefault(); onSelect(category.id); }} className={`group relative overflow-hidden rounded-[22px] bg-[#17384b] text-left ${index === 0 ? 'md:col-span-2 xl:col-span-2' : ''}`}>
              <div className={`overflow-hidden ${index === 0 ? 'aspect-[16/8] lg:aspect-[16/7]' : 'aspect-[16/10]'}`}>
                <img src={category.image} alt={category.imageAlt} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d2938]/95 via-[#0d2938]/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <p className="text-[9px] font-black uppercase tracking-[.18em] text-[#d7b46a]">{category.eyebrow}</p>
                <div className="mt-2 flex items-end justify-between gap-5">
                  <div>
                    <h3 className="font-display text-2xl font-black text-white sm:text-3xl">{category.title}</h3>
                    <p className="mt-2 max-w-xl text-xs leading-5 text-white/68 sm:text-sm">{category.description}</p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition group-hover:translate-x-1"><ArrowRight size={18} /></span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function LargeFormat({ onRequest }: { onRequest: (product: Product) => void }) {
  const featured = products.filter((product) => product.featured);
  return (
    <section id="grossformat" className="scroll-mt-24 bg-[#102f3f] text-white">
      <div className="mx-auto max-w-[1500px] px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[.76fr_1.24fr] lg:items-end">
          <SectionHeading eyebrow="Premium-Grossformat" title="Ausgewählte Platten. Maximale Materialwirkung." copy="Premium-Grossformatplatten für Wände, Böden, Duschen, Küchen und Möbeloberflächen. Jede gezeigte Referenz stammt aus den verfügbaren Herstellerkatalogen; Preis und Verfügbarkeit bestätigen wir nach Referenz und Menge." />
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {featured.map((product, index) => (
              <article key={product.id} className={`group relative overflow-hidden rounded-[20px] bg-white/5 ${index === 0 ? 'col-span-2' : ''}`}>
                <div className={index === 0 ? 'aspect-[16/8]' : 'aspect-square'}>
                  <img src={product.image} alt={product.imageAlt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#071d29]/95 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-black sm:text-2xl">{product.name}</h3>
                      <p className="mt-1 hidden text-xs text-white/65 sm:block">{product.specs.join(' · ')}</p>
                      <p className="mt-2 text-[10px] font-black uppercase tracking-[.14em] text-[#d7b46a]">Preis auf Anfrage</p>
                    </div>
                    <button onClick={() => onRequest(product)} aria-label={`Preis für ${product.name} anfragen`} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d7b46a] text-[#102f3f]"><ArrowRight size={17} /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LegacyProductCard({ product, onRequest, onCatalog }: { product: Product; onRequest: (product: Product) => void; onCatalog: (product: Product) => void }) {
  return (
    <article className="group overflow-hidden rounded-[22px] border border-[#dce3e3] bg-white shadow-[0_8px_30px_rgba(23,56,75,.06)]">
      <div className="aspect-[4/3] overflow-hidden bg-[#edf0ef]">
        <img src={product.image} alt={product.imageAlt} loading="lazy" decoding="async" className={`h-full w-full transition duration-700 group-hover:scale-[1.025] ${product.imageFit === 'contain' ? 'object-contain p-5' : 'object-cover'}`} />
      </div>
      <div className="p-5 sm:p-6">
        <p className="text-[9px] font-black uppercase tracking-[.18em] text-[#a87828]">{categoryById[product.category].title}</p>
        <h3 className="mt-2 font-display text-2xl font-black tracking-[-.025em] text-[#17384b]">{product.name}</h3>
        <p className="mt-3 min-h-[3.75rem] text-sm leading-6 text-[#66797f]">{product.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {product.specs.map((spec) => <span key={spec} className="rounded-full bg-[#f0f2ef] px-3 py-1.5 text-[10px] font-bold text-[#53676e]">{spec}</span>)}
        </div>
        <div className="mt-6 grid gap-2 sm:grid-cols-[1.2fr_.8fr]">
          <button onClick={() => onRequest(product)} className="min-h-12 rounded-full bg-[#004b87] px-4 text-xs font-black text-white">Preis anfragen</button>
          <button onClick={() => onCatalog(product)} className="min-h-12 rounded-full border border-[#cad5d7] px-4 text-xs font-black text-[#17384b]">Katalog</button>
        </div>
      </div>
    </article>
  );
}

function ProductCard({ product, onRequest, onCatalog }: { product: Product; onRequest: (product: Product) => void; onCatalog: (product: Product) => void }) {
  if (product.category === 'baustelle') {
    return <LegacyProductCard product={product} onRequest={onRequest} onCatalog={onCatalog} />;
  }

  return (
    <article className="group overflow-hidden rounded-[22px] border border-[#dce3e3] bg-white shadow-[0_8px_30px_rgba(23,56,75,.06)]">
      <div className="aspect-[4/3] overflow-hidden bg-[#edf0ef]">
        <img src={product.image} alt={product.imageAlt} loading="lazy" decoding="async" className={`h-full w-full transition duration-700 group-hover:scale-[1.025] ${product.imageFit === 'contain' ? 'object-contain p-5' : 'object-cover'}`} />
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[9px] font-black uppercase tracking-[.18em] text-[#a87828]">{product.brand ? `${product.brand} · ` : ''}{categoryById[product.category].title}</p>
          <span className="text-[9px] font-black uppercase tracking-[.12em] text-[#60757c]">Verfügbarkeit auf Anfrage</span>
        </div>
        <h3 className="mt-2 font-display text-2xl font-black tracking-[-.025em] text-[#17384b]">{product.name}</h3>
        {product.reference ? <p className="mt-1 text-[10px] font-bold text-[#60757c]">Ref. {product.reference}{product.catalogPage ? ` · Katalog S. ${product.catalogPage}` : ''}</p> : null}
        <p className="mt-3 min-h-[3.75rem] text-sm leading-6 text-[#66797f]">{product.description}</p>
        <div className="mt-4 flex flex-wrap gap-2" aria-label="Verfügbare Produktangaben">
          {product.specs.map((spec) => <span key={spec} className="rounded-full bg-[#f0f2ef] px-3 py-1.5 text-[10px] font-bold text-[#53676e]">{spec}</span>)}
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-[#e3e8e8] pt-4">
          <span className="text-xs font-black text-[#17384b]">Preis auf Anfrage</span>
          <span className="text-[10px] text-[#66797f]">Konditionen nach Produkt und Menge</span>
        </div>
        <div className="mt-5 grid gap-2 sm:grid-cols-[1.2fr_.8fr]">
          <button onClick={() => onRequest(product)} className="min-h-12 rounded-full bg-[#004b87] px-4 text-xs font-black text-white">Preis anfragen</button>
          <button onClick={() => onCatalog(product)} className="min-h-12 rounded-full border border-[#cad5d7] px-4 text-xs font-black text-[#17384b]">Katalog anfragen</button>
        </div>
      </div>
    </article>
  );
}

function ProductSelection({ activeCategory, onCategory, onRequest, onCatalog }: { activeCategory: CategoryId; onCategory: (id: CategoryId) => void; onRequest: (product: Product) => void; onCatalog: (product: Product) => void }) {
  const [query, setQuery] = useState('');
  const [segment, setSegment] = useState('Alle');
  const [visibleCount, setVisibleCount] = useState(12);
  const badSegments = ['Alle', 'Armaturen', 'Duschsysteme', 'Sanitärkeramik', 'Duschwannen', 'Badzubehör'] as const;
  const productSegment = (item: Product) => {
    if (item.segment) return item.segment;
    if (item.id === 'ar-rs-smart') return 'Duschsysteme';
    if (item.id.startsWith('sa-')) return 'Sanitärkeramik';
    if (item.id.startsWith('ar-')) return 'Armaturen';
    if (item.id === 'du-lux' || item.id === 'du-mineral') return 'Duschwannen';
    return 'Badzubehör';
  };
  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('de-CH');
    return products.filter((item) => {
      if (item.category !== activeCategory) return false;
      if (activeCategory === 'bad' && segment !== 'Alle' && productSegment(item) !== segment) return false;
      if (!normalized) return true;
      return [item.name, item.brand, item.reference, item.description, ...item.specs].filter(Boolean).join(' ').toLocaleLowerCase('de-CH').includes(normalized);
    });
  }, [activeCategory, query, segment]);
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const active = categoryById[activeCategory];

  useEffect(() => {
    setQuery('');
    setSegment('Alle');
    setVisibleCount(12);
  }, [activeCategory]);

  useEffect(() => setVisibleCount(12), [query, segment]);

  return (
    <section id="auswahl" className="scroll-mt-24 bg-[#fbfaf7]">
      <div className="mx-auto max-w-[1500px] px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        {activeCategory === 'baustelle' ? (
          <SectionHeading eyebrow="Kuratierte Produktauswahl" title="Weniger suchen. Passender auswählen." copy="Diese Auswahl zeigt bewusst nur starke Einstiege in jede Kategorie. Weitere Formate, Farben und Serien liefern wir nach Projekt, Menge und gewünschter Wirkung." />
        ) : (
          <SectionHeading eyebrow="Ausgewählte Qualität für Fachbetriebe" title="Produkt auswählen. Qualität vergleichen. Konditionen erhalten." copy="Jeder Einstieg zeigt Materialwirkung, Anwendung und verfügbare Produktangaben. Preis und Verfügbarkeit bestätigen wir passend zur gewünschten Referenz und Menge." />
        )}
        <div className="mt-9 flex gap-2 overflow-x-auto pb-3">
          {categories.map((category) => (
            <a key={category.id} href={routeByCategory[category.id]} onClick={(event) => { event.preventDefault(); onCategory(category.id); }} aria-current={activeCategory === category.id ? 'page' : undefined} className={`flex min-h-11 shrink-0 items-center rounded-full border px-4 text-xs font-black transition ${activeCategory === category.id ? 'border-[#17384b] bg-[#17384b] text-white' : 'border-[#cad5d7] bg-white text-[#53676e] hover:border-[#8da2a8]'}`}>
              {category.title}
            </a>
          ))}
        </div>
        <div className="mt-7 flex flex-col justify-between gap-4 border-b border-[#dce3e3] pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.16em] text-[#a87828]">Aktuelle Auswahl</p>
            <h3 className="mt-2 font-display text-3xl font-black text-[#17384b]">{active.title}</h3>
          </div>
          <button onClick={() => onCatalog({ id: `catalog-${active.id}`, category: active.id, name: `Katalog ${active.title}`, description: active.description, image: active.image, imageAlt: active.imageAlt, specs: [] })} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#cad5d7] bg-white px-5 text-xs font-black text-[#17384b]">
            <Download size={15} /> {activeCategory === 'baustelle' ? 'Gesamten Katalog anfordern' : 'Katalog anfragen'}
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#dce3e3] bg-white p-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full lg:max-w-md">
            <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#73868b]" />
            <span className="sr-only">Produkte oder Referenz suchen</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Produkt, Marke oder Referenz suchen" className="h-12 w-full rounded-full border border-[#cbd5d7] bg-[#fbfaf7] pl-11 pr-4 text-sm outline-none focus:border-[#004b87]" />
          </label>
          {activeCategory === 'bad' ? (
            <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Badprodukte filtern">
              {badSegments.map((item) => <button key={item} type="button" aria-pressed={segment === item} onClick={() => setSegment(item)} className={`min-h-10 shrink-0 rounded-full border px-4 text-[11px] font-black ${segment === item ? 'border-[#004b87] bg-[#004b87] text-white' : 'border-[#cad5d7] text-[#53676e]'}`}>{item}</button>)}
            </div>
          ) : null}
        </div>
        <p className="mt-5 text-xs font-bold text-[#60757c]">{filteredProducts.length} geprüfte Referenzen{segment !== 'Alle' ? ` · ${segment}` : ''}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleProducts.map((product) => <ProductCard key={product.id} product={product} onRequest={onRequest} onCatalog={onCatalog} />)}
        </div>
        {visibleCount < filteredProducts.length ? <button type="button" onClick={() => setVisibleCount((count) => count + 12)} className="mx-auto mt-9 flex min-h-12 items-center justify-center rounded-full border border-[#17384b] bg-white px-7 text-sm font-black text-[#17384b]">Weitere Produkte anzeigen ({filteredProducts.length - visibleCount})</button> : null}
        {!filteredProducts.length ? <div className="mt-8 rounded-2xl border border-[#dce3e3] bg-white p-8 text-center text-sm text-[#60757c]">Keine passende Referenz gefunden. Senden Sie uns die gesuchte Marke, Referenz oder ein Foto über die Anfrage.</div> : null}
      </div>
    </section>
  );
}

function Catalogues({ onCatalog, onReference, onDealer }: { onCatalog: (category: typeof categories[number]) => void; onReference: (category: typeof categories[number]) => void; onDealer: () => void }) {
  const availableCatalogues = categories.filter((category) => category.id !== 'baustelle');
  return (
    <section id="kataloge" className="scroll-mt-24 bg-[#f2f0e9]">
      <div className="mx-auto max-w-[1500px] px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Produktkataloge" title="Katalog auswählen. Referenz direkt senden." copy="Kataloge werden gezielt nach Produktbereich bereitgestellt. Preise, Fachkundenkonditionen und interne Preislisten werden nicht öffentlich publiziert, sondern nach Produkt, Menge und Anfrage bestätigt." />
          <button onClick={onDealer} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#004b87] px-6 text-sm font-black text-white">
            <Handshake size={17} /> Händlerkonditionen anfragen
          </button>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {availableCatalogues.map((category) => (
            <article key={category.id} className="overflow-hidden rounded-[22px] border border-[#d8dedc] bg-[#fbfaf7]">
              <div className="grid grid-cols-[116px_1fr] sm:grid-cols-[150px_1fr]">
                <img src={category.image} alt={category.imageAlt} loading="lazy" className="h-full min-h-48 w-full object-cover" />
                <div className="flex flex-col p-5 sm:p-6">
                  <p className="text-[9px] font-black uppercase tracking-[.18em] text-[#a87828]">Katalogbereich</p>
                  <h3 className="mt-2 font-display text-xl font-black text-[#17384b]">{category.title}</h3>
                  <p className="mt-3 text-xs leading-5 text-[#66797f]">{category.description}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    <button onClick={() => onCatalog(category)} className="min-h-10 rounded-full bg-[#17384b] px-4 text-[11px] font-black text-white">Katalog anfragen</button>
                    <button onClick={() => onReference(category)} className="min-h-10 rounded-full border border-[#cad5d7] px-4 text-[11px] font-black text-[#17384b]">Referenz senden</button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 border-t border-[#d5dbd8] pt-6 text-xs font-bold text-[#53676e]">
          <span>Marken aus Portugal und Spanien</span>
          <span>Für Fachbetriebe und Wiederverkäufer</span>
          <span>Konditionen nach Produkt und Menge</span>
          <span>Preis und Verfügbarkeit auf Anfrage</span>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    ['01', 'Produkt oder Kategorie auswählen', 'Wählen Sie einen Produktbereich oder nennen Sie direkt die gewünschte Referenz.'],
    ['02', 'Angaben senden', 'Senden Sie Referenz, gewünschte Menge und Lieferort oder Postleitzahl.'],
    ['03', 'Prüfung durch RA', 'Wir prüfen Preis, Verfügbarkeit, Konditionen und Liefermöglichkeiten.'],
    ['04', 'Lieferung organisieren', 'Nach schriftlicher Bestätigung wird die Lieferung nach den vereinbarten Möglichkeiten organisiert.'],
  ];
  return (
    <section id="ablauf" className="scroll-mt-24 bg-[#ede9df]">
      <div className="mx-auto max-w-[1500px] px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <SectionHeading eyebrow="So funktioniert es" title="Vom Produkt zur bestätigten Lieferung." copy="Sie nennen Produkt oder Referenz. Wir bestätigen die kommerziellen und logistischen Bedingungen für die konkrete Anfrage." />
        <div className="mt-10 grid gap-px overflow-hidden rounded-[22px] bg-[#d5d6cf] md:grid-cols-2 xl:grid-cols-4">
          {steps.map(([number, title, copy]) => (
            <article key={number} className="bg-[#fbfaf7] p-6 lg:p-8">
              <span className="font-display text-4xl font-black text-[#d7b46a]">{number}</span>
              <h3 className="mt-7 text-base font-black text-[#17384b]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#66797f]">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function InquiryForm({ data, setData, error, status, onSubmit, onNavigate }: { data: InquiryData; setData: (data: InquiryData) => void; error: string; status: 'idle' | 'submitting' | 'success'; onSubmit: (event: FormEvent<HTMLFormElement>) => void; onNavigate: (path: string) => void }) {
  const [step, setStep] = useState<1 | 2>(1);
  const [stepError, setStepError] = useState('');
  const update = (key: keyof InquiryData, value: string) => setData({ ...data, [key]: value });
  const requestOptions: { value: InquiryTopic; label: string; copy: string }[] = [
    { value: 'Preisanfrage', label: 'Preis', copy: 'Konditionen nach Produkt und Menge' },
    { value: 'Verfügbarkeit', label: 'Verfügbarkeit', copy: 'Aktuelle Lieferbarkeit prüfen' },
    { value: 'Kataloganfrage', label: 'Katalog', copy: 'Passenden Produktkatalog erhalten' },
    { value: 'Händlerkonditionen', label: 'Händlerkonditionen', copy: 'Einkauf für Fachkunden' },
    { value: 'Lieferung', label: 'Lieferung', copy: 'Möglichkeiten in die Schweiz klären' },
    { value: 'Produktanfrage', label: 'Produktinfo', copy: 'Referenz oder Variante anfragen' },
  ];
  const toggleRequest = (value: InquiryTopic) => {
    const selected = data.requestTypes.includes(value);
    setData({ ...data, requestTypes: selected ? data.requestTypes.filter((item) => item !== value) : [...data.requestTypes, value] });
    setStepError('');
  };
  const toggleArea = (value: string) => {
    const selected = data.productAreas.includes(value);
    setData({ ...data, productAreas: selected ? data.productAreas.filter((item) => item !== value) : [...data.productAreas, value] });
  };
  const openArea = (title: string) => {
    const category = categories.find((item) => item.title === title);
    if (category) onNavigate(routeByCategory[category.id]);
  };
  const continueToDetails = () => {
    if (!data.requestTypes.length) {
      setStepError('Bitte wählen Sie mindestens ein Anliegen aus.');
      return;
    }
    trackConversion('inquiry_step_completed', { topics: data.requestTypes.join('|') });
    setStep(2);
    setStepError('');
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  return (
    <section id="anfrage" className="scroll-mt-24 bg-[#102f3f] text-white">
      <div className="mx-auto grid max-w-[1500px] gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[.68fr_1.32fr] lg:px-10 lg:py-18">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#d7b46a]">Schnellanfrage für Fachkunden</p>
          <h2 className="mt-4 max-w-xl font-display text-4xl font-black leading-[1.02] tracking-[-.045em] sm:text-5xl">In rund einer Minute zur passenden Anfrage.</h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-white/65">Mehrere Anliegen und Produktbereiche gleichzeitig wählen. Wir erhalten die nötigen Angaben kompakt und können Preis, Verfügbarkeit, Konditionen und Lieferung gezielt prüfen.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <a href={`tel:+${storefront.phoneDigits}`} onClick={() => trackConversion('phone_click', { source: 'inquiry' })} className="rounded-2xl border border-white/15 bg-white/5 p-4 transition hover:bg-white/10">
              <Phone size={18} className="text-[#d7b46a]" /><span className="mt-3 block text-xs font-black">Anrufen</span><span className="mt-1 block text-[10px] text-white/52">{storefront.phoneDisplay}</span>
            </a>
            <a href={`https://wa.me/${storefront.phoneDigits}`} onClick={() => trackConversion('whatsapp_click', { source: 'inquiry_direct' })} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/15 bg-white/5 p-4 transition hover:bg-white/10">
              <MessageCircle size={18} className="text-[#d7b46a]" /><span className="mt-3 block text-xs font-black">WhatsApp</span><span className="mt-1 block text-[10px] text-white/52">Direkt schreiben</span>
            </a>
            <a href={`mailto:${storefront.email}`} onClick={() => trackConversion('email_click', { source: 'inquiry' })} className="rounded-2xl border border-white/15 bg-white/5 p-4 transition hover:bg-white/10">
              <Mail size={18} className="text-[#d7b46a]" /><span className="mt-3 block text-xs font-black">E-Mail</span><span className="mt-1 block text-[10px] text-white/52">Anfrage senden</span>
            </a>
          </div>
        </div>
        <form onSubmit={onSubmit} className="rounded-[24px] bg-[#fbfaf7] p-5 text-[#17384b] shadow-2xl sm:p-8">
          <label className="absolute -left-[9999px]" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <div className="flex items-center justify-between gap-4 border-b border-[#dce3e3] pb-5">
            <div><p className="text-[10px] font-black uppercase tracking-[.18em] text-[#a87828]">Schritt {step} von 2</p><p className="mt-1 text-sm font-black">{step === 1 ? 'Was benötigen Sie?' : 'Wohin dürfen wir antworten?'}</p></div>
            <div className="flex gap-2" aria-label={`Schritt ${step} von 2`}><span className="h-1.5 w-9 rounded-full bg-[#d7b46a]" /><span className={`h-1.5 w-9 rounded-full ${step === 2 ? 'bg-[#d7b46a]' : 'bg-[#dce3e3]'}`} /></div>
          </div>

          {status === 'success' ? (
            <div className="flex min-h-[500px] flex-col items-center justify-center px-2 py-12 text-center" aria-live="polite">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e6f3ec] text-[#16734b]"><Check size={30} /></span>
              <p className="mt-7 text-[10px] font-black uppercase tracking-[.18em] text-[#a87828]">Anfrage gesendet</p>
              <h3 className="mt-3 max-w-xl font-display text-3xl font-black text-[#17384b]">Anfrage erfolgreich gesendet.</h3>
              <p className="mt-4 max-w-lg text-sm leading-6 text-[#66797f]">
                {data.preferredChannel === 'whatsapp'
                  ? 'Wir haben Ihre vollständigen Angaben erhalten und kontaktieren Sie per WhatsApp.'
                  : 'Wir haben Ihre vollständigen Angaben erhalten und melden uns schnellstmöglich per E-Mail.'}
              </p>
              <button type="button" onClick={() => onNavigate('/produkte')} className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#004b87] px-6 text-sm font-black text-white">Produkte ansehen <ArrowRight size={17} /></button>
            </div>
          ) : step === 1 ? (
            <div className="pt-6">
              <fieldset>
                <legend className="text-sm font-black">Mehrfachauswahl möglich</legend>
                <p className="mt-1 text-xs text-[#6d7c80]">Wählen Sie alles, was wir für Sie prüfen sollen.</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {requestOptions.map((option) => {
                    const selected = data.requestTypes.includes(option.value);
                    return (
                      <button key={option.value} type="button" aria-pressed={selected} onClick={() => toggleRequest(option.value)} className={`flex min-h-[78px] items-start gap-3 rounded-2xl border p-4 text-left transition ${selected ? 'border-[#004b87] bg-[#eaf3f8] shadow-[0_0_0_1px_#004b87]' : 'border-[#d3dcde] bg-white hover:border-[#8fa4aa]'}`}>
                        <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${selected ? 'border-[#004b87] bg-[#004b87] text-white' : 'border-[#aebdc0] text-transparent'}`}><Check size={14} /></span>
                        <span><span className="block text-xs font-black">{option.label}</span><span className="mt-1 block text-[10px] leading-4 text-[#6d7c80]">{option.copy}</span></span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="mt-6">
                <legend className="text-sm font-black">Produktbereiche</legend>
                <p className="mt-1 text-xs text-[#6d7c80]">Auch hier können Sie mehrere Bereiche wählen.</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const selected = data.productAreas.includes(category.title);
                    return <button key={category.id} type="button" aria-pressed={selected} onClick={() => toggleArea(category.title)} className={`min-h-10 rounded-full border px-4 text-[11px] font-black transition ${selected ? 'border-[#17384b] bg-[#17384b] text-white' : 'border-[#cad5d7] bg-white text-[#53676e]'}`}>{selected ? '✓ ' : ''}{category.title}</button>;
                  })}
                </div>
              </fieldset>

              <label className="mt-6 grid gap-2 text-xs font-black">Produkt oder Referenz <span className="font-normal text-[#6d7c80]">(falls bekannt)</span>
                <input value={data.selection} onChange={(event) => update('selection', event.target.value)} placeholder="z. B. Calacatta Gold oder Katalogreferenz" className="h-12 rounded-xl border border-[#cbd5d7] bg-white px-4 text-base font-normal sm:text-sm" />
              </label>
              {stepError ? <p role="alert" className="mt-4 rounded-xl bg-[#fff0ed] p-3 text-xs font-bold text-[#9a4035]">{stepError}</p> : null}
              <button type="button" onClick={continueToDetails} className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#004b87] px-5 text-sm font-black text-white">Kontaktdaten eingeben <ArrowRight size={17} /></button>
              <p className="mt-3 text-center text-[10px] text-[#6d7c80]">Keine Bestellung. Ihre Angaben öffnen eine unverbindliche Anfrage.</p>
            </div>
          ) : (
            <div className="pt-6">
              <div className="flex items-start justify-between gap-4 rounded-2xl bg-[#eef1ee] p-4">
                <div><p className="text-[10px] font-black uppercase tracking-[.14em] text-[#a87828]">Ihre Auswahl</p><p className="mt-2 text-xs font-bold leading-5">{data.requestTypes.join(' · ')}</p>{data.productAreas.length ? <div className="mt-2 flex flex-wrap gap-2">{data.productAreas.map((area) => <button key={area} type="button" onClick={() => openArea(area)} className="text-[10px] font-black text-[#004b87] underline decoration-[#9fb8c8] underline-offset-2">{area} ansehen</button>)}</div> : null}</div>
                <button type="button" onClick={() => setStep(1)} className="shrink-0 text-[11px] font-black text-[#004b87]">Ändern</button>
              </div>
              <fieldset className="mt-5">
                <legend className="text-xs font-black">Wie dürfen wir Sie kontaktieren?</legend>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {([
                    ['whatsapp', 'WhatsApp', 'Antwort direkt auf Ihre Nummer', MessageCircle],
                    ['email', 'E-Mail', 'Antwort an Ihre E-Mail-Adresse', Mail],
                  ] as const).map(([value, label, copy, Icon]) => {
                    const selected = data.preferredChannel === value;
                    return (
                      <button key={value} type="button" aria-pressed={selected} onClick={() => update('preferredChannel', value)} className={`flex min-h-[82px] items-start gap-3 rounded-2xl border p-4 text-left transition ${selected ? 'border-[#004b87] bg-[#eaf3f8] shadow-[0_0_0_1px_#004b87]' : 'border-[#d3dcde] bg-white hover:border-[#8fa4aa]'}`}>
                        <Icon size={18} className={selected ? 'text-[#004b87]' : 'text-[#718388]'} />
                        <span><span className="block text-xs font-black">{selected ? '✓ ' : ''}{label}</span><span className="mt-1 block text-[10px] leading-4 text-[#6d7c80]">{copy}</span></span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-xs font-black">Vorname und Nachname *
                  <input required autoComplete="name" value={data.name} onChange={(event) => update('name', event.target.value)} className="h-12 rounded-xl border border-[#cbd5d7] bg-white px-4 text-base font-normal sm:text-sm" />
                </label>
                <label className="grid gap-2 text-xs font-black">Firma <span className="font-normal text-[#6d7c80]">(optional)</span>
                  <input autoComplete="organization" value={data.company} onChange={(event) => update('company', event.target.value)} className="h-12 rounded-xl border border-[#cbd5d7] bg-white px-4 text-base font-normal sm:text-sm" />
                </label>
                <label className="grid gap-2 text-xs font-black">Telefonnummer {data.preferredChannel === 'whatsapp' ? '*' : <span className="font-normal text-[#6d7c80]">(optional)</span>}
                  <input type="tel" required={data.preferredChannel === 'whatsapp'} autoComplete="tel" value={data.phone} onChange={(event) => update('phone', event.target.value)} placeholder="z. B. +41 79 000 00 00" className="h-12 rounded-xl border border-[#cbd5d7] bg-white px-4 text-base font-normal sm:text-sm" />
                </label>
                <label className="grid gap-2 text-xs font-black">E-Mail {data.preferredChannel === 'email' ? '*' : <span className="font-normal text-[#6d7c80]">(optional)</span>}
                  <input type="email" required={data.preferredChannel === 'email'} autoComplete="email" value={data.email} onChange={(event) => update('email', event.target.value)} className="h-12 rounded-xl border border-[#cbd5d7] bg-white px-4 text-base font-normal sm:text-sm" />
                </label>
                <label className="grid gap-2 text-xs font-black">Gewünschte Menge
                  <input value={data.quantity} onChange={(event) => update('quantity', event.target.value)} placeholder="z. B. 45 m² oder 2 Stück" className="h-12 rounded-xl border border-[#cbd5d7] bg-white px-4 text-base font-normal sm:text-sm" />
                </label>
                <label className="grid gap-2 text-xs font-black">Lieferort / Postleitzahl
                  <input autoComplete="postal-code" value={data.location} onChange={(event) => update('location', event.target.value)} placeholder="z. B. 8000 Zürich" className="h-12 rounded-xl border border-[#cbd5d7] bg-white px-4 text-base font-normal sm:text-sm" />
                </label>
              </div>
              <details className="mt-5 rounded-2xl border border-[#d7dfe0] bg-white p-4">
                <summary className="cursor-pointer text-xs font-black">Weitere Angaben oder Datei hinzufügen <span className="font-normal text-[#6d7c80]">(optional)</span></summary>
                <label className="mt-4 grid gap-2 text-xs font-black">Gewünschter Lieferzeitraum
                  <input value={data.timeline} onChange={(event) => update('timeline', event.target.value)} placeholder="z. B. Oktober 2026" className="h-12 rounded-xl border border-[#cbd5d7] bg-white px-4 text-base font-normal sm:text-sm" />
                </label>
                <label className="mt-4 grid gap-2 text-xs font-black">Nachricht
                  <textarea value={data.message} onChange={(event) => update('message', event.target.value)} placeholder="Varianten, Ausführung oder weitere Angaben" className="min-h-24 rounded-xl border border-[#cbd5d7] bg-white p-4 text-base font-normal sm:text-sm" />
                </label>
                <label className="mt-4 grid gap-2 text-xs font-black">Datei
                  <span className="relative flex min-h-12 items-center rounded-xl border border-dashed border-[#aab9bd] bg-white px-4 text-sm font-normal text-[#53676e]"><input type="file" name="attachment" accept=".pdf,.jpg,.jpeg,.png,.webp" onChange={(event) => update('attachmentName', event.target.files?.[0]?.name ?? '')} className="absolute inset-0 cursor-pointer opacity-0" />{data.attachmentName || 'PDF, JPG, PNG oder WEBP auswählen'}</span>
                </label>
                <p className="mt-2 text-[10px] leading-5 text-[#6d7c80]">Optional, maximal 2,5 MB. Die Datei wird zusammen mit der Anfrage übermittelt.</p>
              </details>
              {error ? <p role="alert" className="mt-4 rounded-xl bg-[#fff0ed] p-3 text-xs font-bold text-[#9a4035]">{error}</p> : null}
              <p className="mt-4 text-[11px] leading-5 text-[#6d7c80]">Die vollständige Anfrage wird direkt an RA Bau Lieferung gesendet. Preis, Verfügbarkeit und Lieferung werden separat bestätigt.</p>
              <button type="submit" disabled={status === 'submitting'} className="mt-5 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#004b87] px-5 text-sm font-black text-white transition disabled:cursor-wait disabled:opacity-65">
                {status === 'submitting' ? 'Anfrage wird gesendet …' : 'Anfrage senden'} <ArrowRight size={17} />
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="kontakt" className="scroll-mt-24 bg-[#0a2533] text-white">
      <div className="mx-auto grid max-w-[1500px] gap-9 px-5 py-12 sm:px-8 md:grid-cols-3 lg:px-10">
        <div>
          <Logo invert className="max-w-[220px]" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/55">Ausgewählte Baustoffe und Badlösungen für Fachbetriebe und Wiederverkäufer in der Schweiz.</p>
        </div>
        <div className="text-sm text-white/68">
          <p className="text-xs font-black uppercase tracking-[.15em] text-[#d7b46a]">Kontakt</p>
          <a href={`tel:+${storefront.phoneDigits}`} onClick={() => trackConversion('phone_click', { source: 'footer' })} className="mt-4 block font-bold text-white">{storefront.phoneDisplay}</a>
          <a href={`mailto:${storefront.email}`} onClick={() => trackConversion('email_click', { source: 'footer' })} className="mt-2 block font-bold text-white">{storefront.email}</a>
          <p className="mt-2">Schweiz</p>
        </div>
        <div className="text-sm text-white/68">
          <p className="text-xs font-black uppercase tracking-[.15em] text-[#d7b46a]">Rechtliches</p>
          <a href="/impressum.html" className="mt-4 block hover:text-white">Impressum</a>
          <a href="/datenschutz.html" className="mt-2 block hover:text-white">Datenschutz</a>
          <p className="mt-5 text-xs leading-5 text-white/42">Produktdarstellungen können je Bildschirm abweichen. Preis, Verfügbarkeit, Transport und Liefermöglichkeit werden für jede Anfrage separat bestätigt.</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-[10px] text-white/38">© 2026 RA Bau Lieferung. Alle Rechte vorbehalten.</div>
    </footer>
  );
}

export default function App() {
  const initialPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const initialCategory = categoryByPath[initialPath] ?? 'keramik';
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [activeCategory, setActiveCategory] = useState<CategoryId>(initialCategory);
  const [inquiry, setInquiry] = useState<InquiryData>(emptyInquiry);
  const [error, setError] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    const onPop = () => {
      const path = window.location.pathname.replace(/\/+$/, '') || '/';
      setCurrentPath(path);
      const id = categoryByPath[path];
      if (id) setActiveCategory(id);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.title = titleByPath[currentPath] ?? titleByPath['/'];
  }, [currentPath]);

  const navigate = (path: string) => {
    const normalized = path.replace(/\/+$/, '') || '/';
    if (normalized !== currentPath) window.history.pushState({}, '', normalized);
    setCurrentPath(normalized);
    const id = categoryByPath[normalized];
    if (id) setActiveCategory(id);
  };

  const selectCategory = (id: CategoryId) => {
    setActiveCategory(id);
    navigate(routeByCategory[id]);
  };

  const request = (kind: InquiryTopic, selection = '', source = 'site', productArea = '') => {
    if (kind === 'Preisanfrage') trackConversion('price_request_click', { source, selection: selection || 'general' });
    if (kind === 'Händlerkonditionen') trackConversion('dealer_terms_request_click', { source });
    if (kind === 'Kataloganfrage') trackConversion('catalog_request_click', { source, selection: selection || 'general' });
    setInquiry((current) => ({ ...current, requestTypes: [kind], productAreas: productArea ? [productArea] : current.productAreas, selection }));
    setError('');
    setSubmitStatus('idle');
    navigate('/kontakt');
  };

  const requestProduct = (product: Product) => request('Preisanfrage', `${product.name} · ${categoryById[product.category].title}`, 'product_card', categoryById[product.category].title);
  const requestCatalog = (product: Product) => request('Kataloganfrage', categoryById[product.category].title, 'product_card', categoryById[product.category].title);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inquiry.preferredChannel === 'whatsapp' && !inquiry.phone.trim()) {
      setError('Bitte geben Sie die Telefonnummer an, über die wir Sie per WhatsApp kontaktieren dürfen.');
      return;
    }
    if (inquiry.preferredChannel === 'email' && !inquiry.email.trim()) {
      setError('Bitte geben Sie die E-Mail-Adresse an, über die wir Sie kontaktieren dürfen.');
      return;
    }

    const form = new FormData(event.currentTarget);
    const file = form.get('attachment');
    const attachment = file instanceof File && file.size > 0 ? file : null;
    if (attachment) {
      if (attachment.size > 2_500_000) {
        setError('Die Datei ist grösser als 2,5 MB. Bitte wählen Sie eine kleinere Datei.');
        return;
      }
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(attachment.type)) {
        setError('Bitte laden Sie eine PDF-, JPG-, PNG- oder WEBP-Datei hoch.');
        return;
      }
    }

    const subjectSelection = inquiry.selection || inquiry.productAreas.join(', ') || 'Produkte';
    const submission = new FormData();
    submission.set('_subject', `[Website] ${inquiry.requestTypes.join(' + ')} – ${subjectSelection}`.slice(0, 180));
    submission.set('_template', 'table');
    submission.set('_captcha', 'false');
    submission.set('_url', `${window.location.origin}/kontakt`);
    submission.set('Anfrage', inquiry.requestTypes.join(', '));
    submission.set('Produktbereiche', inquiry.productAreas.join(', ') || 'noch offen');
    submission.set('Produkt / Referenz', inquiry.selection || 'Kategorie noch offen');
    submission.set('Kundentyp', inquiry.customerType || '-');
    submission.set('Name', inquiry.name.trim());
    submission.set('Unternehmen', inquiry.company.trim() || '-');
    submission.set('E-Mail', inquiry.email.trim() || '-');
    submission.set('Telefon', inquiry.phone.trim() || '-');
    submission.set('Bevorzugter Kontakt', inquiry.preferredChannel === 'whatsapp' ? 'WhatsApp' : 'E-Mail');
    submission.set('Gewünschte Menge', inquiry.quantity.trim() || '-');
    submission.set('Lieferort', inquiry.location.trim() || '-');
    submission.set('Lieferzeitraum', inquiry.timeline.trim() || '-');
    submission.set('Nachricht', inquiry.message.trim() || '-');
    submission.set('Vollständige Anfrage', buildInquiryMessage(inquiry));
    if (inquiry.email.trim()) submission.set('_replyto', inquiry.email.trim());
    if (attachment) submission.set('attachment', attachment, attachment.name);

    setError('');
    setSubmitStatus('submitting');
    try {
      const response = await fetch(formSubmitEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: submission,
      });
      const result = await response.json().catch(() => null) as { success?: boolean | string } | null;
      if (!response.ok || result?.success === false || result?.success === 'false') throw new Error('submission_failed');
      const requestTypes = inquiry.requestTypes.join('|');
      trackConversion('form_submit', { channel: inquiry.preferredChannel, request_type: requestTypes });
      setSubmitStatus('success');
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    } catch {
      setSubmitStatus('idle');
      setError('Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per Telefon oder WhatsApp.');
    }
  };

  let page: ReactNode;

  if (currentPath === '/') {
    page = (
      <>
        <Hero
          onProducts={() => navigate('/produkte')}
          onQuote={() => request('Preisanfrage', '', 'hero')}
          onCatalogs={() => { trackConversion('catalog_view', { source: 'hero' }); navigate('/kataloge'); }}
        />
        <WhyUs />
      </>
    );
  } else if (currentPath === '/produkte') {
    page = <CategoryGrid onSelect={selectCategory} />;
  } else if (categoryByPath[currentPath]) {
    page = <ProductSelection activeCategory={activeCategory} onCategory={selectCategory} onRequest={requestProduct} onCatalog={requestCatalog} />;
  } else if (currentPath === '/kataloge') {
    page = (
      <Catalogues
        onCatalog={(category) => request('Kataloganfrage', category.title, 'catalog_section')}
        onReference={(category) => request('Produktanfrage', `${category.title} · Referenz aus Katalog`, 'catalog_section')}
        onDealer={() => request('Händlerkonditionen', '', 'catalog_section')}
      />
    );
  } else if (currentPath === '/ablauf') {
    page = <Process />;
  } else if (currentPath === '/kontakt') {
    page = <InquiryForm data={inquiry} setData={setInquiry} error={error} status={submitStatus} onSubmit={submit} onNavigate={navigate} />;
  } else {
    page = <CategoryGrid onSelect={selectCategory} />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fbfaf7] text-[#17384b]">
      <Header currentPath={currentPath} onNavigate={navigate} onRequest={() => request('Preisanfrage', '', 'header')} />
      <main>{page}</main>
      <Footer />
    </div>
  );
}
