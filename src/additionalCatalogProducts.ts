import type { CategoryId, Product, ProductSegment } from './catalogData';

type Meta = {
  brand: string;
  reference?: string;
  catalog: string;
  catalogPage: number;
  segment?: ProductSegment;
  featured?: boolean;
  visualKind?: 'room' | 'product';
  batch?: string;
};

const product = (
  category: CategoryId,
  id: string,
  name: string,
  description: string,
  imageName: string,
  specs: string[],
  meta: Meta,
): Product => ({
  id,
  category,
  name,
  description,
  image: `/images/catalog-2026/${imageName}.webp`,
  imageAlt: `${name} – ${meta.visualKind === 'room' ? 'Raumanwendung' : 'Produktdarstellung'} aus dem ${meta.brand}-Katalog`,
  specs,
  imageFit: meta.visualKind === 'room' ? 'cover' : 'contain',
  ...meta,
});

const recentRoomProduct = (
  category: CategoryId,
  id: string,
  name: string,
  description: string,
  imageName: string,
  specs: string[],
  meta: Meta,
) => product(category, id, name, description, imageName, specs, {
  ...meta,
  visualKind: 'room',
  batch: '2026-08-rubicer-gresco',
});

const grossformat: Product[] = [
  product('grossformat', 'gf-brescia', 'Brescia', 'Polierte Porzellanplatte mit heller, bewegter Marmorzeichnung für grosszügige Wand- und Bodenflächen.', 'slab-brescia', ['60 × 120 cm', 'Porzellan', 'poliert'], { brand: 'Rubicer', reference: 'Brescia Polido', catalog: 'Rubicer 26/27', catalogPage: 195, featured: true }),
  product('grossformat', 'gf-onyx-opal', 'Onyx Opal', 'Helle Onyxwirkung mit warmen, linearen Nuancen für Bäder, Empfangsbereiche und Akzentwände.', 'slab-onyx-opal', ['60 × 120 cm', 'Porzellan', 'poliert'], { brand: 'Rubicer', reference: 'Onyx Opal Polido', catalog: 'Rubicer 26/27', catalogPage: 197, featured: true }),
  product('grossformat', 'gf-iconic', 'Iconic', 'Ruhige Natursteinzeichnung in hellen Tönen für fugenarme Flächen mit zurückhaltender Eleganz.', 'slab-iconic', ['60 × 120 cm', 'Porzellan', 'poliert'], { brand: 'Rubicer', reference: 'Iconic Beige / White', catalog: 'Rubicer 26/27', catalogPage: 199, featured: true }),
  product('grossformat', 'gf-marmolux-polido', 'Marmolux Polido', 'Fein gezeichnete graue Marmoroptik für helle, präzise Innenräume und hochwertige Renovationen.', 'slab-marmolux-polido', ['60 × 120 cm', 'Porzellan', 'poliert'], { brand: 'Rubicer', reference: 'Marmolux Polido', catalog: 'Rubicer 26/27', catalogPage: 201, featured: true }),
  product('grossformat', 'gf-calcutta-cooper', 'Calcutta Cooper', 'Weisse Grundfläche mit warmen kupferfarbenen Adern für repräsentative Wände und Böden.', 'slab-calcutta-cooper', ['60 × 120 cm', 'Porzellan', 'poliert'], { brand: 'Rubicer', reference: 'Calcutta Cooper Polido', catalog: 'Rubicer 26/27', catalogPage: 201 }),
  product('grossformat', 'gf-signature-marfil', 'Signature Marfil', 'Warme Marfil-Optik mit sanfter Aderung für ruhige, helle Raumkonzepte.', 'slab-signature-marfil', ['60 × 120 cm', 'Porzellan', 'poliert'], { brand: 'Rubicer', reference: 'Signature Marfil Polido', catalog: 'Rubicer 26/27', catalogPage: 203 }),
  product('grossformat', 'gf-signature-gold', 'Signature Gold', 'Ausdrucksstarke Goldaderung auf hellem Grund für luxuriöse Akzentflächen.', 'slab-signature-gold', ['60 × 120 cm', 'Porzellan', 'poliert'], { brand: 'Rubicer', reference: 'Signature Gold Polido', catalog: 'Rubicer 26/27', catalogPage: 203 }),
  product('grossformat', 'gf-calacatta-supremo', 'Calacatta Supremo', 'Klassische Calacatta-Wirkung mit klaren grauen Adern für Bäder, Küchen und Wohnbereiche.', 'slab-calacatta-supremo', ['60 × 120 cm', 'Porzellan', 'poliert'], { brand: 'Rubicer', reference: 'Calacatta Supremo Polido', catalog: 'Rubicer 26/27', catalogPage: 205 }),
  product('grossformat', 'gf-statuario-norwell', 'Statuario Norwell', 'Heller Statuario-Charakter mit präziser Zeichnung für hochwertige Innenflächen.', 'slab-statuario-norwell', ['60 × 120 cm', 'Porzellan', 'poliert'], { brand: 'Rubicer', reference: 'Statuario Norwell Polido', catalog: 'Rubicer 26/27', catalogPage: 205 }),
  product('grossformat', 'gf-afyon', 'Afyon', 'Warme Natursteinoptik mit markanten Adern für exklusive Badezimmer und Wandflächen.', 'slab-afyon', ['60 × 120 cm', 'Porzellan', 'poliert'], { brand: 'Rubicer', reference: 'Afyon Polido', catalog: 'Rubicer 26/27', catalogPage: 207 }),
  product('grossformat', 'gf-rockford-grey', 'Rockford Grey', 'Graue, kontrastreiche Steinzeichnung für moderne Wohn- und Objektbereiche.', 'slab-rockford-grey', ['60 × 120 cm', 'Porzellan', 'poliert'], { brand: 'Rubicer', reference: 'Rockford Grey Polido', catalog: 'Rubicer 26/27', catalogPage: 207 }),
  product('grossformat', 'gf-emporium-beige', 'Emporium Beige', 'Beige Marmorwirkung mit warmer Aderung für einladende Verkaufs-, Wohn- und Badflächen.', 'slab-emporium-beige', ['60 × 120 cm', 'Porzellan', 'poliert'], { brand: 'Rubicer', reference: 'Emporium Beige Polido', catalog: 'Rubicer 26/27', catalogPage: 209 }),
  recentRoomProduct('grossformat', 'gf-endless-nordic-nude', 'Endless Nordic Nude', 'Durchlaufende warme Marmorzeichnung über vier Platten für grosszügige, ruhig komponierte Innenflächen.', 'slab-endless-nordic-nude', ['60 × 120 cm', 'Porzellan', 'poliert'], { brand: 'Rubicer', reference: 'REN60120NNUP', catalog: 'Rubicer 26/27', catalogPage: 211, featured: true }),
  recentRoomProduct('grossformat', 'gf-armani-oro-bianco', 'Armani Oro Bianco', 'Helle Marmoroptik mit feiner goldener Aderung für repräsentative Wohn-, Verkaufs- und Badbereiche.', 'slab-armani-oro-bianco', ['60 × 120 cm', 'Porzellan', 'poliert'], { brand: 'Rubicer', reference: 'RA60120ORBP', catalog: 'Rubicer 26/27', catalogPage: 213 }),
  recentRoomProduct('grossformat', 'gf-armani-calacatta-venattino', 'Armani Calacatta Venattino', 'Präzise graue Calacatta-Aderung auf hellem Grund für fugenarme Wände und hochwertige Bodenflächen.', 'slab-armani-calacatta-venattino', ['60 × 120 cm', 'Porzellan', 'poliert'], { brand: 'Rubicer', reference: 'RA60120VTIP', catalog: 'Rubicer 26/27', catalogPage: 215 }),
  recentRoomProduct('grossformat', 'gf-calacatta-titanio', 'Calacatta Titanio', 'Kontrastreiche Titanio-Aderung für markante Akzentwände, Empfangszonen und grosszügige Wohnräume.', 'slab-calacatta-titanio', ['60 × 120 cm', 'Porzellan', 'poliert'], { brand: 'Rubicer', reference: 'RC60120CALTIT', catalog: 'Rubicer 26/27', catalogPage: 221 }),
  recentRoomProduct('grossformat', 'gf-serpentine', 'Serpentine', 'Intensive grün-blaue Steinwirkung mit warmer Aderung für exklusive Bad- und Boutique-Flächen.', 'slab-serpentine', ['60 × 120 cm', 'Porzellan', 'Hochglanz'], { brand: 'Rubicer', reference: 'RCS60120SERP', catalog: 'Rubicer 26/27', catalogPage: 223, featured: true }),
  recentRoomProduct('grossformat', 'gf-obsidian-emerald', 'Obsidian Emerald', 'Dunkle Edelsteinwirkung mit tiefen Grüntönen für anspruchsvolle Waschtische, Wände und Möbelverkleidungen.', 'slab-obsidian-emerald', ['60 × 120 cm', 'Porzellan', 'Hochglanz'], { brand: 'Rubicer', reference: 'RCO60120EMRP', catalog: 'Rubicer 26/27', catalogPage: 225 }),
  recentRoomProduct('grossformat', 'gf-obsidian-saphire', 'Obsidian Saphire', 'Tiefblaue, lebendige Steinzeichnung für ausdrucksstarke Innenräume und kontrollierte Luxusakzente.', 'slab-obsidian-saphire', ['60 × 120 cm', 'Porzellan', 'Hochglanz'], { brand: 'Rubicer', reference: 'RCO60120SAFP', catalog: 'Rubicer 26/27', catalogPage: 227 }),
  recentRoomProduct('grossformat', 'gf-royal-nero', 'Royal Nero', 'Elegante schwarze Fläche mit feiner heller Aderung für Bäder, Gastronomie und repräsentative Gewerberäume.', 'slab-royal-nero', ['60 × 120 cm', 'Porzellan', 'Hochglanz'], { brand: 'Rubicer', reference: 'RC60120RONR', catalog: 'Rubicer 26/27', catalogPage: 229 }),
];

