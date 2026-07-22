import { constructionCategories, interiorCategories as sourceCategories } from './data';
import type { InteriorCategory, InteriorProduct, ProductVisual } from './types';

export { constructionCategories };

const source = (name: string) => sourceCategories.find((category) => category.germanTitle === name)?.products ?? [];
const byIds = (products: InteriorProduct[], ids: string[]) => {
  const index = new Map(products.map((product) => [product.id, product]));
  return ids.map((id) => index.get(id)).filter((product): product is InteriorProduct => Boolean(product));
};

const visual = (src: string, alt: string, label: string, fit: 'cover' | 'contain' = 'cover'): ProductVisual => ({ src, alt, label, fit });

const ceramicGallery: Record<string, ProductVisual[]> = {
  'rubicer-rapolano-60120': [
    visual('/images/catalog/rubicer-rapolano.png', 'Rapolano Chiaro in einer warmen Wohnanwendung', 'Im Raum'),
    visual('/images/products/recer-rapolano-mosaic.webp', 'Rapolano koordinierte Produkt- und Mosaikansicht', 'Produkt & Format', 'contain'),
  ],
  'rubicer-toscana-carving': [
    visual('/images/catalog/rubicer-toscana.png', 'Toscana Carving als elegante Wand- und Bodenfläche', 'Im Raum'),
    visual('/images/catalog/rubicer-toscana.png', 'Toscana Carving Oberfläche und Format', 'Produkt & Oberfläche', 'contain'),
  ],
  'recer-mastery-12060': [
    visual('/images/catalog/recer-mastery.png', 'Recer Mastery Marmorserie in einer hochwertigen Anwendung', 'Im Raum'),
    visual('/images/products/recer-mastery-mosaic.webp', 'Mastery Mix als koordinierte Ergänzung', 'Koordiniertes Mosaik', 'contain'),
  ],
  'recer-bluenza-warm-grey': [
    visual('/images/catalog/recer-bluenza.png', 'Bluenza Warm Grey in einem ruhigen Bad- und Wohnkonzept', 'Im Raum'),
    visual('/images/products/recer-bluenza-mosaic.webp', 'Bluenza Light Sand Mosaik und Materialdetail', 'Produkt & Detail', 'contain'),
  ],
  'recer-pixstone-air-warm': [
    visual('/images/categories/recer-pixstone-room.webp', 'Pixstone Air Warm in einem hellen modernen Innenraum', 'Im Raum'),
    visual('/images/catalog/recer-pixstone.png', 'Pixstone Air Warm Produkt- und Formatansicht', 'Produkt & Format', 'contain'),
  ],
  'recer-mastery-mix': [
    visual('/images/catalog/recer-mastery.png', 'Mastery Mix im Zusammenhang mit der Mastery-Serie', 'Im Raum'),
    visual('/images/products/recer-mastery-mosaic.webp', 'Mastery Mix Mosaikmatte', 'Mosaik 30×27,8', 'contain'),
  ],
  'recer-bluenza-mosaic': [
    visual('/images/catalog/recer-bluenza.png', 'Bluenza Mosaik als koordinierter Akzent', 'Im Raum'),
    visual('/images/products/recer-bluenza-mosaic.webp', 'Bluenza Mosaikmatte 30×30', 'Mosaik 30×30', 'contain'),
  ],
};

const ceramics = byIds(source('Feinsteinzeug'), [
  'rubicer-rapolano-60120',
  'rubicer-toscana-carving',
  'recer-mastery-12060',
  'recer-bluenza-warm-grey',
  'recer-pixstone-air-warm',
]).concat(byIds(source('Premium Mosaike'), [
  'recer-mastery-mix',
  'recer-bluenza-mosaic',
])).map((product) => ({
  ...product,
  image: ceramicGallery[product.id]?.[0]?.src ?? product.image,
  imageFit: ceramicGallery[product.id]?.[0]?.fit ?? product.imageFit,
  gallery: ceramicGallery[product.id],
}));

