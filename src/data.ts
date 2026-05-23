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
        image: "/images/nivellier-keile-real-fixed.png"
      },
      {
        name: "Dreh-Schraubsystem",
        description: "Wiederverwendbares Nivelliersystem mit Drehkappen für kantenfreie Naturstein- und Keramikarbeiten.",
        application: "Stufenlose Regulierung per Hand, zangenfrei",
        image: "/images/fliesen-schraubsystem-real-fixed.png"
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
    bannerImage: "/images/bewehrung-betonbau-banner.png",
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
        spec: "Premium Rektifiziert | Erstklassige Haptik",
        details: "Mustergültige, überzeugend echte Travertin-Optik in warmen Sandtönen mit perfekt rektifizierten Kanten.",
        image: "/images/travertino-60x120.png"
      },
      {
        name: "Naturstein-Design Beige",
        spec: "Rutschfestigkeit R10/B | Frostbeständig",
        details: "Dauerhaft strapazierfähige Materialoberfläche mit der echten Strukturtiefe und Haptik von geschnittenem Naturstein.",
        image: "/images/stone-look-60x60.png"
      },
      {
        name: "Sichtbeton-Optik Matt",
        spec: "Rektifizierte Präzision | Moderner Loft-Stil",
        details: "Minimalistische Sichtbeton-Ästhetik für großflächige, feine Fugenbilder an Boden und Wand.",
        image: "/images/concrete-look-120x120.png"
      },
      {
        name: "Edelholz-Keramikbelag",
        spec: "Rutschklasse R9 • Rektifiziert",
        details: "Die authentische, lebendige Wärme und Maserung von Holz, kombiniert mit der Beständigkeit von Feinsteinzeug.",
        image: "/images/wood-look-porcelain.png"
      },
      {
        name: "Marmor-Struktur Softmatt",
        spec: "Seidenmatte Veredelung | Homogene Oberfläche",
        details: "Hochelegante Marmor-Optik with weichem, seidenmattem Finish. Nahezu fugenlose Verlegung dank extrem enger Maßtoleranzen.",
        image: "/images/marble-look-soft-matte.png"
      }
    ]
  },
  {
    title: "Premium Mosaics",
    germanTitle: "Premium Mosaike",
    description: "Ästhetische Akzente für gehobene Badarchitektur, Hotelkonzepte und anspruchsvolle Nassbereiche.",
    products: [
      {
        name: "Klassisches Steinmosaik Beige",
        spec: "Netzgeklebt | Handverlesener Steinschliff",
        details: "Feinsinnig nuancierte Natursteinstruktur, perfekt geeignet für bodengleiche, rutschhemmende Duschen.",
        image: "/images/beige-stone-mosaic.png"
      },
      {
        name: "Travertin-Mosaikfliesen",
        spec: "Klassisches Format | Warm-Beige Nuance",
        details: "Antikisierter Travertin-Eindruck im klassischen Mosaik-Raster für warme, architektonisch anspruchsvolle Wände.",
        image: "/images/travertine-look-mosaics.png"
      },
      {
        name: "Riegelmosaik Matt",
        spec: "Symmetrisches Stäbchen-Design",
        details: "Die moderne, vertikal gestaltete Stabstruktur für skandinavisch inspirierte Küchen- und Badezimmerrückwände.",
        image: "/images/kitkat-mosaic.png"
      },
      {
        name: "Naturstein-Mosaik Premium",
        spec: "Polierte Oberfläche | Edelmatt veredelt",
        details: "Organische Formvollendung und bestechende Tiefenoptik für exklusive Wellness-Oasen und Luxus-Nassbereiche.",
        image: "/images/natural-stone-mosaics.png"
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
        spec: "Integrierter Trittschall | Extrem Strapazierfähig",
        details: "Lichtdurchflutetes, nordisches Eichenfurnier-Design mit widerstandsfähiger, kratzfester Nutzkantenversiegelung.",
        image: "/images/light-oak-spc.png"
      },
      {
        name: "SPC Eiche Beige-Matt",
        spec: "Synchrongeprägte Premium-Maserung",
        details: "Wohnliche, beige-braune Eichenoptik mit synchrongeprägter Premium-Maserung für fühlbare Holzhaptik.",
        image: "/images/beige-oak-matte-spc.png"
      },
      {
        name: "SPC Steinstruktur Grauguss",
        spec: "Großformat-Fliesenoptik | Gelenkschonend",
        details: "Großformatige SPC-Fliesen in cooler Gussbeton-Ästhetik bei angenehmer, gelenkschonender Fußwärme.",
        image: "/images/stone-look-spc.png"
      },
      {
        name: "SPC Akustik-Klickboden",
        spec: "Hervorragende Trittschallreduktion • Hochformstabil",
        details: "Zukunftsweisender Vinylboden für exzellente Raumakustik. Optimal für Hotelbauten und gehobene Mietobjekte.",
        image: "/images/acoustic-spc-flooring.png"
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
        spec: "Feine Schieferstruktur | Ultraschlaches Profil",
        details: "Bodengleiche, ungemein robuste Mineralguss-Duschwanne für barrierefreie, elegante Walk-In Architekturen.",
        image: "/images/slim-shower-tray.png"
      },
      {
        name: "Modularer Waschtisch",
        spec: "Echtholz-Furnier | Push-to-Open Auszüge",
        details: "Schwebendes High-End-Badmöbel mit eleganten Schattenfugen und integriertem Feuchtigkeitsschutz.",
        image: "/images/minimalist-bathroom.png"
      },
      {
        name: "Aufsatzwaschbecken Feinkeramik",
        spec: "Dünnwandige Keramik | Nano-Präzisionsglasur",
        details: "Formvollendetes, geometrisches Aufsatzwaschbecken für mondäne, anmutige Master-Badezimmer.",
        image: "/images/modern-washbasins.png"
      },
      {
        name: "Accessoires Mattschwarz",
        spec: "Kratzresistentes PVD-Finish",
        details: "Premium Armaturen, Design-Siphons und korrosionsfreie Accessoires für starke, elegante Akzente im modernen Bad.",
        image: "/images/matte-black-details.png"
      }
    ]
  }
];
