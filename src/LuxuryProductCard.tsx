import React from 'react';
import type { InteriorProduct, ProductVisual } from './types';

type Props = {
  category: string;
  product: InteriorProduct;
  inQuote: boolean;
  onSelect: () => void;
  onAdd: () => void;
};

function ProductImage({ visual }: { visual: ProductVisual }) {
  const [failed, setFailed] = React.useState(false);
  if (failed) {
    return <div className="flex h-full w-full items-center justify-center bg-[#eef2f3] px-6 text-center text-xs font-bold text-[#607582]">Bild wird projektbezogen bestätigt</div>;
  }
  return (
    <img
      src={visual.src}
      alt={visual.alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`h-full w-full ${visual.fit === 'contain' ? 'object-contain bg-white p-4 sm:p-7' : 'object-cover'}`}
    />
  );
}

export function LuxuryProductCard({ category, product, inQuote, onSelect, onAdd }: Props) {
  const visuals: ProductVisual[] = product.gallery?.length
    ? product.gallery
    : [{ src: product.image, alt: `${product.brand ?? ''} ${product.name}`.trim(), fit: product.imageFit ?? 'cover', label: 'Produkt' }];
  const [activeVisual, setActiveVisual] = React.useState(0);

  React.useEffect(() => setActiveVisual(0), [product.id]);

  const current = visuals[Math.min(activeVisual, visuals.length - 1)];
  const isConcept = category === 'Raumkonzepte';

  return (
    <article className="group flex overflow-hidden rounded-[18px] border border-[#d7e0e5] bg-white shadow-[0_8px_28px_rgba(16,41,62,.06)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(16,41,62,.12)]">
      <div className="flex w-full flex-col">
        <div className="border-b border-[#e0e6e9] bg-[#eef1f2]">
          <button onClick={onSelect} className={`relative w-full overflow-hidden text-left ${isConcept ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
            <ProductImage visual={current} />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[#081d2d]/80 via-[#081d2d]/10 to-transparent px-4 pb-3 pt-14 text-white">
              <span className="rounded-full bg-[#10293e]/90 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[.14em]">{current.label ?? (activeVisual === 0 ? 'Im Raum' : 'Produkt')}</span>
              <span className="text-[10px] font-bold">{activeVisual + 1}/{visuals.length}</span>
            </div>
            {product.badges?.length ? (
              <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                {product.badges.slice(0, 2).map((badge) => <span key={badge} className="rounded-full bg-white/95 px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-[.1em] text-[#004b87] shadow-sm">{badge}</span>)}
              </div>
            ) : null}
          </button>

          {visuals.length > 1 ? (
            <div className="flex gap-2 overflow-x-auto bg-white px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {visuals.map((item, index) => (
                <button
                  key={`${item.src}-${index}`}
                  onClick={() => setActiveVisual(index)}
                  aria-label={item.label ?? `Bild ${index + 1}`}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-[#f4f6f7] transition ${index === activeVisual ? 'border-[#004b87] shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <ProductImage visual={item} />
                  <span className="absolute inset-x-0 bottom-0 truncate bg-[#081d2d]/75 px-1 py-0.5 text-[7px] font-bold text-white">{item.label}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="text-[9px] font-extrabold uppercase tracking-[.17em] text-[#8e6725]">{product.brand}</p>
          <button onClick={onSelect} className="mt-1.5 text-left">
            <h3 className="font-display text-[22px] font-bold leading-tight tracking-[-.025em] text-[#10293e] sm:text-2xl">{product.name}</h3>
          </button>
          <p className="mt-2 text-[13px] font-semibold leading-5 text-[#506a79] sm:text-sm">{product.spec}</p>
          <p className="mt-3 line-clamp-2 text-[13px] leading-5 text-[#6a7e8a] sm:line-clamp-3 sm:text-sm sm:leading-6">{product.details}</p>

          {product.components?.length ? (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {product.components.map((component) => <span key={component} className="rounded-full border border-[#d7e0e5] bg-[#f7f9fa] px-2.5 py-1 text-[9px] font-bold text-[#496173]">{component}</span>)}
            </div>
          ) : null}

          <div className="mt-4 grid grid-cols-2 gap-2 text-[9px] font-semibold leading-4 text-[#546b79] sm:text-[10px]">
            <span className="rounded-md bg-[#f1f4f5] px-2.5 py-2">{product.format}</span>
            <span className="rounded-md bg-[#f1f4f5] px-2.5 py-2">{product.application}</span>
          </div>

          <div className="mt-auto grid grid-cols-[.82fr_1.18fr] gap-2 pt-5">
            <button onClick={onSelect} className="rounded-lg border border-[#ccd7de] px-3 py-3 text-[11px] font-extrabold text-[#004b87] hover:border-[#004b87]">Details</button>
            <button onClick={onAdd} className={`rounded-lg px-3 py-3 text-[11px] font-extrabold transition ${inQuote ? 'bg-[#fff0ee] text-[#9b3f3b] hover:bg-[#ffe1dd]' : 'bg-[#004b87] text-white hover:bg-[#003d70]'}`}>
              {inQuote ? 'Entfernen' : isConcept ? 'Konzept anfragen' : 'Zur Anfrage'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
