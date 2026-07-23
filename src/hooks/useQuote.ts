import { useEffect, useState } from 'react';
import type { ConstructionProduct, InteriorProduct, QuoteItem } from '../types';

const STORAGE_KEY = 'ra_quote_v3';

const migrate = (raw: unknown): QuoteItem[] => {
  if (!Array.isArray(raw)) return [];
  return raw.filter(Boolean).map((item) => {
    const value = item as QuoteItem;
    const components = value.components ?? [];
    return {
      ...value,
      selectedComponents: value.selectedComponents ?? components,
      optionalComponents: value.optionalComponents ?? [],
      substitutions: value.substitutions ?? [],
      selectedSubstitutions: value.selectedSubstitutions ?? {},
      isConcept: value.isConcept ?? value.unit === 'Set',
    };
  });
};

export function useQuote() {
  const [items, setItems] = useState<QuoteItem[]>(() => {
    try {
      const current = localStorage.getItem(STORAGE_KEY);
      if (current) return migrate(JSON.parse(current));
      const legacy = localStorage.getItem('ra_quote_v2') ?? localStorage.getItem('ra_quote_v1');
      return legacy ? migrate(JSON.parse(legacy)) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const toggleInterior = (product: InteriorProduct) => {
    setItems((current) => {
      if (current.some((item) => item.reference === product.reference)) {
        return current.filter((item) => item.reference !== product.reference);
      }
      const isConcept = product.brand === 'Raumkonzept';
      const piece = isConcept || ['Waschtisch', 'Badmöbel', 'Armatur', 'Duschsystem', 'Duschwanne', 'Duschabtrennung', 'WC', 'Bidet'].some((term) => `${product.name} ${product.application}`.includes(term));
      const required = product.components ?? [];
      return [...current, {
        id: product.id,
        name: product.name,
        spec: product.spec,
        brand: product.brand,
        image: product.image,
        quantity: piece ? '1' : '25',
        unit: isConcept ? 'Set' : piece ? 'Stk.' : 'm²',
        format: product.format,
        reference: product.reference,
        components: required,
        selectedComponents: required,
        optionalComponents: product.optionalComponents ?? [],
        substitutions: product.substitutions ?? [],
        selectedSubstitutions: {},
        isConcept,
      }];
    });
  };

  const toggleConstruction = (product: ConstructionProduct) => {
    setItems((current) => {
      if (current.some((item) => item.id === product.id)) return current.filter((item) => item.id !== product.id);
      return [...current, { id: product.id, name: product.name, spec: product.variants, image: product.image, quantity: product.defaultQuantity, unit: product.unit }];
    });
  };

  const update = (id: string, patch: Partial<QuoteItem>) => setItems((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
  const remove = (id: string) => setItems((current) => current.filter((item) => item.id !== id));
  const toggleComponent = (id: string, component: string) => setItems((current) => current.map((item) => {
    if (item.id !== id) return item;
    const selected = new Set(item.selectedComponents ?? []);
    if (selected.has(component)) selected.delete(component); else selected.add(component);
    return { ...item, selectedComponents: [...selected] };
  }));
  const setSubstitution = (id: string, key: string, value: string) => setItems((current) => current.map((item) => item.id === id ? { ...item, selectedSubstitutions: { ...(item.selectedSubstitutions ?? {}), [key]: value } } : item));

  return { items, toggleInterior, toggleConstruction, update, remove, toggleComponent, setSubstitution };
}
