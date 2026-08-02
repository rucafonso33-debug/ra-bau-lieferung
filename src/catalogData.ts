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
  imageFit?: 'cover' | 'contain';
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
    title: 'Premium-Mosaik & Steinfliesen',
    eyebrow: 'Natursteinwirkung',
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
    image: '/images/showcase/construction-site.webp',
    imageAlt: 'Baustelle mit Bewehrung und Abstandhaltern',
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

  { id: 'mo-travertin-brick', category: 'mosaik', name: 'Travertin Brick', description: 'Fein abgestimmtes Stäbchenmosaik in warmer Travertinoptik für Duschen, Nischen und Spa-Bereiche.', image: '/images/showcase/stone-mosaic-travertin.webp', imageAlt: 'Stäbchenmosaik in warmer Travertinoptik', specs: ['Mosaik', 'Travertinoptik', 'warm matt'] },
  { id: 'mo-marble-diamond', category: 'mosaik', name: 'Calacatta Diamond', description: 'Geometrisches Mosaik in heller Marmoroptik für elegante Duschen, Nischen und exklusive Akzentwände.', image: '/images/showcase/stone-mosaic-grand.webp', imageAlt: 'Geometrisches Mosaik in heller Calacatta-Marmoroptik', specs: ['Mosaik', 'Marmoroptik', 'Wand & Dusche'] },
  { id: 'mo-grand-tile', category: 'mosaik', name: 'Grand Stone Ivory', description: 'Helle Steinfliese für durchgängige Bad- und Wohnflächen mit natürlicher, zurückhaltender Bewegung.', image: '/images/showcase/stone-tile-grand.webp', imageAlt: 'Helles Badezimmer mit grosszügigen Fliesen in Steinoptik', specs: ['Steinfliese', 'Wand & Boden', 'rektifiziert'] },
  { id: 'mo-vein-tile', category: 'mosaik', name: 'Limestone Vein', description: 'Elegante Fliese mit feiner Kalksteinaderung für ruhige Premiumflächen und koordinierte Wandkonzepte.', image: '/images/showcase/stone-tile-vein.webp', imageAlt: 'Helle Fliese mit feiner natürlicher Kalksteinaderung', specs: ['Steinfliese', 'Kalksteinoptik', 'matt'] },

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

  { id: 'ba-clips', category: 'baustelle', name: 'Nivellierclips', description: 'Einweg-Zuglaschen für gleichmässige Fugen und eine plane Verlegung von Wand- und Bodenplatten.', image: '/images/showcase/construction-clips.webp', imageAlt: 'Transparenter Nivellierclip für Fliesen', specs: ['1,0–3,0 mm', "1'000 Stück", 'Wand & Boden'], imageFit: 'contain' },
  { id: 'ba-wedges', category: 'baustelle', name: 'System-Keile', description: 'Mehrfach verwendbare Keile für kontrollierten Anpressdruck im Clip-Nivelliersystem.', image: '/images/showcase/construction-wedges.webp', imageAlt: 'Roter Systemkeil mit Nivellierclip', specs: ['wiederverwendbar', '500 Stück', 'Systemzubehör'], imageFit: 'contain' },
  { id: 'ba-screw', category: 'baustelle', name: 'Dreh-Schraubsystem', description: 'Von Hand regulierbare Drehkappe für die kontrollierte Nivellierung von Keramik und Naturstein.', image: '/images/showcase/construction-screw.webp', imageAlt: 'Rote Drehkappe für ein Fliesen-Nivelliersystem', specs: ['zangenfrei', 'wiederverwendbar', 'Keramik & Stein'], imageFit: 'contain' },
  { id: 'ba-crosses', category: 'baustelle', name: 'Fliesen-Fugenkreuze', description: 'Kunststoff-Abstandhalter für gleichmässige Fugen bei Wand- und Bodenplatten.', image: '/images/showcase/construction-crosses.webp', imageAlt: 'Weisse Fugenkreuze für Fliesenarbeiten', specs: ['2,0–5,0 mm', 'mehrere Grössen', 'Wand & Boden'], imageFit: 'contain' },
  { id: 'ba-starter', category: 'baustelle', name: "Starterset 1'000 + 500", description: 'Einstiegspaket aus Nivellierclips, wiederverwendbaren Keilen und Systemzange.', image: '/images/showcase/construction-set.webp', imageAlt: 'Komplettset mit Clips, Keilen und Systemzange', specs: ["1'000 Clips", '500 Keile', 'inkl. Zange'], imageFit: 'contain' },
  { id: 'ba-project', category: 'baustelle', name: "Projektset 2'500 + 500", description: 'Verbrauchspaket für grössere Flächen mit hoher Clip-Menge und wiederverwendbarer Keilbasis.', image: '/images/showcase/construction-set.webp', imageAlt: 'Projektset mit Clips, Keilen und Systemzange', specs: ["2'500 Clips", '500 Keile', 'Projektmenge'], imageFit: 'contain' },
  { id: 'ba-tower', category: 'baustelle', name: 'Abstandhalter-Turm', description: 'Punktuelle Kunststoffauflage zur definierten Betondeckung bei horizontaler Bewehrung.', image: '/images/showcase/construction-tower.webp', imageAlt: 'Kunststoff-Abstandhalter für horizontale Bewehrung', specs: ['20–50 mm', 'Decken & Bodenplatten', 'Projektmengen'], imageFit: 'contain' },
  { id: 'ba-star', category: 'baustelle', name: 'Klemmstern', description: 'Aufsteckbarer Rundabstandhalter für gleichmässige Betondeckung an Wänden und Stützen.', image: '/images/showcase/construction-star.webp', imageAlt: 'Runder Klemmstern auf einem Armierungseisen', specs: ['Wand & Stütze', 'mehrere Deckungen', 'Bewehrung'], imageFit: 'contain' },
  { id: 'ba-rail', category: 'baustelle', name: 'Distanzleiste Linear', description: 'Lineare Kunststoffleiste zur flächigen Abstützung der unteren Bewehrungslage.', image: '/images/showcase/construction-rail.webp', imageAlt: 'Lineare Distanzleiste für Bewehrungsarbeiten', specs: ['2 m Leiste', 'mehrere Höhen', 'Bodenplatten'], imageFit: 'contain' },
  { id: 'ba-caps', category: 'baustelle', name: 'Armierungs-Schutzkappen', description: 'Gut sichtbare Kunststoffkappen zum Abdecken freiliegender Armierungs- und Stabenden.', image: '/images/showcase/construction-caps.webp', imageAlt: 'Rote Schutzkappen für Armierungseisen', specs: ['temporärer Schutz', 'mehrere Durchmesser', 'Baustellensicherheit'], imageFit: 'contain' },
  { id: 'ba-wire', category: 'baustelle', name: 'Doppeldrahtbinder 14 cm', description: 'Vorgefertigte Drahtbinder mit zwei Ösen zum schnellen Verbinden von Armierungseisen.', image: '/images/showcase/construction-wire.webp', imageAlt: 'Rolle mit Doppeldrahtbindern für Armierungsarbeiten', specs: ['14 cm', 'Rollenware', 'Armierung'], imageFit: 'contain' },
  { id: 'ba-hook', category: 'baustelle', name: 'Drill-Bindehaken', description: 'Mechanischer Bindehaken zum schnellen Verdrillen von Doppeldrahtbindern.', image: '/images/showcase/construction-hook.webp', imageAlt: 'Bindehaken mit Holzgriff für Drahtbinder', specs: ['Holzgriff', 'rotierender Schaft', 'passend zu Drahtbindern'], imageFit: 'contain' },
];

export const categoryById = Object.fromEntries(categories.map((category) => [category.id, category])) as Record<CategoryId, Category>;