const grescoCeramics: Product[] = [
  recentRoomProduct('keramik', 'ke-gresco-lotus', 'Lotus Matt', 'Ruhige helle Wandfliese für zeitlose Badezimmer, Küchen und funktionale Projektflächen.', 'ceramic-lotus', ['30 × 60 cm', 'Wandfliese', 'matt'], { brand: 'Gresco', reference: 'Lotus Matt 30x60 Rev', catalog: 'Gresco / Recer 25/26', catalogPage: 12 }),
  recentRoomProduct('keramik', 'ke-gresco-ligna', 'Ligna Ornantes', 'Dekorative Holzoptik im kompakten Format für wohnliche Böden und charaktervolle Renovationen.', 'ceramic-ligna-ornantes', ['33 × 33 cm', 'Feinsteinzeug', 'Holzoptik'], { brand: 'Gresco', reference: 'Ligna Ornantes P11', catalog: 'Gresco / Recer 25/26', catalogPage: 24 }),
  recentRoomProduct('keramik', 'ke-gresco-passionis', 'Passionis', 'Warme Betonoptik in Beige und Taupe für durchgängige Wand- und Bodenlösungen.', 'ceramic-passionis', ['bis 120 × 60 cm', 'Feinsteinzeug', 'natur'], { brand: 'Gresco', reference: 'Passionis Light Beige / Taupe', catalog: 'Gresco / Recer 25/26', catalogPage: 32, featured: true }),
  recentRoomProduct('keramik', 'ke-gresco-saluto-grey', 'Saluto Grey', 'Abgestimmte graue Boden- und Wandserie mit ruhiger Zementwirkung für moderne Innenräume.', 'ceramic-saluto-grey', ['bis 60 × 60 cm', 'Wand & Boden', 'Grey'], { brand: 'Gresco', reference: 'Saluto Grey', catalog: 'Gresco / Recer 25/26', catalogPage: 36 }),
  recentRoomProduct('keramik', 'ke-gresco-mauna-white', 'Mauna White', 'Helle mineralische Oberfläche für klare Wohn-, Küchen- und Objektbereiche.', 'ceramic-mauna-white', ['30 × 60 cm', 'Feinsteinzeug', 'natur'], { brand: 'Gresco', reference: 'Mauna White P17', catalog: 'Gresco / Recer 25/26', catalogPage: 44 }),
  recentRoomProduct('keramik', 'ke-gresco-manhattan-beige', 'Manhattan Beige', 'Warme urbane Steinoptik für wohnliche Küchen, Bäder und offene Projektflächen.', 'ceramic-manhattan-beige', ['30 × 60 / 45 × 45 cm', 'Wand & Boden', 'Beige'], { brand: 'Gresco', reference: 'Manhattan Beige', catalog: 'Gresco / Recer 25/26', catalogPage: 48 }),
  recentRoomProduct('keramik', 'ke-gresco-majestic-beige', 'Majestic Beige', 'Sanfte Marmorwirkung in Beige für elegante Badezimmer und klassische Renovationen.', 'ceramic-majestic-beige', ['30 × 60 / 45 × 45 cm', 'Wand & Boden', 'Marmoroptik'], { brand: 'Gresco', reference: 'Majestic Beige', catalog: 'Gresco / Recer 25/26', catalogPage: 56 }),
  recentRoomProduct('keramik', 'ke-gresco-tresor-grey', 'Tresor Grey', 'Zurückhaltende graue Marmoroptik mit passenden Dekoren für abgestimmte Badkonzepte.', 'ceramic-tresor-grey', ['30 × 60 / 45 × 45 cm', 'Wand & Boden', 'Grey'], { brand: 'Gresco', reference: 'Tresor Grey', catalog: 'Gresco / Recer 25/26', catalogPage: 60 }),
  recentRoomProduct('keramik', 'ke-gresco-freestone', 'Freestone Light Grey', 'Grosszügige Natursteinoptik für Innen- und Aussenbereiche mit koordinierter Wandserie.', 'ceramic-freestone-light-grey', ['bis 60 × 60 cm', 'Feinsteinzeug', 'Light Grey'], { brand: 'Gresco', reference: 'Freestone Light Grey', catalog: 'Gresco / Recer 25/26', catalogPage: 72, featured: true }),
  recentRoomProduct('keramik', 'ke-gresco-melior', 'Melior Grey', 'Kompaktes graues Feinsteinzeug mit natürlicher Oberflächenwirkung für robuste Projektböden.', 'ceramic-melior-grey', ['33 × 33 cm', 'Feinsteinzeug', 'natur / soft'], { brand: 'Gresco', reference: 'Melior Grey P12', catalog: 'Gresco / Recer 25/26', catalogPage: 84 }),
  recentRoomProduct('keramik', 'ke-gresco-robust', 'Robust Brown', 'Strapazierfähige braune Aussenkeramik in Dielenformat für Terrassen, Wege und Poolbereiche.', 'ceramic-robust-brown', ['15 × 60 cm', 'Feinsteinzeug', 'aussen'], { brand: 'Gresco', reference: 'Robust Brown P21', catalog: 'Gresco / Recer 25/26', catalogPage: 96 }),
];

