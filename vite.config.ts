import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, loadEnv, type Plugin } from 'vite';

const oldProductCard = `function ProductCard({ product, inQuote, onSelect, onAdd }: { product: InteriorProduct; inQuote: boolean; onSelect: () => void; onAdd: () => void }) {
  const asset: VisualAsset = { src: product.image, alt: \`${'${product.brand ?? \'\'} ${product.name}'}.trim(), fit: product.imageFit ?? 'cover' };
  return (
    <article className="group flex overflow-hidden rounded-[20px] border border-[#d7e0e5] bg-white shadow-[0_10px_32px_rgba(16,41,62,.05)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(16,41,62,.11)]">
      <div className="flex w-full flex-col">
        <button onClick={onSelect} className="relative aspect-[4/3] overflow-hidden border-b border-[#e0e6e9] bg-[#eef1f2] text-left">
          <SmartImage asset={asset} className={\`h-full w-full transition duration-700 group-hover:scale-[1.025] ${'${asset.fit === \'contain\' ? \'bg-white p-8\' : \'\'}'}\`} />
          {product.badges?.length ? <div className="absolute left-4 top-4 flex flex-wrap gap-2">{product.badges.slice(0, 2).map((badge) => <span key={badge} className="rounded-full bg-white/94 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[.12em] text-[#004b87] shadow-sm">{badge}</span>)}</div> : null}
        </button>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-[10px] font-extrabold uppercase tracking-[.17em] text-[#8e6725]">{product.brand}</p>
          <button onClick={onSelect} className="mt-2 text-left"><h3 className="font-display text-2xl font-bold leading-tight tracking-[-.025em] text-[#10293e]">{product.name}</h3></button>
          <p className="mt-2 text-sm font-semibold leading-6 text-[#506a79]">{product.spec}</p>
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#6a7e8a]">{product.details}</p>
          <div className="mt-5 grid grid-cols-2 gap-2 text-[10px] font-semibold text-[#546b79]"><span className="rounded-md bg-[#f1f4f5] px-3 py-2">{product.format}</span><span className="rounded-md bg-[#f1f4f5] px-3 py-2">{product.application}</span></div>
          <div className="mt-auto grid gap-2 pt-6 sm:grid-cols-[.8fr_1.2fr]"><button onClick={onSelect} className="rounded-lg border border-[#ccd7de] px-4 py-3 text-xs font-extrabold text-[#004b87] hover:border-[#004b87]">Details ansehen</button><button onClick={onAdd} disabled={inQuote} className={\`rounded-lg px-4 py-3 text-xs font-extrabold ${'${inQuote ? \'bg-[#e7ecef] text-[#768995]\' : \'bg-[#004b87] text-white hover:bg-[#003d70]\'}'}\`}>{inQuote ? 'In der Anfrage' : 'Zur Anfrage hinzufügen'}</button></div>
          <p className="mt-3 text-center text-[10px] leading-4 text-[#738691]">WhatsApp, E-Mail und SMS stehen in den Produktdetails bereit.</p>
        </div>
      </div>
    </article>
  );
}`;

