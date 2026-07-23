export const business = {
  name: 'RA Bau Lieferung',
  contact: 'Rodrigo Afonso',
  country: 'Schweiz',
  phoneDisplay: '+41 78 241 89 13',
  phoneDigits: '41782418913',
  email: 'rodrigo@ra-bau-lieferung.com',
  registered: false,
  vatLiable: false,
} as const;

export type AppPage = 'home' | 'products' | 'construction' | 'ceramics' | 'bathroom' | 'flooring' | 'concepts' | 'quote' | 'contact' | 'not-found';

export const routes: Record<AppPage, string> = {
  home: '/',
  products: '/produkte',
  construction: '/baustellenzubehoer',
  ceramics: '/feinsteinzeug',
  bathroom: '/badezimmer',
  flooring: '/spc-vinyl',
  concepts: '/raumkonzepte',
  quote: '/projektanfrage',
  contact: '/kontakt',
  'not-found': '/404',
};

export const redirects: Record<string, string> = {
  '/premium-mosaike': '/badezimmer',
  '/bad-sanitaer': '/raumkonzepte',
};

export const navigation: Array<{ page: AppPage; label: string }> = [
  { page: 'products', label: 'Produkte' },
  { page: 'construction', label: 'Baustellenzubehör' },
  { page: 'ceramics', label: 'Keramik' },
  { page: 'bathroom', label: 'Badezimmer' },
  { page: 'flooring', label: 'Böden' },
  { page: 'concepts', label: 'Raumkonzepte' },
  { page: 'contact', label: 'Kontakt' },
];

export const processSteps = [
  'Produkt oder Raum auswählen.',
  'Masse, Menge oder Foto senden.',
  'Referenz und Eignung werden geprüft.',
  'Verfügbarkeit, Transport und Einfuhr werden kalkuliert.',
  'Schriftliche Offerte erhalten.',
  'Bestellung erst nach Bestätigung.',
] as const;

export const whatsappUrl = (message: string) => `https://wa.me/${business.phoneDigits}?text=${encodeURIComponent(message)}`;
export const emailUrl = (subject: string, body: string) => `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
export const smsUrl = (message: string) => `sms:+${business.phoneDigits}?body=${encodeURIComponent(message)}`;