const mosaik: Product[] = [
  recentRoomProduct('mosaik', 'mo-gresco-play-home-blue', 'Play Home Blue', 'Grafisches Dekor in Blau und Weiss für charaktervolle Bäder, Nischen und Gastronomieflächen.', 'mosaic-play-home-blue', ['33 × 33 cm', 'Feinsteinzeug', 'Dekor'], { brand: 'Gresco', reference: 'Play Home Blue P15', catalog: 'Gresco / Recer 25/26', catalogPage: 16 }),
  product('mosaik', 'mo-vetra-ebony', 'Vetra Ebony Black', 'Schmales glasiertes Steinzeug in tiefem Schwarz für vertikale Akzente, Nischen und Rückwände.', 'mosaic-vetra-ebony', ['7,5 × 30 cm', 'glasiertes Steinzeug', 'Wand'], { brand: 'Recer', reference: 'Vetra Ebony Black G33', catalog: 'Recer 2026', catalogPage: 10 }),
  product('mosaik', 'mo-ritmo-pearl', 'Ritmo Pearl', 'Modulares Kleinformat mit ruhiger Oberfläche für koordinierte Bad- und Küchenwände.', 'mosaic-ritmo-pearl', ['10 × 10 cm', 'modular', 'Wand'], { brand: 'Recer', reference: 'Ritmo Pearl M43', catalog: 'Recer 2026', catalogPage: 14 }),
  product('mosaik', 'mo-twist-blue-sky', 'Twist Blue Sky', 'Farbige Kleinformatserie für lebendige Akzentflächen und individuelle Muster.', 'mosaic-twist-blue', ['10 × 10 cm', 'Wandfliese', 'Blue Sky'], { brand: 'Recer', reference: 'Twist Blue Sky', catalog: 'Recer 2026', catalogPage: 18 }),
  product('mosaik', 'mo-porto-verde', 'Porto Verde Escuro', 'Klassisches Rechteckformat in dunklem Grün für charaktervolle Wände und Nischen.', 'mosaic-porto-green', ['7,5 × 15 cm', 'glasiertes Steinzeug', 'Wand'], { brand: 'Recer', reference: 'Porto Verde Escuro', catalog: 'Recer 2026', catalogPage: 20 }),
  product('mosaik', 'mo-naprec-modul', 'Naprec Modul Gentle Grey', 'Modulares Kleinformat in sanftem Grau für strukturierte, zeitlose Wandflächen.', 'mosaic-naprec-modul', ['10 × 20 cm', 'modular', 'Wand'], { brand: 'Recer', reference: 'Naprec Modul Gentle Grey G26', catalog: 'Recer 2026', catalogPage: 23 }),
  product('mosaik', 'mo-naprec-on', 'Naprec On Orient Beige', 'Mosaikbogen in warmem Beige für Duschen, Nischen und koordinierte Wandkonzepte.', 'mosaic-naprec-on', ['30 × 30 cm', '10 × 10 Optik', 'Wand'], { brand: 'Recer', reference: 'Naprec On Orient Beige M37', catalog: 'Recer 2026', catalogPage: 25 }),
  product('mosaik', 'mo-magnes-green', 'Magnes Green', 'Schlankes grünes Wandformat mit handwerklicher Wirkung für hochwertige Akzente.', 'mosaic-magnes-green', ['7,5 × 30 cm', 'matt dekorierbar', 'Wand'], { brand: 'Recer', reference: 'Magnes Green', catalog: 'Recer 2026', catalogPage: 26 }),
  product('mosaik', 'mo-triplex-fronteira', 'Triplex Fronteira White', 'Grafisches 20-cm-Format in Schwarz-Weiss für klare, architektonische Muster.', 'mosaic-triplex-fronteira', ['20 × 20 cm', 'glasiertes Steinzeug', 'Wand'], { brand: 'Recer', reference: 'Triplex Fronteira White', catalog: 'Recer 2026', catalogPage: 28 }),
  product('mosaik', 'mo-true-mosaic', 'Mosaic True', 'Mosaik aus zufällig kombinierten Dekoren für lebendige, aber harmonische Flächen.', 'mosaic-true', ['30 × 30 cm', '4,5 × 4,5 Optik', '42 Dekore'], { brand: 'Recer', reference: 'Mosaic True G42', catalog: 'Recer 2026', catalogPage: 31 }),
  product('mosaik', 'mo-dot-m', 'Dot M', 'Geometrisches Kleinformat in mittlerem Motivmass für moderne Wandbilder und Akzentzonen.', 'mosaic-dot', ['10 × 10 cm', 'glasiertes Steinzeug', 'Wand'], { brand: 'Recer', reference: 'Dot M G28', catalog: 'Recer 2026', catalogPage: 32 }),
  product('mosaik', 'mo-twenties-diamond', 'Twenties Diamond', 'Dekoratives Kleinformat mit Diamantmotiv für Bäder, Gastronomie und Boutique-Flächen.', 'mosaic-twenties-diamond', ['20 × 20 cm', 'Dekorfliese', 'Wand'], { brand: 'Recer', reference: 'Twenties Diamond G21', catalog: 'Recer 2026', catalogPage: 34 }),
  product('mosaik', 'mo-revival-tulip', 'Revival Tulip', 'Historisch inspiriertes Tulpenmotiv für charaktervolle Renovationen und dekorative Flächen.', 'mosaic-revival-tulip', ['20 × 20 cm', 'Dekorfliese', 'Wand & Boden'], { brand: 'Recer', reference: 'Revival Tulip G21', catalog: 'Recer 2026', catalogPage: 36 }),
];

