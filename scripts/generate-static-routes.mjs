import fs from 'node:fs';
import path from 'node:path';

const commonImage = '/images/showcase/calacatta-gold.webp';
const routes = {
  '/grossformatplatten': ['Grossformatplatten Schweiz | RA Bau Lieferung', 'Fugenarme Keramikplatten bis 120 × 260 cm für Wände, Böden, Duschen und hochwertige Innenräume.', 'Grossformatplatten', commonImage],
  '/feinsteinzeug': ['Keramik & Feinsteinzeug Schweiz | RA Bau Lieferung', 'Ausgewählte Stein-, Marmor-, Beton- und Holzoptiken für langlebige Bau- und Renovationsprojekte.', 'Keramik & Feinsteinzeug', '/images/showcase/ceramic-travertine.webp'],
  '/mosaike': ['Premium-Mosaik & Steinfliesen Schweiz | RA Bau Lieferung', 'Mosaike und Fliesen in Travertin-, Kalkstein- und Marmoroptik für hochwertige Wand- und Bodenflächen.', 'Premium-Mosaik und Steinfliesen', '/images/showcase/stone-tile-grand.webp'],
  '/badmoebel': ['Badmöbel Schweiz | RA Bau Lieferung', 'Ausgewählte Waschtische, Hochschränke und Spiegel für ruhige, hochwertige Badkompositionen.', 'Badmöbel', '/images/showcase/furniture-natural.webp'],
  '/sanitaerkeramik': ['Sanitärkeramik Schweiz | RA Bau Lieferung', 'Waschtische, WCs und abgestimmte Sanitärlösungen für private und gewerbliche Bäder.', 'Sanitärkeramik', '/images/showcase/washbasins-modern.webp'],
  '/armaturen-duschen': ['Armaturen & Duschen Schweiz | RA Bau Lieferung', 'Ausgewählte Waschtisch-, Wannen- und Duschlösungen in abgestimmten Oberflächen.', 'Armaturen & Duschen', '/images/showcase/shower-black.webp'],
  '/duschloesungen': ['Duschwannen & Nischen Schweiz | RA Bau Lieferung', 'Flache Duschwannen, Ablagen und Nischen für durchgängige, moderne Badgestaltung.', 'Duschwannen & Nischen', '/images/showcase/shower-tray-slim.webp'],
  '/spc-vinyl': ['SPC & Vinyl Schweiz | RA Bau Lieferung', 'Pflegeleichte Holz- und Steinoptiken als Ergänzung für Renovationen und belastbare Innenräume.', 'SPC & Vinyl', '/images/showcase/spc-herringbone.webp'],
  '/baustellenzubehoer': ['Baustellenzubehör Schweiz | RA Bau Lieferung', 'Nivellier-, Distanz-, Schutz- und Befestigungslösungen für Fliesen-, Bewehrungs- und Betonarbeiten.', 'Baustellenzubehör', '/images/showcase/construction-site.webp'],
};

const dist = path.resolve('dist');
const source = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

for (const [route, [title, description, label, imagePath]] of Object.entries(routes)) {
  const canonical = `https://ra-bau-lieferung.com${route}`;
  const image = `https://ra-bau-lieferung.com${imagePath}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: canonical,
    primaryImageOfPage: { '@type': 'ImageObject', url: image },
    isPartOf: { '@type': 'WebSite', '@id': 'https://ra-bau-lieferung.com/#website' },
    provider: { '@id': 'https://ra-bau-lieferung.com/#business' },
  };
  const html = source
    .replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${description}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta property="og:image" content="[^"]*"\s*\/>/, `<meta property="og:image" content="${image}" />`)
    .replace(/<meta property="og:image:alt" content="[^"]*"\s*\/>/, `<meta property="og:image:alt" content="${label}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${description}" />`)
    .replace(/<meta name="twitter:image" content="[^"]*"\s*\/>/, `<meta name="twitter:image" content="${image}" />`)
    .replace('</head>', `    <script type="application/ld+json">${JSON.stringify(schema)}</script>\n  </head>`);
  const target = path.join(dist, route.slice(1));
  fs.mkdirSync(target, { recursive: true });
  fs.writeFileSync(path.join(target, 'index.html'), html);
}
