import { ConstructionCategory, InteriorCategory } from './types';

export const constructionCategories: ConstructionCategory[] = [
  {
    title: "Fliesen-Nivelliersysteme",
    description: "Mechanische Präzisionswerkzeuge für flächige, kantenfreie Verlegequalität.",
    products: [
      {
        name: "Fliesen Clips",
        description: "Professionelle Fliesenclips für präzise und gleichmäßige Verlegung.",
        application: "Verfügbar in 1 mm, 1.5 mm, 2 mm und 3 mm",
        image: "/images/fliesen-clips.png"
      },
      {
        name: "Nivelliersystem Keile",
        description: "Robuste und wiederverwendbare Keile für professionelle Fliesenarbeiten.",
        application: "Perfekter Druck auf Fliesen",
        image: "/images/nivellier-keile.jpg"
      },
      {
        name: "Schraubsystem",
        description: "Wiederverwendbares Nivelliersystem mit Schraubkappen für kantenfreie Stein- und Fliesenflächen.",
        application: "Stufenlose Regulierung per Hand, ohne zusätzliche Zange",
        image: "/images/fliesen-schraubsystem.png"
      },
      {
        name: "Fugenkreuze",
        description: "Aus robustem Kunststoff für gleichmäßige Fugenabstände bei Wand & Boden.",
        application: "2-5 mm verfügbar",
        image: "/images/fugenkreuze.jpg"
      },
      {
        name: "Komplettset",
        description: "Komplettset für professionelle Fliesenarbeiten (Clips, Keile, Zange).",
        application: "Sofort einsatzbereit in robuster Box",
        image: "/images/Komplettset.png"
      }
    ]
  },
  {
    title: "Beton & Armierung",
    description: "Robustes Zubehör für Schalungsbau, Betonierung und Bewehrungsschutz.",
    products: [
      {
        name: "Distanzhalter Turm",
        description: "Stabile, punktuelle Auflage für Bewehrungseisen. Verschiedene langlebige Höhen.",
        application: "SIA-Konforme Höhen: 20–50 mm",
        image: "/images/distanzhalter-turm.jpg"
      },
      {
        name: "Distanzhalter Stern",
        description: "Runder Abstandshalter für Bewehrung. Garantiert hervorragende Betondeckung.",
        application: "Durchmesser: 40–50 mm für Armierungen",
        image: "/images/distanzhalter-stern.jpg"
      },
      {
        name: "Distanzleiste",
        description: "Lineares Abstandshaltersystem für gleichmäßige Bewehrungsführung auf Schalungen.",
        application: "SIA-Konform | Länge: 2 m",
        image: "/images/Distanzleiste.jpg"
      },
      {
        name: "Schutzkappen",
        description: "Flexible Schutzkappen für freiliegende Bewehrungsenden zur Unfallvermeidung.",
        application: "Passend für alle gängigen Armierungseisen",
        image: "/images/Schutzkappen.jpg"
      },
      {
        name: "Bindedraht",
        description: "Qualitätsbindedraht für Bewehrungsarbeiten. Flexibel, stark und leicht zu verarbeiten.",
        application: "Verpackung: 1 kg pro Rolle | Hochbelastbar",
        image: "/images/Bindedraht.jpg"
      },
      {
        name: "Bindehaken",
        description: "Ergonomisches Bindewerkzeug zum schnellen und kraftschonenden Drill-Binden von Draht.",
        application: "Robustes Metall-Kugellagersystem",
        image: "/images/Bindehaken.jpg"
      }
    ]
  }
];

