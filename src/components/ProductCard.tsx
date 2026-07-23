import type { InteriorProduct } from '../types';
import { SmartImage } from './SmartImage';

export function ProductCard({ product, selected, onDetails, onToggle }: { product: InteriorProduct; selected: boolean; onDetails: () => void; onToggle: () => void }) {
  const image = product.gallery?.[0] ?? { src: product.image, alt: product.name, fit: product.imageFit ?? 'cover' };
  return (
    <article className="group flex flex-col overflow-hidden border border-[#d8e1e6] bg-white">
      <button onClick={onDetails} className="relative block aspect-[4/3] w-full overflow-hidden bg-[#eef2f3] text-left">
        <SmartImage asset={image} className={`h-full w-full transition duration-700 group-hover:scale-[1.025] ${image.fit === 'contain' ? 'p-5' : ''}`} />
        {product.badges?.length ? <div className="absolute left-3 top-3 flex flex-wrap gap-2">{product.badges.slice(0, 2).map((badge) => <span key={badge} className="bg-white/94 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[.12em] text-[#004b87] shadow-sm">{badge}</span>)}</div> : null}
      </button>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[9px] font-extrabold uppercase tracking-[.16em] text-[#8e6725]">{product.brand}</p>
        <button onClick={onDetails} className="mt-2 text-left"><h3 className="font-display text-2xl font-bold leading-tight tracking-[-.025em] text-[#10293e]">{product.name}</h3></button>
        <p className="mt-2 text-sm font-semibold leading-6 text-[#596f7c]">{product.spec}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-bold text-[#546b79]"><span className="bg-[#f0f4f5] px-3 py-2">{product.format}</span><span className="bg-[#f0f4f5] px-3 py-2">{product.application}</span></div>
        <div className="mt-auto grid grid-cols-[.8fr_1.2fr] gap-2 pt-5">
          <button onClick={onDetails} className="min-h-11 border border-[#cbd7dc] px-3 text-xs font-extrabold text-[#004b87]">Details</button>
          <button onClick={onToggle} className={`min-h-11 px-3 text-xs font-extrabold ${selected ? 'bg-[#fff0ee] text-[#9b3f3b]' : 'bg-[#004b87] text-white'}`}>{selected ? 'Entfernen' : product.brand === 'Raumkonzept' ? 'Konzept konfigurieren' : 'Zur Anfrage'}</button>
        </div>
      </div>
    </article>
  );
}
