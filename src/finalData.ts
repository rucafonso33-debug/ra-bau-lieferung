import { constructionCategories, interiorCategories as sourceCategories } from './data';
import type { InteriorCategory, InteriorProduct, ProductVisual } from './types';

export { constructionCategories };

const source = (name: string) => sourceCategories.find((category) => category.germanTitle === name)?.products ?? [];
const byIds = (products: InteriorProduct[], ids: string[]) => {
  const index = new Map(products.map((product) => [product.id, product]));
  return ids.map((id) => index.get(id)).filter((product): product is InteriorProduct => Boolean(product));
};
const visual = (src: string, alt: string, label: string, fit: 'cover' | 'contain' = 'cover'): ProductVisual => ({ src, alt, label, fit });

const verified = (product: InteriorProduct, sourceCatalog: string, sourcePage: string, gallery: ProductVisual[]): InteriorProduct => ({
  ...product,
  sourceCatalog,
  sourcePage,
  verificationStatus: 'catalogue-verified',
  image: gallery[0].src,
  imageFit: gallery[0].fit,
  gallery,
});

const ceramics = byIds(source('Feinsteinzeug'), [
  'recer-mastery-12060',
  'recer-bluenza-warm-grey',
  'recer-pixstone-air-warm',
]).map((product) => {
  if (product.id === 'recer-mastery-12060') return verified(
    { ...product, name: 'Mastery Kollektion', reference: 'Serie Mastery · Referenz je Format', details: 'Marmorserie mit grossformatigem Feinsteinzeug, Wandplatten und einem exakt koordinierten Mastery-Mix-Mosaik.' },
    'Recer-General-Catalogue-Interactive-2026.pdf', 'Seiten 124–138', [
      visual('/images/catalog/recer-mastery.png', 'Recer Mastery als grossflächige Marmorserie im Raum', 'Kollektion im Raum'),
      visual('/images/products/recer-mastery-mosaic.webp', 'Mastery Mix als koordinierte Ergänzung der Mastery-Kollektion', 'Koordiniertes Mosaik', 'contain'),
    ],
  );
  if (product.id === 'recer-bluenza-warm-grey') return verified(
    { ...product, name: 'Bluenza Kollektion', reference: 'Serie Bluenza · Referenz je Format', details: 'Natursteinserie mit Warm-Grey-Flächen, starker Tonvariation sowie koordinierten Ripple- und Mosaikvarianten.' },
    'Recer-General-Catalogue-Interactive-2026.pdf', 'Seiten 143–147', [
      visual('/images/catalog/recer-bluenza.png', 'Recer Bluenza als Natursteinserie in einer hochwertigen Raumanwendung', 'Kollektion im Raum'),
      visual('/images/products/recer-bluenza-mosaic.webp', 'Bluenza Mosaik als koordinierte Ergänzung der Kollektion', 'Koordiniertes Mosaik', 'contain'),
    ],
  );
  return verified(
    { ...product, name: 'Pixstone Air Warm Kollektion', reference: 'Serie Pixstone Air Warm · Referenz je Format', details: 'Helle Terrazzo- und Mineraloptik für ruhige Böden und Wände, ergänzt durch koordinierte Wandformate und Mosaike.' },
    'Recer-General-Catalogue-Interactive-2026.pdf', 'Seiten 169–171', [
      visual('/images/categories/recer-pixstone-room.webp', 'Pixstone Air Warm als helle mineralische Fläche im Raum', 'Kollektion im Raum'),
      visual('/images/catalog/recer-pixstone.png', 'Pixstone Air Warm Formate, Farbtöne und Oberflächen', 'Formate & Oberfläche', 'contain'),
    ],
  );
});

const bathrooms = byIds(source('Sanitäre Individuallösungen'), ['rubicer-stria-100']).map((product) => verified(
  { ...product, name: 'Stria Horizontal 100', reference: 'RMSTRIAH100BRC', spec: '100 cm · 1 Schublade · Solid-Surface-Waschtisch', details: 'Horizontaler Badmöbel-Waschtisch in Weiss matt. Die veröffentlichte Ansicht und technische Zeichnung stammen aus derselben Stria-Katalogreferenz.' },
  '10.MOVEIS-RUBICER.2026.pdf', 'Katalogseite 11', [
    visual('/images/catalog/rubicer-stria.png', 'Rubicer Stria Horizontal als Badmöbel in einer Raumanwendung', 'Im Badezimmer'),
    visual('/images/catalogue-corrected/stria-product.webp', 'Technische Produktansicht des Rubicer Stria Horizontal 100', 'Produkt & Masse', 'contain'),
  ],
));