export const interiorCategories: InteriorCategory[] = [
  {
    title: "Porcelain Tiles",
    germanTitle: "Feinsteinzeug",
    description: "Moderne, technologisch anspruchsvolle Fliesen für exklusive Boden- und Wandgestaltungen.",
    products: [
      {
        name: "Travertino Look 60x120",
        spec: "Format: 60x120 cm | Stärke: 9 mm",
        details: "Mustergültige, überzeugend echte Travertin-Optik in warmen Sandtönen mit perfekt rektifizierten Kanten.",
        image: "/images/travertino-60x120.png"
      },
      {
        name: "Stone Look Beige 60x60",
        spec: "Format: 60x60 cm | Rutschfestigkeitsklasse (R10/B)",
        details: "Dauerhaft strapazierfähige Materialoberfläche mit der echten Strukturtiefe und Haptik von geschnittenem Naturstein.",
        image: "/images/stone-look-60x60.png"
      },
      {
        name: "Concrete Look Matte 120x120",
        spec: "Format: 120x120 cm | Fugenschlanke Rektifizierung",
        details: "Urbaner, minimalistischer Charakter in matter Sichtbeton-Ästhetik für großflächige, fugenarme Wände und Böden.",
        image: "/images/concrete-look-120x120.png"
      },
      {
        name: "Wood Look Porcelain",
        spec: "Format: 20x120 cm | Rutschklasse R9 | Rektifiziert",
        details: "Die authentische, lebendige Wärme und Maserung von Edelholz, kombiniert mit der unschlagbaren Resistenz von Keramik.",
        image: "/images/wood-look-porcelain.png"
      },
      {
        name: "Marble Look Soft Matte",
        spec: "Format: 60x120 cm | Edelmatt veredelt | Stärke: 9 mm",
        details: "Hochelegante Marmor-Optik mit weichem, seidenmattem Finish. Nahezu fugenlose Verlegung dank präzisester Rektifizierung.",
        image: "/images/marble-look-soft-matte.png"
      }
    ]
  },
  {
    title: "Premium Mosaics",
    germanTitle: "Premium Mosaike",
    description: "Konzeptionelle Akzente für anspruchsvolle Badarchitektur, SPA-Anlagen, Hotels und feine Wohnbereiche.",
    products: [
      {
        name: "Beige Stone Mosaic",
        spec: "Netzgeklebt | Premium-Naturstein Schliff",
        details: "Feinsinnig nuancierte Natursteinstruktur, perfekt geeignet für bodengleiche, rutschhemmende Duschen.",
        image: "/images/beige-stone-mosaic.png"
      },
      {
        name: "Travertine-look mosaics",
        spec: "Robustes Steingut | Warm-Beige Nuance",
        details: "Antikisierter Travertin-Eindruck im klassischen Mosaik-Raster für warme, architektonisch anspruchsvolle Wände.",
        image: "/images/travertine-look-mosaics.png"
      },
      {
        name: "KitKat Mosaic Matte",
        spec: "Riegelmosaik / Modernes Stäbchen-Design",
        details: "Das absolut angesagte Riegel-Mosaik für plastische, dreidimensionale Küchen- und Badezimmerrückwände.",
        image: "/images/kitkat-mosaic.png"
      },
      {
        name: "Natural stone-look mosaics",
        spec: "Polierte Oberfläche | Edelmatt veredelt",
        details: "Organische Formvollendung und bestechende Tiefenoptik für exklusive Wellness-Oasen und Luxus-Nassbereiche.",
        image: "/images/natural-stone-mosaics.png"
      }
    ]
  },
  {
    title: "SPC / Vinyl Flooring",
    germanTitle: "SPC / Vinyl-Designböden",
    description: "Extrem robuste, absolut wasserfeste Klick-Böden für anspruchsvolle Schweizer Renovierungsprojekte.",
    products: [
      {
        name: "Light Oak SPC",
        spec: "Stärke: 5.5 mm | Trittschalldämmung integriert",
        details: "Lichtdurchflutetes, nordisches Eichenfurnier-Design mit widerstandsfähiger, kratzfester Nutzkantenversiegelung.",
        image: "/images/light-oak-spc.png"
      },
      {
        name: "Beige oak matte SPC",
        spec: "Stärke: 6.0 mm | Ultra-Matt | Kratzfest",
        details: "Wohnliche, beige-braune Eichenoptik mit synchrongeprägter Premium-Maserung für fühlbare Holzhaptik.",
        image: "/images/beige-oak-matte-spc.png"
      },
      {
        name: "Stone Look SPC",
        spec: "Fliesenformat | Steinstruktur-Haptik | 5.0 mm",
        details: "Großformatige SPC-Fliesen in cooler Betonguss-Ästhetik bei angenehmer, gelenkschonender Fußwärme.",
        image: "/images/stone-look-spc.png"
      },
      {
        name: "Acoustic SPC click flooring",
        spec: "Hervorragende Trittschallreduktion | Hochformstabil",
        details: "Zukunftsweisender Vinylboden für exzellente Raumakustik. Optimal für Hotelbauten und gehobene Mietobjekte.",
        image: "/images/acoustic-spc-flooring.png"
      }
    ]
  },
  {
    title: "Bathroom Solutions",
    germanTitle: "Sanitäre Individuallösungen",
    description: "Durchdachte Schweizer Badprodukte mit feinen Linien für zeitgemässe, wertsteigernde Bad-Upgrades.",
    products: [
      {
        name: "Slim Shower Tray",
        spec: "Edle Schiefer-Stiegstruktur | Tiefe < 3cm",
        details: "Ultraschlanke, bodengleiche Mineralguss-Duschwanne für barrierefreie, elegante Walk-In Architekturen.",
        image: "/images/slim-shower-tray.png"
      },
      {
        name: "Minimalist Bathroom",
        spec: "Echtholz-Furnier | Push-to-Open Schubladen",
        details: "Schwebendes High-End-Badmöbel mit eleganten Schattenfugen und integriertem Feuchtigkeitsschutz.",
        image: "/images/minimalist-bathroom.png"
      },
      {
        name: "Modern washbasins",
        spec: "Dünnwandige Feinkeramik | Nano-Schmutzblockade",
        details: "Formvollendetes, geometrisches Aufsatzwaschbecken für mondäne, anmutige Master-Badezimmer.",
        image: "/images/modern-washbasins.png"
      },
      {
        name: "Matte black bathroom details",
        spec: "Mattschwarz | Kratzresistentes PVD-Verfahren",
        details: "Premium Armaturen, Design-Siphons und korrosionsfreie Accessoires für starke, elegante Akzente.",
        image: "/images/matte-black-details.png"
      }
    ]
  }
];
