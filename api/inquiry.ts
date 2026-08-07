import type { InquiryData, InquiryTopic } from '../src/inquiry';

type AttachmentPayload = { name: string; type: string; content: string };
type InquiryPayload = InquiryData & { website?: string; attachment?: AttachmentPayload };
type ResponseLike = { status: (code: number) => ResponseLike; json: (body: unknown) => void; setHeader: (name: string, value: string) => void };
type RequestLike = { method?: string; body?: unknown; headers: Record<string, string | string[] | undefined> };

const recipient = process.env.INQUIRY_RECIPIENT_EMAIL || 'rodrigo@ra-bau-lieferung.com';
const formRecipient = recipient === 'rodrigo@ra-bau-lieferung.com' ? '76906bb8a1c1598dbf4103bf25227949' : encodeURIComponent(recipient);
const formEndpoint = process.env.INQUIRY_FORM_ENDPOINT || `https://formsubmit.co/ajax/${formRecipient}`;
const allowedAttachmentTypes = new Set(['application/pdf', 'image/jpeg', 'image/png', 'image/webp']);
const allowedRequestTypes = new Set<InquiryTopic>(['Produktanfrage', 'Preisanfrage', 'Händlerkonditionen', 'Kataloganfrage', 'Verfügbarkeit', 'Lieferung', 'Allgemeine Anfrage']);

function fail(response: ResponseLike, code: number, message: string) {
  response.status(code).json({ ok: false, error: message });
}

function safe(value: unknown, max = 500) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function buildEmailMessage(data: InquiryData) {
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
  ].join('\n');
}

function validate(body: InquiryPayload) {
  if (!Array.isArray(body.requestTypes) || !body.requestTypes.length) return 'request_type_required';
  if (!safe(body.name, 120)) return 'name_required';
  if (body.preferredChannel !== 'email' && body.preferredChannel !== 'whatsapp') return 'contact_preference_required';
  if (body.preferredChannel === 'email' && !safe(body.email, 200)) return 'email_required';
  if (body.preferredChannel === 'whatsapp' && !safe(body.phone, 80)) return 'phone_required';
  if (body.attachment) {
    if (!allowedAttachmentTypes.has(body.attachment.type)) return 'attachment_type_invalid';
    if (!safe(body.attachment.name, 180) || typeof body.attachment.content !== 'string' || body.attachment.content.length > 3_500_000) return 'attachment_invalid';
  }
  return '';
}

export default async function handler(request: RequestLike, response: ResponseLike) {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method !== 'POST') return fail(response, 405, 'method_not_allowed');

  let body: InquiryPayload;
  try {
    body = (typeof request.body === 'string' ? JSON.parse(request.body) : request.body) as InquiryPayload;
  } catch {
    return fail(response, 400, 'invalid_json');
  }
  if (!body || typeof body !== 'object') return fail(response, 400, 'invalid_request');
  if (safe(body.website, 200)) return response.status(200).json({ ok: true });
  const validationError = validate(body);
  if (validationError) return fail(response, 400, validationError);
  const requestTypes = body.requestTypes
    .map((item) => safe(item, 120))
    .filter((item): item is InquiryTopic => allowedRequestTypes.has(item as InquiryTopic))
    .slice(0, 8);
  if (!requestTypes.length) return fail(response, 400, 'request_type_invalid');

  const normalized: InquiryData = {
    requestTypes,
    productAreas: Array.isArray(body.productAreas) ? body.productAreas.map((item) => safe(item, 120)).filter(Boolean).slice(0, 12) : [],
    selection: safe(body.selection, 500),
    customerType: safe(body.customerType, 120),
    name: safe(body.name, 120),
    company: safe(body.company, 160),
    email: safe(body.email, 200),
    phone: safe(body.phone, 80),
    quantity: safe(body.quantity, 120),
    location: safe(body.location, 160),
    timeline: safe(body.timeline, 120),
    message: safe(body.message, 3000),
    attachmentName: safe(body.attachmentName, 180),
    preferredChannel: body.preferredChannel,
  };
  const message = buildEmailMessage(normalized);
  const subjectSelection = normalized.selection || normalized.productAreas.join(', ') || 'Produkte';
  const subject = `[Website] ${normalized.requestTypes.join(' + ')} – ${subjectSelection}`.slice(0, 180);
  const submission = new FormData();
  submission.set('_subject', subject);
  submission.set('_template', 'table');
  submission.set('_captcha', 'false');
  submission.set('_url', 'https://ra-bau-lieferung.com/kontakt');
  submission.set('Anfrage', normalized.requestTypes.join(', '));
  submission.set('Produktbereiche', normalized.productAreas.join(', ') || 'noch offen');
  submission.set('Produkt / Referenz', normalized.selection || 'Kategorie noch offen');
  submission.set('Kundentyp', normalized.customerType || '-');
  submission.set('Name', normalized.name);
  submission.set('Unternehmen', normalized.company || '-');
  submission.set('E-Mail', normalized.email || '-');
  submission.set('Telefon', normalized.phone || '-');
  submission.set('Bevorzugter Kontakt', normalized.preferredChannel === 'whatsapp' ? 'WhatsApp' : 'E-Mail');
  submission.set('Gewünschte Menge', normalized.quantity || '-');
  submission.set('Lieferort', normalized.location || '-');
  submission.set('Lieferzeitraum', normalized.timeline || '-');
  submission.set('Nachricht', normalized.message || '-');
  submission.set('Vollständige Anfrage', message);
  if (normalized.email) submission.set('_replyto', normalized.email);
  if (body.attachment) {
    const file = Buffer.from(body.attachment.content, 'base64');
    submission.set('attachment', new Blob([file], { type: body.attachment.type }), safe(body.attachment.name, 180));
  }

  try {
    const delivery = await fetch(formEndpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: submission,
    });
    const result = await delivery.json().catch(() => null) as { success?: boolean | string } | null;
    if (!delivery.ok || result?.success === false || result?.success === 'false') return fail(response, 502, 'email_delivery_failed');
    response.status(200).json({ ok: true });
  } catch {
    return fail(response, 502, 'email_delivery_failed');
  }
}
