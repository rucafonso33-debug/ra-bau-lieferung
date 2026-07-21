export type PageRoute = 
  | 'home' 
  | 'baustellenzubehoor' 
  | 'interior' 
  | 'porcelain' 
  | 'mosaics' 
  | 'spc' 
  | 'bathroom' 
  | 'contact'
  | 'quote-planner';

export interface ConstructionProduct {
  name: string;
  description: string;
  application: string;
  image: string;
}

export interface ConstructionCategory {
  title: string;
  description: string;
  products: ConstructionProduct[];
  bannerImage?: string;
}

export interface InteriorProduct {
  id: string;
  name: string;
  spec: string;
  details: string;
  image: string;
  brand?: string;
  reference: string;
  format: string;
  finish: string;
  application: string;
  box: string;
  pallet: string;
  lead?: string;
  badges?: string[];
  featured?: boolean;
}

export interface InteriorCategory {
  title: string;
  germanTitle: string;
  description: string;
  products: InteriorProduct[];
}

export interface QuoteItem {
  id: string;
  name: string;
  spec: string;
  brand?: string;
  image: string;
  quantity: string;
  unit: string; // e.g. 'm²', 'Stk.', 'Laufmeter', 'Kartons'
  format?: string; // e.g. '60x60', '30x60', '120x120' etc.
  customNote?: string;
  isCustom?: boolean;
  reference?: string;
}
