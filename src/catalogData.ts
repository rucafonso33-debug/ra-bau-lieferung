export type CategoryId =
  | 'grossformat'
  | 'keramik'
  | 'mosaik'
  | 'badmoebel'
  | 'sanitaer'
  | 'armaturen'
  | 'duschloesungen'
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

export interface Product {
  id: string;
  category: CategoryId;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  specs: string[];
  featured?: boolean;
}

export const categories: Category[] = [
  {
    id: 'grossformat',
    title: 'Grossformatplatten',
    eyebrow: 'Premium-Auswahl',
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
    title: 'Premium-Mosaike',
    eyebrow: 'Architektonische Details',
    description: 'Reliefs, lineare Formate und Natursteinwirkungen für Nischen, Duschen und Akzentflächen.',
    image: '/images/showcase/mosaic-linear.webp',
    imageAlt: 'Lineares helles Premium-Mosaik in einer Küche',
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
    id: 'sanitaer',
    title: 'Sanitärkeramik',
    eyebrow: 'Klar & funktional',
    description: 'Waschtische, WCs und ergänzende Produkte für private und gewerbliche Bäder.',
    image: '/images/showcase/washbasins-modern.webp',
    imageAlt: 'Moderne Waschtische in einem hellen Bad',
  },
  {
    id: 'armaturen',
    title: 'Armaturen & Duschen',
    eyebrow: 'Präzise abgestimmt',
    description: 'Waschtisch-, Wannen- und Duschlösungen in ausgewählten Oberflächen und Ausführungen.',
    image: '/images/showcase/shower-black.webp',
    imageAlt: 'Badezimmer mit mattschwarzen Armaturen und Dusche',
  },
  {
    id: 'duschloesungen',
    title: 'Duschwannen & Nischen',
    eyebrow: 'Bodennah geplant',
    description: 'Flache Duschwannen, Ablagen und Nischen für eine ruhige, durchgängige Badgestaltung.',
    image: '/images/showcase/shower-tray-slim.webp',
    imageAlt: 'Bodennahe helle Duschwanne in einem modernen Badezimmer',
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
    image: '/images/showcase/construction-leveling.webp',
    imageAlt: 'Nivelliersystem für die professionelle Fliesenverlegung',
  },
];