const bathroomGallery: Record<string, ProductVisual[]> = {
  'rubicer-stria-100': [
    visual('/images/catalog/rubicer-stria.png', 'Rubicer Stria als Mittelpunkt eines reduzierten Badezimmers', 'Im Bad'),
    visual('/images/catalog/rubicer-stria.png', 'Stria Möbel, Waschbecken und Ausführungen', 'Produkt & Varianten', 'contain'),
  ],
  'moovlux-tube-tl1001': [
    visual('/images/products/moovlux-tube-tl1001.webp', 'Moovlux Tube Armatur in der Produktansicht', 'Produkt', 'contain'),
    visual('/images/products/moovlux-tube-tl1001.webp', 'Moovlux Tube Form und Oberfläche', 'Detail', 'contain'),
  ],
  'imex-toscana-bdt064': [
    visual('/images/products/imex-toscana-bdt064.webp', 'IMEX Toscana Duschsystem als Komplettprodukt', 'Duschsystem', 'contain'),
    visual('/images/products/imex-toscana-bdt064.webp', 'IMEX Toscana Oberflächen und Komponenten', 'Oberflächen', 'contain'),
  ],
  'roca-avant-intank': [
    visual('/images/products/roca-avant-intank.webp', 'Roca Avant In-Tank WC', 'Produkt', 'contain'),
    visual('/images/products/roca-avant-intank.webp', 'Roca Avant In-Tank technische Ansicht', 'Technik', 'contain'),
  ],
  'rubicer-lux-duschwanne': [
    visual('/images/products/rubicer-slim-shower-tray.svg', 'Rubicer LUX Slim Duschwanne', 'Produkt', 'contain'),
    visual('/images/products/rubicer-slim-shower-tray.svg', 'LUX Slim Formate und Farben', 'Formate & Farben', 'contain'),
  ],
};

const bathrooms = byIds(source('Sanitäre Individuallösungen'), [
  'rubicer-stria-100',
  'moovlux-tube-tl1001',
  'imex-toscana-bdt064',
  'roca-avant-intank',
  'rubicer-lux-duschwanne',
]).map((product) => ({ ...product, gallery: bathroomGallery[product.id] }));

const floorGallery: Record<string, ProductVisual[]> = {
  'rubifloor-herringbone-natural': [
    visual('/images/products/rubifloor-herringbone-natural.webp', 'Herringbone Natural als Fischgratboden im Wohnraum', 'Im Raum'),
    visual('/images/products/rubifloor-herringbone-natural.webp', 'Herringbone Natural Diele und EIR-Struktur', 'Diele & Struktur', 'contain'),
  ],
  'rubifloor-xl-home': [
    visual('/images/products/rubifloor-xl-home.webp', 'XL1.8 Home als grosszügige Eichenfläche', 'Im Raum'),
    visual('/images/products/rubifloor-xl-home.webp', 'XL1.8 Home extralange Diele', 'Diele 23×182', 'contain'),
  ],
  'rubifloor-premium-cream': [
    visual('/images/products/rubifloor-premium-cream.webp', 'Premium Cream in einem hellen Innenraum', 'Im Raum'),
    visual('/images/products/rubifloor-premium-cream.webp', 'Premium Cream Dekor und Nutzschicht', 'Dekor & Technik', 'contain'),
  ],
  'rubifloor-pro-nordig': [
    visual('/images/products/rubifloor-pro-nordig.webp', 'Pro Nordig in einer natürlichen Wohnanwendung', 'Im Raum'),
    visual('/images/products/rubifloor-pro-nordig.webp', 'Pro Nordig Diele und EIR-Oberfläche', 'Diele & Struktur', 'contain'),
  ],
  'rubifloor-rigid-grey': [
    visual('/images/products/rubifloor-rigid-grey.webp', 'Rigid Grey Steinoptik in einer Projektanwendung', 'Im Raum'),
    visual('/images/products/rubifloor-rigid-grey.webp', 'Rigid Grey Platte 60×60', 'Platte & Technik', 'contain'),
  ],
};

const floors = byIds(source('SPC / Vinyl-Designböden'), [
  'rubifloor-herringbone-natural',
  'rubifloor-xl-home',
  'rubifloor-premium-cream',
  'rubifloor-pro-nordig',
  'rubifloor-rigid-grey',
]).map((product) => ({ ...product, gallery: floorGallery[product.id] }));

