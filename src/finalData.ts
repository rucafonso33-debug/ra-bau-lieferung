import { constructionCategories, interiorCategories as sourceCategories } from './data';
import type { InteriorCategory, InteriorProduct, ProductVisual } from './types';

export { constructionCategories };

const source = (name: string) => sourceCategories.find((category) => category.germanTitle === name)?.products ?? [];
const byIds = (products: InteriorProduct[], ids: string[]) => {
  const index = new Map(products.map((product) => [product.id, product]));
  return ids.map((id) => index.get(id)).filter((product): product is InteriorProduct => Boolean(product));
};
const visual = (src: string, alt: string, label: string, fit: 'cover' | 'contain' = 'cover'): ProductVisual => ({ src, alt, label, fit });

type SourceMeta = Pick<InteriorProduct, 'sourceCatalog' | 'sourcePage' | 'verificationStatus'>;
const sourceMeta: Record<string, SourceMeta> = {
  'rubicer-rapolano-60120': { sourceCatalog: '02.PORCELANICOS-RUBICER.2026.pdf', sourcePage: 'Kollektion ab Katalogseite 25', verificationStatus: 'catalogue-verified' },
  'rubicer-toscana-carving': { sourceCatalog: '02.PORCELANICOS-RUBICER.2026.pdf', sourcePage: 'Kollektion ab Katalogseite 25', verificationStatus: 'catalogue-verified' },
  'recer-mastery-12060': { sourceCatalog: 'Recer-General-Catalogue-Interactive-2026.pdf', sourcePage: 'Seiten 124–138', verificationStatus: 'catalogue-verified' },
  'recer-bluenza-warm-grey': { sourceCatalog: 'Recer-General-Catalogue-Interactive-2026.pdf', sourcePage: 'Seiten 143–147', verificationStatus: 'catalogue-verified' },
  'recer-pixstone-air-warm': { sourceCatalog: 'Recer-General-Catalogue-Interactive-2026.pdf', sourcePage: 'Seiten 169–171', verificationStatus: 'catalogue-verified' },
  'rubicer-stria-100': { sourceCatalog: '10.MOVEIS-RUBICER.2026.pdf', sourcePage: 'Seiten 3, 5, 7 und 9', verificationStatus: 'catalogue-verified' },
  'moovlux-tube-tl1001': { sourceCatalog: '68da546468d3e_desktop_Faucets_Moovlux.pdf', sourcePage: 'Seite 6', verificationStatus: 'catalogue-verified' },
  'imex-toscana-bdt064': { sourceCatalog: 'imex-bathroom-news-2026-eng.pdf', sourcePage: 'Seite 71; Varianten ab Seite 75', verificationStatus: 'catalogue-verified' },
  'roca-avant-intank': { sourceCatalog: 'Avant – Catálogo de coleção.pdf', sourcePage: 'Kollektion Seiten 4–17', verificationStatus: 'catalogue-verified' },
  'rubicer-lux-duschwanne': { sourceCatalog: '14.BASES-E-NICHOS-RUBICER.2026.pdf', sourcePage: 'Seiten 2–3', verificationStatus: 'catalogue-verified' },
  'rubifloor-herringbone-natural': { sourceCatalog: 'SPC_RUBICER_2025_01.pdf', sourcePage: 'Seite 19', verificationStatus: 'catalogue-verified' },
  'rubifloor-xl-home': { sourceCatalog: 'SPC_RUBICER_2025_01.pdf', sourcePage: 'Seite 5', verificationStatus: 'catalogue-verified' },
  'rubifloor-premium-cream': { sourceCatalog: 'SPC_RUBICER_2025_01.pdf', sourcePage: 'Seite 24', verificationStatus: 'catalogue-verified' },
  'rubifloor-pro-nordig': { sourceCatalog: 'SPC_RUBICER_2025_01.pdf', sourcePage: 'Seite 28', verificationStatus: 'catalogue-verified' },
  'rubifloor-rigid-grey': { sourceCatalog: 'SPC_RUBICER_2025_01.pdf', sourcePage: 'Seite 4', verificationStatus: 'catalogue-verified' },
};