export const products: Product[] = [
  { id: 'gf-calacatta-gold', category: 'grossformat', name: 'Calacatta Gold', description: 'Warme Goldadern auf hellem Grund für repräsentative Wände, Duschen und Wohnbereiche.', image: '/images/showcase/calacatta-gold.webp', imageAlt: 'Grossformatplatte in heller Marmoroptik mit goldener Aderung', specs: ['bis 120 × 260 cm', '6 mm', 'poliert'], featured: true },
  { id: 'gf-calacatta-vein', category: 'grossformat', name: 'Calacatta Vein', description: 'Markante, durchlaufende Zeichnung für fugenarme Flächen mit architektonischer Wirkung.', image: '/images/showcase/calacatta-vein.webp', imageAlt: 'Grossformatige Marmoroptik mit markanter grauer Aderung', specs: ['bis 120 × 260 cm', '6 mm', 'poliert'], featured: true },
  { id: 'gf-onyx-white', category: 'grossformat', name: 'Onyx White', description: 'Transluzente Steinwirkung für elegante Bäder, Empfangsbereiche und Akzentwände.', image: '/images/showcase/onyx-white.webp', imageAlt: 'Eleganter Raum mit grossformatiger Onyx-Optik', specs: ['bis 120 × 260 cm', '6 mm', 'poliert'], featured: true },
  { id: 'gf-cement-silver', category: 'grossformat', name: 'Cement Silver', description: 'Ruhige mineralische Oberfläche für moderne, grosszügige Innenräume.', image: '/images/showcase/cement-silver.webp', imageAlt: 'Wohnraum mit grossformatiger Keramik in heller Betonoptik', specs: ['bis 120 × 240 cm', '6 mm', 'matt'], featured: true },

  { id: 'ke-travertin', category: 'keramik', name: 'Travertin Warm', description: 'Sanfte Natursteinstruktur mit warmer Tonalität für Wohnen, Bad und Hotellerie.', image: '/images/showcase/ceramic-travertine.webp', imageAlt: 'Warmer Wohnraum mit Feinsteinzeug in Travertin-Optik', specs: ['60 × 120 cm', 'rektifiziert', 'matt'] },
  { id: 'ke-marble-soft', category: 'keramik', name: 'Marble Soft', description: 'Zurückhaltende Marmorwirkung für helle, zeitlose Räume ohne visuelle Unruhe.', image: '/images/showcase/ceramic-marble.webp', imageAlt: 'Heller Wohnraum mit sanfter Marmoroptik', specs: ['60 × 120 cm', 'Wand & Boden', 'soft matt'] },
  { id: 'ke-concrete', category: 'keramik', name: 'Concrete Light', description: 'Gleichmässige Betonoptik für reduzierte Küchen, Bäder und offene Wohnflächen.', image: '/images/showcase/ceramic-concrete.webp', imageAlt: 'Moderner Raum mit grossformatiger Keramik in Betonoptik', specs: ['120 × 120 cm', 'rektifiziert', 'matt'] },
  { id: 'ke-wood', category: 'keramik', name: 'Oak Porcelain', description: 'Holzwirkung mit der Widerstandsfähigkeit von Feinsteinzeug für stark genutzte Bereiche.', image: '/images/showcase/ceramic-wood.webp', imageAlt: 'Boden aus Feinsteinzeug in natürlicher Holzoptik', specs: ['Dielenformat', 'pflegeleicht', 'innen & aussen'] },

  { id: 'mo-linear', category: 'mosaik', name: 'Linear Pearl', description: 'Schmale, vertikale Elemente für hochwertige Nischen, Küchenrückwände und Duschbereiche.', image: '/images/showcase/mosaic-linear.webp', imageAlt: 'Lineares helles Mosaik in einer modernen Küche', specs: ['Reliefstruktur', 'Akzentfläche', 'helle Glasur'] },
  { id: 'mo-natural', category: 'mosaik', name: 'Natural Stone Mix', description: 'Natürlich changierende Steine für warme Spa-Atmosphäre und individuelle Details.', image: '/images/showcase/mosaic-natural.webp', imageAlt: 'Duschbereich mit Mosaik aus natürlich wirkenden Steinen', specs: ['Natursteinwirkung', 'Duschwand', 'warme Töne'] },
  { id: 'mo-sand', category: 'mosaik', name: 'Terrazzo Sand', description: 'Fein abgestimmtes Raster mit mineralischer Körnung für ruhige, moderne Flächen.', image: '/images/showcase/mosaic-sand.webp', imageAlt: 'Beiges Mosaik mit mineralischer Terrazzo-Wirkung', specs: ['Rasterformat', 'matt', 'beige'] },
  { id: 'mo-travertine', category: 'mosaik', name: 'Travertin Lines', description: 'Lineare Steinstruktur als präzise Ergänzung zu grossformatigen Travertinflächen.', image: '/images/showcase/mosaic-travertine.webp', imageAlt: 'Lineares Mosaik in warmer Travertin-Optik', specs: ['lineares Format', 'Wand', 'naturwarm'] },

  { id: 'bm-walnut-double', category: 'badmoebel', name: 'Walnut Double 120', description: 'Schwebender Doppelwaschtisch mit gerillter Front und ruhiger, dunkler Holzoptik.', image: '/images/showcase/furniture-natural.webp', imageAlt: 'Schwebender Doppelwaschtisch mit gerillter dunkler Holzfront', specs: ['Doppelbecken', 'Hochschrank optional', 'Spiegel nach Wahl'] },
  { id: 'bm-oak-compact', category: 'badmoebel', name: 'Natural Oak 80', description: 'Kompakte Kombination aus Waschtisch, Rundspiegel und optionalem Hochschrank.', image: '/images/showcase/furniture-oak.webp', imageAlt: 'Kompaktes Badmöbel in heller Eiche mit Rundspiegel', specs: ['ca. 80 cm', 'hängend', 'gerillte Front'] },
  { id: 'bm-walnut-round', category: 'badmoebel', name: 'Walnut Curve 100', description: 'Abgerundete Fronten und dunkle Holzstruktur für ein wohnliches Premiumbad.', image: '/images/showcase/furniture-walnut.webp', imageAlt: 'Abgerundetes Badmöbel in dunkler Walnussoptik', specs: ['gerundete Front', 'Rundspiegel', 'Hochschrank optional'] },
  { id: 'bm-white-round', category: 'badmoebel', name: 'White Curve 100', description: 'Helle, gerillte Fronten mit weichen Radien für kleine und mittlere Bäder.', image: '/images/showcase/furniture-white.webp', imageAlt: 'Weisses Badmöbel mit gerundeter gerillter Front', specs: ['weiss matt', 'hängend', 'Rundspiegel'] },

  { id: 'sa-washbasin', category: 'sanitaer', name: 'Mineral Washbasin', description: 'Klar geformter Waschtisch für Einzel- oder Doppelplatz, projektbezogen konfiguriert.', image: '/images/showcase/washbasins-modern.webp', imageAlt: 'Moderner heller Waschtisch in einem minimalistischen Bad', specs: ['Einzel- oder Doppelplatz', 'pflegeleicht', 'projektbezogen'] },
  { id: 'sa-bathroom-set', category: 'sanitaer', name: 'Minimal Bathroom Set', description: 'Abgestimmte Sanitärkeramik für eine ruhige, funktionale Badgestaltung.', image: '/images/showcase/bathroom-minimal.webp', imageAlt: 'Minimalistisches Bad mit heller Sanitärkeramik', specs: ['Waschtisch & WC', 'mehrere Grössen', 'weiss'] },

  { id: 'ar-black', category: 'armaturen', name: 'Black Shower Line', description: 'Mattschwarze Armaturen und Duschkomponenten für klare Kontraste im Bad.', image: '/images/showcase/shower-black.webp', imageAlt: 'Mattschwarze Dusche und Armaturen in einem hellen Bad', specs: ['schwarz matt', 'Dusch- & Waschtisch', 'Sets möglich'] },
  { id: 'ar-chrome', category: 'armaturen', name: 'Chrome Essential', description: 'Zeitlose Chromoberfläche für robuste, pflegeleichte Projektlösungen.', image: '/images/showcase/chrome-essential.webp', imageAlt: 'Heller Waschtisch mit zeitloser Chromarmatur', specs: ['Chrom', 'mehrere Höhen', 'Projektserie'] },

  { id: 'du-tray', category: 'duschloesungen', name: 'Slim Shower Base', description: 'Flache Duschwanne für einen ruhigen Übergang und reduzierte Badarchitektur.', image: '/images/showcase/shower-tray-slim.webp', imageAlt: 'Flache helle Duschwanne in einem modernen Bad', specs: ['bodennah', 'mehrere Formate', 'rutschhemmend'] },
  { id: 'du-niche', category: 'duschloesungen', name: 'Integrated Niche', description: 'Passende Wandnische als funktionales Detail für Dusche und Badewanne.', image: '/images/showcase/bathroom-minimal.webp', imageAlt: 'Helles Bad mit integrierter Duschablage', specs: ['mehrere Grössen', 'leichte Reinigung', 'Einbauprodukt'] },

  { id: 'bo-herringbone', category: 'boden', name: 'Natural Herringbone', description: 'Warme Holzoptik im Fischgratformat für Renovationen und Wohnräume.', image: '/images/showcase/spc-herringbone.webp', imageAlt: 'SPC-Boden in natürlicher Fischgrat-Optik', specs: ['Fischgrat', 'pflegeleicht', 'Renovation'] },
  { id: 'bo-oak', category: 'boden', name: 'Oak XL', description: 'Ruhige, extralange Dielenoptik für grosszügige Wohn- und Arbeitsbereiche.', image: '/images/showcase/spc-oak.webp', imageAlt: 'SPC-Boden mit extralanger Dielenoptik in Eiche', specs: ['XL-Diele', 'Holzoptik', 'Nutzschicht'] },
  { id: 'bo-stone', category: 'boden', name: 'Mineral Stone', description: 'Robuste Steinoptik für pflegeleichte Eingangs-, Wohn- und Gewerbeflächen.', image: '/images/showcase/spc-stone.webp', imageAlt: 'SPC-Boden in grauer mineralischer Steinoptik', specs: ['Steinoptik', 'wasserbeständig', 'Projektboden'] },

  { id: 'ba-level', category: 'baustelle', name: 'Nivelliersystem', description: 'Clips und Keile für gleichmässige Fugen und plan liegende Keramikflächen.', image: '/images/showcase/leveling-system.webp', imageAlt: 'Komplettes Nivelliersystem mit Clips und Keilen', specs: ['Clips & Keile', 'mehrere Fugenbreiten', 'wiederverwendbar'] },
  { id: 'ba-spacers', category: 'baustelle', name: 'Distanzhalter', description: 'Stern-, Turm- und Fugendistanzen für präzise Abstände auf der Baustelle.', image: '/images/showcase/spacer-system.webp', imageAlt: 'Sternförmige Distanzhalter für Fliesenarbeiten', specs: ['mehrere Typen', 'präzise Abstände', 'Projektmengen'] },
  { id: 'ba-wire', category: 'baustelle', name: 'Bindedraht & Haken', description: 'Verbrauchsmaterial für Armierungs- und Betonarbeiten in abgestimmten Mengen.', image: '/images/showcase/binding-wire.webp', imageAlt: 'Bindedraht für Armierungsarbeiten', specs: ['Rollenware', 'passende Haken', 'Baustellenbedarf'] },
];

export const categoryById = Object.fromEntries(categories.map((category) => [category.id, category])) as Record<CategoryId, Category>;