const concept = (value: InteriorProduct): InteriorProduct => value;
const concepts: InteriorProduct[] = [
  concept({
    id: 'concept-warm-stone-spa', name: 'Warm Stone Spa Bathroom',
    spec: 'Bluenza · Stria · Tube · LUX Slim',
    details: 'Ein warmes Spa-Bad mit ruhiger Natursteinwirkung, natürlichem Möbelton, reduzierter Armatur und bodennaher Duschwanne. Der Kunde erkennt sofort Stil und Materiallogik.',
    image: '/images/catalog/recer-bluenza.png', imageFit: 'cover', brand: 'Raumkonzept',
    reference: 'Konzept 01 · Komponenten einzeln bestätigbar', format: '1 Komplettkonzept', finish: 'Warm Stone · Oak · Gold/Chrom',
    application: 'Masterbad · Spa · Hotelsuite', box: 'Produkte einzeln auswählbar', pallet: 'Projektbezogene Lieferung', badges: ['4 reale Produkte', 'Komplettbad'], featured: true,
    components: ['Recer Bluenza', 'Rubicer Stria', 'Moovlux Tube', 'Rubicer LUX Slim'],
    gallery: [
      visual('/images/catalog/recer-bluenza.png', 'Warm Stone Spa Materialwirkung', 'Raumwirkung'),
      visual('/images/catalog/rubicer-stria.png', 'Rubicer Stria Badmöbel', 'Möbel'),
      visual('/images/products/moovlux-tube-tl1001.webp', 'Moovlux Tube Armatur', 'Armatur', 'contain'),
      visual('/images/products/rubicer-slim-shower-tray.svg', 'Rubicer LUX Slim Duschwanne', 'Duschwanne', 'contain'),
    ],
  }),
  concept({
    id: 'concept-marble-gold', name: 'Marble & Gold Suite',
    spec: 'Mastery · Walk-in · Tube · Avant',
    details: 'Eine repräsentative, aber kontrollierte Marmorwelt. Weisse und warme Flächen, präzise Metallakzente und klare Sanitärgeometrie statt überladener Luxusinszenierung.',
    image: '/images/catalog/recer-mastery.png', imageFit: 'cover', brand: 'Raumkonzept',
    reference: 'Konzept 02 · Komponenten einzeln bestätigbar', format: '1 Komplettkonzept', finish: 'Marmor · Gold/Chrom · Klarglas',
    application: 'Villa · Penthouse · Boutiquehotel', box: 'Produkte einzeln auswählbar', pallet: 'Projektbezogene Lieferung', badges: ['4 reale Produkte', 'Suite'],
    components: ['Recer Mastery', 'Roca Walk-in Glas', 'Moovlux Tube', 'Roca Avant In-Tank'],
    gallery: [
      visual('/images/catalog/recer-mastery.png', 'Mastery Marmorwirkung im Raum', 'Raumwirkung'),
      visual('/images/premium/roca-screens.svg', 'Roca Walk-in Glas', 'Duschglas'),
      visual('/images/products/moovlux-tube-tl1001.webp', 'Moovlux Tube Armatur', 'Armatur', 'contain'),
      visual('/images/products/roca-avant-intank.webp', 'Roca Avant In-Tank', 'WC', 'contain'),
    ],
  }),
  concept({
    id: 'concept-soft-minimal', name: 'Soft Minimal Bathroom',
    spec: 'Pixstone · Stria · Toscana · Walk-in',
    details: 'Helle mineralische Flächen, Naturholz und Chrom für hochwertige Schweizer Neubauten und Renovationen. Zeitlos, ruhig und leicht verständlich.',
    image: '/images/categories/recer-pixstone-room.webp', imageFit: 'cover', brand: 'Raumkonzept',
    reference: 'Konzept 03 · Komponenten einzeln bestätigbar', format: '1 Komplettkonzept', finish: 'Off White · Oak · Chrome',
    application: 'Wohnung · Neubau · Renovation', box: 'Produkte einzeln auswählbar', pallet: 'Projektbezogene Lieferung', badges: ['4 reale Produkte', 'Timeless'],
    components: ['Recer Pixstone', 'Rubicer Stria', 'IMEX Toscana', 'Roca Walk-in Glas'],
    gallery: [
      visual('/images/categories/recer-pixstone-room.webp', 'Soft Minimal Badezimmerwirkung', 'Raumwirkung'),
      visual('/images/catalog/rubicer-stria.png', 'Rubicer Stria Badmöbel', 'Möbel'),
      visual('/images/products/imex-toscana-bdt064.webp', 'IMEX Toscana Duschsystem', 'Dusche', 'contain'),
      visual('/images/premium/roca-screens.svg', 'Roca Walk-in Glas', 'Duschglas'),
    ],
  }),
  concept({
    id: 'concept-herringbone-living', name: 'Natural Herringbone Living',
    spec: 'Herringbone Natural · Mastery · Premium Cream',
    details: 'Ein eleganter Wohnraum mit Fischgrat als Hauptdarsteller, warmen hellen Flächen und ruhiger Materialtiefe. Ideal für Apartments, Essräume und sanierte Altbauten.',
    image: '/images/products/rubifloor-herringbone-natural.webp', imageFit: 'cover', brand: 'Raumkonzept',
    reference: 'Konzept 04 · Komponenten einzeln bestätigbar', format: '1 Raumkonzept', finish: 'Natural Oak · Warm White',
    application: 'Wohnzimmer · Essen · Apartment', box: 'Produkte einzeln auswählbar', pallet: 'Projektbezogene Lieferung', badges: ['3 reale Produkte', 'Living'],
    components: ['Rubifloor Herringbone Natural', 'Recer Mastery', 'Rubifloor Premium Cream'],
    gallery: [
      visual('/images/products/rubifloor-herringbone-natural.webp', 'Natural Herringbone im Wohnraum', 'Raumwirkung'),
      visual('/images/catalog/recer-mastery.png', 'Recer Mastery als koordinierte Fläche', 'Keramik'),
      visual('/images/products/rubifloor-premium-cream.webp', 'Rubifloor Premium Cream', 'Alternative Diele'),
    ],
  }),
  concept({
    id: 'concept-concrete-oak-kitchen', name: 'Concrete & Oak Kitchen',
    spec: 'Pixstone · XL Home · Toscana Carving',
    details: 'Mineralische Keramik, extralange Eiche und eine subtile Carving-Oberfläche für moderne Küchen und offene Essbereiche im Schweizer Premiumsegment.',
    image: '/images/categories/recer-pixstone-room.webp', imageFit: 'cover', brand: 'Raumkonzept',
    reference: 'Konzept 05 · Komponenten einzeln bestätigbar', format: '1 Raumkonzept', finish: 'Mineral Grey · Oak · Carving',
    application: 'Küche · Essen · Open Space', box: 'Produkte einzeln auswählbar', pallet: 'Projektbezogene Lieferung', badges: ['3 reale Produkte', 'Kitchen'],
    components: ['Recer Pixstone', 'Rubifloor XL Home', 'Rubicer Toscana Carving'],
    gallery: [
      visual('/images/categories/recer-pixstone-room.webp', 'Concrete and Oak Küchenwirkung', 'Raumwirkung'),
      visual('/images/products/rubifloor-xl-home.webp', 'Rubifloor XL Home', 'Boden'),
      visual('/images/catalog/rubicer-toscana.png', 'Rubicer Toscana Carving', 'Keramik'),
    ],
  }),
];

