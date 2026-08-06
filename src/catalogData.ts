import { additionalCatalogProducts } from './additionalCatalogProducts';

export type CategoryId =
  | 'grossformat'
  | 'keramik'
  | 'mosaik'
  | 'badmoebel'
  | 'bad'
  | 'boden'
  | 'baustelle';

export interface Category {
  id: CategoryId;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  imageAlt: string;
  priority?: 'primary' | 'secondary';
}

export type ProductSegment = 'Armaturen' | 'Duschsysteme' | 'Sanitärkeramik' | 'Duschwannen' | 'Badzubehör';

export interface Product {
  id: string;
  category: CategoryId;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  specs: string[];
  featured?: boolean;
  imageFit?: 'cover' | 'contain';
  brand?: string;
  reference?: string;
  catalog?: string;
  catalogPage?: number;
  segment?: ProductSegment;
}

export const categories: Category[] = [
  {
    id: 'grossformat',
    title: 'Premium-Grossformatplatten',
    eyebrow: 'Premium-Laminatkeramik',
    description: 'Dünne Keramikplatten für fugenarme Wände, Böden, Duschen und Möbeloberflächen.',
    image: '/images/showcase/calacatta-gold.webp',
    imageAlt: 'Heller Raum mit grossformatiger Keramik in Calacatta-Optik',
    priority: 'primary',
  },
  {
    id: 'keramik',
    title: 'Keramik & Feinsteinzeug',
    eyebrow: 'Innen & aussen',
    description: 'Ausgewählte Stein-, Marmor-, Beton- und Holzoptiken für langlebige Projekte.',
    image: '/images/showcase/ceramic-travertine.webp',
    imageAlt: 'Wohnraum mit Feinsteinzeug in warmer Travertin-Optik',
    priority: 'primary',
  },
  {
    id: 'mosaik',
    title: 'Mosaik & Steinfliesen',
    eyebrow: 'Ausgewählte Qualität',
    description: 'Mosaike und Fliesen in Travertin-, Kalkstein- und Marmoroptik für hochwertige Wand- und Bodenflächen.',
    image: '/images/showcase/stone-tile-grand.webp',
    imageAlt: 'Hochwertiges Bad mit Fliesen in heller Natursteinoptik',
    priority: 'primary',
  },
  {
    id: 'badmoebel',
    title: 'Badmöbel',
    eyebrow: 'Komplette Kompositionen',
    description: 'Waschtische, Hochschränke und Spiegel als abgestimmte Lösungen in ruhigen Oberflächen.',
    image: '/images/showcase/furniture-natural.webp',
    imageAlt: 'Schwebender Doppelwaschtisch mit gerillter Holzfront',
    priority: 'primary',
  },
  {
    id: 'bad',
    title: 'Bad, Sanitär & Armaturen',
    eyebrow: 'Alles fürs Bad',
    description: 'WCs, Bidets, Waschtische, Armaturen, Duschsysteme, Duschwannen und Badzubehör in einer klaren Sparte.',
    image: '/images/showcase/washbasins-modern.webp',
    imageAlt: 'Modernes Badezimmer mit Waschtisch, Sanitärkeramik und Armaturen',
  },
  {
    id: 'boden',
    title: 'SPC & Vinyl',
    eyebrow: 'Ergänzungssortiment',
    description: 'Pflegeleichte Holz- und Steinoptiken für Renovationen und belastbare Innenräume.',
    image: '/images/showcase/spc-herringbone.webp',
    imageAlt: 'Natürlicher Boden in Fischgrat-Optik',
    priority: 'secondary',
  },
  {
    id: 'baustelle',
    title: 'Baustellenzubehör',
    eyebrow: 'Für die Ausführung',
    description: 'Nivellier-, Distanz- und Befestigungslösungen für eine saubere Verarbeitung.',
    image: '/images/showcase/construction-site.webp',
    imageAlt: 'Baustelle mit Bewehrung und Abstandhaltern',
  },
];

