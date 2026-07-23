import type { ConstructionProduct, InteriorProduct, QuoteItem } from '../types';

const pieceTerms = ['Waschtisch', 'Badmöbel', 'Armatur', 'Duschsystem', 'Duschwanne', 'Duschabtrennung', 'WC', 'Bidet'];

export function migrateQuote(raw: unknown): QuoteItem[] {
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
}

export function createInteriorQuoteItem(product: InteriorProduct): QuoteItem {
  const isConcept = product.brand === 'Raumkonzept';
  const piece = isConcept || pieceTerms.some((term) => `${product.name} ${product.application}`.includes(term));
  const required = product.components ?? [];
  return {
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
  };
}

export function createConstructionQuoteItem(product: ConstructionProduct): QuoteItem {
  return { id: product.id, name: product.name, spec: product.variants, image: product.image, quantity: product.defaultQuantity, unit: product.unit };
}

export function toggleQuoteComponent(item: QuoteItem, component: string): QuoteItem {
  const selected = new Set(item.selectedComponents ?? []);
  if (selected.has(component)) selected.delete(component); else selected.add(component);
  return { ...item, selectedComponents: [...selected] };
}

export function setQuoteSubstitution(item: QuoteItem, key: string, value: string): QuoteItem {
  return { ...item, selectedSubstitutions: { ...(item.selectedSubstitutions ?? {}), [key]: value } };
}

export function formatQuoteItem(item: QuoteItem, index: number): string {
  const components = item.isConcept && item.selectedComponents?.length ? `\n   Komponenten: ${item.selectedComponents.join(', ')}` : '';
  const substitutions = item.isConcept && item.selectedSubstitutions && Object.keys(item.selectedSubstitutions).length
    ? `\n   Ausführung: ${Object.entries(item.selectedSubstitutions).map(([key, value]) => `${key}: ${value}`).join(', ')}`
    : '';
  return `${index + 1}. ${item.brand ? `${item.brand} ` : ''}${item.name}\n   ${item.quantity} ${item.unit}${item.reference ? ` · Ref. ${item.reference}` : ''}${components}${substitutions}${item.customNote ? `\n   Notiz: ${item.customNote}` : ''}`;
}
