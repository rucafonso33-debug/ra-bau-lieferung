# RA Bau Lieferung storefront standard

This standard applies to Spartes 02–05. Sparte 01 is maintained separately and must not be altered without explicit approval.

## 1. Product admission rule

A product may only be published when all required fields are available:

- unique product ID;
- manufacturer and collection;
- exact or clearly qualified reference;
- primary room/application image;
- secondary product, format or technical image;
- format, finish and application;
- quote unit (`m²`, `Stk.` or `Set`);
- no image reused under a different product identity.

Products without verified imagery remain outside the public detail cards until the correct assets are available.

## 2. Gallery order

1. **Im Raum** — spatial effect and real application;
2. **Produkt & Format** — complete piece, plank, fixture or furniture item;
3. optional technical detail, finish or coordinated component.

Room concepts may contain 3–5 images, each corresponding to a named real component.

## 3. Category purpose

- **Sparte 02 — Keramik & Feinsteinzeug:** surfaces and coordinated mosaics;
- **Sparte 03 — Badezimmer:** furniture, taps, showers, trays, glass and sanitary products;
- **Sparte 04 — Vinyl, SPC & Kork:** installed floor effect followed by plank/tile construction;
- **Sparte 05 — Raumkonzepte:** exactly 4–5 demonstrative concepts, not a second catalogue.

## 4. Mobile standard

- 44 px minimum interactive target;
- one clear primary action per card;
- quote dock visible only after selection;
- safe-area spacing for modern phones;
- card copy limited to what supports the next action;
- thumbnails remain horizontally scrollable;
- no content may be hidden behind fixed controls.

## 5. Copy standard

Prefer concrete proof over unsupported luxury language:

- room effect;
- manufacturer reference;
- application and format;
- personal selection help;
- written quotation;
- Swiss transport and customs planning.

Avoid claims such as exclusive distributor, official partner, guaranteed stock, immediate delivery or Swiss market leadership unless documented.

## 6. Future range workflow

1. add product and images to the structured data source;
2. confirm gallery order and quote unit;
3. confirm it adds a genuinely different use case;
4. validate mobile and desktop cards;
5. run lint, TypeScript and production build;
6. preview before merging;
7. verify the production route and social preview image.

## 7. Central configuration

Business contact data, project-entry cards and shared customer benefits live in `src/storefrontConfig.ts`. Reusable conversion UI lives in `src/ConversionEnhancements.tsx`. Product galleries and assortment curation live in `src/finalData.ts`.