const newProductCard = `function ProductCard({ category, product, inQuote, onSelect, onAdd }: { category: string; product: InteriorProduct; inQuote: boolean; onSelect: () => void; onAdd: () => void }) {
  const visuals = product.gallery?.length ? product.gallery : [{ src: product.image, alt: \`${'${product.brand ?? \'\'} ${product.name}'}.trim(), fit: product.imageFit ?? 'cover', label: 'Produkt' }];
  const [activeVisual, setActiveVisual] = React.useState(0);
  React.useEffect(() => setActiveVisual(0), [product.id]);
  const current = visuals[Math.min(activeVisual, visuals.length - 1)];
  const asset: VisualAsset = { src: current.src, alt: current.alt, fit: current.fit ?? 'cover' };
  const isConcept = category === 'Raumkonzepte';
  return (
    <article className="group flex overflow-hidden rounded-[18px] border border-[#d7e0e5] bg-white shadow-[0_8px_28px_rgba(16,41,62,.06)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(16,41,62,.12)]">
      <div className="flex w-full flex-col">
        <div className="border-b border-[#e0e6e9] bg-[#eef1f2]">
          <button onClick={onSelect} className={\`relative w-full overflow-hidden text-left ${'${isConcept ? \'aspect-[16/10]\' : \'aspect-[4/3]\'}'}\`}>
            <SmartImage asset={asset} className={\`h-full w-full transition duration-500 group-hover:scale-[1.015] ${'${asset.fit === \'contain\' ? \'bg-white p-5 sm:p-8\' : \'\'}'}\`} />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[#081d2d]/75 via-transparent to-transparent px-4 pb-3 pt-12 text-white">
              <span className="rounded-full bg-[#10293e]/88 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[.14em]">{current.label ?? (activeVisual === 0 ? 'Im Raum' : 'Produkt')}</span>
              <span className="text-[10px] font-bold">{activeVisual + 1}/{visuals.length}</span>
            </div>
            {product.badges?.length ? <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">{product.badges.slice(0, 2).map((badge) => <span key={badge} className="rounded-full bg-white/95 px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-[.1em] text-[#004b87] shadow-sm">{badge}</span>)}</div> : null}
          </button>
          {visuals.length > 1 ? <div className="flex gap-2 overflow-x-auto bg-white px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{visuals.map((item, index) => <button key={\`${'${item.src}-${index}'}\`} onClick={() => setActiveVisual(index)} aria-label={item.label ?? `Bild ${'${index + 1}'}`} className={\`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-[#f4f6f7] transition ${'${index === activeVisual ? \'border-[#004b87] shadow-sm\' : \'border-transparent opacity-70 hover:opacity-100\'}'}\`}><SmartImage asset={{ src: item.src, alt: item.alt, fit: item.fit ?? 'cover' }} className={\`h-full w-full ${'${item.fit === \'contain\' ? \'bg-white p-1.5\' : \'\'}'}\`} /><span className="absolute inset-x-0 bottom-0 truncate bg-[#081d2d]/72 px-1 py-0.5 text-[7px] font-bold text-white">{item.label}</span></button>)}</div> : null}
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="text-[9px] font-extrabold uppercase tracking-[.17em] text-[#8e6725]">{product.brand}</p>
          <button onClick={onSelect} className="mt-1.5 text-left"><h3 className="font-display text-[22px] font-bold leading-tight tracking-[-.025em] text-[#10293e] sm:text-2xl">{product.name}</h3></button>
          <p className="mt-2 text-[13px] font-semibold leading-5 text-[#506a79] sm:text-sm">{product.spec}</p>
          <p className="mt-3 line-clamp-2 text-[13px] leading-5 text-[#6a7e8a] sm:line-clamp-3 sm:text-sm sm:leading-6">{product.details}</p>
          {product.components?.length ? <div className="mt-4 flex flex-wrap gap-1.5">{product.components.map((component) => <span key={component} className="rounded-full border border-[#d7e0e5] bg-[#f7f9fa] px-2.5 py-1 text-[9px] font-bold text-[#496173]">{component}</span>)}</div> : null}
          <div className="mt-4 grid grid-cols-2 gap-2 text-[9px] font-semibold leading-4 text-[#546b79] sm:text-[10px]"><span className="rounded-md bg-[#f1f4f5] px-2.5 py-2">{product.format}</span><span className="rounded-md bg-[#f1f4f5] px-2.5 py-2">{product.application}</span></div>
          <div className="mt-auto grid grid-cols-[.82fr_1.18fr] gap-2 pt-5"><button onClick={onSelect} className="rounded-lg border border-[#ccd7de] px-3 py-3 text-[11px] font-extrabold text-[#004b87] hover:border-[#004b87]">Details</button><button onClick={onAdd} className={\`rounded-lg px-3 py-3 text-[11px] font-extrabold transition ${'${inQuote ? \'bg-[#fff0ee] text-[#9b3f3b] hover:bg-[#ffe1dd]\' : \'bg-[#004b87] text-white hover:bg-[#003d70]\'}'}\`}>{inQuote ? 'Entfernen' : isConcept ? 'Konzept anfragen' : 'Zur Anfrage'}</button></div>
        </div>
      </div>
    </article>
  );
}`;

