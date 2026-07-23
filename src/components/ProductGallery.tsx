import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { InteriorProduct, ProductVisual } from '../types';
import { SmartImage } from './SmartImage';

export function ProductGallery({ product }: { product: InteriorProduct }) {
  const visuals = useMemo<ProductVisual[]>(() => product.gallery?.length ? product.gallery : [{ src: product.image, alt: `${product.brand ?? ''} ${product.name}`, fit: product.imageFit ?? 'cover', label: 'Produkt' }], [product]);
  const [index, setIndex] = useState(0);
  useEffect(() => setIndex(0), [product.id]);
  const current = visuals[index];

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden bg-[#eef2f3]">
        <SmartImage asset={current} priority className={`h-full w-full ${current.fit === 'contain' ? 'p-5 sm:p-8' : ''}`} />
        <span className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] bg-[#10293e]/92 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[.13em] text-white">{current.label ?? `Bild ${index + 1}`}</span>
        {visuals.length > 1 && <>
          <button aria-label="Vorheriges Bild" onClick={() => setIndex((index - 1 + visuals.length) % visuals.length)} className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-[#10293e] shadow"><ChevronLeft /></button>
          <button aria-label="Nächstes Bild" onClick={() => setIndex((index + 1) % visuals.length)} className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/92 text-[#10293e] shadow"><ChevronRight /></button>
        </>}
      </div>
      {visuals.length > 1 && <div className="flex gap-2 overflow-x-auto py-3" aria-label="Produktbilder">{visuals.map((visual, itemIndex) => <button key={`${visual.src}-${itemIndex}`} onClick={() => setIndex(itemIndex)} aria-label={`Bild ${itemIndex + 1}: ${visual.label ?? visual.alt}`} className={`h-16 w-24 shrink-0 overflow-hidden border-2 bg-[#f4f6f7] ${itemIndex === index ? 'border-[#004b87]' : 'border-transparent'}`}><SmartImage asset={{ ...visual, alt: '' }} className={`h-full w-full ${visual.fit === 'contain' ? 'p-1' : ''}`} /></button>)}</div>}
    </div>
  );
}
