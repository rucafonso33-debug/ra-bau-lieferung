import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  ArrowRight,
  Check,
  Download,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
} from 'lucide-react';
import { categories, categoryById, products, type CategoryId, type Product } from './catalogData';
import { emailHref, whatsappHref, type InquiryData } from './inquiry';
import { Logo } from './components/Logo';
import { storefront } from './storefrontConfig';

const routeByCategory: Record<CategoryId, string> = {
  grossformat: '/grossformatplatten',
  keramik: '/feinsteinzeug',
  mosaik: '/mosaike',
  badmoebel: '/badmoebel',
  sanitaer: '/sanitaerkeramik',
  armaturen: '/armaturen-duschen',
  duschloesungen: '/duschloesungen',
  boden: '/spc-vinyl',
  baustelle: '/baustellenzubehoer',
};

const categoryByPath = Object.fromEntries(Object.entries(routeByCategory).map(([id, path]) => [path, id])) as Record<string, CategoryId>;

const emptyInquiry: InquiryData = {
  requestType: 'Preisofferte',
  selection: '',
  customerType: 'Privatkunde',
  name: '',
  company: '',
  email: '',
  phone: '',
  quantity: '',
  location: '',
  timeline: '',
  message: '',
};

function scrollToId(id: string) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
}

function Header({ onRequest }: { onRequest: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [
    ['sortiment', 'Sortiment'],
    ['grossformat', 'Grossformat'],
    ['auswahl', 'Produktauswahl'],
    ['ablauf', 'Ablauf'],
    ['kontakt', 'Kontakt'],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#dfe4e5] bg-[#fbfaf7]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[84px] lg:px-10">
        <a href="/" aria-label="RA Bau Lieferung Startseite" className="shrink-0">
          <Logo className="max-w-[190px]" />
        </a>
        <nav className="hidden items-center gap-7 xl:flex">
          {links.map(([id, label]) => (
            <button key={id} onClick={() => scrollToId(id)} className="text-xs font-extrabold tracking-wide text-[#4f6369] transition hover:text-[#004b87]">
              {label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={`tel:+${storefront.phoneDigits}`} className="hidden min-h-11 items-center gap-2 rounded-full border border-[#cfd9dc] px-4 text-xs font-extrabold text-[#17384b] sm:inline-flex">
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
          {links.map(([id, label]) => (
            <button key={id} onClick={() => { setOpen(false); scrollToId(id); }} className="block min-h-12 w-full border-b border-[#e6e9e9] text-left text-sm font-bold text-[#17384b]">
              {label}
            </button>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

function Hero({ onRequest, onCatalog }: { onRequest: () => void; onCatalog: () => void }) {
  return (
    <section className="relative overflow-hidden bg-[#102f3f] text-white">
      <div className="mx-auto grid min-h-[720px] max-w-[1500px] lg:grid-cols-[.88fr_1.12fr]">
        <div className="relative z-10 flex flex-col justify-center px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <p className="text-[11px] font-black uppercase tracking-[.23em] text-[#d7b46a]">Ausgewählte Qualität für die Schweiz</p>
          <h1 className="mt-5 max-w-2xl font-display text-[3.35rem] font-black leading-[.92] tracking-[-.055em] sm:text-6xl lg:text-[5.25rem]">
            Materialien, die ein Projekt sichtbar aufwerten.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
            Grossformatplatten, Keramik, Premium-Mosaik, Steinfliesen und Badlösungen – persönlich ausgewählt, projektbezogen kalkuliert und in die Schweiz geliefert.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button onClick={onRequest} className="inline-flex min-h-13 items-center gap-2 rounded-full bg-[#d7b46a] px-6 text-sm font-black text-[#102f3f]">
              Projektpreis anfragen <ArrowRight size={17} />
            </button>
            <button onClick={onCatalog} className="inline-flex min-h-13 items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 text-sm font-black text-white">
              <Download size={17} /> Katalog anfordern
            </button>
          </div>
          <div className="mt-10 grid max-w-xl gap-4 border-t border-white/15 pt-7 sm:grid-cols-3">
            {[
              ['Kuratiert', 'Auswahl statt endloser Listen'],
              ['Projektpreis', 'Nach Menge und Lieferort'],
              ['Persönlich', 'Direkter Ansprechpartner'],
            ].map(([title, copy]) => (
              <div key={title}>
                <p className="text-xs font-black uppercase tracking-[.14em] text-[#d7b46a]">{title}</p>
                <p className="mt-1 text-xs leading-5 text-white/55">{copy}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[440px] lg:min-h-[720px]">
          <img src="/images/showcase/calacatta-gold.webp" alt="Heller hochwertiger Innenraum mit grossformatiger Keramik" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#102f3f]/55 via-transparent to-transparent lg:from-[#102f3f]/25" />
          <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-[#102f3f]/80 p-4 backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-xs">
            <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#d7b46a]">Grossformat im Fokus</p>
            <p className="mt-2 text-sm font-bold leading-6">Fugenarme Flächen bis 120 × 260 cm, ausgewählt für hochwertige Innenräume.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConfidenceStrip() {
  const items = [
    { icon: Sparkles, title: 'Premium-Auswahl', copy: 'Nur Produkte mit klarer gestalterischer und technischer Relevanz.' },
    { icon: Ruler, title: 'Projektbezogene Beratung', copy: 'Format, Menge, Nutzung und Lieferort werden vor der Offerte geprüft.' },
    { icon: Truck, title: 'Schweizer Projektlogistik', copy: 'Lieferung, Einfuhr und Transport werden transparent kalkuliert.' },
    { icon: ShieldCheck, title: 'Schriftliche Bestätigung', copy: 'Preis, Verfügbarkeit und Lieferzeit gelten erst mit unserer Offerte.' },
  ];
  return (
    <section className="border-b border-[#dfe4e5] bg-[#fbfaf7]">
      <div className="mx-auto grid max-w-[1500px] gap-px bg-[#dfe4e5] md:grid-cols-2 xl:grid-cols-4">
        {items.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="bg-[#fbfaf7] px-6 py-7 lg:px-8">
            <Icon className="text-[#a87828]" size={22} />
            <h2 className="mt-4 text-sm font-black text-[#17384b]">{title}</h2>
            <p className="mt-2 text-xs leading-5 text-[#66797f]">{copy}</p>
          </div>
        ))}
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
  return (
    <section id="sortiment" className="scroll-mt-24 bg-[#f2f0e9]">
      <div className="mx-auto max-w-[1500px] px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <SectionHeading eyebrow="Sortiment" title="Die richtigen Kategorien. Klar geordnet." copy="Der Schwerpunkt liegt auf Keramik, Grossformat, Mosaik, Steinfliesen und Bad. Böden und Baustellenzubehör ergänzen Projekte, ohne die Auswahl unnötig aufzublähen." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => (
            <button key={category.id} onClick={() => onSelect(category.id)} className={`group relative overflow-hidden rounded-[22px] bg-[#17384b] text-left ${index === 0 ? 'md:col-span-2 xl:col-span-2' : ''}`}>
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
            </button>
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
          <SectionHeading eyebrow="Premium-Grossformat" title="Weniger Fugen. Mehr Materialwirkung." copy="Grossformatplatten schaffen ruhige, grosszügige Flächen. Sie eignen sich für Wände, Böden, Duschen, Küchen und Möbelverkleidungen – die technische Eignung prüfen wir pro Projekt." />
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

function ProductCard({ product, onRequest, onCatalog }: { product: Product; onRequest: (product: Product) => void; onCatalog: (product: Product) => void }) {
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

function ProductSelection({ activeCategory, onCategory, onRequest, onCatalog }: { activeCategory: CategoryId; onCategory: (id: CategoryId) => void; onRequest: (product: Product) => void; onCatalog: (product: Product) => void }) {
  const visibleProducts = useMemo(() => products.filter((product) => product.category === activeCategory), [activeCategory]);
  const active = categoryById[activeCategory];

  return (
    <section id="auswahl" className="scroll-mt-24 bg-[#fbfaf7]">
      <div className="mx-auto max-w-[1500px] px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <SectionHeading eyebrow="Kuratierte Produktauswahl" title="Weniger suchen. Passender auswählen." copy="Diese Auswahl zeigt bewusst nur starke Einstiege in jede Kategorie. Weitere Formate, Farben und Serien liefern wir nach Projekt, Menge und gewünschter Wirkung." />
        <div className="mt-9 flex gap-2 overflow-x-auto pb-3">
          {categories.map((category) => (
            <button key={category.id} onClick={() => onCategory(category.id)} className={`min-h-11 shrink-0 rounded-full border px-4 text-xs font-black transition ${activeCategory === category.id ? 'border-[#17384b] bg-[#17384b] text-white' : 'border-[#cad5d7] bg-white text-[#53676e] hover:border-[#8da2a8]'}`}>
              {category.title}
            </button>
          ))}
        </div>
        <div className="mt-7 flex flex-col justify-between gap-4 border-b border-[#dce3e3] pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.16em] text-[#a87828]">Aktuelle Auswahl</p>
            <h3 className="mt-2 font-display text-3xl font-black text-[#17384b]">{active.title}</h3>
          </div>
          <button onClick={() => onCatalog({ id: `catalog-${active.id}`, category: active.id, name: `Katalog ${active.title}`, description: active.description, image: active.image, imageAlt: active.imageAlt, specs: [] })} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#cad5d7] bg-white px-5 text-xs font-black text-[#17384b]">
            <Download size={15} /> Gesamten Katalog anfordern
          </button>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleProducts.map((product) => <ProductCard key={product.id} product={product} onRequest={onRequest} onCatalog={onCatalog} />)}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    ['01', 'Projekt kurz beschreiben', 'Kategorie, Fläche oder Menge, Lieferort und gewünschter Termin genügen für den Start.'],
    ['02', 'Auswahl & Muster', 'Wir grenzen passende Produkte ein und organisieren bei Bedarf Muster oder Detailbilder.'],
    ['03', 'Projektpreis', 'Preis, Transport, Einfuhr, Verfügbarkeit und Lieferzeit werden schriftlich bestätigt.'],
    ['04', 'Lieferung', 'Nach Freigabe koordinieren wir Bestellung und projektbezogene Lieferung in die Schweiz.'],
  ];
  return (
    <section id="ablauf" className="scroll-mt-24 bg-[#ede9df]">
      <div className="mx-auto max-w-[1500px] px-5 py-18 sm:px-8 lg:px-10 lg:py-24">
        <SectionHeading eyebrow="Vom Interesse zur Offerte" title="Ein Verkaufsprozess, der dem Projekt folgt." copy="Keine anonyme Preisliste und kein unübersichtlicher Warenkorb. Sie erhalten eine fokussierte Auswahl und eine nachvollziehbare Offerte für Ihr konkretes Projekt." />
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

function InquiryForm({ data, setData, error, onSubmit }: { data: InquiryData; setData: (data: InquiryData) => void; error: string; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  const update = (key: keyof InquiryData, value: string) => setData({ ...data, [key]: value });
  const emailLink = emailHref(storefront.email, data);
  return (
    <section id="anfrage" className="scroll-mt-24 bg-[#102f3f] text-white">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-18 sm:px-8 lg:grid-cols-[.76fr_1.24fr] lg:px-10 lg:py-24">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[.22em] text-[#d7b46a]">Preis oder Katalog anfragen</p>
          <h2 className="mt-4 font-display text-4xl font-black leading-[1.02] tracking-[-.045em] sm:text-5xl">Erzählen Sie uns kurz, was Sie brauchen.</h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-white/65">Wir antworten persönlich mit einer passenden Auswahl oder einer projektbezogenen Offerte. Je genauer Menge und Lieferort sind, desto genauer wird der Preis.</p>
          <div className="mt-8 space-y-4 text-sm text-white/72">
            {['Keine automatische Bestellung', 'Keine öffentliche Weitergabe von Preislisten', 'Muster und Kataloge auf konkrete Anfrage', 'Offerte mit bestätigter Lieferzeit'].map((item) => (
              <p key={item} className="flex items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d7b46a] text-[#102f3f]"><Check size={15} /></span>{item}</p>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-5">
            <p className="text-xs font-black uppercase tracking-[.16em] text-[#d7b46a]">Direkter Kontakt</p>
            <a href={`tel:+${storefront.phoneDigits}`} className="mt-4 flex items-center gap-3 text-sm font-bold"><Phone size={17} /> {storefront.phoneDisplay}</a>
            <a href={`mailto:${storefront.email}`} className="mt-3 flex items-center gap-3 text-sm font-bold"><Mail size={17} /> {storefront.email}</a>
          </div>
        </div>
        <form onSubmit={onSubmit} className="rounded-[24px] bg-[#fbfaf7] p-5 text-[#17384b] shadow-2xl sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-xs font-black">Anfrage
              <select value={data.requestType} onChange={(event) => update('requestType', event.target.value)} className="h-12 rounded-xl border border-[#cbd5d7] bg-white px-4 text-base font-normal sm:text-sm">
                <option>Preisofferte</option><option>Katalog</option>
              </select>
            </label>
            <label className="grid gap-2 text-xs font-black">Kundentyp
              <select value={data.customerType} onChange={(event) => update('customerType', event.target.value)} className="h-12 rounded-xl border border-[#cbd5d7] bg-white px-4 text-base font-normal sm:text-sm">
                <option>Privatkunde</option><option>Architekt / Planer</option><option>Bauunternehmen</option><option>Händler / Ausstellung</option>
              </select>
            </label>
          </div>
          <label className="mt-4 grid gap-2 text-xs font-black">Gewünschte Kategorie oder Produkt
            <input value={data.selection} onChange={(event) => update('selection', event.target.value)} placeholder="z. B. Grossformat Calacatta, 45 m²" className="h-12 rounded-xl border border-[#cbd5d7] bg-white px-4 text-base font-normal sm:text-sm" />
          </label>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-xs font-black">Name *
              <input required value={data.name} onChange={(event) => update('name', event.target.value)} className="h-12 rounded-xl border border-[#cbd5d7] bg-white px-4 text-base font-normal sm:text-sm" />
            </label>
            <label className="grid gap-2 text-xs font-black">Unternehmen
              <input value={data.company} onChange={(event) => update('company', event.target.value)} className="h-12 rounded-xl border border-[#cbd5d7] bg-white px-4 text-base font-normal sm:text-sm" />
            </label>
            <label className="grid gap-2 text-xs font-black">E-Mail
              <input type="email" value={data.email} onChange={(event) => update('email', event.target.value)} className="h-12 rounded-xl border border-[#cbd5d7] bg-white px-4 text-base font-normal sm:text-sm" />
            </label>
            <label className="grid gap-2 text-xs font-black">Telefon / WhatsApp
              <input type="tel" value={data.phone} onChange={(event) => update('phone', event.target.value)} className="h-12 rounded-xl border border-[#cbd5d7] bg-white px-4 text-base font-normal sm:text-sm" />
            </label>
            <label className="grid gap-2 text-xs font-black">Menge / Fläche
              <input value={data.quantity} onChange={(event) => update('quantity', event.target.value)} placeholder="z. B. 45 m² oder 2 Stück" className="h-12 rounded-xl border border-[#cbd5d7] bg-white px-4 text-base font-normal sm:text-sm" />
            </label>
            <label className="grid gap-2 text-xs font-black">PLZ / Lieferort
              <input value={data.location} onChange={(event) => update('location', event.target.value)} placeholder="z. B. 6780 Airolo" className="h-12 rounded-xl border border-[#cbd5d7] bg-white px-4 text-base font-normal sm:text-sm" />
            </label>
          </div>
          <label className="mt-4 grid gap-2 text-xs font-black">Gewünschter Zeitraum
            <input value={data.timeline} onChange={(event) => update('timeline', event.target.value)} placeholder="z. B. Oktober 2026" className="h-12 rounded-xl border border-[#cbd5d7] bg-white px-4 text-base font-normal sm:text-sm" />
          </label>
          <label className="mt-4 grid gap-2 text-xs font-black">Projekt / besondere Anforderungen
            <textarea value={data.message} onChange={(event) => update('message', event.target.value)} placeholder="Raum, gewünschte Wirkung, Masse, Oberfläche oder Referenz beschreiben" className="min-h-28 rounded-xl border border-[#cbd5d7] bg-white p-4 text-base font-normal sm:text-sm" />
          </label>
          {error ? <p role="alert" className="mt-4 rounded-xl bg-[#fff0ed] p-3 text-xs font-bold text-[#9a4035]">{error}</p> : null}
          <p className="mt-4 text-[11px] leading-5 text-[#6d7c80]">Mindestens E-Mail oder Telefonnummer angeben. Mit dem Senden wird die Anfrage in WhatsApp vorbereitet; es erfolgt keine automatische Bestellung.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-[1.2fr_.8fr]">
            <button type="submit" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#d7b46a] px-5 text-sm font-black text-[#102f3f]"><MessageCircle size={17} /> WhatsApp vorbereiten</button>
            <a href={emailLink} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#004b87] px-5 text-sm font-black text-white"><Mail size={17} /> E-Mail</a>
          </div>
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
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/55">Ausgewählte Materialien und projektbezogene Lieferung für Bau und Renovation in der Schweiz.</p>
        </div>
        <div className="text-sm text-white/68">
          <p className="text-xs font-black uppercase tracking-[.15em] text-[#d7b46a]">Kontakt</p>
          <a href={`tel:+${storefront.phoneDigits}`} className="mt-4 block font-bold text-white">{storefront.phoneDisplay}</a>
          <a href={`mailto:${storefront.email}`} className="mt-2 block font-bold text-white">{storefront.email}</a>
          <p className="mt-2">Schweiz</p>
        </div>
        <div className="text-sm text-white/68">
          <p className="text-xs font-black uppercase tracking-[.15em] text-[#d7b46a]">Rechtliches</p>
          <a href="/impressum.html" className="mt-4 block hover:text-white">Impressum</a>
          <a href="/datenschutz.html" className="mt-2 block hover:text-white">Datenschutz</a>
          <p className="mt-5 text-xs leading-5 text-white/42">Produktdarstellungen können je Bildschirm abweichen. Preise, Verfügbarkeit und Lieferzeit werden projektbezogen bestätigt.</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-[10px] text-white/38">© 2026 RA Bau Lieferung. Alle Rechte vorbehalten.</div>
    </footer>
  );
}

export default function App() {
  const initialCategory = categoryByPath[window.location.pathname] ?? 'keramik';
  const [activeCategory, setActiveCategory] = useState<CategoryId>(initialCategory);
  const [inquiry, setInquiry] = useState<InquiryData>(emptyInquiry);
  const [error, setError] = useState('');

  useEffect(() => {
    const onPop = () => {
      const id = categoryByPath[window.location.pathname];
      if (id) setActiveCategory(id);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const selectCategory = (id: CategoryId, moveToSelection = false) => {
    setActiveCategory(id);
    window.history.pushState({}, '', routeByCategory[id]);
    if (moveToSelection) window.setTimeout(() => scrollToId('auswahl'), 0);
  };

  const request = (kind: 'Preisofferte' | 'Katalog', selection = '') => {
    setInquiry((current) => ({ ...current, requestType: kind, selection }));
    setError('');
    window.setTimeout(() => scrollToId('anfrage'), 0);
  };

  const requestProduct = (product: Product) => request('Preisofferte', `${product.name} · ${categoryById[product.category].title}`);
  const requestCatalog = (product: Product) => request('Katalog', categoryById[product.category].title);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inquiry.email.trim() && !inquiry.phone.trim()) {
      setError('Bitte geben Sie eine E-Mail-Adresse oder Telefonnummer an.');
      return;
    }
    setError('');
    window.open(whatsappHref(storefront.phoneDigits, inquiry), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fbfaf7] pb-17 text-[#17384b] sm:pb-0">
      <Header onRequest={() => request('Preisofferte')} />
      <main>
        <Hero onRequest={() => request('Preisofferte')} onCatalog={() => request('Katalog')} />
        <ConfidenceStrip />
        <CategoryGrid onSelect={(id) => selectCategory(id, true)} />
        <LargeFormat onRequest={requestProduct} />
        <ProductSelection activeCategory={activeCategory} onCategory={(id) => selectCategory(id)} onRequest={requestProduct} onCatalog={requestCatalog} />
        <Process />
        <InquiryForm data={inquiry} setData={setInquiry} error={error} onSubmit={submit} />
      </main>
      <Footer />
      <div className="fixed inset-x-3 bottom-3 z-40 sm:hidden">
        <button onClick={() => request('Preisofferte')} className="flex min-h-14 w-full items-center justify-between rounded-full border border-white/15 bg-[#004b87]/96 px-5 text-left text-white shadow-2xl backdrop-blur">
          <span><span className="block text-xs font-black">Projektpreis anfragen</span><span className="block text-[10px] text-white/58">Persönlich & unverbindlich</span></span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