const baseProducts: Product[] = [
  { id: 'gf-calacatta-gold', category: 'grossformat', name: 'Calacatta Gold', description: 'Warme Goldadern auf hellem Grund für repräsentative Wände, Duschen und Wohnbereiche.', image: '/images/showcase/calacatta-gold.webp', imageAlt: 'Grossformatplatte in heller Marmoroptik mit goldener Aderung', specs: ['bis 120 × 260 cm', '6 mm', 'poliert'], featured: true },
  { id: 'gf-calacatta-vein', category: 'grossformat', name: 'Calacatta Vein', description: 'Markante, durchlaufende Zeichnung für fugenarme Flächen mit architektonischer Wirkung.', image: '/images/showcase/calacatta-vein.webp', imageAlt: 'Grossformatige Marmoroptik mit markanter grauer Aderung', specs: ['bis 120 × 260 cm', '6 mm', 'poliert'], featured: true },
  { id: 'gf-onyx-white', category: 'grossformat', name: 'Onyx White', description: 'Transluzente Steinwirkung für elegante Bäder, Empfangsbereiche und Akzentwände.', image: '/images/showcase/onyx-white.webp', imageAlt: 'Eleganter Raum mit grossformatiger Onyx-Optik', specs: ['bis 120 × 260 cm', '6 mm', 'poliert'], featured: true },
  { id: 'gf-cement-silver', category: 'grossformat', name: 'Cement Silver', description: 'Ruhige mineralische Oberfläche für moderne, grosszügige Innenräume.', image: '/images/showcase/cement-silver.webp', imageAlt: 'Wohnraum mit grossformatiger Keramik in heller Betonoptik', specs: ['bis 120 × 240 cm', '6 mm', 'matt'], featured: true },
  { id: 'gf-amazonite', category: 'grossformat', name: 'Amazonite', description: 'Ausdrucksstarke Blau- und Kupfertöne für exklusive Akzentwände, Waschtische und Möbelverkleidungen.', image: '/images/products-2026/slab-amazonite.webp', imageAlt: 'Grossformatplatte in intensiver blaugrüner Natursteinoptik', specs: ['120 × 260 cm', '6 mm', 'poliert'] },
  { id: 'gf-canon-grey', category: 'grossformat', name: 'Canon Grey', description: 'Kühle graue Steinzeichnung für reduzierte Bäder, Küchen und durchgängige Wandflächen.', image: '/images/products-2026/slab-canon-grey.webp', imageAlt: 'Graue Grossformatplatte mit feiner natürlicher Steinzeichnung', specs: ['120 × 260 cm', '7 mm', 'rektifiziert'] },
  { id: 'gf-magma-black', category: 'grossformat', name: 'Magma Black', description: 'Tiefschwarze Fläche mit goldener Aderung für starke, luxuriöse Raumakzente.', image: '/images/products-2026/slab-magma-black.webp', imageAlt: 'Schwarze Grossformatplatte mit ausdrucksstarker goldener Aderung', specs: ['120 × 260 cm', '6 mm', 'poliert'] },
  { id: 'gf-marfil-gold', category: 'grossformat', name: 'Marfil Gold', description: 'Warme Elfenbein- und Goldnuancen für helle, elegante Innenräume mit ruhiger Materialwirkung.', image: '/images/products-2026/slab-marfil-gold.webp', imageAlt: 'Helle Grossformatplatte in warmer Elfenbein- und Goldoptik', specs: ['120 × 260 cm', '6 mm', 'poliert'] },

  { id: 'ke-travertin', category: 'keramik', name: 'Travertin Warm', description: 'Sanfte Natursteinstruktur mit warmer Tonalität für Wohnen, Bad und Hotellerie.', image: '/images/showcase/ceramic-travertine.webp', imageAlt: 'Warmer Wohnraum mit Feinsteinzeug in Travertin-Optik', specs: ['60 × 120 cm', 'rektifiziert', 'matt'] },
  { id: 'ke-marble-soft', category: 'keramik', name: 'Marble Soft', description: 'Zurückhaltende Marmorwirkung für helle, zeitlose Räume ohne visuelle Unruhe.', image: '/images/showcase/ceramic-marble.webp', imageAlt: 'Heller Wohnraum mit sanfter Marmoroptik', specs: ['60 × 120 cm', 'Wand & Boden', 'soft matt'] },
  { id: 'ke-concrete', category: 'keramik', name: 'Concrete Light', description: 'Gleichmässige Betonoptik für reduzierte Küchen, Bäder und offene Wohnflächen.', image: '/images/showcase/ceramic-concrete.webp', imageAlt: 'Moderner Raum mit grossformatiger Keramik in Betonoptik', specs: ['120 × 120 cm', 'rektifiziert', 'matt'] },
  { id: 'ke-wood', category: 'keramik', name: 'Oak Porcelain', description: 'Holzwirkung mit der Widerstandsfähigkeit von Feinsteinzeug für stark genutzte Bereiche.', image: '/images/showcase/ceramic-wood.webp', imageAlt: 'Boden aus Feinsteinzeug in natürlicher Holzoptik', specs: ['Dielenformat', 'pflegeleicht', 'innen & aussen'] },
  { id: 'ke-graphite', category: 'keramik', name: 'Graphite Silk', description: 'Dunkle, fein gezeichnete Oberfläche für elegante Küchen, Wohnbereiche und repräsentative Gewerberäume.', image: '/images/products-2026/ceramic-graphite.webp', imageAlt: 'Grosszügiger Innenraum mit dunkelgrauem fein gezeichnetem Feinsteinzeug', specs: ['60 × 120 cm', 'rektifiziert', 'seidenmatt'] },
  { id: 'ke-morella', category: 'keramik', name: 'Morella Pearl', description: 'Helle Steinoptik mit sanfter Bewegung für Schlafräume, Bäder und ruhige Wohnkonzepte.', image: '/images/products-2026/ceramic-morella.webp', imageAlt: 'Schlafzimmer mit hellem Feinsteinzeug in natürlicher Steinoptik', specs: ['60 × 120 cm', 'Wand & Boden', 'matt'] },
  { id: 'ke-navona', category: 'keramik', name: 'Navona Vein', description: 'Lebendige mehrfarbige Natursteinwirkung als hochwertiger Mittelpunkt offener Räume.', image: '/images/products-2026/ceramic-navona.webp', imageAlt: 'Wohnraum mit ausdrucksstarkem Feinsteinzeug in mehrfarbiger Steinoptik', specs: ['60 × 120 cm', 'rektifiziert', 'poliert'] },
  { id: 'ke-marmy', category: 'keramik', name: 'Marmy Mocha', description: 'Warme braune Marmorwirkung für wohnliche Flächen mit Tiefe und kontrollierter Variation.', image: '/images/products-2026/ceramic-marmy.webp', imageAlt: 'Wohnraum mit warmbraunem Feinsteinzeug in Marmoroptik', specs: ['60 × 120 cm', 'V3 Variation', 'poliert'] },

  { id: 'mo-travertin-brick', category: 'mosaik', name: 'Travertin Brick', description: 'Fein abgestimmtes Stäbchenmosaik in warmer Travertinoptik für Duschen, Nischen und Spa-Bereiche.', image: '/images/showcase/stone-mosaic-travertin.webp', imageAlt: 'Stäbchenmosaik in warmer Travertinoptik', specs: ['Mosaik', 'Travertinoptik', 'warm matt'] },
  { id: 'mo-marble-diamond', category: 'mosaik', name: 'Calacatta Diamond', description: 'Geometrisches Mosaik in heller Marmoroptik für elegante Duschen, Nischen und exklusive Akzentwände.', image: '/images/showcase/stone-mosaic-grand.webp', imageAlt: 'Geometrisches Mosaik in heller Calacatta-Marmoroptik', specs: ['Mosaik', 'Marmoroptik', 'Wand & Dusche'] },
  { id: 'mo-grand-tile', category: 'mosaik', name: 'Grand Stone Ivory', description: 'Helle Steinfliese für durchgängige Bad- und Wohnflächen mit natürlicher, zurückhaltender Bewegung.', image: '/images/showcase/stone-tile-grand.webp', imageAlt: 'Helles Badezimmer mit grosszügigen Fliesen in Steinoptik', specs: ['Steinfliese', 'Wand & Boden', 'rektifiziert'] },
  { id: 'mo-vein-tile', category: 'mosaik', name: 'Limestone Vein', description: 'Elegante Fliese mit feiner Kalksteinaderung für ruhige Premiumflächen und koordinierte Wandkonzepte.', image: '/images/showcase/stone-tile-vein.webp', imageAlt: 'Helle Fliese mit feiner natürlicher Kalksteinaderung', specs: ['Steinfliese', 'Kalksteinoptik', 'matt'] },
  { id: 'mo-moonlight', category: 'mosaik', name: 'Moonlight Stream', description: 'Fein reliefierte Steinfliese mit ruhiger horizontaler Zeichnung für hochwertige Wände und Akzentflächen.', image: '/images/products-2026/mosaic-moonlight-stream.webp', imageAlt: 'Elegante Wandfläche mit reliefierter heller Steinzeichnung', specs: ['60 × 120 cm', 'Steinoptik', 'Relief matt'] },
  { id: 'mo-marmy-relief', category: 'mosaik', name: 'Marmy Relief 3D', description: 'Dreidimensionale Marmorwirkung mit präzisem Licht- und Schattenspiel für exklusive Akzentwände.', image: '/images/products-2026/mosaic-marmy-relief.webp', imageAlt: 'Dreidimensionale Wandfliese in heller Marmoroptik mit goldenen Akzenten', specs: ['3D-Fliese', 'Marmoroptik', 'Wand'] },
  { id: 'mo-pixstone', category: 'mosaik', name: 'Mineral Terrazzo', description: 'Helles mineralisches Mosaik mit dezenter Körnung für moderne Bäder und gewerbliche Akzentzonen.', image: '/images/products-2026/mosaic-pixstone.webp', imageAlt: 'Quadratisches Mosaik in heller Terrazzo- und Mineraloptik', specs: ['Mosaik', 'Terrazzooptik', 'pflegeleicht'] },
  { id: 'mo-rapolano', category: 'mosaik', name: 'Rapolano Stone', description: 'Natürlich wirkendes Kalksteinmosaik in abgestuften Grau- und Beigetönen für ruhige Wand- und Bodenflächen.', image: '/images/products-2026/mosaic-rapolano.webp', imageAlt: 'Quadratisches Mosaik in natürlicher Kalksteinoptik', specs: ['10 × 10 Optik', 'Wand & Boden', 'warm matt'] },

  { id: 'bm-walnut-double', category: 'badmoebel', name: 'Walnut Double 120', description: 'Schwebender Doppelwaschtisch mit gerillter Front und ruhiger, dunkler Holzoptik.', image: '/images/showcase/furniture-natural.webp', imageAlt: 'Schwebender Doppelwaschtisch mit gerillter dunkler Holzfront', specs: ['Doppelbecken', 'Hochschrank optional', 'Spiegel nach Wahl'] },
  { id: 'bm-oak-compact', category: 'badmoebel', name: 'Natural Oak 80', description: 'Kompakte Kombination aus Waschtisch, Rundspiegel und optionalem Hochschrank.', image: '/images/showcase/furniture-oak.webp', imageAlt: 'Kompaktes Badmöbel in heller Eiche mit Rundspiegel', specs: ['ca. 80 cm', 'hängend', 'gerillte Front'] },
  { id: 'bm-walnut-round', category: 'badmoebel', name: 'Walnut Curve 100', description: 'Abgerundete Fronten und dunkle Holzstruktur für ein wohnliches Premiumbad.', image: '/images/showcase/furniture-walnut.webp', imageAlt: 'Abgerundetes Badmöbel in dunkler Walnussoptik', specs: ['gerundete Front', 'Rundspiegel', 'Hochschrank optional'] },
  { id: 'bm-white-round', category: 'badmoebel', name: 'White Curve 100', description: 'Helle, gerillte Fronten mit weichen Radien für kleine und mittlere Bäder.', image: '/images/showcase/furniture-white.webp', imageAlt: 'Weisses Badmöbel mit gerundeter gerillter Front', specs: ['weiss matt', 'hängend', 'Rundspiegel'] },
  { id: 'bm-stria-oak', category: 'badmoebel', name: 'Stria Oak 120', description: 'Gerillte Eichenfront, durchgehender Waschtisch und beleuchteter Rundspiegel als ruhige Gesamtkomposition.', image: '/images/products-2026/furniture-stria-oak.webp', imageAlt: 'Hängendes Badmöbel mit gerillter heller Eichenfront und Rundspiegel', specs: ['bis 120 cm', 'Solid Surface', 'Hochschrank'] },
  { id: 'bm-synergy', category: 'badmoebel', name: 'Synergy Compact', description: 'Kompakte weisse Komposition mit feinen Radien für Gäste-WC und kleinere Badezimmer.', image: '/images/products-2026/furniture-synergy-black.webp', imageAlt: 'Kompaktes weisses Badmöbel mit rundem Spiegel', specs: ['ca. 60 cm', 'hängend', 'Rundspiegel'] },
  { id: 'bm-audrey', category: 'badmoebel', name: 'Audrey Walnut', description: 'Klare Walnussfront mit rechteckigem Aufsatzbecken für eine reduzierte, wohnliche Badarchitektur.', image: '/images/products-2026/furniture-audrey-walnut.webp', imageAlt: 'Hängendes Badmöbel in Walnussoptik mit rechteckigem Aufsatzbecken', specs: ['Aufsatzbecken', 'hängend', 'Spiegelschrank optional'] },
  { id: 'bm-monello', category: 'badmoebel', name: 'Monello Graphite', description: 'Breites Möbel in Graphit mit ruhiger Front und grosszügigem Spiegel für moderne Familienbäder.', image: '/images/products-2026/furniture-monello-grey.webp', imageAlt: 'Breites graphitgraues Badmöbel mit grossem Spiegel', specs: ['Doppelplatz möglich', 'Graphit matt', 'Stauraum'] },

  { id: 'sa-fly-white', category: 'bad', name: 'Fly White', description: 'Weiche Geometrie und kompakte Proportionen als zeitlose WC- und Bidetlösung für moderne Badezimmer.', image: '/images/products-2026/sanitary-fly-white.webp', imageAlt: 'Modernes bodenstehendes WC und Bidet in Weiss', specs: ['WC & Bidet', 'Rimless', 'Soft-Close'] },
  { id: 'sa-glamic-black', category: 'bad', name: 'Glamic Black', description: 'Schwarze Sanitärkeramik als präziser Kontrast zu Naturstein, Holz und hellen Oberflächen.', image: '/images/products-2026/sanitary-glamic-black.webp', imageAlt: 'Modernes WC und Bidet in mattem Schwarz', specs: ['WC & Bidet', 'Rimless', 'schwarz matt'] },
  { id: 'sa-bohemia', category: 'bad', name: 'Bohemia Classic', description: 'Traditionelle WC- und Bidetformen mit moderner Funktion für klassische Renovationen und Boutique-Hotellerie.', image: '/images/products-2026/sanitary-bohemia.webp', imageAlt: 'Klassisches WC und Bidet in einem eleganten Badezimmer', specs: ['WC & Bidet', 'klassische Form', 'weiss'] },
  { id: 'sa-moon', category: 'bad', name: 'Moon Wall', description: 'Wandhängende WC- und Bidetlösung für einen leichten Raumeindruck und einfachere Bodenreinigung.', image: '/images/products-2026/sanitary-moon-wall.webp', imageAlt: 'Wandhängendes WC und Bidet in einem hellen Bad', specs: ['WC & Bidet', 'wandhängend', 'Rimless'] },
  { id: 'ar-shiny', category: 'bad', name: 'Shiny Basin Gold', description: 'Aufsatzwaschtisch und hohe Armatur in gebürstetem Gold als abgestimmter Mittelpunkt des Waschplatzes.', image: '/images/products-2026/faucet-shiny-basin.webp', imageAlt: 'Runder Aufsatzwaschtisch und hohe Armatur in gebürstetem Gold', specs: ['Aufsatzwaschtisch', 'hohe Armatur', 'gebürstetes Gold'] },
  { id: 'ar-kaiser', category: 'bad', name: 'Kaiser Wall', description: 'Wandmontierte Waschtischarmatur über einem geometrischen Aufsatzbecken für klare Badarchitektur.', image: '/images/products-2026/faucet-kaiser.webp', imageAlt: 'Wandarmatur in gebürstetem Gold über einem weissen Aufsatzbecken', specs: ['Waschtischarmatur', 'Unterputz', 'Wandmontage'] },
  { id: 'ar-rs-smart', category: 'bad', name: 'Smart Thermostat', description: 'Komplette Duschsäule mit Kopf- und Handbrause für kontrollierte Temperatur und täglichen Komfort.', image: '/images/products-2026/shower-rs-smart.webp', imageAlt: 'Thermostatische Duschsäule mit Kopf- und Handbrause', specs: ['Duschsystem', 'Thermostat', 'Kopf- & Handbrause'] },
  { id: 'du-lux', category: 'bad', name: 'Lux Linear', description: 'Sehr flache Duschwanne mit linearer Ablaufwirkung für reduzierte, grosszügige Duschen.', image: '/images/products-2026/shower-lux.webp', imageAlt: 'Flache Duschwanne mit linearer Ablaufzone in einem warmen Bad', specs: ['Duschwanne', 'ultraflach', 'Linearablauf'] },
  { id: 'du-mineral', category: 'bad', name: 'Mineral Stone', description: 'Strukturierte Duschwanne in heller oder dunkler Steinoptik für sichere, pflegeleichte Nassbereiche.', image: '/images/products-2026/shower-mineral.webp', imageAlt: 'Rechteckige Duschwannen in heller und dunkler Steinoptik', specs: ['Duschwanne', 'rutschhemmend', 'mehrere Formate'] },
  { id: 'du-niche-black', category: 'bad', name: 'Niche Black', description: 'Schwarze Einbaunische als praktisches Badzubehör und klarer Kontrast in keramischen Duschwänden.', image: '/images/products-2026/shower-niche-black.webp', imageAlt: 'Schwarze Einbaunische in einer grünen keramischen Wand', specs: ['Badzubehör', 'Einbaunische', 'mehrere Grössen'] },

  { id: 'bo-rigid-grey', category: 'boden', name: 'Rigid Grey', description: 'Grosszügige Steinoptik für pflegeleichte Wohn-, Eingangs- und Gewerbeflächen.', image: '/images/products-2026/floor-rigid-grey.webp', imageAlt: 'Heller SPC-Boden in ruhiger grauer Steinoptik', specs: ['60 × 60 cm', '6,5 mm', '0,7 mm Nutzschicht'] },
  { id: 'bo-xl-home', category: 'boden', name: 'XL Home', description: 'Helle extralange Eichenoptik für grosszügige Wohnräume mit ruhigem Fugenbild.', image: '/images/products-2026/floor-xl-home.webp', imageAlt: 'Heller SPC-Boden mit extralangen Dielen in Eichenoptik', specs: ['XL-Diele', '8 mm', 'EIR-Struktur'] },
  { id: 'bo-xl-country', category: 'boden', name: 'XL Country', description: 'Markante Landhausdiele mit natürlicher Astzeichnung für warme Wohn- und Hotelbereiche.', image: '/images/products-2026/floor-xl-country.webp', imageAlt: 'SPC-Boden in rustikaler Eichenoptik mit natürlicher Astzeichnung', specs: ['XL-Diele', '7 mm', '0,55 mm Nutzschicht'] },
  { id: 'bo-xl-city', category: 'boden', name: 'XL City', description: 'Zeitgemässe Holzoptik mit ausgewogener Tonvariation für offene Wohn- und Arbeitsflächen.', image: '/images/products-2026/floor-xl-city.webp', imageAlt: 'Moderner SPC-Boden in warmer städtischer Holzoptik', specs: ['XL-Diele', '7 mm', 'EIR-Struktur'] },
  { id: 'bo-herringbone', category: 'boden', name: 'Natural Herringbone', description: 'Warme Holzoptik im Fischgratformat für hochwertige Renovationen und Wohnräume.', image: '/images/products-2026/floor-herringbone-natural.webp', imageAlt: 'SPC-Boden in natürlicher Fischgrat-Optik', specs: ['Fischgrat', '6 mm', '0,55 mm Nutzschicht'] },
  { id: 'bo-wood-plus', category: 'boden', name: 'Wood Plus', description: 'Mehrformatiges Verlegebild für lebendige, authentische Holzflächen mit hoher Alltagstauglichkeit.', image: '/images/products-2026/floor-wood-plus.webp', imageAlt: 'SPC-Boden in mehrformatiger natürlicher Holzoptik', specs: ['Multiformat', '6 mm', 'integrierte Unterlage'] },
  { id: 'bo-premium-cream', category: 'boden', name: 'Premium Cream', description: 'Ruhige helle Dielenoptik für skandinavische Wohnkonzepte und freundliche Gewerberäume.', image: '/images/products-2026/floor-premium-cream.webp', imageAlt: 'Heller SPC-Boden in einem freundlichen skandinavischen Innenraum', specs: ['18 × 153 cm', '6 mm', 'EIR-Struktur'] },
  { id: 'bo-pro-nordig', category: 'boden', name: 'Pro Nordig', description: 'Robuste nordische Holzoptik für stärker beanspruchte Wohn-, Büro- und Renovationsprojekte.', image: '/images/products-2026/floor-pro-nordig.webp', imageAlt: 'SPC-Boden in nordischer Holzoptik in einer Bibliothek', specs: ['18 × 122 cm', '6 mm', 'Projektqualität'] },

  { id: 'ba-clips', category: 'baustelle', name: 'Nivellierclips', description: 'Einweg-Zuglaschen für gleichmässige Fugen und eine plane Verlegung von Wand- und Bodenplatten.', image: '/images/showcase/construction-clips.webp', imageAlt: 'Transparenter Nivellierclip für Fliesen', specs: ['1,0–3,0 mm', "1'000 Stück", 'Wand & Boden'], imageFit: 'contain' },
  { id: 'ba-wedges', category: 'baustelle', name: 'System-Keile', description: 'Mehrfach verwendbare Keile für kontrollierten Anpressdruck im Clip-Nivelliersystem.', image: '/images/showcase/construction-wedges.webp', imageAlt: 'Roter Systemkeil mit Nivellierclip', specs: ['wiederverwendbar', '500 Stück', 'Systemzubehör'], imageFit: 'contain' },
  { id: 'ba-screw', category: 'baustelle', name: 'Dreh-Schraubsystem', description: 'Von Hand regulierbare Drehkappe für die kontrollierte Nivellierung von Keramik und Naturstein.', image: '/images/showcase/construction-screw.webp', imageAlt: 'Rote Drehkappe für ein Fliesen-Nivelliersystem', specs: ['zangenfrei', 'wiederverwendbar', 'Keramik & Stein'], imageFit: 'contain' },
  { id: 'ba-crosses', category: 'baustelle', name: 'Fliesen-Fugenkreuze', description: 'Kunststoff-Abstandhalter für gleichmässige Fugen bei Wand- und Bodenplatten.', image: '/images/showcase/construction-crosses.webp', imageAlt: 'Weisse Fugenkreuze für Fliesenarbeiten', specs: ['2,0–5,0 mm', 'mehrere Grössen', 'Wand & Boden'], imageFit: 'contain' },
  { id: 'ba-tower', category: 'baustelle', name: 'Abstandhalter-Turm', description: 'Punktuelle Kunststoffauflage zur definierten Betondeckung bei horizontaler Bewehrung.', image: '/images/showcase/construction-tower.webp', imageAlt: 'Kunststoff-Abstandhalter für horizontale Bewehrung', specs: ['20–50 mm', 'Decken & Bodenplatten', 'Projektmengen'], imageFit: 'contain' },
  { id: 'ba-star', category: 'baustelle', name: 'Klemmstern', description: 'Aufsteckbarer Rundabstandhalter für gleichmässige Betondeckung an Wänden und Stützen.', image: '/images/showcase/construction-star.webp', imageAlt: 'Runder Klemmstern auf einem Armierungseisen', specs: ['Wand & Stütze', 'mehrere Deckungen', 'Bewehrung'], imageFit: 'contain' },
  { id: 'ba-rail', category: 'baustelle', name: 'Distanzleiste Linear', description: 'Lineare Kunststoffleiste zur flächigen Abstützung der unteren Bewehrungslage.', image: '/images/showcase/construction-rail.webp', imageAlt: 'Lineare Distanzleiste für Bewehrungsarbeiten', specs: ['2 m Leiste', 'mehrere Höhen', 'Bodenplatten'], imageFit: 'contain' },
  { id: 'ba-caps', category: 'baustelle', name: 'Armierungs-Schutzkappen', description: 'Gut sichtbare Kunststoffkappen zum Abdecken freiliegender Armierungs- und Stabenden.', image: '/images/showcase/construction-caps.webp', imageAlt: 'Rote Schutzkappen für Armierungseisen', specs: ['temporärer Schutz', 'mehrere Durchmesser', 'Baustellensicherheit'], imageFit: 'contain' },
  { id: 'ba-wire', category: 'baustelle', name: 'Doppeldrahtbinder 14 cm', description: 'Vorgefertigte Drahtbinder mit zwei Ösen zum schnellen Verbinden von Armierungseisen.', image: '/images/showcase/construction-wire.webp', imageAlt: 'Rolle mit Doppeldrahtbindern für Armierungsarbeiten', specs: ['14 cm', 'Rollenware', 'Armierung'], imageFit: 'contain' },
  { id: 'ba-hook', category: 'baustelle', name: 'Drill-Bindehaken', description: 'Mechanischer Bindehaken zum schnellen Verdrillen von Doppeldrahtbindern.', image: '/images/showcase/construction-hook.webp', imageAlt: 'Bindehaken mit Holzgriff für Drahtbinder', specs: ['Holzgriff', 'rotierender Schaft', 'passend zu Drahtbindern'], imageFit: 'contain' },
];

export const products: Product[] = [...baseProducts, ...additionalCatalogProducts];

export const categoryById = Object.fromEntries(categories.map((category) => [category.id, category])) as Record<CategoryId, Category>;
