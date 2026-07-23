import type { AppPage } from './business';

export const seo: Record<AppPage, { title: string; description: string; image: string }> = {
  home: {
    title: 'RA Bau Lieferung | Materialien, die Räume aufwerten',
    description: 'Kuratierte Keramik, Badezimmerprodukte, Vinyl- und SPC-Böden sowie persönliche Auswahlhilfe für Projekte in der Schweiz.',
    image: '/images/categories/recer-pixstone-room.webp',
  },
  products: {
    title: 'Produkte und Raumkonzepte | RA Bau Lieferung',
    description: 'Vier klar kuratierte Bereiche für Keramik, Badezimmer, Böden und Raumkonzepte.',
    image: '/images/categories/recer-pixstone-room.webp',
  },
  construction: {
    title: 'Baustellenzubehör Schweiz | RA Bau Lieferung',
    description: 'Nivelliersysteme, Abstandhalter, Drahtbinder, Schutzteile und Werkzeug für Baustellen in der Schweiz.',
    image: '/images/Komplettset.png',
  },
  ceramics: {
    title: 'Keramik & Feinsteinzeug Schweiz | RA Bau Lieferung',
    description: 'Fünf kuratierte Kollektionen in Travertin-, Carving-, Marmor-, Naturstein- und mineralischer Optik.',
    image: '/images/categories/recer-pixstone-room.webp',
  },
  bathroom: {
    title: 'Badezimmer Schweiz | RA Bau Lieferung',
    description: 'Badmöbel, Armaturen, Duschsysteme, WC und Duschwannen mit verifizierten Herstellerdaten.',
    image: '/images/catalog/rubicer-stria.png',
  },
  flooring: {
    title: 'Vinyl- und SPC-Böden Schweiz | RA Bau Lieferung',
    description: 'Fischgrat, XL-Dielen, helle Eiche, Projektqualität und Steinoptik für Renovation und Neubau.',
    image: '/images/products/rubifloor-herringbone-natural.webp',
  },
  concepts: {
    title: 'Raumkonzepte Schweiz | RA Bau Lieferung',
    description: 'Fünf gekennzeichnete Stilwelten mit realen, einzeln anfragbaren Komponenten.',
    image: '/images/concepts/warm-stone-spa.svg',
  },
  quote: {
    title: 'Projektanfrage zusammenstellen | RA Bau Lieferung',
    description: 'Produkte, Mengen, Komponenten und Projektdaten in einer persönlichen Anfrage zusammenstellen.',
    image: '/images/categories/recer-pixstone-room.webp',
  },
  contact: {
    title: 'Kontakt & persönliche Projektberatung | RA Bau Lieferung',
    description: 'Produkt, Referenz, Raumfoto, Menge und Lieferort direkt an Rodrigo Afonso senden.',
    image: '/images/categories/recer-pixstone-room.webp',
  },
  'not-found': {
    title: 'Seite nicht gefunden | RA Bau Lieferung',
    description: 'Die angeforderte Seite wurde nicht gefunden.',
    image: '/images/categories/recer-pixstone-room.webp',
  },
};
