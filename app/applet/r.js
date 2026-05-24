import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(/Großmengen/g, 'Grossprojekte');
content = content.replace(/Sonderkonditionen für Bauprojekte/g, 'Sonderkonditionen für Grossprojekte');
content = content.replace(/Spezifische Oberflächenoptik gesucht\?/g, 'Bestimmte Oberfläche gesucht?');
content = content.replace(/Komplette Badezimmer-Sets gesucht\?/g, 'Bad komplett ausstatten?');

content = content.replace(
  /Moderne, feinstrukturierte Feinsteinzeugplatten mit authentischen Texturen für stark beanspruchte Wand- und Bodensysteme\. Rektifizierte Platten für lückenlose Präzisionsergebnisse beim Verlegen\./,
  'Robuste Feinsteinzeugplatten für Wand und Boden. Massgenau rektifiziert, ideal für schnelles, sauberes Verlegen auf der Baustelle.'
);

content = content.replace(
  /Charakterstarke Verzierungen und formschöne Riegelmosaike für anspruchsvolle Hotelprojekte, Wellnesszonen und gehobene Badezimmergestaltung\./,
  'Mosaike für Badezimmer, Duschen und Spa-Bereiche. Netzgeklebt und direkt ab Lager verfügbar.'
);

content = content.replace(
  /Premium-Designböden mit mineralischem Kern für herausragende Formstabilität und Trittschalldämmung\. 100 % feuchtigkeitsresistent – traumhaft verlegbar in Küche und Nassbereichen\./,
  '100 % wasserfeste SPC-Böden mit Trittschalldämmung. Massstabil, einfach zu verlegen und extrem robust für starke Beanspruchung.'
);

content = content.replace(
  /Kompromisslos moderne Sanitär-Keramik, pflegeleichte Nano-Glasuren, flache Duschwannen und exklusive mattschwarze Armatur-Lösungen für Ihr Renovationsprojekt\./,
  'Keramik, Duschtassen und mattschwarze Armaturen für moderne Badezimmer. Alles aus einer Hand für Ihr nächstes Bauprojekt.'
);

content = content.replace(
  /Kuratierte, extrem langlebige Boden- und Wandplatten mit naturgetreuen Travertin- und Sichtbetonstrukturen\. Perfekt rektifizierte Kanten für moderne Plattenleger\./,
  'Rektifizierte Boden- und Wandplatten in Naturstein- oder Betonoptik. Perfekt für schnelles und exaktes Verlegen.'
);

content = content.replace(
  /Anspruchsvolle, netzgeklebte Mosaikstrukturen, Stein-Schliffe und KitKat-Riegel für ansprechende Nischen, Spa-Anlagen, Duschböden und Hotels\./,
  'Netzgeklebte Mosaike für Duschen und Spa-Bereiche. Einfach zu verlegen, robust und in diversen Formaten sofort verfügbar.'
);

content = content.replace(
  /100 % wasserfeste Klickböden mit integrierter Trittschalldämmung und robuster Verschleißschicht\. Extrem maßstabil und verformungsresistent\./,
  'Zäh, massstabil und 100 % wasserfest. SPC-Klickböden mit integrierter Trittschalldämmung. Schnell und unkompliziert verlegt.'
);

content = content.replace(
  /Formschöne, schwebende Waschtische, flache Duschwannen und exklusive, mattschwarze Armatur-Details für vollkommen zeitgemäße Badezimmer\./,
  'Waschtische, Duschtassen und moderne Armaturen. Bad-Lösungen direkt für Ihr Projekt. Alles für den professionellen Einbau.'
);

content = content.replace(
  /SIA-konforme Systemkomponenten für anspruchsvolle Betonbauten, Schalungen und flächenplane Plattenlegerarbeiten\. Zuverlässige Werkzeuge für das Schweizer Handwerk\./,
  'Zubehör für den Betonbau, Schalungen und für Plattenleger. Immer verfügbar, schnell auf die Baustelle geliefert. Für Profis gemacht.'
);

fs.writeFileSync('src/App.tsx', content);
