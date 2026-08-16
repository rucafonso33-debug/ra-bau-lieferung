import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { categories, products } from '../src/catalogData';

const readWebpDimensions = (file: string) => {
  const buffer = fs.readFileSync(file);
  if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WEBP') throw new Error(`${file} is not a valid WebP file.`);
  const chunk = buffer.toString('ascii', 12, 16);
  if (chunk === 'VP8X') return { width: 1 + buffer.readUIntLE(24, 3), height: 1 + buffer.readUIntLE(27, 3) };
  if (chunk === 'VP8 ') return { width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff };
  if (chunk === 'VP8L') {
    const b1 = buffer[21]; const b2 = buffer[22]; const b3 = buffer[23]; const b4 = buffer[24];
    return { width: 1 + (((b2 & 0x3f) << 8) | b1), height: 1 + (((b4 & 0x0f) << 10) | (b3 << 2) | ((b2 & 0xc0) >> 6)) };
  }
  throw new Error(`${file} uses an unsupported WebP encoding.`);
};

const errors: string[] = [];
if (categories.length !== 7) errors.push(`Expected 7 categories, found ${categories.length}.`);
if (products.length < 165) errors.push(`Expected at least 165 photo-ready curated products, found ${products.length}.`);
if (products.filter((product) => product.featured && product.category === 'grossformat').length < 4) errors.push('Expected four featured gross-format products.');

const duplicateIds = products.filter((product, index) => products.findIndex((candidate) => candidate.id === product.id) !== index);
const duplicateNames = products.filter((product, index) => products.findIndex((candidate) => candidate.name.trim().toLocaleLowerCase('de-CH') === product.name.trim().toLocaleLowerCase('de-CH')) !== index);
const duplicateImages = products.filter((product, index) => products.findIndex((candidate) => candidate.image === product.image) !== index);
if (duplicateIds.length) errors.push(`Duplicate product IDs: ${duplicateIds.map((product) => product.id).join(', ')}.`);
if (duplicateNames.length) errors.push(`Duplicate product names: ${duplicateNames.map((product) => product.name).join(', ')}.`);
if (duplicateImages.length) errors.push(`Repeated product images: ${duplicateImages.map((product) => product.image).join(', ')}.`);

for (const category of categories) {
  if (!category.title || !category.description || !category.image) errors.push(`${category.id}: incomplete category.`);
  const categoryProducts = products.filter((product) => product.category === category.id);
  const required = ({ grossformat: 20, mosaik: 20, badmoebel: 20 } as Partial<Record<typeof category.id, number>>)[category.id] ?? 6;
  if (categoryProducts.length < required) errors.push(`${category.id}: expected at least ${required} products, found ${categoryProducts.length}.`);
}

for (const product of products) {
  if (!product.name || !product.description || !product.image || product.specs.length !== 3) errors.push(`${product.id}: incomplete product or specs do not contain exactly three values.`);
  if (product.image.startsWith('/images/catalog-2026/') && (!product.brand || !product.catalog || !product.catalogPage)) errors.push(`${product.id}: catalogue source metadata missing.`);
  if (product.batch) {
    if (!/^\d{4}-\d{2}-[a-z0-9-]+$/.test(product.batch)) errors.push(`${product.id}: invalid batch identifier ${product.batch}.`);
    if (!product.visualKind) errors.push(`${product.id}: batch product is missing visualKind.`);
    if (product.visualKind === 'room' && product.imageFit !== 'cover') errors.push(`${product.id}: room image must use cover.`);
    if (product.visualKind === 'product' && product.imageFit !== 'contain') errors.push(`${product.id}: isolated product image must use contain.`);
  }
  if (process.argv.includes('--images')) {
    const absolute = path.resolve('public-live', product.image.replace(/^\//, ''));
    if (!fs.existsSync(absolute)) {
      errors.push(`${product.id}: missing image ${product.image}.`);
    } else if (fs.statSync(absolute).size === 0) {
      errors.push(`${product.id}: empty image ${product.image}.`);
    } else if (product.image.startsWith('/images/catalog-2026/')) {
      const dimensions = readWebpDimensions(absolute);
      if (dimensions.width !== 1200 || dimensions.height !== 900) errors.push(`${product.id}: catalogue image must be 1200 × 900, found ${dimensions.width} × ${dimensions.height}.`);
    }
  }
}

const inferBadSegment = (product: (typeof products)[number]) => {
  if (product.segment) return product.segment;
  if (product.id === 'ar-rs-smart') return 'Duschsysteme';
  if (product.id.startsWith('sa-')) return 'Sanitärkeramik';
  if (product.id.startsWith('ar-')) return 'Armaturen';
  if (product.id === 'du-lux' || product.id === 'du-mineral') return 'Duschwannen';
  return 'Badzubehör';
};
const minimumBadSegmentProducts = {
  Armaturen: 20,
  Duschsysteme: 20,
  Sanitärkeramik: 8,
  Duschwannen: 12,
} as const;
for (const segment of ['Armaturen', 'Duschsysteme', 'Sanitärkeramik', 'Duschwannen'] as const) {
  const count = products.filter((product) => product.category === 'bad' && inferBadSegment(product) === segment).length;
  const minimum = minimumBadSegmentProducts[segment];
  if (count < minimum) errors.push(`bad/${segment}: expected at least ${minimum} photo-ready products, found ${count}.`);
}

const protectedFingerprints = {
  boden: 'ee90a720e77a6ff5696f61bbd377a4fc95fa4c147a8ee0ef58b64a38fe5bca14',
  baustelle: 'd7d573b0f9e8d21dcb697e33ae33dc836db14b9b4eb38f82547c6a10ff4e1cd9',
} as const;
for (const [category, fingerprint] of Object.entries(protectedFingerprints)) {
  const protectedProducts = products.filter((product) => product.category === category);
  const current = createHash('sha256').update(JSON.stringify(protectedProducts)).digest('hex');
  if (current !== fingerprint) errors.push(`${category}: protected product data changed.`);
}

if (errors.length) {
  console.error(`Storefront validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Storefront validation passed for ${categories.length} categories and ${products.length} curated products.`);
