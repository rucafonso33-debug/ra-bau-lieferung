import fs from 'node:fs';

const replaceOnce = (source, from, to, label) => {
  if (!source.includes(from)) throw new Error(`Could not locate ${label}`);
  return source.replace(from, to);
};

// 1) Route names and homepage promises must match the current application.
{
  const file = 'src/types.ts';
  let source = fs.readFileSync(file, 'utf8');
  source = replaceOnce(
    source,
    "export type PageRoute = 'home' | 'baustellenzubehoor' | 'interior' | 'porcelain' | 'mosaics' | 'spc' | 'bathroom' | 'contact' | 'quote-planner';",
    "export type PageRoute = 'home' | 'products' | 'construction' | 'ceramics' | 'bathroom' | 'flooring' | 'concepts' | 'contact' | 'quote';",
    'PageRoute',
  );
  fs.writeFileSync(file, source);
}

{
  const file = 'src/storefrontConfig.ts';
  let source = fs.readFileSync(file, 'utf8');
  source = source
    .replace("copy: 'Flächen, Möbel, Armatur, Dusche und WC als zusammenhängende Auswahl.'", "copy: 'Geprüfte Badmöbelreferenz als Einstieg; weitere Sanitärprodukte werden projektbezogen aus den Herstellerkatalogen ausgewählt.'")
    .replace("route: 'spc'", "route: 'flooring'")
    .replace("route: 'porcelain'", "route: 'ceramics'")
    .replace("route: 'quote-planner'", "route: 'quote'");
  fs.writeFileSync(file, source);
}

// 2) Keep three genuinely distinct room concepts instead of repeating the same material imagery.
{
  const file = 'src/finalData.ts';
  let source = fs.readFileSync(file, 'utf8');
  const removeBlock = (startMarker, nextMarker) => {
    const start = source.indexOf(startMarker);
    const end = source.indexOf(nextMarker, start);
    if (start < 0 || end < 0) throw new Error(`Could not remove block ${startMarker}`);
    source = source.slice(0, start) + source.slice(end);
  };
  removeBlock("  concept({\n    id: 'concept-soft-minimal'", "  concept({\n    id: 'concept-herringbone-living'");
  removeBlock("  concept({\n    id: 'concept-concrete-oak'", "];\n\nexport const interiorCategories");
  source = source.replace(
    "{ title: 'Complete Room Concepts', germanTitle: 'Raumkonzepte', description: 'Fünf ehrliche Materialstimmungen aus den veröffentlichten Herstellerkollektionen. Keine Darstellung wird als real ausgeführtes Projekt ausgegeben.', products: concepts },",
    "{ title: 'Complete Room Concepts', germanTitle: 'Raumkonzepte', description: 'Drei klar unterschiedliche Materialstimmungen aus veröffentlichten Herstellerkollektionen: Natursteinbad, Marmorsuite und Fischgrat-Wohnraum.', products: concepts },",
  );
  fs.writeFileSync(file, source);
}

