import { useEffect, useState } from 'react';
import type { ConstructionProduct, InteriorProduct, QuoteItem } from '../types';

const STORAGE_KEY = 'ra_quote_v2';

function readSaved(): QuoteItem[] {
  try {
    const current = window.localStorage.getItem(STORAGE_KEY);
    if (current) return JSON.parse(current) as QuoteItem[];
    const legacy = window.localStorage.getItem('ra_quote_v1');
    return legacy ? JSON.parse(legacy) as QuoteItem[] : [];
  } catch {
    return [];
  }
}

function isPieceProduct(product: InteriorProduct) {
  if (product.brand === 'Raumkonzept') return true;
  return ['Waschtisch', 'Badmöbel', 'Armatur', 'Duschsystem', 'Duschwanne', 'Duschabtrennung', 'WC', 'Bidet']
    .some((term) => `${product.name} ${product.application}`.includes(term));
}

export function useQuote() {
  const [items, setItems] = useState<QuoteItem[]>(readSaved);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const hasInterior = (product: InteriorProduct) => items.some((item) => item.reference === product.reference);
  const hasConstruction = (product: ConstructionProduct) => items.some((item) => item.id === `construction-${product.id}`);

  const toggleInterior = (product: InteriorProduct, selectedComponents?: string[]) => {
    setItems((current) => {
      if (current.some((item) => item.reference === product.reference)) {
        return current.filter((item) => item.reference !== product.reference);
      }
      const concept = product.brand === 'Raumkonzept';
      const piece = isPieceProduct(product);
      const chosen = concept ? (selectedComponents?.length ? selectedComponents : product.components ?? []) : undefined;
      return [...current, {
        id: product.id,
        name: product.name,
        spec: product.spec,
        brand: product.brand,
        image: product.image,
        quantity: concept || piece ? '1' : '25',
        unit: concept ? 'Set' : piece ? 'Stk.' : 'm²',
        format: product.format,
        reference: product.reference,
        components: product.components,
        selectedComponents: chosen,
        customNote: concept && chosen ? `Gewählte Komponenten: ${chosen.join(', ')}` : '',
      }];
    });
  };

  const toggleConstruction = (product: ConstructionProduct) => {
    const id = `construction-${product.id}`;
    setItems((current) => {
      if (current.some((item) => item.id === id)) return current.filter((item) => item.id !== id);
      return [...current, {
        id,
        name: product.name,
        spec: product.variants,
        brand: 'RA Bau Sortiment',
        image: product.image,
        quantity: product.defaultQuantity,
        unit: product.unit,
        reference: product.pack,
        customNote: '',
      }];
    });
  };

  const update = (id: string, patch: Partial<QuoteItem>) => {
    setItems((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
  };

  const remove = (id: string) => setItems((current) => current.filter((item) => item.id !== id));
  const clear = () => setItems([]);

  return { items, hasInterior, hasConstruction, toggleInterior, toggleConstruction, update, remove, clear };
}