export const interiorCategories: InteriorCategory[] = [
  {
    title: 'Ceramic & Porcelain', germanTitle: 'Keramik & Feinsteinzeug',
    description: 'Sieben sorgfältig kuratierte Referenzen. Jede Kollektion beginnt mit ihrer Raumwirkung und führt danach zur konkreten Platte, Oberfläche oder koordinierten Mosaiklösung.',
    products: ceramics,
  },
  {
    title: 'Bathroom', germanTitle: 'Badezimmer',
    description: 'Fünf klar verständliche Badprodukte. Der Kunde sieht zuerst Funktion und Design, danach Ausführung, Format und technische Details.',
    products: bathrooms,
  },
  {
    title: 'Vinyl, SPC & Cork', germanTitle: 'Vinyl, SPC & Kork',
    description: 'Fünf unterscheidbare Rubifloor-Lösungen für Fischgrat, XL-Dielen, helle Eiche, Projektqualität und Steinoptik. Die Galerie zeigt Raumwirkung und Produktstruktur.',
    products: floors,
  },
  {
    title: 'Complete Room Concepts', germanTitle: 'Raumkonzepte',
    description: 'Genau fünf verständliche Inspirationen: drei Badezimmer, ein Wohnraum und eine Küche. Jede Galerie zeigt zuerst die Raumwirkung und danach die realen Bestandteile.',
    products: concepts,
  },
];