const floors = byIds(source('SPC / Vinyl-Designböden'), [
  'rubifloor-herringbone-natural',
  'rubifloor-xl-home',
  'rubifloor-rigid-grey',
]).map((product) => {
  if (product.id === 'rubifloor-herringbone-natural') return verified(product, 'SPC_RUBICER_2025_01.pdf', 'Katalogseiten 38–39', [
    visual('/images/products/rubifloor-herringbone-natural.webp', 'Rubifloor Herringbone Natural in einer verlegten Wohnanwendung', 'Verlegt im Raum'),
    visual('/images/technical/herringbone-natural-board.svg', 'Herringbone Natural Diele, Verlegemuster und technische Merkmale', 'Diele & Aufbau', 'contain'),
  ]);
  if (product.id === 'rubifloor-xl-home') return verified(product, 'SPC_RUBICER_2025_01.pdf', 'Katalogseiten 10–11', [
    visual('/images/products/rubifloor-xl-home.webp', 'Rubifloor XL1.8 Home als extralange Eichenfläche im Raum', 'Verlegt im Raum'),
    visual('/images/technical/xl-home-board.svg', 'XL1.8 Home Diele, Format und technischer Aufbau', 'Diele & Aufbau', 'contain'),
  ]);
  return verified(product, 'SPC_RUBICER_2025_01.pdf', 'Katalogseiten 8–9', [
    visual('/images/products/rubifloor-rigid-grey.webp', 'Rubifloor Rigid Grey als verlegte Steinoptik', 'Verlegt im Raum'),
    visual('/images/technical/rigid-grey-board.svg', 'Rigid Grey Platte, Format und technische Merkmale', 'Platte & Aufbau', 'contain'),
  ]);
});

const concept = (value: InteriorProduct): InteriorProduct => ({
  ...value,
  verificationStatus: 'concept-visualisation',
  sourceCatalog: 'Aus den veröffentlichten, kataloggeprüften Produkten zusammengestellt',
  sourcePage: 'Siehe einzelne Komponenten',
});

