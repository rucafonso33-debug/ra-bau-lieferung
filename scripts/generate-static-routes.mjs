import fs from 'node:fs';
import path from 'node:path';

const routes = {
  '/produkte': {
    title: 'Premium Produkte und Raumkonzepte | RA Bau Lieferung',
    description: 'Vier klar kuratierte Sortimentsbereiche für den Schweizer Premium- und Luxusmarkt: Keramik, Badezimmer, Vinyl/SPC/Kork und komplette Raumkonzepte.',
    label: 'Produkte',
    image: '/images/categories/recer-pixstone-room.webp',
  },
  '/baustellenzubehoer': {
    title: 'Baustellenzubehör Schweiz | RA Bau Lieferung',
    description: 'Nivelliersysteme, Abstandhalter, Drahtbinder, Schutzteile und Werkzeug für professionelle Baustellen und Renovationsprojekte in der Schweiz.',
    label: 'Baustellenzubehör',
    image: '/images/Komplettset.png',
  },
  '/feinsteinzeug': {
    title: 'Keramik & Premium Feinsteinzeug Schweiz | RA Bau Lieferung',
    description: 'Kuratiertes Feinsteinzeug, Wandkeramik und ausgewählte koordinierte Mosaike in Marmor-, Travertin-, Stein- und Designoptik.',
    label: 'Keramik & Feinsteinzeug',
    image: '/images/categories/recer-pixstone-room.webp',
  },
  '/badezimmer': {
    title: 'Premium Badezimmer Schweiz | RA Bau Lieferung',
    description: 'Hochwertige Badmöbel, Armaturen, Duschsysteme, Glas, WCs und Duschwannen von Rubicer, Roca, Moovlux und IMEX.',
    label: 'Badezimmer',
    image: '/images/catalog/rubicer-stria.png',
  },
  '/spc-vinyl': {
    title: 'Premium Vinyl, SPC & Kork Schweiz | RA Bau Lieferung',
    description: 'Fischgrat, XL-Dielen, Contract-Vinyl und natürlicher Kork für hochwertige Wohnungen, Hotels, Büros und Renovationen.',
    label: 'Vinyl, SPC & Kork',
    image: '/images/products/rubifloor-herringbone-natural.webp',
  },
  '/raumkonzepte': {
    title: 'Luxus Raumkonzepte Schweiz | RA Bau Lieferung',
    description: 'Kuratierte Komplettlösungen für Bad, Wohnen und Küche. Produkte gemeinsam sehen, einzeln auswählen und projektbezogen anfragen.',
    label: 'Raumkonzepte',
    image: '/images/premium/signature-gold.svg',
  },
  '/projektanfrage': {
    title: 'Projektanfrage zusammenstellen | RA Bau Lieferung',
    description: 'Stellen Sie mehrere Produkte, Mengen und Projektdaten in einer einzigen persönlichen Anfrage zusammen.',
    label: 'Projektanfrage',
    image: '/images/categories/recer-pixstone-room.webp',
  },
  '/kontakt': {
    title: 'Kontakt & persönliche Projektberatung | RA Bau Lieferung',
    description: 'Kontaktieren Sie Rodrigo Afonso für Produktprüfung, Referenzen, Mengen, Transport, Verzollung und projektbezogene Lieferungen in der Schweiz.',
    label: 'Kontakt',
    image: '/images/categories/recer-pixstone-room.webp',
  },
};

const dist = path.resolve('dist');
const source = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const absolute = (asset) => `https://ra-bau-lieferung.com${asset}`;

for (const [route, meta] of Object.entries(routes)) {
  const canonical = `https://ra-bau-lieferung.com${route}`;
  const image = absolute(meta.image);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${canonical}#page`,
        name: meta.title,
        description: meta.description,
        url: canonical,
        primaryImageOfPage: { '@type': 'ImageObject', url: image },
        isPartOf: { '@type': 'WebSite', '@id': 'https://ra-bau-lieferung.com/#website', name: 'RA Bau Lieferung', url: 'https://ra-bau-lieferung.com/' },
        provider: { '@id': 'https://ra-bau-lieferung.com/#business' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://ra-bau-lieferung.com/' },
          { '@type': 'ListItem', position: 2, name: meta.label, item: canonical },
        ],
      },
    ],
  };

  const html = source
    .replace(/<title>.*?<\/title>/s, `<title>${meta.title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${meta.description}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${meta.title}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${meta.description}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta property="og:image" content="[^"]*"\s*\/>/, `<meta property="og:image" content="${image}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${meta.title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${meta.description}" />`)
    .replace(/<meta name="twitter:image" content="[^"]*"\s*\/>/, `<meta name="twitter:image" content="${image}" />`)
    .replace('</head>', `    <script type="application/ld+json">${JSON.stringify(schema)}</script>\n  </head>`);

  const targetDir = path.join(dist, route.slice(1));
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html);
}
