import { ClipboardList, MessageCircle, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { ProductModal } from '../components/ProductModal';
import { SmartImage } from '../components/SmartImage';
import { whatsappUrl, type AppPage } from '../config/business';
import { interiorCategories } from '../finalData';
import type { InteriorProduct } from '../types';

export function CategoryPage({ categoryName, title, intro, hasProduct, onToggle, onNavigate }: { categoryName: string; title: string; intro: string; hasProduct: (product: InteriorProduct) => boolean; onToggle: (product: InteriorProduct, components?: string[]) => void; onNavigate: (page: AppPage) => void }) {
  const category = interiorCategories.find((item) => item.germanTitle === categoryName);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<InteriorProduct | null>(null);
  const products = useMemo(() => category?.products.filter((product) => [product.name, product.brand, product.reference, product.spec, product.application].join(' ').toLowerCase().includes(query.trim().toLowerCase())) ?? [], [category, query]);
  const hero = category?.products[0]?.gallery?.[0] ?? (category?.products[0] ? { src: category.products[0].image, alt: category.products[0].name, fit: category.products[0].imageFit } : undefined);
  const message = `Guten Tag, ich interessiere mich für den Bereich ${title}. Ich sende Raumfoto, ungefähre Masse, Stilwunsch und Lieferort.`;

  return <main className="bg-[#f3f5f6]">
    <section className="bg-[#10293e] text-white"><div className="mx-auto grid max-w-[1540px] lg:grid-cols-[1.05fr_.95fr]"><div className="px-5 py-14 lg:px-10 lg:py-20"><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#d7aa57]">RA Bau Lieferung · Schweiz</p><h1 className="mt-3 font-display text-5xl font-black tracking-[-.05em] sm:text-6xl">{title}</h1><p className="mt-5 max-w-2xl text-base leading-7 text-white/70">{intro}</p></div><div className="min-h-[300px]">{hero && <SmartImage asset={hero} priority className={`h-full w-full ${hero.fit === 'contain' ? 'bg-white p-10' : ''}`} />}</div></div></section>

    <section className="bg-white"><div className="mx-auto grid max-w-[1540px] lg:grid-cols-[1.2fr_.8fr]"><div className="px-5 py-12 lg:px-10 lg:py-16"><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#9a6e22]">Persönliche Auswahlhilfe</p><h2 className="mt-3 font-display text-3xl font-black tracking-[-.035em] text-[#10293e]">Noch nicht sicher, welches Produkt passt?</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-[#5e7380]">Senden Sie Raumfoto, ungefähre Masse, gewünschten Stil und Lieferort. Wir grenzen die Auswahl ein, statt einfach mehr Produkte zu zeigen.</p></div><div className="flex flex-col justify-center gap-3 bg-[#e9eef0] p-6 lg:p-10"><a href={whatsappUrl(message)} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#d7aa57] px-5 text-sm font-extrabold text-[#10293e]"><MessageCircle size={18} /> Auswahl per WhatsApp</a><button onClick={() => onNavigate('quote')} className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#b8c7cf] bg-white px-5 text-sm font-extrabold text-[#004b87]"><ClipboardList size={18} /> Anfrage zusammenstellen</button></div></div></section>

    <section className="mx-auto max-w-[1540px] px-5 py-14 lg:px-10 lg:py-16"><div className="flex flex-col gap-5 border-b border-[#d8e1e6] pb-7 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-bold text-[#536b79]">{products.length} kuratierte Produkte</p><p className="mt-1 text-xs text-[#7b8e98]">Raumwirkung oder ehrliche Produktansicht zuerst. Technik und Herstellerquelle direkt danach.</p></div><label className="flex min-h-12 items-center gap-3 border border-[#ccd7dc] bg-white px-4"><Search size={17} className="text-[#6d818c]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Produkt, Stil, Marke oder Referenz" className="w-full bg-transparent text-sm outline-none sm:w-72" /></label></div><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} selected={hasProduct(product)} onDetails={() => setSelected(product)} onToggle={() => product.brand === 'Raumkonzept' ? setSelected(product) : onToggle(product)} />)}</div></section>

    {selected && <ProductModal product={selected} selected={hasProduct(selected)} onAdd={(components) => onToggle(selected, components)} onRemove={() => onToggle(selected)} onClose={() => setSelected(null)} />}
  </main>;
}
