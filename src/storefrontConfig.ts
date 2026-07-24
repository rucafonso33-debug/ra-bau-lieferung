import type { PageRoute } from './types';

export const storefront = {
  brand: 'RA Bau Lieferung',
  country: 'Schweiz',
  phoneDisplay: '+41 78 241 89 13',
  phoneDigits: '41782418913',
  email: 'rodrigo@ra-bau-lieferung.com',
  address: 'Schweiz',
  promise: 'Materialwirkung, Herstellerreferenz und Schweizer Projektlogistik in einer klaren Anfrage.',
} as const;

export type ProjectEntry = {
  id: string;
  title: string;
  copy: string;
  route: PageRoute;
  tag: string;
  image: string;
  imageAlt: string;
};

export const projectEntries: ProjectEntry[] = [
  {
    id: 'bathroom',
    title: 'Badezimmer planen',
    copy: 'Geprüfte Badmöbelreferenz als Einstieg; weitere Sanitärprodukte werden projektbezogen aus den Herstellerkatalogen ausgewählt.',
    route: 'bathroom',
    tag: 'Komplett oder einzeln',
    image: '/images/catalog/rubicer-stria.png',
    imageAlt: 'Hochwertiges Badezimmer mit Rubicer Stria Badmöbel',
  },
  {
    id: 'living-floor',
    title: 'Boden & Wohnraum',
    copy: 'Fischgrat, XL-Dielen, ruhige Holzdekore und belastbare Projektlösungen.',
    route: 'flooring',
    tag: 'SPC · Vinyl · Kork',
    image: '/images/products/rubifloor-herringbone-natural.webp',
    imageAlt: 'Wohnraum mit natürlichem Fischgratboden',
  },
  {
    id: 'ceramic',
    title: 'Keramik für Bad & Küche',
    copy: 'Travertin, Marmor, Natursteinwirkung, Grossformat und koordinierte Akzente.',
    route: 'ceramics',
    tag: 'Wand · Boden · Akzent',
    image: '/images/categories/recer-pixstone-room.webp',
    imageAlt: 'Heller Innenraum mit grossformatiger Keramik',
  },
  {
    id: 'known-reference',
    title: 'Ich habe schon eine Referenz',
    copy: 'Marke, Foto oder Artikelnummer senden und Verfügbarkeit sowie Offerte prüfen lassen.',
    route: 'quote',
    tag: 'Schnellster Weg',
    image: '/images/catalog/recer-mastery.png',
    imageAlt: 'Recer Mastery Keramik als Herstellerreferenz',
  },
];

export const selectionBenefits = [
  { id: 'style', title: 'Stil & Raumwirkung', copy: 'Farben, Materialwirkung und stimmige Kombinationen.' },
  { id: 'technical', title: 'Format & Technik', copy: 'Masse, Einsatzbereich, Oberfläche und Ausführung.' },
  { id: 'confirmed', title: 'Schriftlich bestätigt', copy: 'Referenz, Menge, Preis und Lieferbedingungen.' },
] as const;

export const whatsappUrl = (message: string) => `https://wa.me/${storefront.phoneDigits}?text=${encodeURIComponent(message)}`;
