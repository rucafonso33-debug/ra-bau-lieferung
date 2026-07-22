import fs from 'node:fs';
import path from 'node:path';

const routes = {
  '/produkte': {
    title: 'Premium Produkte für Bau und Renovation | RA Bau Lieferung',
    description: 'Entdecken Sie fünf spezialisierte Sortimentsbereiche mit geprüften Produktdaten, Herstellerreferenzen und persönlicher Projektberatung.',
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
    title: 'Premium Feinsteinzeug Schweiz | RA Bau Lieferung',
    description: 'Grossformatiges Feinsteinzeug in Marmor-, Travertin-, Stein- und Designoptik für hochwertige Wohn-, Bad-, Hotel- und Objektprojekte.',
    label: 'Feinsteinzeug',
    image: '/images/categories/recer-pixstone-room.webp',
  },
  '/premium-mosaike': {
    title: 'Premium Mosaike Schweiz | RA Bau Lieferung',
    description: 'Exklusive Mosaike für Dusche, Spa, Hotel und hochwertige Akzentflächen – technisch dokumentiert und projektbezogen lieferbar.',
    label: 'Premium Mosaike',
    image: '/images/products/recer-mastery-mosaic.webp',
  },
  '/spc-vinyl': {
    title: 'Premium SPC- und Vinylböden Schweiz | RA Bau Lieferung',
    description: 'Hochwertige SPC-, Vinyl- und Korkböden in Eiche, Fischgrät, XL-Dielen und belastbaren Projektqualitäten.',
    label: 'SPC & Vinyl',
    image: '/images/products/rubifloor-herringbone-natural.webp',
  },
  '/bad-sanitaer': {
    title: 'Premium Bad & Sanitär Schweiz | RA Bau Lieferung',
    description: 'Badmöbel, Armaturen, Duschsysteme, WCs, Duschwannen und Duschabtrennungen für hochwertige Komplettbad- und Einzelproduktlösungen.',
    label: 'Bad & Sanitär',
    image: '/images/catalog/rubicer-stria.png',
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
