import fs from 'node:fs';
import path from 'node:path';

const routes = {
  '/produkte': {
    title: 'Premium Produkte für Bau und Renovation | RA Bau Lieferung',
    description: 'Entdecken Sie fünf spezialisierte Sortimentsbereiche mit geprüften Produktdaten, Herstellerreferenzen und persönlicher Projektberatung.',
  },
  '/baustellenzubehoer': {
    title: 'Baustellenzubehör Schweiz | RA Bau Lieferung',
    description: 'Nivelliersysteme, Abstandhalter, Drahtbinder, Schutzteile und Werkzeug für professionelle Baustellen und Renovationsprojekte in der Schweiz.',
  },
  '/feinsteinzeug': {
    title: 'Premium Feinsteinzeug Schweiz | RA Bau Lieferung',
    description: 'Grossformatiges Feinsteinzeug in Marmor-, Travertin-, Stein- und Designoptik für hochwertige Wohn-, Bad-, Hotel- und Objektprojekte.',
  },
  '/premium-mosaike': {
    title: 'Premium Mosaike Schweiz | RA Bau Lieferung',
    description: 'Exklusive Mosaike für Dusche, Spa, Hotel und hochwertige Akzentflächen – technisch dokumentiert und projektbezogen lieferbar.',
  },
  '/spc-vinyl': {
    title: 'Premium SPC- und Vinylböden Schweiz | RA Bau Lieferung',
    description: 'Hochwertige SPC-, Vinyl- und Korkböden in Eiche, Fischgrät, XL-Dielen und belastbaren Projektqualitäten.',
  },
  '/bad-sanitaer': {
    title: 'Premium Bad & Sanitär Schweiz | RA Bau Lieferung',
    description: 'Badmöbel, Armaturen, Duschsysteme, WCs, Duschwannen und Duschabtrennungen für hochwertige Komplettbad- und Einzelproduktlösungen.',
  },
  '/projektanfrage': {
    title: 'Projektanfrage zusammenstellen | RA Bau Lieferung',
    description: 'Stellen Sie mehrere Produkte, Mengen und Projektdaten in einer einzigen persönlichen Anfrage zusammen.',
  },
  '/kontakt': {
    title: 'Kontakt & persönliche Projektberatung | RA Bau Lieferung',
    description: 'Kontaktieren Sie Rodrigo Afonso für Produktprüfung, Referenzen, Mengen, Transport, Verzollung und projektbezogene Lieferungen in der Schweiz.',
  },
};

const dist = path.resolve('dist');
const source = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

for (const [route, meta] of Object.entries(routes)) {
  const canonical = `https://ra-bau-lieferung.com${route}`;
  const html = source
    .replace(/<title>.*?<\/title>/s, `<title>${meta.title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${meta.description}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${meta.title}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${meta.description}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace('</head>', `  <meta name="twitter:card" content="summary_large_image" />\n    <meta name="twitter:title" content="${meta.title}" />\n    <meta name="twitter:description" content="${meta.description}" />\n    <script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: meta.title,
      description: meta.description,
      url: canonical,
      isPartOf: { '@type': 'WebSite', name: 'RA Bau Lieferung', url: 'https://ra-bau-lieferung.com/' },
      provider: {
        '@type': 'LocalBusiness',
        name: 'RA Bau Lieferung',
        telephone: '+41782418913',
        email: 'rodrigo@ra-bau-lieferung.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Zeughausstrasse 5',
          postalCode: '4702',
          addressLocality: 'Oensingen',
          addressCountry: 'CH',
        },
      },
    })}</script>\n  </head>`);

  const targetDir = path.join(dist, route.slice(1));
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html);
}
