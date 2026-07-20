import { ConstructionCategory, InteriorCategory } from './types';

export const constructionCategories: ConstructionCategory[] = [
  {
    title: "Fliesen-Nivelliersysteme",
    description: "Mechanische Präzisionswerkzeuge für flächige, kantenfreie Verlegequalität.",
    bannerImage: "/images/fliesen-nivelliersystem-banner.png",
    products: [
      {
        name: "Präzisions-Fliesenclips",
        description: "Professionelle Fliesenclips für präzise und gleichmäßige Verlegung.",
        application: "In 1.0 mm, 1.5 mm, 2.0 mm und 3.0 mm Fugenschnitt",
        image: "/images/fliesen-clips.png"
      },
      {
        name: "System-Keile",
        description: "Robuste und mehrfach wiederverwendbare Keile für gleichmäßigen Anpressdruck.",
        application: "Ergonomische Druckverteilung",
        image: "/images/nivellier-keile-real.jpg.png"
      },
      {
        name: "Dreh-Schraubsystem",
        description: "Wiederverwendbares Nivelliersystem mit Drehkappen für kantenfreie Naturstein- und Keramikarbeiten.",
        application: "Stufenlose Regulierung per Hand, zangenfrei",
        image: "/images/fliesen-schraubsystem-real.jpg.png"
      },
      {
        name: "Industrie-Fugenkreuze",
        description: "Aus unverformbarem Kunststoff für exakte Fugenabstände bei Wand- & Bodenplatten.",
        application: "Varianten: 2.0 bis 5.0 mm",
        image: "/images/fugenkreuze.jpg"
      },
      {
        name: "Profi-Komplettset",
        description: "Vollständiges Set für anspruchsvolle Fliesenarbeiten (Clips, Keile, Systemzange).",
        application: "Komplettiert in robuster Transportbox",
        image: "/images/Komplettset.png"
      }
    ]
  },
  {
    title: "Bewehrung & Betonbau",
    description: "Zugelassene Systemkomponenten für Schalungsbau, Betonarbeiten und Bewehrungsschutz.",
    bannerImage: "/images/01_BAUSTELLENZUBEHOER.png",
    products: [
      {
        name: "Abstands-Turm",
        description: "Stabile, punktuelle Auflage für mittlere und schwere Bewehrungseisen.",
        application: "SIA-konforme Höhen: 20 bis 50 mm",
        image: "/images/distanzhalter-turm.jpg"
      },
      {
        name: "Klemmen-Stern",
        description: "Runder Abstandshalter für Bewehrungen. Garantiert hervorragende Rundum-Betondeckung.",
        application: "Für Armierungseisen Ø 40–50 mm",
        image: "/images/distanzhalter-stern.jpg"
      },
      {
        name: "Distanzleiste Linear",
        description: "Lineares Abstandshaltersystem für flächige Bewehrungsabstützungen auf Schalungen.",
        application: "SIA-Konform | Profil-Länge: 2.0 m",
        image: "/images/Distanzleiste.jpg"
      },
      {
        name: "Sicherheits-Schutzkappen",
        description: "Flexible, weithin sichtbare Schutzkappen für freiliegende Bewehrungsenden.",
        application: "Unfallschutz für alle gängigen Eisendurchmesser",
        image: "/images/Schutzkappen.jpg"
      },
      {
        name: "Rödel-Bindedraht",
        description: "Weichgeglühter Bindedraht für sichere Bewehrungsflechtung. Hochzugfest.",
        application: "Kompakte Rollen à 1 kg | Mühelos formbar",
        image: "/images/Bindedraht.jpg"
      },
      {
        name: "Ergonomischer Drill-Bindehaken",
        description: "Gugelgelagertes Bindewerkzeug zum zeitsparenden Verdrillen des Bindedrahts.",
        application: "Gummiertes Metallsystem für Dauerbetrieb",
        image: "/images/Bindehaken.jpg"
      }
    ]
  }
];