const furniture: Product[] = [
  product('badmoebel', 'bm-curvatto', 'Curvatto', 'Gerundete Möbelkomposition mit mehreren Breiten, Oberflächen und Waschtischvarianten.', 'furniture-curvatto', ['mehrere Breiten', '2 Schubladen', 'hängend'], { brand: 'Moovlux', reference: 'Serie Curvatto', catalog: 'Moovlux Badmöbel 2024', catalogPage: 44 }),
  product('badmoebel', 'bm-luxury', 'Luxury', 'Flexible Badmöbelserie für Einzel- und Doppelwaschplätze mit abgestimmten Spiegeln.', 'furniture-luxury', ['Einzel- oder Doppelbecken', 'mehrere Breiten', 'hängend'], { brand: 'Moovlux', reference: 'Serie Luxury', catalog: 'Moovlux Badmöbel 2024', catalogPage: 50 }),
  product('badmoebel', 'bm-round', 'Round', 'Badmöbel mit weicher Formensprache, runden Spiegeln und abgestimmten Frontvarianten.', 'furniture-round', ['gerundete Form', 'Spiegeloptionen', 'hängend'], { brand: 'Moovlux', reference: 'Serie Round', catalog: 'Moovlux Badmöbel 2024', catalogPage: 58 }),
  product('badmoebel', 'bm-classic', 'Classic', 'Bodenstehende Möbelserie mit klassischer Proportion und verschiedenen Front- und Waschtischoptionen.', 'furniture-classic', ['bodenstehend', 'mehrere Breiten', 'Soft-Close'], { brand: 'Moovlux', reference: 'Serie Classic', catalog: 'Moovlux Badmöbel 2024', catalogPage: 66 }),
  product('badmoebel', 'bm-discovery', 'Discovery', 'Modulare, geradlinige Badmöbelkomposition für Einzel- oder Doppelwaschplätze.', 'furniture-discovery', ['modular', 'mehrere Breiten', 'hängend'], { brand: 'Moovlux', reference: 'Serie Discovery', catalog: 'Moovlux Badmöbel 2024', catalogPage: 80 }),
  product('badmoebel', 'bm-laka', 'Laka', 'Klare Lackoberflächen und kombinierbare Abstellflächen für moderne Badezimmer.', 'furniture-laka', ['Lackfront', 'Stauraum', 'hängend'], { brand: 'Moovlux', reference: 'Serie Laka', catalog: 'Moovlux Badmöbel 2024', catalogPage: 90 }),
  product('badmoebel', 'bm-candy', 'Candy', 'Leichte, wohnliche Komposition mit flexiblen Breiten und passenden Spiegeln.', 'furniture-candy', ['mehrere Breiten', 'Einzel- oder Doppelbecken', 'hängend'], { brand: 'Moovlux', reference: 'Serie Candy', catalog: 'Moovlux Badmöbel 2024', catalogPage: 98 }),
  product('badmoebel', 'bm-modular', 'Modular', 'Planbare Module für individuell zusammengestellte Waschplätze und Stauraumlösungen.', 'furniture-modular', ['modular', 'kombinierbar', 'mehrere Oberflächen'], { brand: 'Moovlux', reference: 'Serie Modular', catalog: 'Moovlux Badmöbel 2024', catalogPage: 108 }),
  product('badmoebel', 'bm-tulip', 'Tulip', 'Kompaktes Badmöbel mit Soft-Close und unterschiedlichen Front- und Waschtischvarianten.', 'furniture-tulip', ['Soft-Close', 'kompakt', 'mehrere Oberflächen'], { brand: 'Moovlux', reference: 'Serie Tulip', catalog: 'Moovlux Badmöbel 2024', catalogPage: 114 }),
  product('badmoebel', 'bm-helios', 'Helios', 'Badmöbel mit MDF-Fronten und konfigurierbaren Farben für moderne Renovationen.', 'furniture-helios', ['MDF-Front', 'Soft-Close', 'konfigurierbar'], { brand: 'Moovlux', reference: 'Serie Helios', catalog: 'Moovlux Badmöbel 2024', catalogPage: 116 }),
  product('badmoebel', 'bm-bahia', 'Bahía Suspenso', 'Hängende Komposition mit Metallgriffen und kombinierbaren Oberflächen.', 'furniture-bahia', ['hängend', 'Metallgriffe', 'Soft-Close'], { brand: 'Moovlux', reference: 'Serie Bahía Suspenso', catalog: 'Moovlux Badmöbel 2024', catalogPage: 120 }),
  product('badmoebel', 'bm-sleep-one', 'Sleep #1', 'Niedrige, modulare Möbelkomposition für reduzierte Waschplätze und Aufsatzbecken.', 'furniture-sleep-one', ['modular', '34 cm Höhe', 'Soft-Close'], { brand: 'Moovlux', reference: 'Serie Sleep #1', catalog: 'Moovlux Badmöbel 2024', catalogPage: 126 }),
];

