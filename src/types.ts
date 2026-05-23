export type PageRoute = 
  | 'home' 
  | 'baustellenzubehoor' 
  | 'interior' 
  | 'porcelain' 
  | 'mosaics' 
  | 'spc' 
  | 'bathroom' 
  | 'contact';

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
}

export interface InteriorProduct {
  name: string;
  spec: string;
  details: string;
  image: string;
}

export interface InteriorCategory {
  title: string;
  germanTitle: string;
  description: string;
  products: InteriorProduct[];
}