const ceramics = byIds(source('Feinsteinzeug'), [
  'rubicer-rapolano-60120',
  'rubicer-toscana-carving',
  'recer-mastery-12060',
  'recer-bluenza-warm-grey',
  'recer-pixstone-air-warm',
]).map((product) => {
  const galleries: Record<string, ProductVisual[]> = {
    'rubicer-rapolano-60120': [
      visual('/images/catalog/rubicer-rapolano.png', 'Rapolano Chiaro in einer warmen Wohnanwendung', 'Im Raum'),
      visual('/images/technical/rapolano-product-board.svg', 'Rubicer Rapolano Produkt- und Formatansicht', 'Produkt & Format', 'contain'),
    ],
    'rubicer-toscana-carving': [
      visual('/images/catalog/rubicer-toscana.png', 'Toscana Carving als elegante Wand- und Bodenfläche', 'Im Raum'),
      visual('/images/technical/toscana-carving-board.svg', 'Toscana Carving Produkt-, Relief- und Formatansicht', 'Produkt & Oberfläche', 'contain'),
    ],
    'recer-mastery-12060': [
      visual('/images/catalog/recer-mastery.png', 'Recer Mastery in einer hochwertigen Marmor-Anwendung', 'Im Raum'),
      visual('/images/products/recer-mastery-mosaic.webp', 'Mastery Mix als koordinierte Ergänzung der Mastery-Serie', 'Koordiniertes Mosaik', 'contain'),
    ],
    'recer-bluenza-warm-grey': [
      visual('/images/catalog/recer-bluenza.png', 'Bluenza Warm Grey in einem ruhigen Bad- und Wohnkonzept', 'Im Raum'),
      visual('/images/products/recer-bluenza-mosaic.webp', 'Bluenza Mosaik als koordinierte Ergänzung', 'Koordiniertes Mosaik', 'contain'),
    ],
    'recer-pixstone-air-warm': [
      visual('/images/categories/recer-pixstone-room.webp', 'Pixstone Air Warm in einem hellen modernen Innenraum', 'Im Raum'),
      visual('/images/catalog/recer-pixstone.png', 'Pixstone Air Warm Produkt- und Formatansicht', 'Produkt & Format', 'contain'),
    ],
  };
  const gallery = galleries[product.id];
  return { ...product, ...sourceMeta[product.id], image: gallery[0].src, imageFit: gallery[0].fit, gallery };
});

const bathrooms = byIds(source('Sanitäre Individuallösungen'), [
  'rubicer-stria-100',
  'moovlux-tube-tl1001',
  'imex-toscana-bdt064',
  'roca-avant-intank',
  'rubicer-lux-duschwanne',
]).map((product) => {
  const galleries: Record<string, ProductVisual[]> = {
    'rubicer-stria-100': [
      visual('/images/catalog/rubicer-stria.png', 'Rubicer Stria als Mittelpunkt eines reduzierten Badezimmers', 'Im Bad'),
      visual('/images/technical/stria-product-board.svg', 'Stria Möbel, Waschtisch und Ausführung', 'Produkt & Varianten', 'contain'),
    ],
    'moovlux-tube-tl1001': [
      visual('/images/products/moovlux-tube-tl1001.webp', 'Moovlux Tube TL1001 als vollständige Produktansicht', 'Produkt', 'contain'),
      visual('/images/technical/moovlux-tube-board.svg', 'Moovlux Tube Form, Oberfläche und Einordnung', 'Produktdetail', 'contain'),
    ],
    'imex-toscana-bdt064': [
      visual('/images/products/imex-toscana-bdt064.webp', 'IMEX Toscana BDT064 als vollständiges Duschsystem', 'Produkt', 'contain'),
      visual('/images/technical/imex-toscana-product-board.svg', 'IMEX Toscana Komponenten und Oberflächen', 'Produktdetail', 'contain'),
    ],
    'roca-avant-intank': [
      visual('/images/products/roca-avant-intank.webp', 'Roca Avant In-Tank WC als Produktansicht', 'Produkt', 'contain'),
      visual('/images/technical/roca-avant-product-board.svg', 'Roca Avant In-Tank technische Einordnung', 'Produktdetail', 'contain'),
    ],
    'rubicer-lux-duschwanne': [
      visual('/images/products/rubicer-slim-shower-tray.svg', 'Rubicer LUX Slim Duschwanne als Produktansicht', 'Produkt', 'contain'),
      visual('/images/technical/lux-slim-board.svg', 'Rubicer LUX Slim Formate und Farben', 'Formate & Farben', 'contain'),
    ],
  };
  const gallery = galleries[product.id];
  return { ...product, ...sourceMeta[product.id], image: gallery[0].src, imageFit: gallery[0].fit, gallery };
});