const faucets: Product[] = [
  product('bad', 'ar-tube-tl1001', 'Tube Chrom', 'Waschtischarmatur mit zylindrischer Form, Keramikkartusche und Schnellbefestigung.', 'faucet-tube-chrome', ['Chrom', 'Waschtisch', 'Keramikkartusche'], { brand: 'Moovlux', reference: 'TL1001', catalog: 'Moovlux Bad 2026', catalogPage: 6, segment: 'Armaturen' }),
  product('bad', 'ar-tube-tl1002', 'Tube Schwarz Matt', 'Zylindrische Waschtischarmatur in mattem Schwarz für kontrastreiche Badkonzepte.', 'faucet-tube-black', ['Schwarz matt', 'Waschtisch', 'Keramikkartusche'], { brand: 'Moovlux', reference: 'TL1002', catalog: 'Moovlux Bad 2026', catalogPage: 11, segment: 'Armaturen' }),
  product('bad', 'ar-tube-tl1004', 'Tube Gold', 'Waschtischarmatur in Goldausführung mit klarer, reduzierter Linienführung.', 'faucet-tube-gold', ['Gold', 'Waschtisch', 'Keramikkartusche'], { brand: 'Moovlux', reference: 'TL1004', catalog: 'Moovlux Bad 2026', catalogPage: 15, segment: 'Armaturen' }),
  product('bad', 'ar-tube-tl1019', 'Tube Schwarz + Rose Gold', 'Zweifarbige Waschtischarmatur als präziser Akzent für individuelle Badlösungen.', 'faucet-tube-black-rose', ['Schwarz matt', 'Rose Gold', 'Waschtisch'], { brand: 'Moovlux', reference: 'TL1019', catalog: 'Moovlux Bad 2026', catalogPage: 19, segment: 'Armaturen' }),
  product('bad', 'ar-tube-tl1005', 'Tube Gun Metal', 'Waschtischarmatur in dunkler Gun-Metal-Oberfläche für moderne Materialkombinationen.', 'faucet-tube-gunmetal', ['Gun Metal', 'Waschtisch', 'Keramikkartusche'], { brand: 'Moovlux', reference: 'TL1005', catalog: 'Moovlux Bad 2026', catalogPage: 23, segment: 'Armaturen' }),
  product('bad', 'ar-tube-tl1006', 'Tube Rose Gold', 'Warme Rose-Gold-Ausführung mit schlanker zylindrischer Form.', 'faucet-tube-rose', ['Rose Gold', 'Waschtisch', 'Keramikkartusche'], { brand: 'Moovlux', reference: 'TL1006', catalog: 'Moovlux Bad 2026', catalogPage: 27, segment: 'Armaturen' }),
  product('bad', 'ar-quadra-tl1009', 'Quadra Chrom', 'Eckige Waschtischarmatur mit präzisen Kanten und hochglänzender Chromoberfläche.', 'faucet-quadra-chrome', ['Chrom', 'Waschtisch', 'eckige Form'], { brand: 'Moovlux', reference: 'TL1009', catalog: 'Moovlux Bad 2026', catalogPage: 33, segment: 'Armaturen' }),
  product('bad', 'ar-quadra-tl1010', 'Quadra Schwarz Matt', 'Eckige Waschtischarmatur in mattem Schwarz für reduzierte Badarchitektur.', 'faucet-quadra-black', ['Schwarz matt', 'Waschtisch', 'eckige Form'], { brand: 'Moovlux', reference: 'TL1010', catalog: 'Moovlux Bad 2026', catalogPage: 37, segment: 'Armaturen' }),
  product('bad', 'ar-quadra-tl1011', 'Quadra Gold', 'Geometrische Waschtischarmatur in Gold für hochwertige Akzentsetzungen.', 'faucet-quadra-gold', ['Gold', 'Waschtisch', 'eckige Form'], { brand: 'Moovlux', reference: 'TL1011', catalog: 'Moovlux Bad 2026', catalogPage: 41, segment: 'Armaturen' }),
  product('bad', 'ar-quadra-tl1012', 'Quadra Gun Metal', 'Dunkle Metalloberfläche und klare Geometrie für zeitgemässe Waschplätze.', 'faucet-quadra-gunmetal', ['Gun Metal', 'Waschtisch', 'eckige Form'], { brand: 'Moovlux', reference: 'TL1012', catalog: 'Moovlux Bad 2026', catalogPage: 45, segment: 'Armaturen' }),
  product('bad', 'ar-quadra-tl1013', 'Quadra Rose Gold', 'Eckige Armatur mit warmer Rose-Gold-Oberfläche für charaktervolle Bäder.', 'faucet-quadra-rose', ['Rose Gold', 'Waschtisch', 'eckige Form'], { brand: 'Moovlux', reference: 'TL1013', catalog: 'Moovlux Bad 2026', catalogPage: 49, segment: 'Armaturen' }),
  product('bad', 'ar-stick-tl1007', 'Stick Chrom', 'Schlanke Waschtischarmatur mit schwenkbarer Form und Chromoberfläche.', 'faucet-stick-chrome', ['Chrom', 'Waschtisch', '360°'], { brand: 'Moovlux', reference: 'TL1007', catalog: 'Moovlux Bad 2026', catalogPage: 54, segment: 'Armaturen' }),
  product('bad', 'ar-stick-tl1008', 'Stick Schwarz Matt', 'Schlanke, schwenkbare Waschtischarmatur in mattem Schwarz.', 'faucet-stick-black', ['Schwarz matt', 'Waschtisch', '360°'], { brand: 'Moovlux', reference: 'TL1008', catalog: 'Moovlux Bad 2026', catalogPage: 56, segment: 'Armaturen' }),
  product('bad', 'ar-tess-tl1016', 'Tess Chrom', 'Kompakte Waschtischarmatur mit Keramikkartusche und glänzender Oberfläche.', 'faucet-tess-chrome', ['Chrom', 'Waschtisch', 'Keramikkartusche'], { brand: 'Moovlux', reference: 'TL1016', catalog: 'Moovlux Bad 2026', catalogPage: 59, segment: 'Armaturen' }),
  product('bad', 'ar-tess-tl1018', 'Tess Schwarz Matt', 'Kompakte Waschtischarmatur in mattem Schwarz für klare Kontraste.', 'faucet-tess-black', ['Schwarz matt', 'Waschtisch', 'Keramikkartusche'], { brand: 'Moovlux', reference: 'TL1018', catalog: 'Moovlux Bad 2026', catalogPage: 60, segment: 'Armaturen' }),
  product('bad', 'ar-tess-tl1017', 'Tess Nickel', 'Waschtischarmatur in Nickeloptik mit ausgewogener, funktionaler Geometrie.', 'faucet-tess-nickel', ['Nickel', 'Waschtisch', 'Keramikkartusche'], { brand: 'Moovlux', reference: 'TL1017', catalog: 'Moovlux Bad 2026', catalogPage: 61, segment: 'Armaturen' }),
  product('bad', 'ar-sensor-tl1014', 'Sensor Chrom', 'Berührungsarme Sensorarmatur in Chrom für hygienische Waschplätze.', 'faucet-sensor-chrome', ['Chrom', 'Sensor', '2 Wasseranschlüsse'], { brand: 'Moovlux', reference: 'TL1014', catalog: 'Moovlux Bad 2026', catalogPage: 63, segment: 'Armaturen' }),
  product('bad', 'ar-sensor-tl1015', 'Sensor Schwarz Matt', 'Berührungsarme Sensorarmatur in mattem Schwarz für moderne Gewerbe- und Badbereiche.', 'faucet-sensor-black', ['Schwarz matt', 'Sensor', '2 Wasseranschlüsse'], { brand: 'Moovlux', reference: 'TL1015', catalog: 'Moovlux Bad 2026', catalogPage: 63, segment: 'Armaturen' }),
];

