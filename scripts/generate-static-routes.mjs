import fs from 'node:fs';
import path from 'node:path';

const commonImage = '/images/showcase/calacatta-gold.webp';
const routes = {
  '/ra-bau-tech/cofounder': ['Technical Co-Founder | RA Bau Tech', 'RA Bau Tech is exploring a new approach to hydronic heating and cooling retrofit. We are looking for a Technical Co-Founder to help validate the physics, build the first prototype and determine whether the concept can become a real product.', 'RA Bau Tech — Technical Co-Founder', '/images/showcase/construction-site.webp'],
  '/ra-bau-tech': ['Technical Co-Founder | RA Bau Tech', 'RA Bau Tech is exploring a new approach to hydronic heating and cooling retrofit. We are looking for a Technical Co-Founder to help validate the physics, build the first prototype and determine whether the concept can become a real product.', 'RA Bau Tech — Technical Co-Founder', '/images/showcase/construction-site.webp'],
  '/produkte': ['Baustoffe & Badlösungen für Fachbetriebe | RA Bau Lieferung', 'Übersicht ausgewählter Fliesen, Grossformatplatten, Mosaike, Badmöbel, Sanitärlösungen, SPC und Baustellenprodukte für Fachkunden.', 'Sortiment für Fachbetriebe', commonImage],
  '/kataloge': ['Produktkataloge für Fachbetriebe | RA Bau Lieferung', 'Kataloge zu Fliesen, Grossformat, Mosaik, Badmöbeln, Sanitärlösungen und Böden ansehen und konkrete Referenzen anfragen.', 'Produktkataloge', '/images/showcase/stone-tile-grand.webp'],
  '/ablauf': ['So funktioniert die Produktanfrage | RA Bau Lieferung', 'Produkt oder Referenz, Menge und Lieferort senden. RA Bau Lieferung prüft Preis, Verfügbarkeit, Konditionen und Liefermöglichkeiten.', 'Ablauf der Produktanfrage', commonImage],
  '/kontakt': ['Preis, Verfügbarkeit & Konditionen anfragen | RA Bau Lieferung', 'Produkt, Referenz, Menge und Lieferort senden und Preis, Verfügbarkeit, Fachkundenkonditionen und Liefermöglichkeiten anfragen.', 'Produkt und Preis anfragen', '/images/showcase/calacatta-vein.webp'],
  '/grossformatplatten': ['Premium-Grossformatplatten für Fachbetriebe Schweiz | RA Bau Lieferung', 'Ausgewählte grossformatige Keramikplatten für Wände, Böden und Bad. Preis, Verfügbarkeit und Lieferung in die Schweiz auf Anfrage.', 'Premium-Grossformatplatten', commonImage],
  '/feinsteinzeug': ['Feinsteinzeug & Fliesen Grosshandel Schweiz | RA Bau Lieferung', 'Feinsteinzeug in Marmor-, Travertin-, Beton-, Stein- und Holzoptik für Fliesenleger, Fachbetriebe und Wiederverkäufer.', 'Keramik & Feinsteinzeug', '/images/showcase/ceramic-travertine.webp'],
  '/mosaike': ['Mosaik & Steinfliesen für Fachbetriebe Schweiz | RA Bau Lieferung', 'Mosaike und Steinfliesen in Travertin-, Kalkstein- und Marmoroptik für professionelle Wand- und Bodenanwendungen.', 'Mosaik und Steinfliesen', '/images/showcase/stone-tile-grand.webp'],
  '/badmoebel': ['Badmöbel Grosshandel Schweiz | RA Bau Lieferung', 'Ausgewählte Badmöbel, Waschtische, Hochschränke und Spiegel für Sanitärbetriebe und Wiederverkäufer.', 'Badmöbel', '/images/showcase/furniture-natural.webp'],
  '/bad-sanitaer': ['Sanitär Grosshandel Schweiz | RA Bau Lieferung', 'Sanitärkeramik, WCs, Waschtische, Armaturen, Duschsysteme, Duschwannen und Badzubehör für Fachkunden.', 'Bad, Sanitär und Armaturen', '/images/showcase/washbasins-modern.webp'],
  '/spc-vinyl': ['SPC & Vinyl für Fachbetriebe Schweiz | RA Bau Lieferung', 'Pflegeleichte SPC- und Vinylböden in Holz- und Steinoptik. Konditionen nach Produkt und Menge auf Anfrage.', 'SPC & Vinyl', '/images/showcase/spc-herringbone.webp'],
  '/baustellenzubehoer': ['Baustellenzubehör Schweiz | RA Bau Lieferung', 'Nivellier-, Distanz-, Schutz- und Befestigungslösungen für Fliesen-, Bewehrungs- und Betonarbeiten.', 'Baustellenzubehör', '/images/showcase/construction-site.webp'],
};

const dist = path.resolve('dist');
const source = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

for (const [route, [title, description, label, imagePath]] of Object.entries(routes)) {
  const canonical = `https://ra-bau-lieferung.com${route}`;
  const image = `https://ra-bau-lieferung.com${imagePath}`;
  const pageType = route === '/kontakt' ? 'ContactPage' : route === '/ablauf' ? 'WebPage' : 'CollectionPage';
  const schema = {
    '@context': 'https://schema.org',
    '@type': pageType,
    name: title,
    description,
    url: canonical,
    primaryImageOfPage: { '@type': 'ImageObject', url: image },
    isPartOf: { '@type': 'WebSite', '@id': 'https://ra-bau-lieferung.com/#website' },
    provider: { '@id': 'https://ra-bau-lieferung.com/#business' },
  };
  let html = source
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
  if (route === '/ra-bau-tech/cofounder' || route === '/ra-bau-tech') {
    html = html
      .replace('<html lang="de-CH">', '<html lang="en">')
      .replace('<meta name="theme-color" content="#004b87" />', '<meta name="theme-color" content="#071016" />')
      .replace('<meta name="color-scheme" content="light" />', '<meta name="color-scheme" content="dark" />')
      .replace('<meta property="og:locale" content="de_CH" />', '<meta property="og:locale" content="en_US" />')
      .replace('<meta property="og:site_name" content="RA Bau Lieferung" />', '<meta property="og:site_name" content="RA Bau Tech" />')
      .replace(/    <script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@graph":.*?<\/script>\n/s, '')
      .replace(/<noscript>.*?<\/noscript>/s, '<noscript><main style="max-width:720px;margin:60px auto;padding:24px;font-family:system-ui;color:#e2e8f0;background:#071016"><h1>RA Bau Tech</h1><p>Technical Co-Founder project page. Please enable JavaScript to view the full project brief and interest form.</p></main></noscript>');
  }
  const target = path.join(dist, route.slice(1));
  fs.mkdirSync(target, { recursive: true });
  fs.writeFileSync(path.join(target, 'index.html'), html);
}

const legacyTechTarget = path.join(dist, 'tech/cofounder');
fs.mkdirSync(legacyTechTarget, { recursive: true });
fs.writeFileSync(path.join(legacyTechTarget, 'index.html'), '<!doctype html><html><head><meta charset="utf-8"><meta name="robots" content="noindex"><link rel="canonical" href="https://ra-bau-lieferung.com/ra-bau-tech/cofounder"><meta http-equiv="refresh" content="0;url=/ra-bau-tech/cofounder"><script>location.replace("/ra-bau-tech/cofounder"+location.search+location.hash)</script></head><body></body></html>');