// 3) Synchronise visible copy with the conservative catalogue selection and remove pointless search for tiny assortments.
{
  const file = 'src/App.tsx';
  let source = fs.readFileSync(file, 'utf8');
  source = source
    .replace("copy: 'Travertin, Marmor, Naturstein, Mineraloptik, Relief und koordinierte Mosaike.'", "copy: 'Drei geprüfte Recer-Kollektionen mit klarer Raumwirkung und passenden Ergänzungen.'")
    .replace("copy: 'Möbel, Armaturen, Dusche, WC und Duschwannen als klar verständliche Auswahl.'", "copy: 'Eine vollständig belegte Stria-Badmöbelreferenz; weitere Sanitärprodukte auf konkrete Anfrage.'")
    .replace("copy: 'Fischgrat, XL-Dielen, natürliche Eiche und belastbare Projektdekore.'", "copy: 'Drei klar unterscheidbare Lösungen: Fischgrat, XL-Eiche und robuste Steinoptik.'")
    .replace("copy: 'Fünf Stilwelten für Bad, Wohnen und Küche mit realen anfragbaren Komponenten.'", "copy: 'Drei klar unterschiedliche Materialstimmungen mit einzeln anfragbaren Komponenten.'")
    .replace("<p className=\"text-sm font-bold text-[#536b79]\">{products.length} kuratierte Produkte</p>", "<p className=\"text-sm font-bold text-[#536b79]\">{products.length === 1 ? '1 geprüfte Referenz' : `${products.length} geprüfte Auswahlpositionen`}</p>")
    .replace("<label className=\"flex min-h-12 items-center gap-3 border border-[#ccd7dc] bg-white px-4\"><Search size={17} className=\"text-[#6d818c]\" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder=\"Produkt, Stil, Marke oder Referenz\" className=\"w-full bg-transparent text-sm outline-none sm:w-72\" /></label>", "{(category?.products.length ?? 0) > 6 ? <label className=\"flex min-h-12 items-center gap-3 border border-[#ccd7dc] bg-white px-4\"><Search size={17} className=\"text-[#6d818c]\" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder=\"Produkt, Stil, Marke oder Referenz\" className=\"w-full bg-transparent text-base outline-none sm:w-72 sm:text-sm\" /></label> : null}")
    .replace('intro="Möbel, Armaturen, Duschsysteme, WC und Duschwannen – verständlich dargestellt und projektbezogen bestätigt."', 'intro="Eine vollständig belegte Rubicer-Stria-Badmöbelreferenz als Einstieg. Weitere Möbel, Armaturen und Sanitärprodukte werden erst nach konkreter Referenz- und Bildprüfung angeboten."')
    .replace('intro="Fünf kuratierte Stilwelten: drei Badezimmer, ein Wohnraum und eine Küche. Visualisierungen werden als solche gekennzeichnet; reale Komponenten bleiben einzeln anfragbar."', 'intro="Drei klar unterschiedliche Materialstimmungen: Natursteinbad, Marmorsuite und Fischgrat-Wohnraum. Jede Darstellung ist als Visualisierung gekennzeichnet; alle Komponenten bleiben einzeln anfragbar."');
  fs.writeFileSync(file, source);
}

// 4) Static metadata must say the same thing as the page.
{
  const file = 'scripts/generate-static-routes.mjs';
  let source = fs.readFileSync(file, 'utf8');
  source = source
    .replace('Fünf kuratierte Kollektionen in Travertin-, Carving-, Marmor-, Naturstein- und mineralischer Optik. Koordinierte Mosaike erscheinen als Ergänzung der jeweiligen Serie.', 'Drei geprüfte Recer-Kollektionen mit klarer Raumwirkung und passenden Ergänzungen. Koordinierte Mosaike erscheinen nur als Ergänzung der jeweiligen Serie.')
    .replace('Eine bewusst reduzierte, vollständig belegte Rubicer-Stria-Badmöbelreferenz mit Herstellerbild und technischer Produktansicht. Weitere Produkte werden erst nach eindeutiger Bild- und Referenzprüfung veröffentlicht.', 'Eine vollständig belegte Rubicer-Stria-Badmöbelreferenz mit Herstellerbild und technischer Produktansicht. Weitere Sanitärprodukte werden projektbezogen nach konkreter Referenz- und Bildprüfung ausgewählt.')
    .replace('Vier klar unterscheidbare Rubifloor-Lösungen in Fischgrat, XL-Diele, heller Eiche und robuster Projektqualität.', 'Drei klar unterscheidbare Rubifloor-Lösungen in Fischgrat, XL-Eiche und robuster Steinoptik.')
    .replace('Fünf verständliche Stilwelten aus realen Katalogreferenzen: drei Badezimmer, ein Wohnraum und eine Küche.', 'Drei klar unterschiedliche Materialstimmungen aus realen Katalogreferenzen: Natursteinbad, Marmorsuite und Fischgrat-Wohnraum.');
  fs.writeFileSync(file, source);
}

console.log('Applied product-image-text coherence pass.');
