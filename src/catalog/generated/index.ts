import type { Product } from '../../catalogData';

// This index is rebuilt by `npm run catalog:import -- <csv>`.
// Keep it empty until the first validated batch is imported.
export const generatedCatalogProducts: Product[] = [];
