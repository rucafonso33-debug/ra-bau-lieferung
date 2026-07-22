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
        .replace("copy: 'Ausdrucksstarke Herstellerkollektionen für exklusive Duschen, Spas, Hotels und hochwertige Akzentflächen.'", "copy: 'Fünf eindeutig bebilderte Badprodukte. Weitere Referenzen erscheinen erst mit verifizierter Herstellerabbildung.'")
        .replace("ranges: ['Marmor Mix', 'Naturstein', 'Geometrisch', 'Nassbereich']", "ranges: ['Badmöbel', 'Armaturen', 'Duschsysteme', 'WC & Duschwannen']")
        .replace("hero: { src: '/images/products/recer-mastery-mosaic.webp', alt: 'Recer Mastery Premium Mosaik', fit: 'contain' }", "hero: { src: '/images/catalog/rubicer-stria.png', alt: 'Rubicer Stria Badezimmermöbel', fit: 'cover' }")
        .replace("eyebrow: 'Eiche · Fischgrät · XL · Projekt'", "eyebrow: 'SPC · Fischgrät · XL · Projekt'")
        .replace("copy: 'Natürliche, warme Holzdekore für Renovationen, ergänzt durch Fischgrät, XL-Dielen und robuste Grau-/Steinoptiken.'", "copy: 'Fünf klar unterscheidbare Rubifloor-Lösungen mit verifizierten Bildern. Kork wird erst mit Originalabbildungen ergänzt.'")
        .replace("ranges: ['Fischgrät', 'Natur-Eiche', 'XL-Dielen', 'Projektqualität']", "ranges: ['Fischgrät', 'XL-Dielen', 'Natur-Eiche', 'Projektqualität']")
        .replace("eyebrow: 'Möbel · Dusche · Armaturen · WC'", "eyebrow: 'Bad · Küche · Wohnen · Produktboard'")
        .replace("copy: 'Ein visuell starkes Badmöbel als Mittelpunkt, ergänzt durch moderne Duschsysteme, Armaturen, WCs und Duschwannen.'", "copy: 'Genau fünf ehrliche Produktboards aus realen Katalogreferenzen: drei Bäder, ein Wohnraum und eine Küche.'")
        .replace("ranges: ['Badmöbel', 'Duschsysteme', 'Armaturen', 'WC & Duschwannen']", "ranges: ['3 Badezimmer', 'Wohnraum', 'Küche', 'Einzeln anfragbar']")
        .replace("hero: { src: '/images/catalog/rubicer-stria.png', alt: 'Rubicer Stria Badmöbel', fit: 'cover' }", "hero: { src: '/images/concepts/warm-stone-spa.svg', alt: 'Warm Stone Spa Produktboard', fit: 'cover' }")
        .replace("kicker: 'Sparte 03 · Exklusive Akzentflächen'", "kicker: 'Sparte 03 · Badezimmer'")
        .replace("title: 'Badezimmer mit echter Materialwirkung'", "title: 'Badezimmer mit eindeutig dargestellten Produkten'")
        .replace("copy: 'Marmor-, Naturstein- und geometrische Mosaike für Dusche, Spa, Hotel und hochwertige Innenräume – keine generischen Symbolprodukte.'", "copy: 'Möbel, Armatur, Duschsystem, WC und Duschwanne werden nur mit der korrekten Produktabbildung gezeigt. Weitere Referenzen prüfen wir projektbezogen.'")
        .replace("hero: { src: '/images/products/recer-mastery-mosaic.webp', alt: 'Recer Mastery Mix Premium Mosaik aus dem Herstellerprogramm', fit: 'contain' }", "hero: { src: '/images/catalog/rubicer-stria.png', alt: 'Rubicer Stria Badezimmermöbel', fit: 'cover' }")
        .replace("kicker: 'Sparte 04 · Renovationsböden'", "kicker: 'Sparte 04 · Verifizierte Bodensysteme'")
        .replace("title: 'Natürliche Eiche, Fischgrät und robuste Projektdekore'", "title: 'SPC-Böden mit klar unterscheidbaren Dekoren und Formaten'")
        .replace("copy: 'Warme Holzoptiken und Herringbone stehen vorne; Grau und Steinoptik bleiben als belastbare Projektoptionen erhalten.'", "copy: 'Jede Detailkarte verwendet die passende Produktabbildung. Doppelte Bilder unter verschiedenen Produktnamen wurden entfernt.'")
        .replace("kicker: 'Sparte 05 · Einzelprodukt oder Komplettbad'", "kicker: 'Sparte 05 · Fünf ehrliche Raumkonzepte'")
        .replace("title: 'Badmöbel, Armaturen, Dusche und WC sinnvoll kombinieren'", "title: 'Reale Katalogprodukte als hochwertige Material- und Produktboards'")
        .replace("copy: 'Die Auswahl beginnt mit dem visuellen Mittelpunkt des Bads und führt danach zu passenden Dusch-, Armaturen- und Sanitärlösungen.'", "copy: 'Drei Badezimmer, ein Wohnraum und eine Küche. Keine erfundene Raumszene: jedes Board zeigt die tatsächlich anfragbaren Produktfamilien.'")
        .replace("const families = expandedFamilies[category] ?? [];", "const families: typeof expandedFamilies[string] = [];")
        .replace("<ProductCard key={product.id} product={product}", "<ProductCard key={product.id} category={category} product={product}")
        .replace("function ProductCard({ product, inQuote, onSelect, onAdd }: { product: InteriorProduct;", "function ProductCard({ category, product, inQuote, onSelect, onAdd }: { category: string; product: InteriorProduct;")
        .replace("const asset: VisualAsset = { src: product.image, alt: `${product.brand ?? ''} ${product.name}`.trim(), fit: product.imageFit ?? 'cover' };", "const asset: VisualAsset = { src: product.image, alt: `${product.brand ?? ''} ${product.name}`.trim(), fit: product.imageFit ?? 'cover' };\n  const imageRatio = category === 'Raumkonzepte' ? 'aspect-[16/10]' : 'aspect-[4/3]';")
        .replace("className=\"relative aspect-[4/3] overflow-hidden border-b border-[#e0e6e9] bg-[#eef1f2] text-left\"", "className={`relative ${imageRatio} overflow-hidden border-b border-[#e0e6e9] bg-[#eef1f2] text-left`}")
        .replace("${asset.fit === 'contain' ? 'bg-white p-8' : ''}", "${asset.fit === 'contain' ? 'bg-white p-5 sm:p-8' : ''}")
        .replace("onClick={onAdd} disabled={inQuote}", "onClick={onAdd}")
        .replace("${inQuote ? 'bg-[#e7ecef] text-[#768995]' : 'bg-[#004b87] text-white hover:bg-[#003d70]'}", "${inQuote ? 'bg-[#fff2f1] text-[#9b3f3b] hover:bg-[#ffe4e1]' : 'bg-[#004b87] text-white hover:bg-[#003d70]'}")
        .replace("{inQuote ? 'In der Anfrage' : 'Zur Anfrage hinzufügen'}", "{inQuote ? 'Aus Anfrage entfernen' : 'Zur Anfrage hinzufügen'}")
        .replace("disabled={inQuote} className={`mt-7", "className={`mt-7")
        .replace("${inQuote ? 'bg-[#e7ecef] text-[#768995]' : 'bg-[#004b87] text-white'}", "${inQuote ? 'bg-[#fff2f1] text-[#9b3f3b]' : 'bg-[#004b87] text-white'}")
        .replace("{inQuote ? 'Bereits in der Anfrage' : 'Zur gemeinsamen Offerte hinzufügen'}", "{inQuote ? 'Aus Anfrage entfernen' : 'Zur gemeinsamen Offerte hinzufügen'}")
        .replace("const pieceProduct = ['Waschtisch', 'Badmöbel', 'Armatur', 'Duschsystem', 'Duschwanne', 'Duschabtrennung', 'WC'].some((type) => `${product.name} ${product.application}`.includes(type));", "const conceptProduct = product.brand === 'Raumkonzept';\n    const pieceProduct = conceptProduct || ['Waschtisch', 'Badmöbel', 'Armatur', 'Duschsystem', 'Duschwanne', 'Duschabtrennung', 'WC'].some((type) => `${product.name} ${product.application}`.includes(type));")
        .replace("if (current.some((item) => item.reference === product.reference)) return current;", "if (current.some((item) => item.reference === product.reference)) return current.filter((item) => item.reference !== product.reference);")
        .replace("quantity: pieceProduct ? '1' : '25',", "quantity: pieceProduct ? '1' : '25',")
        .replace("unit: pieceProduct ? 'Stk.' : 'm²',", "unit: conceptProduct ? 'Set' : (pieceProduct ? 'Stk.' : 'm²'),")
        .replace("notify(`${product.name} wurde zur Anfrage hinzugefügt.`);", "notify(quote.some((item) => item.reference === product.reference) ? `${product.name} wurde entfernt.` : `${product.name} wurde zur Anfrage hinzugefügt.`);")
        .replace("mosaics: { title: 'Premium Mosaike Schweiz | RA Bau Lieferung', description: 'Exklusive Mosaike für Dusche, Spa, Hotel und hochwertige Akzentflächen – technisch dokumentiert und projektbezogen lieferbar.' }", "mosaics: { title: 'Badezimmer Schweiz | RA Bau Lieferung', description: 'Eindeutig bebilderte Badmöbel, Armaturen, Duschsysteme, WCs und Duschwannen für hochwertige Schweizer Projekte.' }")
        .replace("bathroom: { title: 'Premium Bad & Sanitär Schweiz | RA Bau Lieferung', description: 'Badmöbel, Armaturen, Duschsysteme, WCs, Duschwannen und Duschabtrennungen für hochwertige Komplettbad- und Einzelproduktlösungen.' }", "bathroom: { title: 'Raumkonzepte Schweiz | RA Bau Lieferung', description: 'Fünf ehrliche Produktboards für Badezimmer, Wohnen und Küche mit realen, einzeln anfragbaren Katalogprodukten.' }")
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
