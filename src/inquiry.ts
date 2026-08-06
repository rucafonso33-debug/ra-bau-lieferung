export type InquiryTopic =
  | 'Produktanfrage'
  | 'Preisanfrage'
  | 'Händlerkonditionen'
  | 'Kataloganfrage'
  | 'Verfügbarkeit'
  | 'Lieferung'
  | 'Allgemeine Anfrage';

export interface InquiryData {
  requestTypes: InquiryTopic[];
  productAreas: string[];
  selection: string;
  customerType: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  quantity: string;
  location: string;
  timeline: string;
  message: string;
  attachmentName: string;
  preferredChannel: 'email' | 'whatsapp';
}

export function buildInquiryMessage(data: InquiryData) {
  return [
    'Guten Tag RA Bau Lieferung,',
    '',
    `Anfrage: ${data.requestTypes.join(', ') || 'Allgemeine Anfrage'}`,
    `Produktbereiche: ${data.productAreas.join(', ') || 'noch offen'}`,
    `Produkt / Referenz: ${data.selection || 'Kategorie noch offen'}`,
    `Kundentyp: ${data.customerType}`,
    `Name: ${data.name}`,
    `Unternehmen: ${data.company || '-'}`,
    `E-Mail: ${data.email || '-'}`,
    `Telefon: ${data.phone || '-'}`,
    `Bevorzugter Kontakt: ${data.preferredChannel === 'whatsapp' ? 'WhatsApp' : 'E-Mail'}`,
    `Gewünschte Menge: ${data.quantity || '-'}`,
    `Lieferort: ${data.location || '-'}`,
    `Gewünschter Lieferzeitraum: ${data.timeline || '-'}`,
    `Datei zur Anfrage: ${data.attachmentName || '-'}`,
    '',
    `Nachricht: ${data.message || '-'}`,
    '',
    'Bitte prüfen Sie Preis, Verfügbarkeit, Konditionen und Liefermöglichkeiten für die angefragten Produkte.',
    ...(data.attachmentName ? ['', 'Die genannte Datei wird separat in WhatsApp oder E-Mail beigefügt.'] : []),
  ].join('\n');
}

export function whatsappHref(phoneDigits: string, data: InquiryData) {
  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(buildInquiryMessage(data))}`;
}

export function emailHref(email: string, data: InquiryData) {
  const subject = `${data.requestTypes.join(' + ') || 'Anfrage'}: ${data.selection || data.productAreas.join(', ') || 'Produkte'}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildInquiryMessage(data))}`;
}
