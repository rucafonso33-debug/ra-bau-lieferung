export interface InquiryData {
  requestType: 'Preisofferte' | 'Katalog';
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
}

export function buildInquiryMessage(data: InquiryData) {
  return [
    'Guten Tag RA Bau Lieferung,',
    '',
    `Anfrage: ${data.requestType}`,
    `Auswahl: ${data.selection || 'Noch offen / Beratung gewünscht'}`,
    `Kundentyp: ${data.customerType}`,
    `Name: ${data.name}`,
    `Unternehmen: ${data.company || '-'}`,
    `E-Mail: ${data.email || '-'}`,
    `Telefon: ${data.phone || '-'}`,
    `Menge / Fläche: ${data.quantity || '-'}`,
    `Lieferort: ${data.location || '-'}`,
    `Zeitraum: ${data.timeline || '-'}`,
    '',
    `Projekt: ${data.message || '-'}`,
    '',
    'Bitte prüfen Sie passende Ausführungen, Verfügbarkeit, Lieferzeit und Projektpreis.',
  ].join('\n');
}

export function whatsappHref(phoneDigits: string, data: InquiryData) {
  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(buildInquiryMessage(data))}`;
}

export function emailHref(email: string, data: InquiryData) {
  const subject = `${data.requestType}: ${data.selection || 'Projektanfrage'}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildInquiryMessage(data))}`;
}