const floors = byIds(source('SPC / Vinyl-Designböden'), [
  'rubifloor-herringbone-natural',
  'rubifloor-xl-home',
  'rubifloor-premium-cream',
  'rubifloor-pro-nordig',
  'rubifloor-rigid-grey',
]).map((product) => {
  const galleries: Record<string, ProductVisual[]> = {
    'rubifloor-herringbone-natural': [
      visual('/images/products/rubifloor-herringbone-natural.webp', 'Herringbone Natural als Fischgratboden im Wohnraum', 'Im Raum'),
      visual('/images/technical/herringbone-natural-board.svg', 'Herringbone Natural Diele und EIR-Struktur', 'Diele & Struktur', 'contain'),
    ],
    'rubifloor-xl-home': [
      visual('/images/products/rubifloor-xl-home.webp', 'XL1.8 Home als grosszügige Eichenfläche', 'Im Raum'),
      visual('/images/technical/xl-home-board.svg', 'XL1.8 Home extralange Diele', 'Diele 23 × 182', 'contain'),
    ],
    'rubifloor-premium-cream': [
      visual('/images/products/rubifloor-premium-cream.webp', 'Premium Cream in einem hellen Innenraum', 'Im Raum'),
      visual('/images/technical/premium-cream-board.svg', 'Premium Cream Dekor, Diele und Nutzschicht', 'Dekor & Technik', 'contain'),
    ],
    'rubifloor-pro-nordig': [
      visual('/images/products/rubifloor-pro-nordig.webp', 'Pro Nordig in einer natürlichen Wohnanwendung', 'Im Raum'),
      visual('/images/technical/pro-nordig-board.svg', 'Pro Nordig Diele und EIR-Oberfläche', 'Diele & Struktur', 'contain'),
    ],
    'rubifloor-rigid-grey': [
      visual('/images/products/rubifloor-rigid-grey.webp', 'Rigid Grey Steinoptik in einer Projektanwendung', 'Im Raum'),
      visual('/images/technical/rigid-grey-board.svg', 'Rigid Grey Platte und technische Einordnung', 'Platte & Technik', 'contain'),
    ],
  };
  const gallery = galleries[product.id];
  return { ...product, ...sourceMeta[product.id], image: gallery[0].src, imageFit: gallery[0].fit, gallery };
});

