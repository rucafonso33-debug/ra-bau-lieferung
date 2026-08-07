import assert from 'node:assert/strict';
import handler from '../api/inquiry';

type JsonResult = { statusCode: number; body: unknown; headers: Record<string, string> };

function createResponse() {
  const result: JsonResult = { statusCode: 200, body: null, headers: {} };
  const response = {
    status(code: number) {
      result.statusCode = code;
      return response;
    },
    json(body: unknown) {
      result.body = body;
    },
    setHeader(name: string, value: string) {
      result.headers[name] = value;
    },
  };
  return { response, result };
}

const validPayload = {
  requestTypes: ['Preisanfrage'],
  productAreas: ['Premium Grossformat'],
  selection: 'Testreferenz',
  customerType: 'Fachbetrieb',
  name: 'Technischer Test',
  company: 'RA Bau Lieferung',
  email: 'kunde@example.com',
  phone: '',
  quantity: '10 m²',
  location: '8000 Zürich',
  timeline: '',
  message: 'Nur ein automatisierter Test.',
  attachmentName: '',
  preferredChannel: 'email',
};

const originalFetch = globalThis.fetch;
let forwarded: FormData | null = null;
globalThis.fetch = async (_input, init) => {
  forwarded = init?.body as FormData;
  return new Response(JSON.stringify({ success: 'true' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

try {
  const success = createResponse();
  await handler({ method: 'POST', body: validPayload, headers: {} }, success.response);
  assert.equal(success.result.statusCode, 200);
  assert.deepEqual(success.result.body, { ok: true });
  assert.ok(forwarded instanceof FormData);
  assert.equal(forwarded.get('Name'), 'Technischer Test');
  assert.equal(forwarded.get('Bevorzugter Kontakt'), 'E-Mail');
  assert.equal(forwarded.get('_replyto'), 'kunde@example.com');

  const invalid = createResponse();
  await handler({ method: 'POST', body: { ...validPayload, email: '' }, headers: {} }, invalid.response);
  assert.equal(invalid.result.statusCode, 400);
  assert.deepEqual(invalid.result.body, { ok: false, error: 'email_required' });

  const honeypot = createResponse();
  await handler({ method: 'POST', body: { ...validPayload, website: 'spam.example' }, headers: {} }, honeypot.response);
  assert.equal(honeypot.result.statusCode, 200);
  assert.deepEqual(honeypot.result.body, { ok: true });
} finally {
  globalThis.fetch = originalFetch;
}

console.log('Inquiry API tests passed.');