function generatedStorefront(): Plugin {
  const virtualId = path.resolve(__dirname, 'src/__generated_storefront.tsx');
  const partFiles = Array.from({ length: 6 }, (_, index) => path.resolve(__dirname, `src/generated/App.part${index + 1}.txt`));

  return {
    name: 'generated-storefront',
    enforce: 'pre',
    resolveId(id) {
      if (id === 'virtual:storefront') return virtualId;
      return null;
    },
    load(id) {
      if (id !== virtualId) return null;
      return partFiles.map((file) => fs.readFileSync(file, 'utf8')).join('')
        .replace("import { constructionCategories, interiorCategories } from './data';", "import { constructionCategories, interiorCategories } from './finalData';")
        .replaceAll('Feinsteinzeug', 'Keramik & Feinsteinzeug')
        .replaceAll("  Keramik & Feinsteinzeug:", "  'Keramik & Feinsteinzeug':")
        .replaceAll('Premium Mosaike', 'Badezimmer')
        .replaceAll('SPC / Vinyl-Designböden', 'Vinyl, SPC & Kork')
        .replaceAll('Sanitäre Individuallösungen', 'Raumkonzepte')
        .replaceAll("mosaics: '/premium-mosaike'", "mosaics: '/badezimmer'")
        .replaceAll("bathroom: '/bad-sanitaer'", "bathroom: '/raumkonzepte'")
        .replace("['spc', 'SPC & Vinyl']", "['spc', 'Vinyl, SPC & Kork']")
        .replace("['bathroom', 'Bad & Sanitär']", "['bathroom', 'Raumkonzepte']")
        .replace("title: 'SPC & Vinylböden'", "title: 'Vinyl, SPC & Kork'")
        .replace("title: 'Bad & Sanitär'", "title: 'Raumkonzepte'")
        .replace("eyebrow: 'Marmor · Spa · Design · Akzent'", "eyebrow: 'Möbel · Armaturen · Dusche · WC'")
        .replace("copy: 'Ausdrucksstarke Herstellerkollektionen für exklusive Duschen, Spas, Hotels und hochwertige Akzentflächen.'", "copy: 'Badprodukte mit klarer Funktion, korrekter Referenz und schneller Projektanfrage.'")
        .replace("ranges: ['Marmor Mix', 'Naturstein', 'Geometrisch', 'Nassbereich']", "ranges: ['Badmöbel', 'Armaturen', 'Duschsysteme', 'WC & Duschwannen']")
        .replace("hero: { src: '/images/products/recer-mastery-mosaic.webp', alt: 'Recer Mastery Premium Mosaik', fit: 'contain' }", "hero: { src: '/images/catalog/rubicer-stria.png', alt: 'Rubicer Stria Badezimmermöbel', fit: 'cover' }")
        .replace("eyebrow: 'Eiche · Fischgrät · XL · Projekt'", "eyebrow: 'SPC · Fischgrät · XL · Projekt'")
        .replace("copy: 'Natürliche, warme Holzdekore für Renovationen, ergänzt durch Fischgrät, XL-Dielen und robuste Grau-/Steinoptiken.'", "copy: 'Raumwirkung zuerst, danach Diele, Struktur, Format und technische Eignung.'")
        .replace("ranges: ['Fischgrät', 'Natur-Eiche', 'XL-Dielen', 'Projektqualität']", "ranges: ['Fischgrät', 'XL-Dielen', 'Natur-Eiche', 'Projektqualität']")
        .replace("eyebrow: 'Möbel · Dusche · Armaturen · WC'", "eyebrow: 'Bad · Küche · Wohnen · Inspiration'")
        .replace("copy: 'Ein visuell starkes Badmöbel als Mittelpunkt, ergänzt durch moderne Duschsysteme, Armaturen, WCs und Duschwannen.'", "copy: 'Fünf verständliche Stilwelten. Erst die Raumwirkung, dann jedes reale Produkt des Konzepts.'")
        .replace("ranges: ['Badmöbel', 'Duschsysteme', 'Armaturen', 'WC & Duschwannen']", "ranges: ['3 Badezimmer', 'Wohnraum', 'Küche', 'Einzeln anfragbar']")
        .replace("hero: { src: '/images/catalog/rubicer-stria.png', alt: 'Rubicer Stria Badmöbel', fit: 'cover' }", "hero: { src: '/images/categories/recer-pixstone-room.webp', alt: 'Helles Schweizer Raumkonzept', fit: 'cover' }")
        .replace("kicker: 'Sparte 03 · Exklusive Akzentflächen'", "kicker: 'Sparte 03 · Badezimmer'")
        .replace("title: 'Badezimmer mit echter Materialwirkung'", "title: 'Das Bad sofort verstehen – Produkt und Anwendung klar verbunden'")
        .replace("copy: 'Marmor-, Naturstein- und geometrische Mosaike für Dusche, Spa, Hotel und hochwertige Innenräume – keine generischen Symbolprodukte.'", "copy: 'Jede Galerie zeigt die stärkste Anwendung und danach das reale Produkt mit Format, Oberfläche und Referenz.'")
        .replace("hero: { src: '/images/products/recer-mastery-mosaic.webp', alt: 'Recer Mastery Mix Premium Mosaik aus dem Herstellerprogramm', fit: 'contain' }", "hero: { src: '/images/catalog/rubicer-stria.png', alt: 'Rubicer Stria Badezimmermöbel', fit: 'cover' }")
        .replace("kicker: 'Sparte 04 · Renovationsböden'", "kicker: 'Sparte 04 · Bodensysteme im Raum'")
        .replace("title: 'Natürliche Eiche, Fischgrät und robuste Projektdekore'", "title: 'Sehen, wie der Boden den ganzen Raum verändert'")
        .replace("copy: 'Warme Holzoptiken und Herringbone stehen vorne; Grau und Steinoptik bleiben als belastbare Projektoptionen erhalten.'", "copy: 'Der Kunde sieht zuerst die Verlegewirkung und wechselt danach zur Diele, EIR-Struktur und technischen Leistung.'")
        .replace("kicker: 'Sparte 05 · Einzelprodukt oder Komplettbad'", "kicker: 'Sparte 05 · Fünf kuratierte Raumideen'")
        .replace("title: 'Badmöbel, Armaturen, Dusche und WC sinnvoll kombinieren'", "title: 'Ein Stilbild wählen und die realen Produkte direkt anfragen'")
        .replace("copy: 'Die Auswahl beginnt mit dem visuellen Mittelpunkt des Bads und führt danach zu passenden Dusch-, Armaturen- und Sanitärlösungen.'", "copy: 'Drei Badezimmer, ein Wohnraum und eine Küche. Klare Stilrichtung, sichtbare Bestandteile und ein direkter Weg zur Offerte.'")
        .replace("const families = expandedFamilies[category] ?? [];", "const families: typeof expandedFamilies[string] = [];")
        .replace("<ProductCard key={product.id} product={product}", "<ProductCard key={product.id} category={category} product={product}")
        .replace(oldProductCard, newProductCard)
        .replace('<section className="border-t border-[#d8e1e6] bg-white">', '<section className="hidden">')
        .replace('<section className="bg-[#f3f5f6]">', '<section className="hidden">')
        .replace('className="mt-8 grid grid-cols-3 gap-3"', 'className="hidden"')
        .replace('text-5xl font-bold leading-[1.02]', 'text-4xl font-bold leading-[1.02] sm:text-5xl')
        .replace('min-h-[410px] overflow-hidden rounded-[22px]', 'min-h-[260px] overflow-hidden rounded-[18px] sm:min-h-[410px] sm:rounded-[22px]')
        .replace('Produkte mit vollständigen Werkdaten', 'Raumwirkung zuerst. Produkt und Technik direkt danach.')
        .replace('{selectedCategory.products.length} Detailreferenzen</span><span className="rounded-full border border-[#d5e0e6] bg-[#f7f9fa] px-4 py-2">{families.length} kuratierte Katalogauswahlen', '{selectedCategory.products.length} kuratierte Produkte</span><span className="rounded-full border border-[#d5e0e6] bg-[#f7f9fa] px-4 py-2">Galerie: Raum + Produkt')
        .replace("onClick={onAdd} disabled={inQuote}", "onClick={onAdd}")
        .replace("disabled={inQuote} className={`mt-7", "className={`mt-7")
        .replace("${inQuote ? 'bg-[#e7ecef] text-[#768995]' : 'bg-[#004b87] text-white'}", "${inQuote ? 'bg-[#fff2f1] text-[#9b3f3b]' : 'bg-[#004b87] text-white'}")
        .replace("{inQuote ? 'Bereits in der Anfrage' : 'Zur gemeinsamen Offerte hinzufügen'}", "{inQuote ? 'Aus Anfrage entfernen' : 'Zur gemeinsamen Offerte hinzufügen'}")
        .replace("const pieceProduct = ['Waschtisch', 'Badmöbel', 'Armatur', 'Duschsystem', 'Duschwanne', 'Duschabtrennung', 'WC'].some((type) => `${product.name} ${product.application}`.includes(type));", "const conceptProduct = product.brand === 'Raumkonzept';\n    const pieceProduct = conceptProduct || ['Waschtisch', 'Badmöbel', 'Armatur', 'Duschsystem', 'Duschwanne', 'Duschabtrennung', 'WC'].some((type) => `${product.name} ${product.application}`.includes(type));")
        .replace("if (current.some((item) => item.reference === product.reference)) return current;", "if (current.some((item) => item.reference === product.reference)) return current.filter((item) => item.reference !== product.reference);")
        .replace("unit: pieceProduct ? 'Stk.' : 'm²',", "unit: conceptProduct ? 'Set' : (pieceProduct ? 'Stk.' : 'm²'),")
        .replace("notify(`${product.name} wurde zur Anfrage hinzugefügt.`);", "notify(quote.some((item) => item.reference === product.reference) ? `${product.name} wurde entfernt.` : `${product.name} wurde zur Anfrage hinzugefügt.`);")
        .replace("mosaics: { title: 'Premium Mosaike Schweiz | RA Bau Lieferung', description: 'Exklusive Mosaike für Dusche, Spa, Hotel und hochwertige Akzentflächen – technisch dokumentiert und projektbezogen lieferbar.' }", "mosaics: { title: 'Badezimmer Schweiz | RA Bau Lieferung', description: 'Badprodukte mit Anwendung, Referenz und direkter Projektanfrage.' }")
        .replace("bathroom: { title: 'Premium Bad & Sanitär Schweiz | RA Bau Lieferung', description: 'Badmöbel, Armaturen, Duschsysteme, WCs, Duschwannen und Duschabtrennungen für hochwertige Komplettbad- und Einzelproduktlösungen.' }", "bathroom: { title: 'Raumkonzepte Schweiz | RA Bau Lieferung', description: 'Fünf kuratierte Stilwelten für Badezimmer, Wohnen und Küche mit direkt anfragbaren Produkten.' }")
        .replace(
          `export default function App() {\n  const [page, setPage] = useState<PageRoute>('home');\n  const [mobileOpen, setMobileOpen] = useState(false);\n  const [quote, setQuote] = useState<QuoteItem[]>([]);\n  const [selected, setSelected] = useState<InteriorProduct | null>(null);\n  const [selectedConstruction, setSelectedConstruction] = useState<ConstructionProduct | null>(null);\n`,
          'export default function App() {\n',
        );
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [generatedStorefront(), react(), tailwindcss()],
    define: { 'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY) },
    resolve: { alias: { '@': path.resolve(__dirname, '.') } },
    server: { hmr: process.env.DISABLE_HMR !== 'true' },
  };
});
