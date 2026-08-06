import { Resend } from 'resend';
import { buildInquiryMessage, type InquiryData } from '../src/inquiry';

type AttachmentPayload = { name: string; type: string; content: string };
type InquiryPayload = InquiryData & { website?: string; attachment?: AttachmentPayload };
type ResponseLike = { status: (code: number) => ResponseLike; json: (body: unknown) => void; setHeader: (name: string, value: string) => void };
type RequestLike = { method?: string; body?: unknown; headers: Record<string, string | string[] | undefined> };

const recipient = process.env.INQUIRY_RECIPIENT_EMAIL || 'rodrigo@ra-bau-lieferung.com';
const sender = process.env.INQUIRY_FROM_EMAIL || 'RA Bau Lieferung <anfrage@ra-bau-lieferung.com>';
const allowedAttachmentTypes = new Set(['application/pdf', 'image/jpeg', 'image/png', 'image/webp']);

function fail(response: ResponseLike, code: number, message: string) {
  response.status(code).json({ ok: false, error: message });
}

function safe(value: unknown, max = 500) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] ?? character);
}

function validate(body: InquiryPayload) {
  if (!Array.isArray(body.requestTypes) || !body.requestTypes.length) return 'request_type_required';
  if (!safe(body.name, 120)) return 'name_required';
  if (body.preferredChannel !== 'email' && body.preferredChannel !== 'whatsapp') return 'contact_preference_required';
  if (body.preferredChannel === 'email' && !safe(body.email, 200)) return 'email_required';
  if (body.preferredChannel === 'whatsapp' && !safe(body.phone, 80)) return 'phone_required';
  if (body.attachment) {
    if (!allowedAttachmentTypes.has(body.attachment.type)) return 'attachment_type_invalid';
    if (!safe(body.attachment.name, 180) || body.attachment.content.length > 3_500_000) return 'attachment_invalid';
  }
  return '';
}

export default async function handler(request: RequestLike, response: ResponseLike) {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method !== 'POST') return fail(response, 405, 'method_not_allowed');
  if (!process.env.RESEND_API_KEY) return fail(response, 503, 'email_service_not_configured');

  const body = (typeof request.body === 'string' ? JSON.parse(request.body) : request.body) as InquiryPayload;
  if (!body || typeof body !== 'object') return fail(response, 400, 'invalid_request');
  if (safe(body.website, 200)) return response.status(200).json({ ok: true });
  const validationError = validate(body);
  if (validationError) return fail(response, 400, validationError);

  const normalized: InquiryData = {
    requestTypes: body.requestTypes.slice(0, 8),
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
  const message = buildInquiryMessage(normalized);
  const subjectSelection = normalized.selection || normalized.productAreas.join(', ') || 'Produkte';
  const subject = `[Website] ${normalized.requestTypes.join(' + ')} – ${subjectSelection}`.slice(0, 180);
  const resend = new Resend(process.env.RESEND_API_KEY);
  const attachments = body.attachment ? [{ filename: safe(body.attachment.name, 180), content: Buffer.from(body.attachment.content, 'base64') }] : undefined;

  const { error } = await resend.emails.send({
    from: sender,
    to: [recipient],
    replyTo: normalized.email || undefined,
    subject,
    text: message,
    html: `<div style="font-family:Arial,sans-serif;max-width:720px;color:#17384b"><h1 style="font-size:24px">Neue Website-Anfrage</h1><p style="padding:12px 16px;background:#eef4f7;border-radius:8px"><strong>Bevorzugter Kontakt:</strong> ${normalized.preferredChannel === 'whatsapp' ? 'WhatsApp' : 'E-Mail'}</p><pre style="white-space:pre-wrap;font-family:Arial,sans-serif;font-size:14px;line-height:1.6">${escapeHtml(message)}</pre></div>`,
    attachments,
  });
  if (error) return fail(response, 502, 'email_delivery_failed');
  response.status(200).json({ ok: true });
}
