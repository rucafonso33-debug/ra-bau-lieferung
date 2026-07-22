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
      return partFiles
        .map((file) => fs.readFileSync(file, 'utf8'))
        .join('')
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
        .replace("copy: 'Ausdrucksstarke Herstellerkollektionen für exklusive Duschen, Spas, Hotels und hochwertige Akzentflächen.'", "copy: 'Hochwertige Badmöbel, Armaturen, Duschsysteme, Glas, WCs und Duschwannen für private Residenzen, Hotels und anspruchsvolle Renovationen.'")
        .replace("ranges: ['Marmor Mix', 'Naturstein', 'Geometrisch', 'Nassbereich']", "ranges: ['Badmöbel', 'Armaturen', 'Duschsysteme', 'WC & Glas']")
        .replace("hero: { src: '/images/products/recer-mastery-mosaic.webp', alt: 'Recer Mastery Premium Mosaik', fit: 'contain' }", "hero: { src: '/images/catalog/rubicer-stria.png', alt: 'Rubicer Stria Badezimmermöbel', fit: 'cover' }")
        .replace("{ src: '/images/products/recer-grand-stone-mosaic.webp', alt: 'Recer Grand Stone Mosaik', fit: 'contain' },\n      { src: '/images/products/recer-bluenza-mosaic.webp', alt: 'Recer Bluenza Mosaik', fit: 'cover' },\n      { src: '/images/products/recer-pixstone-mosaic.webp', alt: 'Recer Pixstone Mosaik', fit: 'contain' },", "{ src: '/images/products/imex-toscana-bdt064.webp', alt: 'IMEX Toscana Duschsystem', fit: 'contain' },\n      { src: '/images/products/moovlux-tube-tl1001.webp', alt: 'Moovlux Tube Armatur', fit: 'contain' },\n      { src: '/images/premium/roca-screens.svg', alt: 'Roca Duschabtrennung', fit: 'cover' },")
        .replace("eyebrow: 'Eiche · Fischgrät · XL · Projekt'", "eyebrow: 'Vinyl · SPC · Fischgrät · Kork'")
        .replace("copy: 'Natürliche, warme Holzdekore für Renovationen, ergänzt durch Fischgrät, XL-Dielen und robuste Grau-/Steinoptiken.'", "copy: 'Kuratiertes SPC, Vinyl und Naturkork für hochwertige Wohnungen, Hotels, Büros und Renovationen – von Fischgrat bis XL-Diele und akustischem Komfortboden.'")
        .replace("ranges: ['Fischgrät', 'Natur-Eiche', 'XL-Dielen', 'Projektqualität']", "ranges: ['Fischgrät', 'XL-Dielen', 'Contract Vinyl', 'Naturkork']")
        .replace("eyebrow: 'Möbel · Dusche · Armaturen · WC'", "eyebrow: 'Bad · Küche · Wohnen · Komplettkonzept'")
        .replace("copy: 'Ein visuell starkes Badmöbel als Mittelpunkt, ergänzt durch moderne Duschsysteme, Armaturen, WCs und Duschwannen.'", "copy: 'Kuratierte Raumkonzepte zeigen reale Produkte in ihrem stärksten Zusammenspiel. Der Kunde kann das komplette Konzept anfragen oder einzelne Bestandteile entfernen.'")
        .replace("ranges: ['Badmöbel', 'Duschsysteme', 'Armaturen', 'WC & Duschwannen']", "ranges: ['Komplettbad', 'Wohnraum', 'Küche', 'Hotel & Spa']")
        .replace("hero: { src: '/images/catalog/rubicer-stria.png', alt: 'Rubicer Stria Badmöbel', fit: 'cover' }", "hero: { src: '/images/premium/signature-gold.svg', alt: 'Luxuriöses Raumkonzept mit Feinsteinzeug', fit: 'cover' }")
        .replace("{ src: '/images/products/imex-toscana-bdt064.webp', alt: 'IMEX Toscana Duschsystem', fit: 'contain' },\n      { src: '/images/products/moovlux-tube-tl1001.webp', alt: 'Moovlux Tube Armatur', fit: 'contain' },\n      { src: '/images/products/roca-avant-intank.webp', alt: 'Roca Avant In-Tank WC', fit: 'contain' },", "{ src: '/images/catalog/recer-bluenza.png', alt: 'Warm Stone Spa Konzept', fit: 'cover' },\n      { src: '/images/products/rubifloor-herringbone-natural.webp', alt: 'Herringbone Living Konzept', fit: 'cover' },\n      { src: '/images/products/rubifloor-xl-home.webp', alt: 'Concrete and Oak Kitchen Konzept', fit: 'cover' },")
        .replace("kicker: 'Sparte 03 · Exklusive Akzentflächen'", "kicker: 'Sparte 03 · Badezimmer'")
        .replace("title: 'Badezimmer mit echter Materialwirkung'", "title: 'Badezimmer als vollständig koordinierte Premium-Lösung'")
        .replace("copy: 'Marmor-, Naturstein- und geometrische Mosaike für Dusche, Spa, Hotel und hochwertige Innenräume – keine generischen Symbolprodukte.'", "copy: 'Möbel, Armaturen, Dusche, Glas und Sanitär werden nach Stil, Oberfläche und Projektanforderung zusammengeführt. Jede Referenz bleibt einzeln anfragbar.'")
        .replace("hero: { src: '/images/products/recer-mastery-mosaic.webp', alt: 'Recer Mastery Mix Premium Mosaik aus dem Herstellerprogramm', fit: 'contain' }", "hero: { src: '/images/catalog/rubicer-stria.png', alt: 'Premium Badezimmer mit Rubicer Stria', fit: 'cover' }")
        .replace("kicker: 'Sparte 04 · Renovationsböden'", "kicker: 'Sparte 04 · Premium-Bodensysteme'")
        .replace("title: 'Natürliche Eiche, Fischgrät und robuste Projektdekore'", "title: 'Vinyl, SPC und Kork für anspruchsvolle Schweizer Innenräume'")
        .replace("copy: 'Warme Holzoptiken und Herringbone stehen vorne; Grau und Steinoptik bleiben als belastbare Projektoptionen erhalten.'", "copy: 'Fischgrat, extralange Dielen, Contract-Vinyl und natürlicher Kork werden nach Nutzung, Akustik, Komfort und Design ausgewählt.'")
        .replace("kicker: 'Sparte 05 · Einzelprodukt oder Komplettbad'", "kicker: 'Sparte 05 · Fünf kuratierte Raumkonzepte'")
        .replace("title: 'Badmöbel, Armaturen, Dusche und WC sinnvoll kombinieren'", "title: 'Fünf Räume sehen, Produkte auswählen und individuell anfragen'")
        .replace("copy: 'Die Auswahl beginnt mit dem visuellen Mittelpunkt des Bads und führt danach zu passenden Dusch-, Armaturen- und Sanitärlösungen.'", "copy: 'Drei Badezimmer, ein Wohnraum und eine Küche zeigen hochwertige Kombinationen. Die Visualisierungen dienen als Inspiration; Produkte bleiben einzeln auswählbar.'")
        .replace("const families = expandedFamilies[category] ?? [];", "const families = category === 'Raumkonzepte' ? [] : (expandedFamilies[category] ?? []).slice(0, 4);")
        .replace("<ProductCard key={product.id} product={product}", "<ProductCard key={product.id} category={category} product={product}")
        .replace("function ProductCard({ product, inQuote, onSelect, onAdd }: { product: InteriorProduct;", "function ProductCard({ category, product, inQuote, onSelect, onAdd }: { category: string; product: InteriorProduct;")
        .replace("const asset: VisualAsset = { src: product.image, alt: `${product.brand ?? ''} ${product.name}`.trim(), fit: product.imageFit ?? 'cover' };", "const forcePieceView = category === 'Keramik & Feinsteinzeug' && !product.image.includes('/categories/');\n  const asset: VisualAsset = { src: product.image, alt: `${product.brand ?? ''} ${product.name}`.trim(), fit: forcePieceView ? 'contain' : (product.imageFit ?? 'cover') };\n  const imageRatio = category === 'Raumkonzepte' ? 'aspect-[16/10]' : 'aspect-[4/3]';")
        .replace("className=\"relative aspect-[4/3] overflow-hidden border-b border-[#e0e6e9] bg-[#eef1f2] text-left\"", "className={`relative ${imageRatio} overflow-hidden border-b border-[#e0e6e9] bg-[#eef1f2] text-left`}")
        .replace("${asset.fit === 'contain' ? 'bg-white p-8' : ''}", "${asset.fit === 'contain' ? 'bg-white p-5 sm:p-8' : ''}")
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
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
