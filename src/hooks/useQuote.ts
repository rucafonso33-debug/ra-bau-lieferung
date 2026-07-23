import { useEffect, useState } from 'react';
import { createConstructionQuoteItem, createInteriorQuoteItem, migrateQuote, setQuoteSubstitution, toggleQuoteComponent } from '../lib/quote';
import type { ConstructionProduct, InteriorProduct, QuoteItem } from '../types';

const STORAGE_KEY = 'ra_quote_v3';

export function useQuote() {
  const [items, setItems] = useState<QuoteItem[]>(() => {
    try {
      const current = localStorage.getItem(STORAGE_KEY);
      if (current) return migrateQuote(JSON.parse(current));
      const legacy = localStorage.getItem('ra_quote_v2') ?? localStorage.getItem('ra_quote_v1');
      return legacy ? migrateQuote(JSON.parse(legacy)) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const toggleInterior = (product: InteriorProduct) => {
    setItems((current) => current.some((item) => item.reference === product.reference)
      ? current.filter((item) => item.reference !== product.reference)
      : [...current, createInteriorQuoteItem(product)]);
  };

  const toggleConstruction = (product: ConstructionProduct) => {
    setItems((current) => current.some((item) => item.id === product.id)
      ? current.filter((item) => item.id !== product.id)
      : [...current, createConstructionQuoteItem(product)]);
  };

  const update = (id: string, patch: Partial<QuoteItem>) => setItems((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
  const remove = (id: string) => setItems((current) => current.filter((item) => item.id !== id));
  const toggleComponent = (id: string, component: string) => setItems((current) => current.map((item) => item.id === id ? toggleQuoteComponent(item, component) : item));
  const setSubstitution = (id: string, key: string, value: string) => setItems((current) => current.map((item) => item.id === id ? setQuoteSubstitution(item, key, value) : item));

  return { items, toggleInterior, toggleConstruction, update, remove, toggleComponent, setSubstitution };
}