const showers: Product[] = [
  product('bad', 'ds-rd1015', 'Ella / Tube Chrom', 'Komplette Duschsäule mit Kopf- und Handbrause in Chrom.', 'shower-tube-rd1015', ['Duschsäule', 'Chrom', 'Kopf- & Handbrause'], { brand: 'Moovlux', reference: 'RD1015', catalog: 'Moovlux Bad 2026', catalogPage: 8, segment: 'Duschsysteme' }),
  product('bad', 'ds-rd1003', 'Ella / Tube Thermostat Chrom', 'Thermostatische Duschsäule mit Kopf- und Handbrause in Chrom.', 'shower-tube-rd1003', ['Duschsäule', 'Thermostat', 'Chrom'], { brand: 'Moovlux', reference: 'RD1003', catalog: 'Moovlux Bad 2026', catalogPage: 8, segment: 'Duschsysteme' }),
  product('bad', 'ds-ep1011', 'Stick Unterputz Chrom', 'Komplettes Unterputz-Duschset mit Kopfbrause, Handbrause und Easy Box.', 'shower-stick-ep1011', ['Unterputz', 'Chrom', 'Easy Box'], { brand: 'Moovlux', reference: 'EP1011', catalog: 'Moovlux Bad 2026', catalogPage: 8, segment: 'Duschsysteme' }),
  product('bad', 'ds-ep1021', 'Stick Unterputz Thermostat Chrom', 'Thermostatisches Unterputz-Duschset mit Kopf- und Handbrause.', 'shower-stick-ep1021', ['Unterputz', 'Thermostat', 'Chrom'], { brand: 'Moovlux', reference: 'EP1021', catalog: 'Moovlux Bad 2026', catalogPage: 8, segment: 'Duschsysteme' }),
  product('bad', 'ds-rd1016', 'Ella / Tube Schwarz Matt', 'Komplette Duschsäule in mattem Schwarz mit Kopf- und Handbrause.', 'shower-tube-rd1016', ['Duschsäule', 'Schwarz matt', 'Kopf- & Handbrause'], { brand: 'Moovlux', reference: 'RD1016', catalog: 'Moovlux Bad 2026', catalogPage: 13, segment: 'Duschsysteme' }),
  product('bad', 'ds-rd1004', 'Ella / Tube Thermostat Schwarz', 'Thermostatische Duschsäule in mattem Schwarz.', 'shower-tube-rd1004', ['Duschsäule', 'Thermostat', 'Schwarz matt'], { brand: 'Moovlux', reference: 'RD1004', catalog: 'Moovlux Bad 2026', catalogPage: 13, segment: 'Duschsysteme' }),
  product('bad', 'ds-ep1012', 'Stick Unterputz Schwarz', 'Unterputz-Duschset in mattem Schwarz mit Easy Box.', 'shower-stick-ep1012', ['Unterputz', 'Schwarz matt', 'Easy Box'], { brand: 'Moovlux', reference: 'EP1012', catalog: 'Moovlux Bad 2026', catalogPage: 13, segment: 'Duschsysteme' }),
  product('bad', 'ds-ep1022', 'Stick Unterputz Thermostat Schwarz', 'Thermostatisches Unterputz-Duschset in mattem Schwarz.', 'shower-stick-ep1022', ['Unterputz', 'Thermostat', 'Schwarz matt'], { brand: 'Moovlux', reference: 'EP1022', catalog: 'Moovlux Bad 2026', catalogPage: 13, segment: 'Duschsysteme' }),
  product('bad', 'ds-rd1018', 'Ella / Tube Gold', 'Komplette Duschsäule in Gold mit Kopf- und Handbrause.', 'shower-tube-rd1018', ['Duschsäule', 'Gold', 'Kopf- & Handbrause'], { brand: 'Moovlux', reference: 'RD1018', catalog: 'Moovlux Bad 2026', catalogPage: 17, segment: 'Duschsysteme' }),
  product('bad', 'ds-rd1006', 'Ella / Tube Thermostat Gold', 'Thermostatische Duschsäule in Gold für hochwertige Badlösungen.', 'shower-tube-rd1006', ['Duschsäule', 'Thermostat', 'Gold'], { brand: 'Moovlux', reference: 'RD1006', catalog: 'Moovlux Bad 2026', catalogPage: 17, segment: 'Duschsysteme' }),
  product('bad', 'ds-ep1015', 'Stick Unterputz Gold', 'Unterputz-Duschset in Gold mit Kopfbrause, Handbrause und Easy Box.', 'shower-stick-ep1015', ['Unterputz', 'Gold', 'Easy Box'], { brand: 'Moovlux', reference: 'EP1015', catalog: 'Moovlux Bad 2026', catalogPage: 17, segment: 'Duschsysteme' }),
  product('bad', 'ds-ep1023', 'Stick Unterputz Thermostat Gold', 'Thermostatisches Unterputz-Duschset in Gold.', 'shower-stick-ep1023', ['Unterputz', 'Thermostat', 'Gold'], { brand: 'Moovlux', reference: 'EP1023', catalog: 'Moovlux Bad 2026', catalogPage: 17, segment: 'Duschsysteme' }),
  product('bad', 'ds-rd1020', 'Ella / Tube Rose Gold', 'Komplette Duschsäule in Rose Gold mit Kopf- und Handbrause.', 'shower-tube-rd1020', ['Duschsäule', 'Rose Gold', 'Kopf- & Handbrause'], { brand: 'Moovlux', reference: 'RD1020', catalog: 'Moovlux Bad 2026', catalogPage: 21, segment: 'Duschsysteme' }),
  product('bad', 'ds-rd1008', 'Ella / Tube Thermostat Rose Gold', 'Thermostatische Duschsäule in warmer Rose-Gold-Ausführung.', 'shower-tube-rd1008', ['Duschsäule', 'Thermostat', 'Rose Gold'], { brand: 'Moovlux', reference: 'RD1008', catalog: 'Moovlux Bad 2026', catalogPage: 21, segment: 'Duschsysteme' }),
  product('bad', 'ds-ep1017', 'Stick Unterputz Rose Gold', 'Unterputz-Duschset in Rose Gold mit Easy Box.', 'shower-stick-ep1017', ['Unterputz', 'Rose Gold', 'Easy Box'], { brand: 'Moovlux', reference: 'EP1017', catalog: 'Moovlux Bad 2026', catalogPage: 21, segment: 'Duschsysteme' }),
  product('bad', 'ds-ep1025', 'Stick Unterputz Thermostat Rose Gold', 'Thermostatisches Unterputz-Duschset in Rose Gold.', 'shower-stick-ep1025', ['Unterputz', 'Thermostat', 'Rose Gold'], { brand: 'Moovlux', reference: 'EP1025', catalog: 'Moovlux Bad 2026', catalogPage: 21, segment: 'Duschsysteme' }),
  product('bad', 'ds-rd1019', 'Ella / Tube Gun Metal', 'Komplette Duschsäule in Gun Metal mit Kopf- und Handbrause.', 'shower-tube-rd1019', ['Duschsäule', 'Gun Metal', 'Kopf- & Handbrause'], { brand: 'Moovlux', reference: 'RD1019', catalog: 'Moovlux Bad 2026', catalogPage: 25, segment: 'Duschsysteme' }),
  product('bad', 'ds-rd1007', 'Ella / Tube Thermostat Gun Metal', 'Thermostatische Duschsäule in dunkler Gun-Metal-Oberfläche.', 'shower-tube-rd1007', ['Duschsäule', 'Thermostat', 'Gun Metal'], { brand: 'Moovlux', reference: 'RD1007', catalog: 'Moovlux Bad 2026', catalogPage: 25, segment: 'Duschsysteme' }),
  product('bad', 'ds-ep1016', 'Stick Unterputz Gun Metal', 'Unterputz-Duschset in Gun Metal mit Easy Box.', 'shower-stick-ep1016', ['Unterputz', 'Gun Metal', 'Easy Box'], { brand: 'Moovlux', reference: 'EP1016', catalog: 'Moovlux Bad 2026', catalogPage: 25, segment: 'Duschsysteme' }),
  product('bad', 'ds-ep1024', 'Stick Unterputz Thermostat Gun Metal', 'Thermostatisches Unterputz-Duschset in Gun Metal.', 'shower-stick-ep1024', ['Unterputz', 'Thermostat', 'Gun Metal'], { brand: 'Moovlux', reference: 'EP1024', catalog: 'Moovlux Bad 2026', catalogPage: 25, segment: 'Duschsysteme' }),
];

