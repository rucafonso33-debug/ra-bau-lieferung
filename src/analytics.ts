import { track } from '@vercel/analytics/react';

export type ConversionEvent =
  | 'price_request_click'
  | 'dealer_terms_request_click'
  | 'catalog_view'
  | 'catalog_request_click'
  | 'inquiry_step_completed'
  | 'form_submit'
  | 'email_click'
  | 'phone_click'
  | 'whatsapp_click';

export function trackConversion(event: ConversionEvent, properties: Record<string, string> = {}) {
  track(event, properties);
}
