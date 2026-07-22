import { constructionCategories, interiorCategories as luxuryCategories } from './luxuryData';
import type { InteriorCategory, InteriorProduct } from './types';

export { constructionCategories };

const find = (name: string) => luxuryCategories.find((category) => category.germanTitle === name)?.products ?? [];

const byIds = (products: InteriorProduct[], ids: string[]) => {
  const index = new Map(products.map((product) => [product.id, product]));
  return ids.map((id) => index.get(id)).filter((product): product is InteriorProduct => Boolean(product));
};

const ceramics = byIds(find('Keramik & Feinsteinzeug'), [
  'rubicer-techstone-white',
  'rubicer-techstone-cubo',
  'recer-bluenza-warm-grey',
  'recer-bluenza-earth-clay',
  'rubicer-rapolano-60120',
  'rubicer-toscana-carving',
  'recer-mastery-12060',
  'rubicer-calacata-supremo',
  'rubicer-armani-oro-bianco',
  'gresco-majestic',
  'recer-pixstone-air-warm',
  'recer-mastery-mix',
  'recer-bluenza-mosaic',
]).map((product) => ({
  ...product,
  imageFit: product.image.includes('/categories/') ? 'cover' as const : 'contain' as const,
}));

const bathrooms = byIds(find('Badezimmer'), [
  'rubicer-stria-100',
  'rubicer-stria-horizontal',
  'rubicer-focus-oak',
  'roca-targa-everlux',
  'moovlux-tube-gold',
  'moovlux-tube-tl1001',
  'imex-toscana-bdt064',
  'rubicer-lux-duschwanne',
  'roca-line-plus',
  'roca-avant-intank',
  'rubicer-fly-cappuccino',
  'rubicer-elegant-black',
]);

const flooring = byIds(find('Vinyl, SPC & Kork'), [
  'rubifloor-herringbone-natural',
  'rubifloor-herringbone-dark',
  'rubifloor-xl-home',
  'rubifloor-xl-city',
  'rubifloor-premium-cream',
  'rubifloor-premium-milk',
  'rubifloor-alpha-camel',
  'rubifloor-pro-nordig',
  'corkart-vinyl-contract',
  'corkart-natural-cork',
]);

const concepts = byIds(find('Raumkonzepte'), [
  'concept-warm-stone-spa',
  'concept-marble-gold',
  'concept-soft-minimal',
  'concept-herringbone-living',
  'concept-concrete-oak-kitchen',
]).map((product) => ({ ...product, imageFit: 'cover' as const }));

export const interiorCategories: InteriorCategory[] = [
  {
    title: 'Ceramic & Porcelain',
    germanTitle: 'Keramik & Feinsteinzeug',
    description: 'Eine begrenzte Schweizer Luxusauswahl: Architekturstein, Travertin, Marmor, Wandrelief und nur zwei koordinierte Mosaiklösungen. Keine Wiederholungen und keine künstliche Katalogfülle.',
    products: ceramics,
  },
  {
    title: 'Bathroom',
    germanTitle: 'Badezimmer',
    description: 'Ausgewählte Möbel, Armaturen, Duschsysteme, Glas, Duschwannen und WCs für vollständig koordinierte hochwertige Bäder.',
    products: bathrooms,
  },
  {
    title: 'Vinyl, SPC & Cork',
    germanTitle: 'Vinyl, SPC & Kork',
    description: 'Zehn klar unterscheidbare Lösungen: Fischgrat, XL-Dielen, helle und warme Eiche, Contract-Vinyl und natürlicher Kork.',
    products: flooring,
  },
  {
    title: 'Complete Room Concepts',
    germanTitle: 'Raumkonzepte',
    description: 'Fünf demonstrative Konzepte – drei Badezimmer, ein Wohnraum und eine Küche. Visualisierungen dienen der Inspiration; Referenzen und Produkte werden projektbezogen bestätigt.',
    products: concepts,
  },
];
