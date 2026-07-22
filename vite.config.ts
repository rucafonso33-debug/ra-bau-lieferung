import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, loadEnv, type Plugin } from 'vite';

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
        .replace("import { constructionCategories, interiorCategories } from './data';", "import { constructionCategories, interiorCategories } from './finalData';\nimport { LuxuryProductCard } from './LuxuryProductCard';")
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
        .replace("<ProductCard key={product.id} product={product}", "<LuxuryProductCard key={product.id} category={category} product={product}")
        .replace('<section className="border-t border-[#d8e1e6] bg-white">', '<section className="hidden">')
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