const sanitary: Product[] = [
  product('bad', 'sa-fly-btw-cappuccino', 'Fly BTW Cappuccino', 'Bodenstehendes Back-to-Wall-WC in Cappuccino mit kompakter, weicher Form.', 'sanitary-fly-btw-cappuccino', ['Back-to-Wall', 'Cappuccino', 'WC'], { brand: 'Rubicer', reference: 'RSA2342XMC', catalog: 'Rubicer 26/27', catalogPage: 248, segment: 'Sanitärkeramik' }),
  product('bad', 'sa-fly-btw-compact', 'Fly BTW Compact White', 'Kompaktes Back-to-Wall-WC in Weiss für platzbewusste Badlösungen.', 'sanitary-fly-btw-compact', ['Back-to-Wall', 'kompakt', 'Weiss'], { brand: 'Rubicer', reference: 'RKWST003BR', catalog: 'Rubicer 26/27', catalogPage: 250, segment: 'Sanitärkeramik' }),
  product('bad', 'sa-elegant-btw-cappuccino', 'Elegant BTW Cappuccino', 'Back-to-Wall-WC mit klarer Geometrie in warmer Cappuccino-Ausführung.', 'sanitary-elegant-btw-cappuccino', ['Back-to-Wall', 'Cappuccino', 'WC'], { brand: 'Rubicer', reference: 'Serie Elegant BTW', catalog: 'Rubicer 26/27', catalogPage: 252, segment: 'Sanitärkeramik' }),
  product('bad', 'sa-elegant-btw-dark-grey', 'Elegant BTW Dark Grey', 'Back-to-Wall-WC in dunklem Grau für kontrastreiche, moderne Badezimmer.', 'sanitary-elegant-btw-dark-grey', ['Back-to-Wall', 'Dunkelgrau', 'WC'], { brand: 'Rubicer', reference: 'Serie Elegant BTW', catalog: 'Rubicer 26/27', catalogPage: 252, segment: 'Sanitärkeramik' }),
  product('bad', 'sa-glamic-btw-grey', 'Glamic BTW Grey', 'Back-to-Wall-WC in Grau mit markanter, zeitgemässer Form.', 'sanitary-glamic-btw-grey', ['Back-to-Wall', 'Grau', 'WC'], { brand: 'Rubicer', reference: 'RSA2330XMHGLM', catalog: 'Rubicer 26/27', catalogPage: 256, segment: 'Sanitärkeramik' }),
  product('bad', 'sa-glamic-btw-compact', 'Glamic BTW Compact White', 'Kompaktes Back-to-Wall-WC der Glamic-Serie in Weiss.', 'sanitary-glamic-btw-compact', ['Back-to-Wall', 'kompakt', 'Weiss'], { brand: 'Rubicer', reference: 'RSWM9908GLM', catalog: 'Rubicer 26/27', catalogPage: 258, segment: 'Sanitärkeramik' }),
  product('bad', 'sa-bohemic-black', 'Bohemic Black', 'Schwarzes WC mit klassisch interpretierter Form für charaktervolle Badezimmer.', 'sanitary-bohemic-black', ['WC', 'Schwarz matt', 'klassische Form'], { brand: 'Rubicer', reference: 'RS1088BMCPRTMT', catalog: 'Rubicer 26/27', catalogPage: 260, segment: 'Sanitärkeramik' }),
  product('bad', 'sa-new-retro', 'New Retro', 'Sanitärkeramik mit traditioneller Formensprache für hochwertige Renovationen.', 'sanitary-new-retro', ['WC', 'Weiss', 'Retro-Design'], { brand: 'Rubicer', reference: 'RS5615', catalog: 'Rubicer 26/27', catalogPage: 262, segment: 'Sanitärkeramik' }),
  product('bad', 'sa-mega-btw', 'Mega BTW', 'Geradliniges Back-to-Wall-WC für moderne, funktionale Badkonzepte.', 'sanitary-mega-btw', ['Back-to-Wall', 'Weiss', 'WC'], { brand: 'Rubicer', reference: 'RST06MEGABRC', catalog: 'Rubicer 26/27', catalogPage: 263, segment: 'Sanitärkeramik' }),
  product('bad', 'sa-max-btw', 'Max BTW', 'Kompaktes Back-to-Wall-WC mit ruhiger, geschlossener Silhouette.', 'sanitary-max-btw', ['Back-to-Wall', 'Weiss', 'WC'], { brand: 'Rubicer', reference: 'RSC205FMAXBRC', catalog: 'Rubicer 26/27', catalogPage: 264, segment: 'Sanitärkeramik' }),
  product('bad', 'sa-ultra-rimless', 'Ultra Rimless', 'Zeitgemässes WC mit Rimless-Ausführung für pflegeleichte Sanitärbereiche.', 'sanitary-ultra-rimless', ['WC', 'Rimless', 'Weiss'], { brand: 'Rubicer', reference: 'RS600CUL', catalog: 'Rubicer 26/27', catalogPage: 265, segment: 'Sanitärkeramik' }),
  product('bad', 'sa-moon-wall-catalog', 'Moon Wall-Hung', 'Wandhängendes WC mit leichter Silhouette und freiem Bodenbereich.', 'sanitary-moon-wall', ['wandhängend', 'WC', 'Weiss'], { brand: 'Rubicer', reference: 'Serie Moon', catalog: 'Rubicer 26/27', catalogPage: 268, segment: 'Sanitärkeramik' }),
  product('bad', 'sa-fly-wall-cappuccino', 'Fly Wall-Hung Cappuccino', 'Wandhängendes WC der Fly-Serie in warmer Cappuccino-Oberfläche.', 'sanitary-fly-wall-cappuccino', ['wandhängend', 'Cappuccino', 'WC'], { brand: 'Rubicer', reference: 'Serie Fly Suspenso', catalog: 'Rubicer 26/27', catalogPage: 270, segment: 'Sanitärkeramik' }),
  product('bad', 'sa-fly-wall-black', 'Fly Wall-Hung Black', 'Wandhängendes WC der Fly-Serie in Schwarz für präzise Kontraste.', 'sanitary-fly-wall-black', ['wandhängend', 'Schwarz', 'WC'], { brand: 'Rubicer', reference: 'Serie Fly Suspenso', catalog: 'Rubicer 26/27', catalogPage: 270, segment: 'Sanitärkeramik' }),
  product('bad', 'sa-glamic-wall-grey', 'Glamic Wall-Hung Grey', 'Wandhängendes WC in Grau mit markanter Glamic-Geometrie.', 'sanitary-glamic-wall-grey', ['wandhängend', 'Grau', 'WC'], { brand: 'Rubicer', reference: 'Serie Glamic Suspenso', catalog: 'Rubicer 26/27', catalogPage: 272, segment: 'Sanitärkeramik' }),
  product('bad', 'sa-elegant-wall-black', 'Elegant Wall-Hung Black', 'Wandhängendes WC in Schwarz mit klarer, reduzierter Form.', 'sanitary-elegant-wall-black', ['wandhängend', 'Schwarz', 'WC'], { brand: 'Rubicer', reference: 'Serie Elegant Suspenso', catalog: 'Rubicer 26/27', catalogPage: 274, segment: 'Sanitärkeramik' }),
];