export const interiorCategories: InteriorCategory[] = [
  {
    title: "Porcelain Tiles",
    germanTitle: "Feinsteinzeug",
    description: "Moderne, technologisch ausgereifte Feinsteinzeugfliesen für anspruchsvolle Boden- und Wandgestaltungen.",
    products: [
      {
        name: "Travertino-Struktur",
        spec: "Formate z. B. 60×120 cm | Rektifiziert | Verpackung, Palettierung und m²/Palette werden je Werkreferenz bestätigt",
        details: "Mustergültige, überzeugend echte Travertin-Optik in warmen Sandtönen mit perfekt rektifizierten Kanten.",
        image: "/images/travertino-60x120.png",
        brand: "Gresco"
      },
      {
        name: "Naturstein-Design Beige",
        spec: "Formate z. B. 60×60 / 60×120 cm | R10/B | Frostbeständigkeit und m²/Palette gemäss Werkdatenblatt",
        details: "Dauerhaft strapazierfähige Materialoberfläche mit der echten Strukturtiefe und Haptik von geschnittenem Naturstein.",
        image: "/images/stone-look-60x60.png",
        brand: "Recer"
      },
      {
        name: "Sichtbeton-Optik Matt",
        spec: "Formate z. B. 90×90 / 120×120 cm | Rektifiziert | Karton- und Palettenmenge mit Offerte bestätigt",
        details: "Minimalistische Sichtbeton-Ästhetik für großflächige, feine Fugenbilder an Boden und Wand.",
        image: "/images/concrete-look-120x120.png",
        brand: "Gresco"
      },
      {
        name: "Edelholz-Keramikbelag",
        spec: "Dielenformate z. B. 20×120 cm | R9 | Verpackung und m²/Palette gemäss gewählter Referenz",
        details: "Die authentische, lebendige Wärme und Maserung von Holz, kombiniert mit der Beständigkeit von Feinsteinzeug.",
        image: "/images/wood-look-porcelain.png",
        brand: "Recer"
      },
      {
        name: "Marmor-Struktur Softmatt",
        spec: "Formate z. B. 60×120 / 120×120 cm | Softmatt | Palettierung und m²/Palette im Projektangebot",
        details: "Hochelegante Marmor-Optik mit weichem, seidenmattem Finish. Nahezu fugenlose Verlegung dank extrem enger Maßtoleranzen.",
        image: "/images/marble-look-soft-matte.png",
        brand: "Rubicer"
      },
      {
        name: "Gresco Terrassenplatte Outdoor",
        spec: "60×60 cm, 20 mm | R11 | Verpackung, Stückzahl und m²/Palette werden tagesaktuell bestätigt",
        details: "Extrem widerstandsfähige Feinsteinzeug-Terrassenplatte in strukturierter Natursteinoptik für Balkone, Terrassen und Aussenbereiche.",
        image: "/images/stone-look-60x60.png",
        brand: "Gresco"
      }
    ]
  },
  {
    title: "Premium Mosaics",
    germanTitle: "Premium Mosaike & Marmor-Grossformate",
    description: "Mosaike, Marmoroptiken und grossformatige Platten für gehobene Badarchitektur, Hotelkonzepte und repräsentative Innenräume.",
    products: [
      {
        name: "Klassisches Steinmosaik Beige",
        spec: "Mosaikmatte z. B. 30×30 cm | Netzgeklebt | Karton- und Palettenmenge je Referenz bestätigt",
        details: "Feinsinnig nuancierte Natursteinstruktur, perfekt geeignet für bodengleiche, rutschhemmende Duschen.",
        image: "/images/beige-stone-mosaic.png",
        brand: "Recer"
      },
      {
        name: "Travertin-Mosaikfliesen",
        spec: "Mosaikmatte z. B. 30×30 cm | Warm-Beige | Verpackung und m²/Palette gemäss Werkdatenblatt",
        details: "Antikisierter Travertin-Eindruck im klassischen Mosaik-Raster für warme, architektonisch anspruchsvolle Wände.",
        image: "/images/travertine-look-mosaics.png",
        brand: "Gresco"
      },
      {
        name: "Riegelmosaik Matt",
        spec: "Stäbchen-/Kitkat-Matte | Netzgeklebt | Kartoninhalt und m²/Palette mit Offerte bestätigt",
        details: "Die moderne, vertikal gestaltete Stabstruktur für skandinavisch inspirierte Küchen- und Badezimmerrückwände.",
        image: "/images/kitkat-mosaic.png",
        brand: "Recer"
      },
      {
        name: "Naturstein-Mosaik Premium",
        spec: "Mosaikmatte, poliert oder edelmatt | Palettierung und m²/Palette je Naturstein-Charge bestätigt",
        details: "Organische Formvollendung und bestechende Tiefenoptik für exklusive Wellness-Oasen und Luxus-Nassbereiche.",
        image: "/images/natural-stone-mosaics.png",
        brand: "Rubicer"
      },
      {
        name: "Statuario Marmoroptik XL",
        spec: "Grossformate bis ca. 200×200 cm | Softmatt oder poliert | Gestell-/Palettenlogistik projektbezogen bestätigt",
        details: "Ruhige Statuario-Zeichnung für grosszügige Wandflächen, Empfangsbereiche und luxuriöse Bäder mit reduziertem Fugenbild.",
        image: "/images/marble-look-soft-matte.png",
        brand: "Projektquelle Europa"
      },
      {
        name: "Calacatta Bookmatch Grossformat",
        spec: "Grossformatige Dekorplatten | Bookmatch-Planung | Verpackung, Gestell und m² je Transporteinheit im Angebot",
        details: "Ausdrucksstarke Calacatta-Optik für repräsentative Akzentwände und Waschtischbereiche; Aderverlauf wird vor Bestellung abgestimmt.",
        image: "/images/marble-look-soft-matte.png",
        brand: "Projektquelle Europa"
      }
    ]
  },
  {
    title: "SPC / Vinyl Flooring",
    germanTitle: "SPC / Vinyl-Designböden",
    description: "Extrem formstabile, feuchtigkeitsresistente Klick-Designböden für Renovationen und gewerbliche Räume.",
    products: [
      {
        name: "SPC Eiche Hell",
        spec: "Dielenformat werkabhängig | Integrierter Trittschall | Pakete, Stückzahl und m²/Palette im Angebot",
        details: "Lichtdurchflutetes, nordisches Eichenfurnier-Design mit widerstandsfähiger, kratzfester Nutzkantenversiegelung.",
        image: "/images/light-oak-spc.png",
        brand: "Corkart"
      },
      {
        name: "SPC Eiche Beige-Matt",
        spec: "Synchronprägung | Klicksystem | Verpackung und m²/Palette gemäss gewähltem Dekor",
        details: "Wohnliche, beige-braune Eichenoptik mit synchrongeprägter Premium-Maserung für fühlbare Holzhaptik.",
        image: "/images/beige-oak-matte-spc.png",
        brand: "Corkart"
      },
      {
        name: "SPC Steinstruktur Grauguss",
        spec: "Grossformat-Fliesenoptik | Klicksystem | Karton- und Palettenmenge je Referenz bestätigt",
        details: "Großformatige SPC-Fliesen in cooler Gussbeton-Ästhetik bei angenehmer, gelenkschonender Fußwärme.",
        image: "/images/stone-look-spc.png",
        brand: "Rubicer"
      },
      {
        name: "SPC Akustik-Klickboden",
        spec: "Akustikunterlage integriert | Hochformstabil | Pakete und m²/Palette mit Offerte bestätigt",
        details: "Zukunftsweisender Vinylboden für exzellente Raumakustik. Optimal für Hotelbauten und gehobene Mietobjekte.",
        image: "/images/acoustic-spc-flooring.png",
        brand: "Corkart"
      },
      {
        name: "Corkart Kork-Comfortparkett",
        spec: "Comfort Concept | Akustik & Wärme | Verpackung und m²/Palette gemäss Corkart-Referenz",
        details: "Nachhaltiger, hochelastischer Komfortboden aus echtem Kork. Bietet hervorragende Raumakustik, Gelenkschonung und angenehme Fusswärme.",
        image: "/images/04_SPC_VINYLBOEDEN.png",
        brand: "Corkart"
      },
      {
        name: "SPC Eiche Natur Gewerbe",
        spec: "Nutzung für stark frequentierte Innenräume | Klicksystem | Pakete, Verschleissklasse und m²/Palette im Angebot",
        details: "Ruhige natürliche Eichenoptik für Büros, Mietobjekte und Ladenflächen; projektbezogene Auswahl nach Nutzung, Aufbauhöhe und Akustikanforderung.",
        image: "/images/light-oak-spc.png",
        brand: "Projektquelle Europa"
      }
    ]
  },
  {
    title: "Bathroom Solutions",
    germanTitle: "Sanitäre Individuallösungen",
    description: "Sanitärtechnik und Ausstattungselemente mit erlesener Linienführung für langlebige Badloesungen.",
    products: [
      {
        name: "Ultraschlanke Duschwanne",
        spec: "Mineralguss, Format und Ablaufposition wählbar | Einzelverpackung und Palettierung mit Offerte bestätigt",
        details: "Bodengleiche, ungemein robuste Mineralguss-Duschwanne für barrierefreie, elegante Walk-In Architekturen.",
        image: "/images/slim-shower-tray.png",
        brand: "Moovlux"
      },
      {
        name: "Modularer Waschtisch",
        spec: "Breite und Ausführung projektbezogen | Push-to-Open | Verpackungseinheiten im Angebot",
        details: "Schwebendes High-End-Badmöbel mit eleganten Schattenfugen und integriertem Feuchtigkeitsschutz.",
        image: "/images/modern-washbasins.png",
        brand: "Accua Banho"
      },
      {
        name: "Aufsatzwaschbecken Feinkeramik",
        spec: "Feinkeramik | Aufsatzmontage | Abmessungen, Stück/Karton und Palettierung je Referenz",
        details: "Formvollendetes, geometrisches Aufsatzwaschbecken für mondäne, anmutige Master-Badezimmer.",
        image: "/images/minimalist-bathroom.png",
        brand: "Roca"
      },
      {
        name: "Roca Avant Wand-WC / Kompakt",
        spec: "Rimless | Wandmontage | Lieferumfang, Einzelverpackung und Palettierung je Referenz bestätigt",
        details: "Hygienisches, spülrandloses Premium Dusch-WC mit integrierter Warmwasser-Reinigungsfunktion, Lufttrocknung und Soft-Close-Automatik.",
        image: "/images/05_SANITAERLOESUNGEN.png",
        brand: "Roca"
      },
      {
        name: "Ramon Soler Alexia Armatur",
        spec: "Waschtischmischer | Matt-Schwarz | Lieferumfang und Verpackungseinheit mit Offerte bestätigt",
        details: "Präzisions-Mischbatterie mit Keramikkartusche und integriertem Wasser-Sparventil in edler Matt-Schwarzer Ausführung.",
        image: "/images/matte-black-details.png",
        brand: "Ramon Soler"
      },
      {
        name: "Toscana Unterputz-Duschsystem",
        spec: "Kopf- und Handbrause | Oberfläche projektbezogen | Lieferumfang und Verpackungseinheit im Angebot",
        details: "Komplettes Duschsystem für reduzierte, moderne Badkonzepte; Ausführung und Einbaukörper werden passend zur Planung abgeglichen.",
        image: "/images/imex-toscana-duschset.jpg",
        brand: "IMEX"
      }
    ]
  }
];
