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
    description: "Ausgewählte Feinsteinzeug-Serien mit belastbaren Werkdaten für Wohnbau, Renovation und Objektgeschäft.",
    products: [
      {
        id: "rubicer-rapolano-60120",
        name: "Rapolano Chiaro",
        spec: "60×120 cm · rektifiziert · matt · V3",
        details: "Warm mineralische Travertinoptik für ruhige Boden- und Wandflächen. Frostbeständiges glasiertes Feinsteinzeug.",
        image: "/images/catalog/rubicer-rapolano.png",
        brand: "Rubicer",
        reference: "RRA60120CHM",
        format: "600×1200 mm · 8,5 mm",
        finish: "Matt · rektifiziert · V3",
        application: "Boden & Wand · Innen/Aussen",
        box: "2 Platten · 1,44 m² · 26,50 kg",
        pallet: "32 Kartons · 46,08 m² · 870 kg",
        lead: "Projektbezogene Verfügbarkeit",
        badges: ["Frostbeständig", "Neu"],
        featured: true
      },
      {
        id: "rubicer-toscana-carving",
        name: "Toscana Carving",
        spec: "60×120 cm · Carving · matt mit glänzender Ader",
        details: "Helle Steinoptik mit fühlbar vertieften, glänzenden Adern. Eine starke Akzentplatte für hochwertige Bäder und Wohnräume.",
        image: "/images/catalog/rubicer-toscana.png",
        brand: "Rubicer",
        reference: "RTO60120CAR",
        format: "600×1200 mm · 8,5 mm",
        finish: "Carving · rektifiziert",
        application: "Boden & Wand · Innenbereich",
        box: "2 Platten · 1,44 m² · 31 kg",
        pallet: "36 Kartons · 51,84 m² · 1.130 kg",
        badges: ["Carving", "Neu"]
      },
      {
        id: "recer-mastery-12060",
        name: "Mastery Natural / Polished",
        spec: "120×60R cm · Natur oder poliert",
        details: "Koordinierte Marmorserie mit grossformatigem Feinsteinzeug, Wandplatten und passendem Mastery-Mix-Mosaik.",
        image: "/images/catalog/recer-mastery.png",
        brand: "Recer",
        reference: "Serie Mastery · R30/R36",
        format: "1198×598 mm · 9,5 mm",
        finish: "Natural oder poliert",
        application: "Boden & Wand · Innenbereich",
        box: "2 Platten · 1,44 m² · 31,80 kg",
        pallet: "34 Kartons · 48,96 m² · 1.089 kg",
        badges: ["Marmoroptik", "Koordinierte Serie"],
        featured: true
      },
      {
        id: "recer-bluenza-warm-grey",
        name: "Bluenza Warm Grey",
        spec: "120×60R cm · Natur · V4",
        details: "Charaktervolle Natursteinserie mit starker Tonvariation, R10/B und koordinierten Ripple- sowie Mosaikvarianten.",
        image: "/images/catalog/recer-bluenza.png",
        brand: "Recer",
        reference: "Bluenza Warm Grey · R29",
        format: "1198×598 mm · 9,5 mm",
        finish: "Natural · rektifiziert · V4",
        application: "Boden & Wand · Innen/Aussen",
        box: "2 Platten · 1,44 m² · 31,80 kg",
        pallet: "34 Kartons · 48,96 m² · 1.089 kg",
        badges: ["R10/B", "V4"]
      },
      {
        id: "recer-pixstone-air-warm",
        name: "Pixstone Air Warm",
        spec: "60×60R cm · Terrazzooptik · V3",
        details: "Helle, zeitgemässe Terrazzooptik mit passenden Wandformaten und zwei geometrischen Mosaikvarianten.",
        image: "/images/catalog/recer-pixstone.png",
        brand: "Recer",
        reference: "Pixstone Air Warm · R22",
        format: "598×598 mm · 8,5 mm",
        finish: "Natural · rektifiziert",
        application: "Boden & Wand · Innen/Aussen",
        box: "4 Platten · 1,43 m² · 26,50 kg",
        pallet: "36 Kartons · 51,48 m² · 968 kg",
        badges: ["In & Out", "Mosaik verfügbar"]
      }
    ]
  },
  {
    title: "Premium Mosaics",
    germanTitle: "Premium Mosaike",
    description: "Echte, koordinierte Mosaikserien aus den Herstellerkatalogen – für Duschen, Spa, Akzentwände und exklusive Innenräume.",
    products: [
      {
        id: "recer-mastery-mix",
        name: "Mosaic Mastery Mix",
        spec: "30×27,8 cm · Natural/Polished",
        details: "Premium-Mix aus matten und polierten Elementen. Exakt auf die Mastery-Marmorserie abgestimmt.",
        image: "/images/catalog/recer-mastery.png",
        brand: "Recer",
        reference: "Mastery Mix · R48",
        format: "300×278 mm · 9,5 mm",
        finish: "Natural / poliert · netzgeklebt",
        application: "Wand · Dusche · Akzentfläche",
        box: "11 Matten · 0,64 m² · 13,50 kg",
        pallet: "30 Kartons · 19,20 m² · 427 kg",
        badges: ["Premium", "Mix Finish"],
        featured: true
      },
      {
        id: "recer-bluenza-mosaic",
        name: "Mosaic Bluenza Light Sand",
        spec: "30×30 cm · Natursteinoptik · V4",
        details: "Fein gegliedertes Steinmosaik für hochwertige Nassbereiche, kombiniert mit Bluenza-Flächenformaten.",
        image: "/images/catalog/recer-bluenza.png",
        brand: "Recer",
        reference: "Mosaic Bluenza Light Sand · Rev",
        format: "298×298 mm · 9,5 mm",
        finish: "Natural · rektifiziert",
        application: "Wand · Dusche · Spa",
        box: "11 Matten · 1,00 m² · 15,67 kg",
        pallet: "30 Kartons · 30,00 m² · 490 kg",
        badges: ["V4", "Koordinierte Serie"]
      },
      {
        id: "recer-pixstone-air-mosaic",
        name: "Mosaic Pixstone Air Warm",
        spec: "30×30 cm · Elemente 4,5×4,5 cm",
        details: "Zeitgemässes Terrazzo-Mosaik für bodengleiche Duschen und lebendige Akzentflächen.",
        image: "/images/catalog/recer-pixstone.png",
        brand: "Recer",
        reference: "Pixstone Air Warm · R48",
        format: "298×298 mm · 8,5 mm",
        finish: "Natural · netzgeklebt",
        application: "Boden & Wand · Dusche",
        box: "11 Matten · 1,00 m² · 17,30 kg",
        pallet: "30 Kartons · 30,00 m² · 530 kg",
        badges: ["In & Out", "Terrazzo"]
      },
      {
        id: "recer-rapolano-mosaic",
        name: "Rapolano M10×10",
        spec: "30×30 cm · M10×10 · Travertinoptik",
        details: "Warmes, klassisches Travertinmosaik in Bone, Caramel, Sand oder Grey – passend zur Rapolano-Serie.",
        image: "/images/catalog/recer-rapolano-scene.png",
        brand: "Recer",
        reference: "Rapolano M10×10 · G30",
        format: "297×297 mm · 6 mm",
        finish: "Natural · 9 Elemente auf Netz",
        application: "Boden & Wand · Dusche",
        box: "90 Elemente · 0,90 m² · 10,71 kg",
        pallet: "72 Kartons · 64,80 m² · 800 kg",
        badges: ["4 Farbtöne", "Netzgeklebt"]
      },
      {
        id: "recer-grand-stone-mosaic",
        name: "Mosaic Grand Stone",
        spec: "30×30 cm · Elemente 4,4×5 cm",
        details: "Architektonisches Kleinformat in Sand, Silver, Grey oder Black für Spa, Dusche und Objektbereiche.",
        image: "/images/catalog/recer-grandstone-scene.png",
        brand: "Recer",
        reference: "Grand Stone Mosaic · Natural",
        format: "298×298 mm · 7,8 mm",
        finish: "Natural · netzgeklebt",
        application: "Boden & Wand · Innen/Aussen",
        box: "11 Matten · 1,00 m² · 15,98 kg",
        pallet: "30 Kartons · 30,00 m² · 499 kg",
        badges: ["4 Farbtöne", "Projektserie"]
      }
    ]
  },
  {
    title: "SPC / Vinyl Flooring",
    germanTitle: "SPC / Vinyl-Designböden",
    description: "Rubifloor SPC mit integrierter Unterlage, realen Verschleissklassen und präzisen Verpackungsdaten.",
    products: [
      {
        id: "rubifloor-rigid-grey",
        name: "Rigid Grey EIR",
        spec: "60×60 cm · 6,5/0,7 mm · Unterlage integriert",
        details: "Grossformatige Steinoptik für hohe Beanspruchung im Wohn- und Objektbereich.",
        image: "/images/catalog/rubifloor-rigid.png",
        brand: "Rubifloor",
        reference: "RSPC6060GR",
        format: "600×600 mm · 6,5 mm",
        finish: "EIR · 0,7 mm Nutzschicht",
        application: "High Traffic & Residential",
        box: "5 Platten · 1,80 m² · 19,75 kg",
        pallet: "42 Kartons · 75,60 m² · 850 kg",
        badges: ["0,7 mm", "Unterlage inklusive"],
        featured: true
      },
      {
        id: "rubifloor-xl-home",
        name: "XL1.8 Home EIR",
        spec: "23×182 cm · 8/0,55 mm · XL-Diele",
        details: "Lange, breite Eichenoptik für grosszügige Wohnräume; integrierte Unterlage reduziert die Montagezeit.",
        image: "/images/catalog/rubifloor-xlhome.png",
        brand: "Rubifloor",
        reference: "RSPC23183XLHO",
        format: "230×1820 mm · 8 mm",
        finish: "EIR · 0,55 mm Nutzschicht",
        application: "High Traffic & Residential",
        box: "4 Dielen · 1,6723 m² · 27,43 kg",
        pallet: "64 Kartons · 107,03 m² · 1.755 kg",
        badges: ["XL-Diele", "Unterlage inklusive"]
      },
      {
        id: "rubifloor-herringbone-natural",
        name: "Herringbone Natural EIR",
        spec: "14,2×71 cm · 6/0,55 mm · Fischgrat",
        details: "Klassische Fischgratwirkung mit robuster SPC-Technik und bereits aufkaschierter Unterlage.",
        image: "/images/catalog/rubifloor-herringbone.png",
        brand: "Rubifloor",
        reference: "RSPC6010HENAT",
        format: "142×710 mm · 6 mm",
        finish: "EIR · 0,55 mm Nutzschicht",
        application: "High Traffic & Residential",
        box: "22 Dielen · 2,218 m² · 22,30 kg",
        pallet: "32 Kartons · 70,976 m² · 741 kg",
        badges: ["Fischgrat", "Unterlage inklusive"]
      },
      {
        id: "rubifloor-premium-cream",
        name: "Premium Cream EIR",
        spec: "18×153 cm · 6/0,55 mm · ruhige Eiche",
        details: "Helle Premium-Holzoptik für Wohnungen, Hotelzimmer und hochwertige Renovationen.",
        image: "/images/catalog/rubifloor-premium.png",
        brand: "Rubifloor",
        reference: "RSPC18152PRCRETL",
        format: "180×1530 mm · 6 mm",
        finish: "EIR · 0,55 mm Nutzschicht",
        application: "High Traffic & Residential",
        box: "8 Dielen · 2,164 m² · 19 kg",
        pallet: "55 Kartons · 119,02 m² · 1.060 kg",
        badges: ["Premium", "Unterlage inklusive"]
      },
      {
        id: "rubifloor-pro-nordig",
        name: "Pro Nordig EIR",
        spec: "18×122 cm · 6/0,55 mm · Naturholz",
        details: "Nordische Holzoptik für stark beanspruchte Wohn- und Gewerbeflächen.",
        image: "/images/catalog/rubifloor-pronordig.png",
        brand: "Rubifloor",
        reference: "RSPCPR18122NOR",
        format: "180×1220 mm · 6 mm",
        finish: "EIR · 0,55 mm Nutzschicht",
        application: "High Traffic & Residential",
        box: "10 Dielen · 2,196 m² · 19,65 kg",
        pallet: "65 Kartons · 142,74 m² · 1.293 kg",
        badges: ["Objektgeeignet", "Unterlage inklusive"]
      }
    ]
  },
  {
    title: "Bathroom Solutions",
    germanTitle: "Sanitäre Individuallösungen",
    description: "Komplette Badlösungen von Möbeln über Armaturen und Duschsysteme bis zu WCs und Duschwannen.",
    products: [
      {
        id: "rubicer-stria-100",
        name: "Stria Vertical Waschtischmöbel",
        spec: "100 cm · 1 Schublade · Solid-Surface-Becken",
        details: "Schwebendes Möbel mit vertikaler Frontstruktur, Armaturenbohrung und Ventil. In Walnut oder Natural Oak.",
        image: "/images/catalog/rubicer-stria.png",
        brand: "Rubicer",
        reference: "RMSTRIA100WNT / RMSTRIA100NOK",
        format: "1000 mm · 1 Becken",
        finish: "Walnut oder Natural Oak",
        application: "Waschtischmöbel · Wandmontage",
        box: "1 Verpackung · 36 kg · 0,30 m³",
        pallet: "Einzelverpackt · Projektmenge",
        badges: ["Neu", "Solid Surface"],
        featured: true
      },
      {
        id: "moovlux-tube-tl1001",
        name: "Tube Waschtischarmatur",
        spec: "Einhebel · Schnellbefestigung · schwenkbarer Perlator",
        details: "Reduzierte, zylindrische Armatur aus erstklassigem Messing; bleifrei und zu 100 % geprüft.",
        image: "/images/catalog/moovlux-tube.png",
        brand: "Moovlux",
        reference: "TL1001",
        format: "Standard-Waschtischarmatur",
        finish: "Chrom · weitere Tube-Farben verfügbar",
        application: "Waschtisch",
        box: "1 Stück · Originalverpackung",
        pallet: "Projektbezogene Stückzahl",
        badges: ["Bleifrei", "Schnellbefestigung"]
      },
      {
        id: "imex-toscana-bdt064",
        name: "Toscana Duschsystem",
        spec: "Einhebel · Edelstahl S.304 · 20×30 cm Kopfbrause",
        details: "Teleskopische Slim-Stange, extraflache Antikalk-Kopfbrause, Handbrause und integrierter Umsteller.",
        image: "/images/catalog/imex-toscana.png",
        brand: "IMEX",
        reference: "BDT064",
        format: "Höhe 878–1303 mm",
        finish: "6 Oberflächen verfügbar",
        application: "Aufputz-Duschsystem",
        box: "1 Komplettset",
        pallet: "Projektbezogene Stückzahl",
        badges: ["S.304", "6 Farben"]
      },
      {
        id: "roca-avant-intank",
        name: "Avant In-Tank WC",
        spec: "Integrierter Tank · 4,5/3 L · Rimless Vortex",
        details: "Innovatives WC ohne Unterputzspülkasten, mit Supraglaze, Soft-Close-Sitz und leiser Doppelspülung.",
        image: "/images/catalog/roca-avant-spec.png",
        brand: "Roca",
        reference: "A80336MS0H / A80336MS0W / A80336NS0H",
        format: "BTW oder wandhängend",
        finish: "Weiss · Supraglaze",
        application: "WC · Neubau & Renovation",
        box: "1 WC-Set",
        pallet: "Ausführung und Menge im Angebot",
        badges: ["In-Tank", "Rimless Vortex"]
      },
      {
        id: "rubicer-lux-duschwanne",
        name: "Lux Duschwanne",
        spec: "90–200 cm · 70/80/90 cm Breite · Gel Coat",
        details: "Nur ca. 3,2 cm stark, null Wasseraufnahme, antibakteriell und rutschhemmend Klasse 3. Ventil inklusive.",
        image: "/images/catalog/rubicer-lux-spec.png",
        brand: "Rubicer",
        reference: "Lux · Ventil RV521816LUX",
        format: "Länge 90–200 cm · Breite 70/80/90 cm",
        finish: "Glatt matt · 8 Farben",
        application: "Bodengleiche Dusche",
        box: "1 Duschwanne · Ventil inklusive",
        pallet: "Mass- und projektbezogen",
        badges: ["Klasse 3", "8 Farben"]
      }
    ]
  }
];