const trays: Product[] = [
  product('bad', 'du-revo', 'Revo', 'Flache Duschwanne mit passender Ablaufabdeckung und mehreren Standardfarben.', 'tray-revo', ['70–90 cm Breite', 'mehrere Längen', '5 Farben'], { brand: 'Moovlux', reference: 'Serie Revo', catalog: 'Moovlux Bad 2026', catalogPage: 137, segment: 'Duschwannen' }),
  product('bad', 'du-candor', 'Candor', 'Duschwanne mit linearer Abdeckung für grosszügige, ruhige Duschflächen.', 'tray-candor', ['70–90 cm Breite', 'mehrere Längen', '5 Farben'], { brand: 'Moovlux', reference: 'Serie Candor', catalog: 'Moovlux Bad 2026', catalogPage: 141, segment: 'Duschwannen' }),
  product('bad', 'du-quore', 'Quore', 'Flache Duschwanne mit breiter, farblich abgestimmter Ablaufabdeckung.', 'tray-quore', ['70–90 cm Breite', 'mehrere Längen', '5 Farben'], { brand: 'Moovlux', reference: 'Serie Quore', catalog: 'Moovlux Bad 2026', catalogPage: 145, segment: 'Duschwannen' }),
  product('bad', 'du-silky', 'Silky', 'Reduzierte Duschwanne mit dezentem Ablauf und mehreren Farb- und Massoptionen.', 'tray-silky', ['mehrere Formate', '5 Farben', 'flach'], { brand: 'Moovlux', reference: 'Serie Silky', catalog: 'Moovlux Bad 2026', catalogPage: 149, segment: 'Duschwannen' }),
  product('bad', 'du-silky-frame', 'Silky + Frame', 'Silky-Duschwanne mit optionalen Rahmenkanten für angepasste Einbausituationen.', 'tray-silky-frame', ['1–4 Rahmenkanten', 'Massanpassung', '5 Farben'], { brand: 'Moovlux', reference: 'Silky + Frame', catalog: 'Moovlux Bad 2026', catalogPage: 152, segment: 'Duschwannen' }),
  product('bad', 'du-concept', 'Concept', 'Rechteckige Duschwanne in ausgewählten Standardformaten für kompakte Bäder.', 'tray-concept', ['mehrere Formate', 'rechteckig', 'Duschwanne'], { brand: 'Moovlux', reference: 'Serie Concept', catalog: 'Moovlux Bad 2026', catalogPage: 155, segment: 'Duschwannen' }),
  product('bad', 'du-aurea', 'Aurea', 'Duschwanne mit seitlicher Dreieckabdeckung, wahlweise links oder rechts.', 'tray-aurea', ['70 cm Breite', '120–200 cm', 'Ablauf links/rechts'], { brand: 'Moovlux', reference: 'Serie Aurea', catalog: 'Moovlux Bad 2026', catalogPage: 157, segment: 'Duschwannen' }),
  product('bad', 'du-pyros', 'Pyros Stonex', 'Extraflache Stonex-Duschwanne mit abgestimmter Twist-Ablaufabdeckung.', 'tray-pyros', ['bis 200 × 100 cm', '38 mm', 'Stonex'], { brand: 'Roca', reference: 'Pyros', catalog: 'Roca 2025/26', catalogPage: 122, segment: 'Duschwannen' }),
  product('bad', 'du-aquos', 'Aquos Stonex', 'Rechteckige Stonex-Duschwanne mit seitlicher Ablaufzone und mehreren Formaten.', 'tray-aquos', ['bis 200 × 100 cm', 'Stonex', 'mehrere Farben'], { brand: 'Roca', reference: 'Aquos', catalog: 'Roca 2025/26', catalogPage: 122, segment: 'Duschwannen' }),
  product('bad', 'du-terran', 'Terran Stonex', 'Vielseitige Stonex-Duschwanne in rechteckigen und kompakten Formaten.', 'tray-terran', ['mehrere Formate', 'Stonex', 'extraflach'], { brand: 'Roca', reference: 'Terran', catalog: 'Roca 2025/26', catalogPage: 122, segment: 'Duschwannen' }),
  product('bad', 'du-modo', 'Modo Surfex', 'Auf Mass anpassbare Surfex-Duschwanne mit homogener weisser Oberfläche.', 'tray-modo', ['100–160 cm', '60–80 cm', 'zuschneidbar'], { brand: 'Roca', reference: 'Modo', catalog: 'Roca 2025/26', catalogPage: 123, segment: 'Duschwannen' }),
  product('bad', 'du-cratos', 'Cratos Senceramic', 'Extraflache Senceramic-Duschwanne mit rutschhemmender Oberfläche.', 'tray-cratos', ['bis 180 × 80 cm', 'Senceramic', 'rutschhemmend'], { brand: 'Roca', reference: 'Cratos', catalog: 'Roca 2025/26', catalogPage: 123, segment: 'Duschwannen' }),
  product('bad', 'du-neo-daiquiri', 'Neo Daiquiri', 'Rechteckige Acryl-Duschwanne in zahlreichen Längen und drei Breiten.', 'tray-neo-daiquiri', ['90–180 cm', '70–80 cm', 'Acryl'], { brand: 'Roca', reference: 'Neo Daiquiri', catalog: 'Roca 2025/26', catalogPage: 124, segment: 'Duschwannen' }),
  product('bad', 'du-easy', 'Easy', 'Kompakte Acryl-Duschwanne in quadratischen und gerundeten Ausführungen.', 'tray-easy', ['75–100 cm', 'Acryl', 'mehrere Formen'], { brand: 'Roca', reference: 'Easy', catalog: 'Roca 2025/26', catalogPage: 124, segment: 'Duschwannen' }),
  product('bad', 'du-granada-flat', 'Granada Flat', 'Flache Acryl-Duschwanne für rechteckige Einbausituationen.', 'tray-granada-flat', ['100–140 cm', 'Acryl', 'flach'], { brand: 'Roca', reference: 'Granada Flat', catalog: 'Roca 2025/26', catalogPage: 124, segment: 'Duschwannen' }),
  product('bad', 'du-granada-compact', 'Granada Compact', 'Kompakte Acryl-Duschwanne für kleinere oder gerundete Duschbereiche.', 'tray-granada-compact', ['80–90 cm', 'Acryl', 'kompakt'], { brand: 'Roca', reference: 'Granada Compact', catalog: 'Roca 2025/26', catalogPage: 124, segment: 'Duschwannen' }),
  product('bad', 'du-malta', 'Malta', 'Porzellan-Duschwanne mit strukturierter Standfläche für robuste Badlösungen.', 'tray-malta', ['90–120 cm', 'Porzellan', '65 mm'], { brand: 'Roca', reference: 'Malta', catalog: 'Roca 2025/26', catalogPage: 124, segment: 'Duschwannen' }),
  product('bad', 'du-italia', 'Italia', 'Porzellan-Duschwanne in rechteckigen oder gerundeten Ausführungen.', 'tray-italia', ['80–140 cm', 'Porzellan', 'mehrere Formen'], { brand: 'Roca', reference: 'Italia', catalog: 'Roca 2025/26', catalogPage: 124, segment: 'Duschwannen' }),
];

// These references stay in the source catalogue, but remain unpublished until a
// supplier-approved photograph or clean render is available. Their current PDF
// pages contain only drawings, multi-product tables, or imagery of another item.
const qualityHoldIds = new Set([
  'sa-fly-btw-cappuccino',
  'sa-fly-btw-compact',
  'sa-elegant-btw-cappuccino',
  'sa-elegant-btw-dark-grey',
  'sa-glamic-btw-grey',
  'sa-glamic-btw-compact',
  'sa-bohemic-black',
  'sa-new-retro',
  'sa-fly-wall-cappuccino',
  'sa-fly-wall-black',
  'sa-glamic-wall-grey',
  'du-concept',
  'du-aquos',
  'du-terran',
  'du-easy',
  'du-granada-flat',
  'du-granada-compact',
  'du-italia',
]);

export const additionalCatalogProducts: Product[] = [
  ...grossformat,
  ...grescoCeramics,
  ...mosaik,
  ...furniture,
  ...faucets,
  ...showers,
  ...sanitary,
  ...trays,
].filter((item) => !qualityHoldIds.has(item.id));