const concept = (value: InteriorProduct): InteriorProduct => ({ ...value, verificationStatus: 'concept-visualisation', sourceCatalog: 'Aus verifizierten Herstellerkatalogen zusammengestellt', sourcePage: 'Siehe Komponenten' });
const concepts: InteriorProduct[] = [
  concept({
    id: 'concept-warm-stone-spa', name: 'Warm Stone Spa Bathroom', spec: 'Bluenza · Stria · Tube · LUX Slim',
    details: 'Ein warmes Spa-Bad mit ruhiger Natursteinwirkung, natürlichem Möbelton, reduzierter Armatur und bodennaher Duschwanne.',
    image: '/images/concepts/warm-stone-spa.svg', imageFit: 'cover', brand: 'Raumkonzept',
    reference: 'Konzept 01 · Visualisierung', format: '1 Komplettkonzept', finish: 'Warm Stone · Oak · Gold/Chrom',
    application: 'Masterbad · Spa · Hotelsuite', box: 'Komponenten einzeln bestätigbar', pallet: 'Projektbezogene Lieferung', badges: ['Visualisierung', 'Komplettbad'], featured: true,
    components: ['Recer Bluenza', 'Rubicer Stria', 'Moovlux Tube', 'Rubicer LUX Slim'], optionalComponents: ['Roca Walk-in Glas'], substitutions: ['Armatur-Oberfläche nach Auswahl'],
    gallery: [
      visual('/images/concepts/warm-stone-spa.svg', 'Warm Stone Spa als gekennzeichnete Raumvisualisierung', 'Raumkonzept – Visualisierung'),
      visual('/images/catalog/recer-bluenza.png', 'Recer Bluenza Materialwirkung', 'Keramik'),
      visual('/images/technical/stria-product-board.svg', 'Rubicer Stria Badmöbel', 'Möbel', 'contain'),
      visual('/images/technical/moovlux-tube-board.svg', 'Moovlux Tube Armatur', 'Armatur', 'contain'),
      visual('/images/technical/lux-slim-board.svg', 'Rubicer LUX Slim Duschwanne', 'Duschwanne', 'contain'),
    ],
  }),
  concept({
    id: 'concept-marble-gold', name: 'Marble & Gold Suite', spec: 'Mastery · Walk-in · Tube · Avant',
    details: 'Eine repräsentative, kontrollierte Marmorwelt mit präzisen Metallakzenten und klarer Sanitärgeometrie.',
    image: '/images/concepts/marble-gold-suite.svg', imageFit: 'cover', brand: 'Raumkonzept',
    reference: 'Konzept 02 · Visualisierung', format: '1 Komplettkonzept', finish: 'Marmor · Gold/Chrom · Klarglas',
    application: 'Villa · Penthouse · Boutiquehotel', box: 'Komponenten einzeln bestätigbar', pallet: 'Projektbezogene Lieferung', badges: ['Visualisierung', 'Suite'],
    components: ['Recer Mastery', 'Roca Walk-in Glas', 'Moovlux Tube', 'Roca Avant In-Tank'], optionalComponents: ['Rubicer LUX Slim'], substitutions: ['Chrom- oder Goldoberfläche'],
    gallery: [
      visual('/images/concepts/marble-gold-suite.svg', 'Marble and Gold Suite als gekennzeichnete Raumvisualisierung', 'Raumkonzept – Visualisierung'),
      visual('/images/catalog/recer-mastery.png', 'Recer Mastery Marmorwirkung', 'Keramik'),
      visual('/images/premium/roca-screens.svg', 'Roca Walk-in Glas', 'Duschglas', 'contain'),
      visual('/images/technical/moovlux-tube-board.svg', 'Moovlux Tube Armatur', 'Armatur', 'contain'),
      visual('/images/technical/roca-avant-product-board.svg', 'Roca Avant In-Tank', 'WC', 'contain'),
    ],
  }),
  concept({
    id: 'concept-soft-minimal', name: 'Soft Minimal Bathroom', spec: 'Pixstone · Stria · Toscana · Walk-in',
    details: 'Helle mineralische Flächen, Naturholz und Chrom für hochwertige Schweizer Neubauten und Renovationen.',
    image: '/images/concepts/soft-minimal-bathroom.svg', imageFit: 'cover', brand: 'Raumkonzept',
    reference: 'Konzept 03 · Visualisierung', format: '1 Komplettkonzept', finish: 'Off White · Oak · Chrome',
    application: 'Wohnung · Neubau · Renovation', box: 'Komponenten einzeln bestätigbar', pallet: 'Projektbezogene Lieferung', badges: ['Visualisierung', 'Timeless'],
    components: ['Recer Pixstone', 'Rubicer Stria', 'IMEX Toscana', 'Roca Walk-in Glas'], optionalComponents: ['Roca Avant In-Tank'], substitutions: ['Holzton und Armaturenfinish nach Auswahl'],
    gallery: [
      visual('/images/concepts/soft-minimal-bathroom.svg', 'Soft Minimal Bathroom als gekennzeichnete Raumvisualisierung', 'Raumkonzept – Visualisierung'),
      visual('/images/catalog/recer-pixstone.png', 'Recer Pixstone Produktansicht', 'Keramik', 'contain'),
      visual('/images/technical/stria-product-board.svg', 'Rubicer Stria Badmöbel', 'Möbel', 'contain'),
      visual('/images/technical/imex-toscana-product-board.svg', 'IMEX Toscana Duschsystem', 'Dusche', 'contain'),
      visual('/images/premium/roca-screens.svg', 'Roca Walk-in Glas', 'Duschglas', 'contain'),
    ],
  }),
  concept({
    id: 'concept-herringbone-living', name: 'Natural Herringbone Living', spec: 'Herringbone Natural · Mastery · Premium Cream',
    details: 'Ein eleganter Wohnraum mit Fischgrat als Hauptdarsteller, warmen hellen Flächen und ruhiger Materialtiefe.',
    image: '/images/concepts/natural-herringbone-living.svg', imageFit: 'cover', brand: 'Raumkonzept',
    reference: 'Konzept 04 · Visualisierung', format: '1 Raumkonzept', finish: 'Natural Oak · Warm White',
    application: 'Wohnzimmer · Essen · Apartment', box: 'Komponenten einzeln bestätigbar', pallet: 'Projektbezogene Lieferung', badges: ['Visualisierung', 'Living'],
    components: ['Rubifloor Herringbone Natural', 'Recer Mastery'], optionalComponents: ['Rubifloor Premium Cream'], substitutions: ['Alternative Bodenfarbe nach Auswahl'],
    gallery: [
      visual('/images/concepts/natural-herringbone-living.svg', 'Natural Herringbone Living als gekennzeichnete Raumvisualisierung', 'Raumkonzept – Visualisierung'),
      visual('/images/technical/herringbone-natural-board.svg', 'Rubifloor Herringbone Natural', 'Boden', 'contain'),
      visual('/images/catalog/recer-mastery.png', 'Recer Mastery als koordinierte Fläche', 'Keramik'),
      visual('/images/technical/premium-cream-board.svg', 'Rubifloor Premium Cream', 'Optionale Diele', 'contain'),
    ],
  }),
  concept({
    id: 'concept-concrete-oak-kitchen', name: 'Concrete & Oak Kitchen', spec: 'Pixstone · XL Home · Toscana Carving',
    details: 'Mineralische Keramik, extralange Eiche und eine subtile Carving-Oberfläche für moderne Küchen und offene Essbereiche.',
    image: '/images/concepts/concrete-oak-kitchen.svg', imageFit: 'cover', brand: 'Raumkonzept',
    reference: 'Konzept 05 · Visualisierung', format: '1 Raumkonzept', finish: 'Mineral Grey · Oak · Carving',
    application: 'Küche · Essen · Open Space', box: 'Komponenten einzeln bestätigbar', pallet: 'Projektbezogene Lieferung', badges: ['Visualisierung', 'Kitchen'],
    components: ['Recer Pixstone', 'Rubifloor XL Home', 'Rubicer Toscana Carving'], optionalComponents: [], substitutions: ['Boden- oder Keramikton nach Auswahl'],
    gallery: [
      visual('/images/concepts/concrete-oak-kitchen.svg', 'Concrete and Oak Kitchen als gekennzeichnete Raumvisualisierung', 'Raumkonzept – Visualisierung'),
      visual('/images/catalog/recer-pixstone.png', 'Recer Pixstone Produktansicht', 'Keramik', 'contain'),
      visual('/images/technical/xl-home-board.svg', 'Rubifloor XL Home', 'Boden', 'contain'),
      visual('/images/technical/toscana-carving-board.svg', 'Rubicer Toscana Carving', 'Keramik', 'contain'),
    ],
  }),
];

export const interiorCategories: InteriorCategory[] = [
  { title: 'Ceramic & Porcelain', germanTitle: 'Keramik & Feinsteinzeug', description: 'Fünf kuratierte Kollektionen. Koordinierte Mosaike erscheinen als Ergänzung, nicht als doppelte Einzelprodukte.', products: ceramics },
  { title: 'Bathroom', germanTitle: 'Badezimmer', description: 'Fünf klar verständliche Badprodukte mit ehrlicher Produktdarstellung und projektbezogener Bestätigung.', products: bathrooms },
  { title: 'Vinyl, SPC & Cork', germanTitle: 'Vinyl, SPC & Kork', description: 'Fünf unterscheidbare Rubifloor-Lösungen für Fischgrat, XL-Dielen, helle Eiche, Projektqualität und Steinoptik.', products: floors },
  { title: 'Complete Room Concepts', germanTitle: 'Raumkonzepte', description: 'Genau fünf gekennzeichnete Visualisierungen: drei Badezimmer, ein Wohnraum und eine Küche.', products: concepts },
];