const concepts: InteriorProduct[] = [
  concept({
    id: 'concept-warm-stone-spa', name: 'Warm Stone Spa', spec: 'Bluenza · Stria',
    details: 'Warme Natursteinwirkung und ein ruhiges weisses Badmöbel. Die gezeigte Hauptaufnahme dient als Materialstimmung; die Komponenten werden einzeln bestätigt.',
    image: '/images/catalog/recer-bluenza.png', brand: 'Raumkonzept', reference: 'Konzept 01 · Materialstimmung', format: '1 Komplettkonzept', finish: 'Warm Stone · White', application: 'Badezimmer · Spa', box: 'Komponenten einzeln bestätigbar', pallet: 'Projektbezogene Lieferung', badges: ['Materialstimmung', 'Badezimmer'],
    components: ['Recer Bluenza Kollektion', 'Rubicer Stria Horizontal 100'], optionalComponents: ['Duschsystem nach Auswahl'], substitutions: ['Stria-Ausführung nach Auswahl'],
    gallery: [
      visual('/images/catalog/recer-bluenza.png', 'Warm Stone Spa Materialstimmung mit Recer Bluenza', 'Visualisierung – Materialstimmung mit Herstellerbild'),
      visual('/images/catalog/rubicer-stria.png', 'Rubicer Stria als Möbelkomponente', 'Badmöbel'),
      visual('/images/catalogue-corrected/stria-product.webp', 'Stria Horizontal 100 technische Ansicht', 'Möbel & Masse', 'contain'),
    ],
  }),
  concept({
    id: 'concept-marble-suite', name: 'Marble Suite', spec: 'Mastery · Stria',
    details: 'Kontrollierte Marmorwirkung mit einem klaren weissen Möbel. Keine vorgetäuschte Projektfotografie: gezeigt werden reale Herstellerbilder der gewählten Komponenten.',
    image: '/images/catalog/recer-mastery.png', brand: 'Raumkonzept', reference: 'Konzept 02 · Materialstimmung', format: '1 Komplettkonzept', finish: 'Marmor · White', application: 'Masterbad · Hotelsuite', box: 'Komponenten einzeln bestätigbar', pallet: 'Projektbezogene Lieferung', badges: ['Materialstimmung', 'Suite'],
    components: ['Recer Mastery Kollektion', 'Rubicer Stria Horizontal 100'], optionalComponents: ['Metalloberfläche nach Auswahl'], substitutions: ['Mastery Natural oder Polished'],
    gallery: [
      visual('/images/catalog/recer-mastery.png', 'Marble Suite Materialstimmung mit Recer Mastery', 'Visualisierung – Materialstimmung mit Herstellerbild'),
      visual('/images/catalog/rubicer-stria.png', 'Rubicer Stria als Möbelkomponente', 'Badmöbel'),
      visual('/images/products/recer-mastery-mosaic.webp', 'Mastery Mix als optionale Ergänzung', 'Mosaik-Option', 'contain'),
    ],
  }),
  concept({
    id: 'concept-soft-minimal', name: 'Soft Minimal Bathroom', spec: 'Pixstone · Stria',
    details: 'Helle mineralische Flächen und ein reduziertes Badmöbel für Neubau und Renovation. Alle sichtbaren Produktbilder stammen aus den jeweiligen Herstellerunterlagen.',
    image: '/images/categories/recer-pixstone-room.webp', brand: 'Raumkonzept', reference: 'Konzept 03 · Materialstimmung', format: '1 Komplettkonzept', finish: 'Warm White · Mineral', application: 'Badezimmer · Neubau', box: 'Komponenten einzeln bestätigbar', pallet: 'Projektbezogene Lieferung', badges: ['Materialstimmung', 'Minimal'],
    components: ['Recer Pixstone Air Warm Kollektion', 'Rubicer Stria Horizontal 100'], optionalComponents: ['Mosaik-Akzent'], substitutions: ['Pixstone-Format nach Fläche'],
    gallery: [
      visual('/images/categories/recer-pixstone-room.webp', 'Soft Minimal Materialstimmung mit Pixstone Air Warm', 'Visualisierung – Materialstimmung mit Herstellerbild'),
      visual('/images/catalog/rubicer-stria.png', 'Rubicer Stria als Möbelkomponente', 'Badmöbel'),
      visual('/images/catalog/recer-pixstone.png', 'Pixstone Formate und Oberflächen', 'Keramikdetails', 'contain'),
    ],
  }),
  concept({
    id: 'concept-herringbone-living', name: 'Natural Herringbone Living', spec: 'Herringbone Natural · Mastery',
    details: 'Fischgratboden als Hauptdarsteller, ergänzt durch eine ruhige helle Keramik. Die Bilder zeigen die realen Herstellerkollektionen, nicht ein erfundenes Referenzprojekt.',
    image: '/images/products/rubifloor-herringbone-natural.webp', brand: 'Raumkonzept', reference: 'Konzept 04 · Materialstimmung', format: '1 Raumkonzept', finish: 'Natural Oak · Warm White', application: 'Wohnzimmer · Essen', box: 'Komponenten einzeln bestätigbar', pallet: 'Projektbezogene Lieferung', badges: ['Materialstimmung', 'Living'],
    components: ['Rubifloor Herringbone Natural', 'Recer Mastery Kollektion'], optionalComponents: ['Mastery-Mosaik'], substitutions: ['Keramikfläche nach Projekt'],
    gallery: [
      visual('/images/products/rubifloor-herringbone-natural.webp', 'Natural Herringbone als verlegter Boden', 'Visualisierung – Materialstimmung mit Herstellerbild'),
      visual('/images/technical/herringbone-natural-board.svg', 'Herringbone Diele und Verlegemuster', 'Bodendetail', 'contain'),
      visual('/images/catalog/recer-mastery.png', 'Mastery als koordinierte Keramik', 'Keramik'),
    ],
  }),
  concept({
    id: 'concept-concrete-oak', name: 'Mineral & Oak Kitchen', spec: 'Pixstone · XL1.8 Home',
    details: 'Mineralische Keramik und eine extralange Eichenoptik für Küche und offenen Essbereich. Die Auswahl bleibt bewusst auf zwei klar belegte Kollektionen reduziert.',
    image: '/images/categories/recer-pixstone-room.webp', brand: 'Raumkonzept', reference: 'Konzept 05 · Materialstimmung', format: '1 Raumkonzept', finish: 'Mineral · Oak', application: 'Küche · Essen · Open Space', box: 'Komponenten einzeln bestätigbar', pallet: 'Projektbezogene Lieferung', badges: ['Materialstimmung', 'Kitchen'],
    components: ['Recer Pixstone Air Warm Kollektion', 'Rubifloor XL1.8 Home'], optionalComponents: ['Mosaik-Akzent'], substitutions: ['XL-Dekor nach Auswahl'],
    gallery: [
      visual('/images/categories/recer-pixstone-room.webp', 'Mineral and Oak Materialstimmung mit Pixstone', 'Visualisierung – Materialstimmung mit Herstellerbild'),
      visual('/images/products/rubifloor-xl-home.webp', 'XL1.8 Home als verlegter Boden', 'Boden'),
      visual('/images/technical/xl-home-board.svg', 'XL1.8 Home Diele und Aufbau', 'Bodendetail', 'contain'),
    ],
  }),
];

export const interiorCategories: InteriorCategory[] = [
  { title: 'Ceramic & Porcelain', germanTitle: 'Keramik & Feinsteinzeug', description: 'Drei klar belegte Recer-Kollektionen. Jede Auswahl zeigt die reale Raumwirkung und eine passende Produkt- oder Ergänzungsansicht.', products: ceramics },
  { title: 'Bathroom', germanTitle: 'Badezimmer', description: 'Eine bewusst reduzierte, vollständig belegte Badmöbelreferenz. Weitere Produkte werden erst nach korrekter Zuordnung von Raum- und Produktbild veröffentlicht.', products: bathrooms },
  { title: 'Vinyl, SPC & Cork', germanTitle: 'Vinyl, SPC & Kork', description: 'Drei deutlich unterschiedliche Rubifloor-Lösungen: Fischgrat, extralange Eiche und grossformatige Steinoptik.', products: floors },
  { title: 'Complete Room Concepts', germanTitle: 'Raumkonzepte', description: 'Fünf ehrliche Materialstimmungen aus den veröffentlichten Herstellerkollektionen. Keine Darstellung wird als real ausgeführtes Projekt ausgegeben.', products: concepts },
];
