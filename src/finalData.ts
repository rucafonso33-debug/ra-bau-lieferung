import { constructionCategories, interiorCategories as sourceCategories } from './data';
import type { InteriorCategory, InteriorProduct } from './types';

export { constructionCategories };

const source = (name: string) => sourceCategories.find((category) => category.germanTitle === name)?.products ?? [];
const byIds = (products: InteriorProduct[], ids: string[]) => {
  const index = new Map(products.map((product) => [product.id, product]));
  return ids.map((id) => index.get(id)).filter((product): product is InteriorProduct => Boolean(product));
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
])).map((product) => ({ ...product, imageFit: 'contain' as const }));

const bathrooms = byIds(source('Sanitäre Individuallösungen'), [
  'rubicer-stria-100',
  'moovlux-tube-tl1001',
  'imex-toscana-bdt064',
  'roca-avant-intank',
  'rubicer-lux-duschwanne',
]);

const floors = byIds(source('SPC / Vinyl-Designböden'), [
  'rubifloor-herringbone-natural',
  'rubifloor-xl-home',
  'rubifloor-premium-cream',
  'rubifloor-pro-nordig',
  'rubifloor-rigid-grey',
]);

const concept = (value: InteriorProduct): InteriorProduct => value;
const concepts: InteriorProduct[] = [
  concept({
    id: 'concept-warm-stone-spa', name: 'Warm Stone Spa Bathroom',
    spec: 'Bluenza · Stria · Tube · LUX Slim',
    details: 'Ehrliches Produktboard aus vier realen Katalogreferenzen: Recer Bluenza, Rubicer Stria, Moovlux Tube und Rubicer LUX Slim. Einzelne Bestandteile können in der Anfrage entfernt oder ersetzt werden.',
    image: '/images/concepts/warm-stone-spa.svg', imageFit: 'cover', brand: 'Raumkonzept',
    reference: 'Konzept 01 · Komponenten einzeln bestätigbar', format: '1 Komplettkonzept', finish: 'Warm Stone · Oak · Gold/Chrom',
    application: 'Masterbad · Spa · Hotelsuite', box: 'Produkte einzeln auswählbar', pallet: 'Projektbezogene Lieferung', badges: ['4 reale Produkte', 'Komplettbad'], featured: true,
  }),
  concept({
    id: 'concept-marble-gold', name: 'Marble & Gold Suite',
    spec: 'Mastery · Walk-in Glas · Tube · Avant',
    details: 'Luxuriöses Produktboard mit Recer Mastery, Roca Walk-in-Glas, Moovlux Tube und Roca Avant In-Tank. Keine erfundene Raumszene: gezeigt werden die tatsächlich anfragbaren Produktfamilien.',
    image: '/images/concepts/marble-gold-suite.svg', imageFit: 'cover', brand: 'Raumkonzept',
    reference: 'Konzept 02 · Komponenten einzeln bestätigbar', format: '1 Komplettkonzept', finish: 'Marmor · Gold/Chrom · Klarglas',
    application: 'Villa · Penthouse · Boutiquehotel', box: 'Produkte einzeln auswählbar', pallet: 'Projektbezogene Lieferung', badges: ['4 reale Produkte', 'Suite'],
  }),
  concept({
    id: 'concept-soft-minimal', name: 'Soft Minimal Bathroom',
    spec: 'Pixstone · Stria · Toscana · Walk-in',
    details: 'Helles, ruhiges Badkonzept aus Recer Pixstone, Rubicer Stria, IMEX Toscana und Roca Walk-in-Glas. Für hochwertige Neubauten und Renovationen mit klarer, zeitloser Materialwahl.',
    image: '/images/concepts/soft-minimal-bathroom.svg', imageFit: 'cover', brand: 'Raumkonzept',
    reference: 'Konzept 03 · Komponenten einzeln bestätigbar', format: '1 Komplettkonzept', finish: 'Off White · Oak · Chrome',
    application: 'Wohnung · Neubau · Renovation', box: 'Produkte einzeln auswählbar', pallet: 'Projektbezogene Lieferung', badges: ['4 reale Produkte', 'Timeless'],
  }),
  concept({
    id: 'concept-herringbone-living', name: 'Natural Herringbone Living',
    spec: 'Herringbone Natural · Mastery · Premium Cream',
    details: 'Wohnraumkonzept aus drei realen Oberflächen: Rubifloor Herringbone Natural, Recer Mastery und Rubifloor Premium Cream. Gedacht als kuratierte Materialkombination für elegante Apartments und Altbaurenovationen.',
    image: '/images/concepts/natural-herringbone-living.svg', imageFit: 'cover', brand: 'Raumkonzept',
    reference: 'Konzept 04 · Komponenten einzeln bestätigbar', format: '1 Raumkonzept', finish: 'Natural Oak · Warm White',
    application: 'Wohnzimmer · Essen · Apartment', box: 'Produkte einzeln auswählbar', pallet: 'Projektbezogene Lieferung', badges: ['3 reale Produkte', 'Living'],
  }),
  concept({
    id: 'concept-concrete-oak-kitchen', name: 'Concrete & Oak Kitchen',
    spec: 'Pixstone · XL Home · Toscana Carving',
    details: 'Küchen- und Essraumkonzept aus Recer Pixstone, Rubifloor XL Home und Rubicer Toscana Carving. Eine sachliche, hochwertige Kombination für moderne Schweizer Open-Space-Interieurs.',
    image: '/images/concepts/concrete-oak-kitchen.svg', imageFit: 'cover', brand: 'Raumkonzept',
    reference: 'Konzept 05 · Komponenten einzeln bestätigbar', format: '1 Raumkonzept', finish: 'Mineral Grey · Oak · Carving',
    application: 'Küche · Essen · Open Space', box: 'Produkte einzeln auswählbar', pallet: 'Projektbezogene Lieferung', badges: ['3 reale Produkte', 'Kitchen'],
  }),
];

export const interiorCategories: InteriorCategory[] = [
  {
    title: 'Ceramic & Porcelain', germanTitle: 'Keramik & Feinsteinzeug',
    description: 'Sieben klar unterscheidbare, technisch dokumentierte Referenzen: Travertin, Carving, Marmor, Naturstein, Terrazzo und zwei koordinierte Mosaike. Jede Karte zeigt die tatsächliche Produktfamilie.',
    products: ceramics,
  },
  {
    title: 'Bathroom', germanTitle: 'Badezimmer',
    description: 'Fünf reale, eindeutig bebilderte Badprodukte: Möbel, Armatur, Duschsystem, WC und Duschwanne. Weitere Referenzen werden erst ergänzt, wenn die korrekte Herstellerabbildung vorhanden ist.',
    products: bathrooms,
  },
  {
    title: 'Vinyl, SPC & Cork', germanTitle: 'Vinyl, SPC & Kork',
    description: 'Fünf eindeutig bebilderte Rubifloor-Lösungen mit unterschiedlichen Formaten und Anwendungen. Corkart bleibt bewusst ausserhalb der Detailkarten, bis verifizierte Originalbilder eingebunden sind.',
    products: floors,
  },
  {
    title: 'Complete Room Concepts', germanTitle: 'Raumkonzepte',
    description: 'Genau fünf ehrliche Produktboards: drei Badezimmer, ein Wohnraum und eine Küche. Keine erfundene Raumszene und kein Produkt wird unter einer falschen Abbildung gezeigt.',
    products: concepts,
  },
];
