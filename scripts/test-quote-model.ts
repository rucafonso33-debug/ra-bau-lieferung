import assert from 'node:assert/strict';
import { buildInquiryMessage, emailHref, whatsappHref, type InquiryData } from '../src/inquiry';

const data: InquiryData = {
  requestType: 'Preisofferte', selection: 'Calacatta Gold · 45 m²', customerType: 'Bauunternehmen',
  name: 'Test Kunde', company: 'Test Bau', email: 'kunde@example.com', phone: '+41 79 000 00 00',
  quantity: '45 m²', location: '6780 Airolo', timeline: 'Oktober 2026', message: 'Duschwände und Boden.',
};
const message = buildInquiryMessage(data);
assert.match(message, /Calacatta Gold/);
assert.match(message, /45 m²/);
assert.match(message, /6780 Airolo/);
assert.match(whatsappHref('41782418913', data), /^https:\/\/wa\.me\/41782418913\?text=/);
assert.match(emailHref('rodrigo@ra-bau-lieferung.com', data), /^mailto:/);
console.log('Inquiry funnel tests passed.');
